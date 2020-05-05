import React, {Component} from 'react';
import axios from "../../../axios"
import {Redirect} from "react-router-dom";
import './NewPost.css';

class NewPost extends Component {

    // componentDidMount() {
    //     this.setState({isMounted: true})
    // }
    //
    // componentWillUnmount() {
    //     this.setState({isMounted: false})
    // }

    state = {
        _isMounted: false,
        title: '',
        content: '',
        author: 'Max',
        didCreatePost: false
    }

    postHandler = () => {
        const post = {
            title: this.state.title,
            body: this.state.content,
            author: this.state.author
        }
        console.log("entered s")
        axios.post("/posts/", post).then(response => {
                console.log(response)
                this.props.history.push('/posts/')
                // this.setState({didCreatePost: true})
            }
        ).catch( error => {
            console.log("err" + error)
        })
        console.log("async")
    }

    render() {
        return (
                <div className="NewPost">
                    <h1>Add a Post</h1>
                    <label>Title</label>
                    <input type="text" value={this.state.title}
                           onChange={(event) => this.setState({title: event.target.value})}/>
                    <label>Content</label>
                    <textarea rows="4" value={this.state.content}
                              onChange={(event) => this.setState({content: event.target.value})}/>
                    <label>Author</label>
                    <select value={this.state.author}
                            onChange={(event) => this.setState({author: event.target.value})}>
                        <option value="Max">Max</option>
                        <option value="Manu">Manu</option>
                    </select>
                    <button onClick={this.postHandler}>Add Post</button>
                </div>
        );
    }
}

export default NewPost;