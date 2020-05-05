import React, {Component} from "react"
import axios from "../../../axios";
import { Route } from "react-router-dom"

import FullPost from "../FullPost/FullPost";
import Post from "../../../components/Post/Post";

import "./Posts.css"

class Posts extends Component {

    state = {
        posts: [],
    }

    componentDidMount() {
        axios.get("/posts/").then(
            response => {
                const posts = response.data.slice(0, 4)
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        author: 'Max'
                    }
                })
                this.setState({
                    posts: updatedPosts
                })
            }
        ).catch(error =>
            console.log(error)
        )
    }

    postSelectedHandler = (id) => {
        // because the Posts is encapsulated by a NavLink, we have many props to choose between.
        this.props.history.push({pathname: "/posts/" + id});
    }

    render() {

        let posts = <p style={{textAlign: "center"}}> Something went wrong!</p>
        if (!this.state.error) {
            posts = this.state.posts.map(post => {
                return (<Post
                        key={post.id}
                        title={post.title}
                        author={post.author}
                        // {...this.props} passes on the props
                        clicked={() => this.postSelectedHandler(post.id)}/>
                )
                // this is another way to do it :
                // <Link to={'/' + post.id}
                //       key={post.id}>
                //     <Post
                //         title={post.title}
                //         author={post.author}
                //         // {...this.props} passes on the props
                //         clicked={() => this.postSelectedHandler(post.id)}/>
                // </Link>)
            })
        }
        return(
        <div>
            <section className="Posts">
                {posts}
            </section>
            <Route path={this.props.match.url + "/:id"} exact component={FullPost} />
        </div>) // not automatically resolved to /posts/id -> instead set path dynamically.
    }
}

export default Posts;