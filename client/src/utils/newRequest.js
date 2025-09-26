import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://your-backend-name.onrender.com/api/v1/"
    : "http://localhost:8000/api/v1/";

const newRequest = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

export default newRequest;
