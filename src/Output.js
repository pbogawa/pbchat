import { useState, useMemo, useEffect } from 'react';
import { db } from './firebase'

const room = "chat_room";
// カスタムフックにしておく
const useDatabase = () => {
  // 同じパスでは毎回同じ結果が得られるのでmemo化しておく
  return useMemo(() => db.ref(room), []);
};
// hooksを使いたいのでカスタムhooksにしておく
const useFetchData = (ref) => {
  const [data, setData] = useState();
  useEffect(() => {
    // console.log("useEffect")
    // イベントリスナーを追加するにはonを使う
    ref.on('value', snapshot => {
      // パスに対する全データを含むsnapshotが渡される
      // ない場合はnullが変えるので存在をチェックしておく
      if (snapshot?.val()) {
        // console.log("snapshot.val():" + JSON.stringify(snapshot.val()));
        setData(snapshot.val());
      }
    });
    return () => {
      ref.off();
    };
  // refの変更に応じて再取得する
  }, [ref]);
  // console.log("useFetchData:" + JSON.stringify(data));
  // データを返却する
  return { data };
}
// 実際に呼び出す際はこちらを使う
const useFetchAllData = () => {
  // refを取得
  const ref = useDatabase();
  // console.log("ref:" + JSON.stringify(ref));

  // ref渡してデータを取得
  return useFetchData(ref);
};

//受信処理
function Output() {
  // dataを取ってくる
  const { data } = useFetchAllData();
  // console.log("Output:" + JSON.stringify(data));

  // object形式なので使いやすいように{key, value}形式のリストに変換する
  // データが変わらない限り結果は同じなのでメモ化しておく
  const dataList = useMemo(() => 
    Object.entries(data || {"undefined": {"name": "","date": "","message": ""}})
    .map(([key, value]) => ({key, value})), [data]);

  return (
    <div className="Output">
      {dataList.map((data) =>
        <div key={data.key}>
          <div className="name">名前：{data.value.name}</div>
          <div className="text">日時：{data.value.date}</div>
          <div className="text">メッセージ：{data.value.message}</div>
          <hr/>
        </div> 
      )}
    </div>
  );
}

export default Output;