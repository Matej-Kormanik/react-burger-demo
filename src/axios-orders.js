import axios from 'axios';

const instance = axios.create({
   baseURL: 'https://react-burger-project-18fdb.firebaseio.com'
});

export default instance;