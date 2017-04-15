import Vue from 'vue'
import VueRouter from 'vue-router'
import Cookie from 'vue-cookie'
Vue.use(VueRouter)

const Index = [
    {
        path: "/",
        component: require('../views/pages/index')
    },
    {
        path: "/trash",
        component: require('../views/trash/index')
    },
    {
        path: "/basis",
        component: require('../views/basis/index')
    }
]
const Category = [
    {
        path: "/category",
        component: require('../views/category/index')
    },
    {
        path: "/category/add",
        component: require('../views/category/add.vue')
    },
    {
        path: "/category/edit",
        component: require('../views/category/edit.vue')
    }
]
const Article = [
    {
        path: "/article",
        component: require('../views/article/index')
    },
    {
        path: "/article/add",
        component: require('../views/article/add.vue')
    },
    {
        path: "/article/edit",
        component: require('../views/article/edit.vue')
    }
]
const File = [
    {
        path: "/file",
        component: require('../views/file')
    },
    {
        path: "/file/add",
        component: require('../views/file/add')
    }
]
const Link = [
    {
        path: '/link',
        component: require('../views/link')
    },
    {
        path: '/link/add',
        component: require('../views/link/add')
    },
    {
        path: '/link/edit',
        component: require('../views/link/edit')
    }
]
const Focus = [
    {
        path: '/focus',
        component: require('../views/focus')
    },
    {
        path: '/focus/add',
        component: require('../views/focus/add')
    },
    {
        path: '/focus/edit',
        component: require('../views/focus/edit')
    }
]
const Admin = [
    {
        path: '/admin',
        component: require('../views/admin')
    },
    {
        path: '/admin/add',
        component: require('../views/admin/add')
    },
    {
        path: '/admin/edit',
        component: require('../views/admin/edit')
    }
]

const router = new VueRouter({
    mode: 'history',
    scrollBehavior: () => ({y: 0}),
    linkActiveClass: 'nav-li-hover',
    routes: [
        {
            path: "/",
            component: require('views/index'),
            children: Index.concat(Category, Article, File, Link, Focus, Admin)
        },
        {
            path: "/login",
            component: require('views/pages/login'),
        }
    ]
})

router.beforeEach((to, from, next) => {
    //判断当前用户是否登录
    let token = Cookie.get('token');
    if(token){
        next();
    }else{
        if(to.path === '/login' || to.path === '/reset'){
            next();
        }else{
            next({path: '/login'});
        }
    }
    next()
})

export default router;
