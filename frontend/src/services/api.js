import axios from "axios";

const API = axios.create({
  baseURL: "https://ai-app-compiler-g2fq.onrender.com",
});

export default API;