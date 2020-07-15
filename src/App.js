import React, {Component} from 'react';
import './App.css';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import { API } from 'aws-amplify';
import {listArticles} from "./graphql/queries";
import {createArticle, deleteArticle} from "./graphql/mutations";
import { Auth } from 'aws-amplify';


var isAdmin = true;


class NewsList extends Component {

    constructor() {
        super();
        this.state = {
            articles:[]
        };


    }

    componentDidMount() {
        this.fetchAAA();
    }

    async fetchAAA() {
        const apiData = await API.graphql({query:listArticles})
        this.setState({articles: apiData.data.listArticles.items});
        console.log(apiData.data.listArticles)
    }

    render() {
        return (
            <div>
                {this.state.articles.map((value) =>
                    <React.Fragment key={value.id}>
                        <h3>{value.title}</h3>
                        <h4>{value.content}</h4>
                        {isAdmin && <button onClick={() => this.removeArticle(value.id)}>Remove</button>}
                    </React.Fragment>)}
            </div>
        )
    }

    async  removeArticle(id) {
        console.log("Trying to remove : " + id)
        await API.graphql({ query: deleteArticle, variables: { input: { id } }});
        this.fetchAAA()
    }

    async addArticle(title, content) {
        await API.graphql({query:createArticle, variables : {input : {title,content}}})
    }
}

class MyUser extends Component {

    state = {
        user: {}
    }

     async componentDidMount() {

         const user = await Auth.currentUserInfo()
         console.log('Returned info: ', user)
         this.setState({ user })
     }

    render() {
        return (
            <b>
            {this.state.user.username}
            </b>
        )
    }
}

function App() {

    return (
    <div className="App">
        <header className="App-header">
            <h1>News!!!</h1>
            <MyUser/>
        </header>
        <NewsList/>
        <AmplifySignOut/>
    </div>
  );
}

export default withAuthenticator(App);

