import Vue from "vue";
import Vuex from "vuex";
// import Cookie from "js-cookie";
import app from "./modules/app"; 
import common from "./modules/common"; 
import infoDetailed from "./modules/infoDetailed"
Vue.use(Vuex);

export default new Vuex.Store({
  modules:{
    app,
    common,
    infoDetailed 
  }
});
