import axios from "axios";
import { toast } from "react-toastify";
import { logout } from "./authService";
import { log } from "./logService";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.response.use(null, (error) => {
  const authenticationError = error.response && error.response.status === 403;
  if (authenticationError) {
    console.log("auth error occ");
    logout();
    window.location = "/";
  }

  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    log(error);
    toast.error(error.message);
  }
  return Promise.reject(error);
});

function setJwt(jwt) {
  axios.defaults.headers.common["x-auth-token"] = jwt;
}

const http = {
  get: axios.get,
  post: axios.post,
  delete: axios.delete,
  put: axios.put,
  setJwt,
};
export default http;
