import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const Index = [
    {
        path: "/",
        component: require('../components/index')
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
const File = [
    {
        path: "/file",
        component: require('../components/file')
    },
    {
        path: "/file/add",
        component: require('../components/file/add')
    }
]
const Link = [
    {
        path: '/link',
        component: require('../components/link')
    },
    {
        path: '/link/add',
        component: require('../components/link/add')
    },
    {
        path: '/link/edit',
        component: require('../components/link/edit')
    }
]

export default new VueRouter({
    mode: 'history',
    scrollBehavior: () => ({y: 0}),
    linkActiveClass: 'nav-li-hover',
    routes: Index.concat(Category, Article, File, Link)
})
