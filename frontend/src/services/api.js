import axios from "axios";

const API = axios.create({
    baseURL: "https://urlify-backened-ycff.onrender.com/api"
  
});

export default API;