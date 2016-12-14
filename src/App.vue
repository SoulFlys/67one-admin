<template>
<div id="app">
    <header>
        <span>时光笑我温暖如阳</span>
        <router-link to='/'>博客管理后台</router-link>
        <a href="#">网站主页</a>
    </header>
    <nav>
        <ul>
            <li class="nav-li">网站设置</li>
            <li><router-link to='/category'>栏目管理</router-link></li>
            <li>文章列表</li>
            <li class="nav-li">其他设置</li>
            <li>回收站管理</li>
            <li>SEO管理</li>
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
export default {
  name: 'app'
}
</script>

<style lang="scss">
@import "./assets/scss/functions";
header{
    @include df;
    justify-content: space-between;
    @include linHeight(60px);
    background-color: #58B7FF;
    color:#fff;
    font-size:15px;
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
        padding: 0 35px;
        a{
            color: #fff;
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
