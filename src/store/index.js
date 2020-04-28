import Vue from "vue";
import Vuex from "vuex";
import Cookie from "js-cookie";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        isCollapse: JSON.parse(sessionStorage.getItem("isCollapse")) || false
        // isCollapse: JSON.parse(Cookie.get("isCollapse")) || false
    },
    getters: {
        isCollapse: state => state.isCollapse
    },
    mutations: {
        SET_COLLAPSE(state) {
            state.isCollapse = !state.isCollapse;
            // console.log(state.isCollapse);

            //html5  localStorage存储   sessionStorage存储
            sessionStorage.setItem(
                "isCollapse",
                JSON.stringify(state.isCollapse)
            );

            //cookie 存储
            // Cookie.set("isCollapse", JSON.stringify(state.isCollapse));
        }
    },
    actions: {},
    modules: {}
});
