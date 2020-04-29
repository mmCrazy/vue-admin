import router from "./index";
import { getToken, } from "../utils/app";

const whiteRouter = ['/login']; //indexof方法，判断数组中是否存在指定的某个对象，如果不存在，则返回-1
router.beforeEach((to, from, next) => {
    if (getToken()) {

        getToken();
        console.log("存在");
        next();
    } else {
        if(whiteRouter.indexOf(to.path) !== -1){
            next(); //to
        }else{
            next("/login"); 
        }
    }
    /** 
     * 当进行路由跳转时判断获取到的Token值是否存在，不存在则判断我们要跳转的路由是否存在我们的白名单里面，如果存在则直接跳转，如果不存在则执行next("/login")回到登录页面，路由再次跳转再执行router.beforeEach，因为login存在我们的白名单，则调用next()直接跳转
    */
});
