import axios from 'axios';

const stripeCloudAxiosInstance = axios.create({
    baseURL: 'http://localhost:5001/clone-4a1c8/us-central1/api', // Cloud function URL
    // timeout: 5000 
});

export default stripeCloudAxiosInstance;