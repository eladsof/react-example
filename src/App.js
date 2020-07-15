import React, {Component} from 'react';
import './App.css';

var isAdmin = false;

class NewsList extends Component {

    state = {
        articles : [
            {title:'title1',content:'text1'},
            {title:'title2',content:'text2'},
            {title:'title3',content:'text3'}
        ]
    }


    render() {
        return (
            <div>
                {this.state.articles.map(value =>
                    <React.Fragment>
                        <h3>{value.title}</h3>
                        <h4>{value.content}</h4>
                        {isAdmin && <button onClick={() => this.removeArticle(value)}>Remove</button>}
                    </React.Fragment>)}
            </div>
        )
    }

    removeArticle(value) {
        let index = this.state.articles.indexOf(value)
        console.log(value + "is in index" + index);
        console.log(this.state.articles);
        this.state.articles.splice(index,1);
        this.setState(this.state.articles)
    }
}

function App() {

    return (
    <div className="App">
        <header className="App-header">
            <h1>News!!!</h1>
        </header>
        <NewsList/>
    </div>
  );
}

export default App;
