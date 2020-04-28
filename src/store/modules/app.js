import { Login } from "../../api/login";

const state = {
    isCollapse: JSON.parse(sessionStorage.getItem("isCollapse")) || false
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
