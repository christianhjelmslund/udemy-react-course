import React, {Component} from 'react';
import Posts from "./Posts/Posts"
// import FullPost from "./FullPost/FullPost"
import {
    Route,
    NavLink,
    Switch,
    Redirect// NavLink helps to know which is
} from "react-router-dom"
// the active link right now, so we can style that. /*Link,*/
import NewPost from './NewPost/NewPost';
import './Blog.css';

class Blog extends Component {

    state = {
        posts: [],
        selectedPostId: "",
        error: false
    }

    render() {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><NavLink to={"/posts"}
                                         exact
                                         activeStyle={{color: '#fa923f'}}
                            >Posts</NavLink></li>
                            <li><NavLink activeStyle={{color: '#fa923f'}}
                                         to={{
                                             pathname: "/new-post",
                                             // if you want to build a relative path:
                                             // pathname: thus.props.match.url + "/new-post",
                                             hash: "#submit",
                                             search: "?quick-submit=true"
                                         }}
                            >New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                <Switch>
                    <Route path={"/new-post"} component={NewPost}/>
                    <Route path={"/posts"} component={Posts}/>
                    <Redirect from= {"/"} to={"/posts"}/>
                </Switch>
            </div>
            // order is super important,
            // because switch matches with the first found URL and since /:id matches with
            // everything, it has to be in the bottom
        );
    }
}

export default Blog;