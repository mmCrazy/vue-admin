import Cookie from "js-cookie";

const adminToken = "admin_token";
const userName = "username";
export function getToken() {
    return Cookie.get(adminToken);
}

export function setToken(token) {
    return Cookie.set(adminToken, token);
}

export function removeToken(token) {
    return Cookie.remove(adminToken);
}

export function setUserName(value) {
    return Cookie.set(userName, value);
}

export function getUserName() {
    return Cookie.get(userName);
}

export function removeUserName() {
    return Cookie.remove(userName);
}
