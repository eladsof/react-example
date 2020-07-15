import React from 'react';
import './App.css';

var articles = [
    {'title':'title1','content':'text1'},
    {'title':'title2','content':'text2'},
    {'title':'title3','content':'text3'}]
;

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>News!!!</h1>
      </header>
      <div>
        {articles.map(value =>
            <React.Fragment>
              <h3>{value.title}</h3>
              <h4>{value.content}</h4>
            </React.Fragment>)}
      </div>
    </div>
  );
}

export default App;
