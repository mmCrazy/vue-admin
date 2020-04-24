import Vue from "vue";
import VueRouter from "vue-router";
// import Login from "../views/Login/login";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        redirect: "login"
    },
    {
        path: "/login",
        name: "Login",
        component: () => import("../views/Login/login.vue")
    },
    {
        path: "/console",
        name: "Console",
        component: () => import("../views/Layout/layout.vue"),
        children: [
            {
                path: "/console",
                name: "Console",
                component: () => import("../views/Console/console.vue")
            }
        ]
    }
];

const router = new VueRouter({
    routes
});

export default router;
