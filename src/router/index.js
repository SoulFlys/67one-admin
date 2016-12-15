import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

export default new VueRouter({
    mode: 'history',
    scrollBehavior: () => ({y: 0}),
    routes: [
        {
            path: "/",
            // name:"/",
            component: require('../components/index')
        }, {
            path: "/category",
            // name: "category",
            component: require('../components/category/index'),
            children: [{
                path: "add",
                // name: "categoryAdd",
                component: require('../components/category/add')
            }]
        }
        // {
        //     path: "/links",
        //     name:"links",
        //     component: require('../components/links/index.vue')
        // }, {
        //     path: "/list",
        //     name:"list",
        //     component: require('../components/article/list.vue')
        // }, {
        //     path: "/article/:id",
        //     name:"article",
        //     component: require('../components/article/index.vue')
        // }, {
        //     path: "/about",
        //     name:"about",
        //     component: require('../components/about/index.vue')
        // }, {
        //     path: "/no",
        //     name:"no",
        //     component: require('../components/no.vue')
        // },{
        //     path: "*",
        //     component: require('../components/layout/404.vue')
        // }
    ]
})
