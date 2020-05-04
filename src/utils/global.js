import { MessageBox } from "element-ui";
export default {
    install(Vue, options) {
        Vue.prototype.myComfirm = (params) => {
            MessageBox.confirm(params.content, params.tip, {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
              }).then(() => {
                params.fn && params.fn(params.id)
              }).catch(() => {
                // this.$message({
                //   type: 'info',
                //   message: '已取消删除'
                // });
                console.log("取消")
              });
        };
    }
};
