import Vue from "vue";
import Vuex from "vuex";
// import Cookie from "js-cookie";
import app from "./modules/app"; 
Vue.use(Vuex);

export default new Vuex.Store({
  modules:{
    app
  }
});
