import axios from 'axios'

const instance = axios.create({
    baseURL: "https://burgerbuilder-1e8b3.firebaseio.com/"
})

export default instance