import { MessageBox } from "element-ui";
export default {
    install(Vue, options) {
        Vue.prototype.myComfirm = params => {
            // var str = "";
            MessageBox.confirm(params.content, params.tip, {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: params.type || "warning",
                center: true
            })
                .then(() => {
                    // str = params.id || "";
                    params.fn && params.fn(params.id || "");
                    console.log("确定");
                })
                .catch(() => {
                    params.catchFn && params.catchFn()
                    
                    console.log("取消");
                });
        };
    }
};
