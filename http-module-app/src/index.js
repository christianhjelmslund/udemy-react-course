import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';

axios.defaults.headers.common["Authorization"] = 'AUTH TOKEN'
axios.defaults.headers.post["Content-Type"] = "application/json"

// to globally modify, edit all http requests
axios.interceptors.request.use(request => {
    return request;
}, error => {
    console.log(error);
    return Promise.reject(error);
});

// to globally modify, edit all http responses
axios.interceptors.response.use(response => {
    return response;
}, error => {
    console.log(error);
    return Promise.reject(error);
})

ReactDOM.render(
    <App/>, document.getElementById('root'));
registerServiceWorker();
