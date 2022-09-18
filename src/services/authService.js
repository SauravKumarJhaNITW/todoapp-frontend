import jwtDecode from "jwt-decode";
import http from "./httpService";

const apiEndpoint = "/login";
const tokenKey = "token";

http.setJwt(getJwt());
let refreshId;

export async function login(user) {
    const { data: jwt } = await http.post(apiEndpoint, {
        username: user.username,
        password: user.password,
        longerExpiry: user.rememberMe,
    });

    localStorage.setItem(tokenKey, jwt);
    // if (!user.rememberMe) refresh();
}

function refresh() {
    console.log("refresh called");
    refreshId = setInterval(
        async() => {
            console.log('function called by setInterval');
            try {
                console.log("trying to refresh");
                const { data: jwt } = await http.get("/refresh");
                localStorage.setItem(tokenKey, jwt);
                console.log("refresh successfull , new jwt is", jwt);
            } catch (ex) {
                clearInterval(refreshId);
                console.log("Interval was cleared ", refreshId, "due to ", ex);
            }
        },
        console.log("Interval was set ", refreshId));
}

export function getJwt() {
    return localStorage.getItem(tokenKey);
}

export function logout() {
    localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
    try {
        const jwt = localStorage.getItem(tokenKey);
        const user = jwtDecode(jwt);
        return user;
    } catch (ex) {
        return null;
    }
}

export function loginWithJwt(jwt) {
    localStorage.setItem(tokenKey, jwt);
}