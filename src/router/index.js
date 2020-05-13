import Vue from "vue";
import VueRouter from "vue-router";
// import Login from "../views/Login/login";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        redirect: "login",
        hidden: true,
        meta: {
            name: "登陆"
        }
    },
    {
        path: "/login",
        name: "Login",
        hidden: true,
        meta: {
            name: "登录"
        },
        component: () => import("../views/Login/login.vue")
    },
    // 控制台-----------------------
    {
        path: "/layout",
        name: "Layout",
        redirect: "console",
        meta: {
            name: "控制台",
            icon: "console"
        },
        component: () => import("../views/Layout/layout.vue"),
        children: [
            {
                path: "/console",
                name: "Console",
                meta: {
                    name: "首页",
                },
                component: () => import("../views/Console/console.vue")
            }
        ]
    },
    // 信息管理----------------------
    {
        path: "/info",
        name: "Info",
        meta: {
            name: "信息管理",
            icon: "info"
        },
        component: () => import("../views/Layout/layout.vue"),
        children: [
            {
                path: "/infoIndex",
                name: "InfoIndex",
                meta: {
                    name: "信息列表",
                },
                component: () => import("../views/Info/infoIndex.vue")
            },
            {
                path: "/infoCategory",
                name: "InfoCategory",
                meta: {
                    name: "信息分类"
                },
                component: () => import("../views/Info/infoCategory.vue")
            },
            {
                path: "/editInfoDetailed",
                name: "EditInfoDetailed",
                hidden: true,
                meta: {
                    name: "编辑详情"
                },
                component: () => import("../views/Info/editInfoDetailed.vue")
            }
        ]
    },
    // 用户------------------------
    {
        path: "/user",
        name: "User",
        meta: {
            name: "用户",
            icon: "user"
        },
        component: () => import("../views/Layout/layout.vue"),
        children: [
            {
                path: "/userIndex",
                name: "UserIndex",
                meta: {
                    name: "用户列表"
                },
                component: () => import("../views/User/userIndex.vue")
            }
        ]
    }
];

const router = new VueRouter({
    routes
});

export default router;
