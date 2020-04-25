//自定义全局组件
import Vue from "vue";
import svgIcon from "./svgIcon"
Vue.component('svg-icon',svgIcon)

const req = require.context('./svg', false, /\.svg$/);
const requireAll = (requireContext) => {
    return requireContext.keys().map(requireContext)
};
requireAll(req);