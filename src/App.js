import { useState } from "react";
import { db } from './firebase'
import './App.css';

function App() {

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

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
    const room = "chat_room";
    const now = new Date();
    db.ref(room).push({
        name: name,
        message: message,
        date: now.getFullYear() + '年' + now.getMonth()+1 + '月' + now.getDate() + '日' + now.getHours() + '時' + now.getMinutes() + '分'
    });
    setName("");
    setMessage("");
  };

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
      </div>
    </div>
  );
}

export default App;
