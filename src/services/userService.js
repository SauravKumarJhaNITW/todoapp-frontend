import http from "./httpService";

const apiEndpoint = "/register";

export function register(user) {
  return http.post(apiEndpoint, {
    username: user.username,
    password: user.password,
  });
}
