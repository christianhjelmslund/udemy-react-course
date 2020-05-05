import React from 'react';
import './Post.css';
import { withRouter }from "react-router-dom" // is used to pass on the props from the component
// it has been routed from.

const post = (props) => (
    <article className="Post" onClick={props.clicked}>
        <h1>{props.title}</h1>
        <div className="Info">
            <div className="Author">{props.author}</div>
        </div>
    </article>
);

export default withRouter(post);