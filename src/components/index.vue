<template>
<div class="index">
    <header>
        <span>{{name}}</span>
        <router-link to='/'>博客管理后台</router-link>
        <div>
            <a href="#" @click.stop.prevent="logout">退出</a>
            <a href="#">网站主页</a>
        </div>
    </header>
    <nav>
        <ul>
            <li class="nav-li">常用设置</li>
            <li><router-link to='/article/add'>发布文章</router-link></li>
            <li><router-link to='/article' exact>文章列表</router-link></li>
            <li><router-link to='/trash'>回收站管理</router-link></li>
            <li class="nav-li">网站设置</li>
            <li><router-link to='/admin'>管理员管理</router-link></li>
            <li><router-link to='/category'>栏目管理</router-link></li>
            <li><router-link to='/focus'>聚焦管理</router-link></li>
            <li><router-link to='/file'>文件管理</router-link></li>
            <li><router-link to='/link'>友情链接</router-link></li>
            <li><router-link to='/basis'>基本信息</router-link></li>
        </ul>
    </nav>
    <section>
        <transition name="fade" mode="out-in">
            <router-view class="view"></router-view>
        </transition>
    </section>
</div>
</template>

<script>
import Cookie from 'vue-cookie'
export default {
    name: 'index',
    data(){
        return {
            name:''
        }
    },
    mounted(){
        let names = JSON.parse(Cookie.get('token67'));
        this.name = names.nickname || names.realname || name.username;
    },
    methods:{
        logout(){
            Cookie.delete('token67');
            this.$message({
               showClose: true,
               message: '退出成功',
               type: 'success'
            });
            this.$router.push('/login');
        }
    }
}
</script>

<style lang="scss">
@import "../assets/scss/functions";
header{
    @include df;
    justify-content: space-between;
    @include linHeight(60px);
    background-color: #58B7FF;
    color:#fff;
    font-size:16px;
    span,a{
        padding:0 20px;
        color:#fff;
        text-align: center;
    }
}
nav{
    @include db;
    background-color: #324057;
    width: 200px;
    @include position(absolute,$top:60px,$left:0,$right:0,$bottom:0);
    li{
        @include linHeight(40px);
        color: #fff;
        a{
            color: #fff;
            width: 100%;
            padding: 0 35px;
            @include boxSizing;
            &.nav-li-hover{
                color:#58b7ff;
            }
        }
        &.nav-li{
            padding: 0 20px;
            background-color: #1F2D3D;
        }
    }
}
section{
    @include db;
    @include position(absolute,$top:60px,$left:200px,$right:0,$bottom:0);
    overflow: auto;
}
.view{
    padding: 15px 20px 15px 15px;
}
.fade-enter-active, .fade-leave-active{
    @include transition(all .2s ease);
}
.fade-enter, .fade-leave-active{
    opacity: 0;
}
</style>
