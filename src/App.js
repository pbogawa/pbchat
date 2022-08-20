import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
 <h1>リアルタイムチャット</h1>
    <div>
        <div>
            Name<br/><input type="text" id="name"/>
        </div>
        <br/>
        <div>
            Message<br/><textarea id="message" row="10"></textarea><br/><br/>
            <button id="send">send</button>
        </div>
        <hr/>
        <div id="output"></div>
    </div>
    <div id="root"></div>
    </div>
  );
}

export default App;
