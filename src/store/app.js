import { Login } from "../api/login";

const app = {
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
    actions: {
      // login(content,data){   //login({state,getters},data)
      //   content.state
      //   content.getters
      //   content.commit
      //   content.rootGetters
      //   content.rootState
      // }

      login(content,LoginDate){
        return new Promise((resolve,reject)=>{
          Login(LoginDate).then((response)=>{
            resolve(response);
          }).catch((error)=>{
            reject(error)
          })
        })
      }
    },
    modules: {}
}
export default app;