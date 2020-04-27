//自定义全局组件
import Vue from "vue";
import svgIcon from "./svgIcon";
Vue.component('svg-icon',svgIcon);
/**
 * require.context :读取指定目录的所有文件
 * 第一个：目录
 * 第二个：是否遍历子目录
 * 第三个: 定义遍历文件规则
 */
const req = require.context('./svg', false, /\.svg$/);
const requireAll = (requireContext) => {
    return requireContext.keys().map(requireContext)
};
requireAll(req);