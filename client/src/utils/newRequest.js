import axios from "axios";

const baseURL =
  import.meta.env.MODE === "production"
    ? "https://afghan-tech-freelancers-b.onrender.com/api/v1/"
    : "http://localhost:8000/api/v1/";

const newRequest = axios.create({
  baseURL,
  withCredentials: true, // 🔥 برای ارسال کوکی
});

export default newRequest;
