import Cookie from "js-cookie";

export function getToken(){
    return Cookie.get("admin_token");
}