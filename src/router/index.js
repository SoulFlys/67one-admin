import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

export default new VueRouter({
    mode: 'history',
    scrollBehavior: () => ({y: 0}),
    routes: [
        {
            path: "/",
            component: require('../components/index')
        }, {
            path: "/category",
            component: require('../components/category/index')
        }, {
            path: "/category/add",
            component: require('../components/category/add.vue')
        }, {
            path: "/category/edit",
            component: require('../components/category/edit.vue')
        }
    ]
})
