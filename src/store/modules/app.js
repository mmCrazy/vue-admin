import { Login } from "../../api/login";
import Cookie from "js-cookie";
import { setToken,setUserName} from "../../utils/app";
const state = {
    isCollapse: JSON.parse(sessionStorage.getItem("isCollapse")) || false,
    // isCollapse: JSON.parse(Cookie.get("isCollapse")) || false
    username:'',
    admin_token:''
};

const getters = {
    isCollapse: state => state.isCollapse
};

const mutations = {
    SET_COLLAPSE(state) {
        state.isCollapse = !state.isCollapse;
        // console.log(state.isCollapse);

        //html5  localStorage存储   sessionStorage存储
        sessionStorage.setItem("isCollapse", JSON.stringify(state.isCollapse));

        //cookie 存储
        // Cookie.set("isCollapse", JSON.stringify(state.isCollapse));
    },
    SET_USERNAME(state,data){
        Cookie.set(state.username,data);
    },
    SET_TOKEN(state,data){
        Cookie.set(state.admin_token,data);
    }
};

const actions = {
    // login(content,data){   //login({state,getters},data)
    //   content.state
    //   content.getters
    //   content.commit
    //   content.rootGetters
    //   content.rootState
    // }
    login(content, LoginDate) {
        return new Promise((resolve, reject) => {
            Login(LoginDate)
                .then(response => {
                    let data = response.data.data;
                    console.log("data:"+data.username);
                    content.commit("SET_USERNAME",data.username);
                    content.commit("SET_TOKEN",data.token);
                    setToken(data.token);
                    setUserName(data.username);
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};
