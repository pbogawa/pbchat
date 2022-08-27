import { useState } from "react";
import { db } from './firebase'
import './App.css';

function App() {

  const room = "chat_room";

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [output, setOutput] = useState("");

  //name属性でstate名を判断する条件分岐　
  const handleChange = (e) => {
      if(e.target.name === 'name') {
        setName (e.target.value);
      } else if (e.target.name === 'message') {
        setMessage (e.target.value);
      }
  }

  //送信処理
  function send() {
    var now = new Date();
    db.ref(room).push({
        name: name,
        message: message,
        date: now.getFullYear() + '年' + now.getMonth()+1 + '月' + now.getDate() + '日' + now.getHours() + '時' + now.getMinutes() + '分'
    });
    setName("");
    setMessage("");
  };

  //受信処理
  db.ref(room).on("child_added", function(data) {
      const v = data.val();
      const k = data.key;
      let str = "";
      str += '<div class="name">名前：'+v.name+'</div>';
      str += '<div class="text">日時：'+v.date+'</div>';
      str += '<div class="text">メッセージ：'+v.message+'</div><hr>';
      // setOutput(output + str);
  });

  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Reacts
        </a>
      </header> */}
      <h1>リアルタイムチャット</h1>
      <div>
          <div>
              Name<br/><input type="text" name="name" value={name} onChange={handleChange} />
          </div>
          <br/>
          <div>
              Message<br/><textarea row="10" name="message" value={message} onChange={handleChange}></textarea><br/><br/>
              <button onClick={send}>send</button>
          </div>
          <hr/>
          <div value={output} ></div>
      </div>
    </div>
  );
}

export default App;
