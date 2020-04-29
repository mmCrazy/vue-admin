import Cookie from "js-cookie";

const adminToken = "admin_token";
export function getToken() {
    return Cookie.get(adminToken);
}

export function setToken(token) {
    return Cookie.set(adminToken,token);
}

export function removeToken(token) {
    return Cookie.remove(adminToken);
} 

export function setUserName(value) {
    return Cookie.set("username",value);
}
