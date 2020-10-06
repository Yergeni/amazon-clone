import axios from 'axios';

const stripeCloudAxiosInstance = axios.create({
    baseURL: 'https://us-central1-clone-4a1c8.cloudfunctions.net/api'
    // baseURL: 'http://localhost:5001/clone-4a1c8/us-central1/api', // Cloud function URL goes here
    // timeout: 5000 
});

export default stripeCloudAxiosInstance;