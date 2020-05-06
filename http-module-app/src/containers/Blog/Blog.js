import React, {Component, Suspense} from 'react';
import Posts from "./Posts/Posts"
// import FullPost from "./FullPost/FullPost"
import {
    Route,
    NavLink,
    Switch,
    Redirect// NavLink helps to know which is
} from "react-router-dom"
// the active link right now, so we can style that. /*Link,*/
// whatever comes" between the parantheses is only imported, when the function is executed.
import './Blog.css';

// just as normal:

// import NewPost from './NewPost/NewPost';

// way 1
import asyncComponent from "../../hoc/asyncComponent";
// const AsyncNewPost = asyncComponent(() => import("./NewPost/NewPost"))

// way 2 (only React 16.6)
const NewPost = React.lazy(() => import("./NewPost/NewPost"))


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
                    <Route path={"/new-post"} render={() => <Suspense fallback={
                        <div>Loading...</div> /* could be a spinner here too for example*/}>
                        <NewPost/> </Suspense>}/>
                    <Route path={"/posts"} component={Posts}/>
                    <Redirect from={"/"} to={"/posts"}/>
                    {/*<Route render={() => <h1>Not Found</h1>}></Route>*/}
                </Switch>
            </div>
            // order is super important,
            // because switch matches with the first found URL and since /:id matches with
            // everything, it has to be in the bottom
        );
    }
}

export default Blog;