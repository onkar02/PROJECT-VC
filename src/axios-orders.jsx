import axios from "axios";

const instance = axios.create({
  baseURL: "https://project-vc-1f8d2-default-rtdb.firebaseio.com/",
});
export default instance;
