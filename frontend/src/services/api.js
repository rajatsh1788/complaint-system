import axios from "axios";

const API = axios.create({
  baseURL: "https://complaint-system-backend-eppx.onrender.com/api"
});

export default API;