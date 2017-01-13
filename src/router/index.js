import Vue from 'vue'
import VueRouter from 'vue-router'
import Cookie from 'vue-cookie'
Vue.use(VueRouter)

const Index = [
    {
        path: "/",
        component: require('../components/pages/index')
    },
    {
        path: "/trash",
        component: require('../components/trash/index')
    },
    {
        path: "/basis",
        component: require('../components/basis/index')
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
const Focus = [
    {
        path: '/focus',
        component: require('../components/focus')
    },
    {
        path: '/focus/add',
        component: require('../components/focus/add')
    },
    {
        path: '/focus/edit',
        component: require('../components/focus/edit')
    }
]
const Admin = [
    {
        path: '/admin',
        component: require('../components/admin')
    },
    {
        path: '/admin/add',
        component: require('../components/admin/add')
    },
    {
        path: '/admin/edit',
        component: require('../components/admin/edit')
    }
]

const router = new VueRouter({
    mode: 'history',
    scrollBehavior: () => ({y: 0}),
    linkActiveClass: 'nav-li-hover',
    routes: [
        {
            path: "/",
            component: require('components/index'),
            children: Index.concat(Category, Article, File, Link, Focus, Admin)
        },
        {
            path: "/login",
            component: require('components/pages/login'),
        }
    ]
})

router.beforeEach((to, from, next) => {
    //判断当前用户是否登录
    let token67 = Cookie.get('token67');
    if(token67){
        next();
    }else{
        if(to.path === '/login' || to.path === '/reset'){
            next();
        }else{
            next({path: '/login'});
        }
    }
})

export default router;
