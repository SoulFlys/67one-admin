import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const Index = [
    {
        path: "/",
        component: require('../components/index')
    },
    {
        path: "/file/add",
        component: require('../components/file/add')
    }
]

const Category = [
    {
        path: "/category",
        component: require('../components/category/index')
    },
    {
        path: "/category/add",
        component: require('../components/category/add.vue')
    },
    {
        path: "/category/edit",
        component: require('../components/category/edit.vue')
    }
]

const Article = [
    {
        path: "/article",
        component: require('../components/article/index')
    },
    {
        path: "/article/add",
        component: require('../components/article/add.vue')
    },
    {
        path: "/article/edit",
        component: require('../components/article/edit.vue')
    }
]



export default new VueRouter({
    mode: 'history',
    scrollBehavior: () => ({y: 0}),
    routes: Index.concat(Category, Article)
})
