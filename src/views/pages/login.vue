<template lang="html">
    <div class="single">
        <div class="login" @keyup.enter="submit">
            <p class="login-title">67one博客管理系统</p>
            <el-form :model="form" :rules="rules" ref="form" label-width="0">
                <el-form-item label="" prop="username">
                    <el-input v-model="form.username" placeholder="请输入登录用户名"></el-input>
                </el-form-item>
                <el-form-item label="" prop="password" style="margin-bottom:10px">
                    <el-input v-model="form.password" type="password" placeholder="请输入登录密码"></el-input>
                </el-form-item>
                <el-form-item class="login-option">
                    <el-checkbox v-model="checked">自动登录</el-checkbox>
                    <router-link to="/reset">忘记密码</router-link>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submit" style="width:100%;">立即登陆</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="fixed"></div>
    </div>
</template>

<script>
import {fetchApi as api, rootUrl} from '../../api'
import _ from 'lodash'
import Cookie from 'vue-cookie'
export default {
    name: 'login',
    data() {
        return {
            checked: true,
            form: {
                username: 'xiaofang',
                password: ''
            },
            rules: {
                username: [{
                    required: true,
                    message: '请输入登录用户名',
                    trigger: 'foucs'
                }],
                password: [{
                    required: true,
                    message: '请输入登录密码',
                    trigger: 'foucs'
                }]
            }
        }
    },
    mounted() {
        this.$nextTick(() => {
            let app = document.querySelector('.single');
            let arr = [
                'https://dn-coding-net-production-static.qbox.me/3c9bcbc0-15dc-4a6f-a81f-5112936b7773.jpg',
                'https://dn-coding-net-production-static.qbox.me/a8f69aba-9700-4c81-88e2-6aee3d36f8f9.jpg',
                'https://dn-coding-net-production-static.qbox.me/5aad72f4-a78e-433a-815b-3a991794f4ba.jpg',
                'https://dn-coding-net-production-static.qbox.me/fb78318a-d895-418f-ad80-172bbafc35e0.jpg',
                'https://dn-coding-net-production-static.qbox.me/fb78318a-d895-418f-ad80-172bbafc35e0.jpg',
                'https://dn-coding-net-production-static.qbox.me/d58141c9-9a0c-40b0-a408-5935fd70670f.jpg',
                'https://dn-coding-net-production-static.qbox.me/5aad72f4-a78e-433a-815b-3a991794f4ba.jpg',
                'https://dn-coding-net-production-static.qbox.me/9b8b99ae-44d9-4db1-82fe-dab028dc730c.jpg',
                'https://dn-coding-net-production-static.qbox.me/a8f69aba-9700-4c81-88e2-6aee3d36f8f9.jpg',
            ];
            let val = arr[Math.floor(Math.random() * arr.length)];
            app.style.background = `url(${val}) center center/cover no-repeat fixed`;
        });
    },
    methods: {
        submit() {
            this.$refs.form.validate((valid) => {
                return valid ? this.login() : false;
            })
        },
        async login() {
            let data = _.clone(this.form);
            let result = await api({url:'/admin/admin/login', data:data, method:'post'});
            if(result.status === 'ok'){
                let time = this.checked ? '24h' : '2h';
                Cookie.set('token',JSON.stringify(result.data), { expires: time });
                this.$router.push('/');
            }else{
                this.$message({
                    showClose: true,
                    message: result.message,
                    type: 'error'
                });
                console.log('result',result);
            }
        }
    }
}
</script>

<style lang="scss">
@import '../../assets/scss/functions';
.fixed {
    @include position(absolute,$top:0,$left:0,$bottom:0,$right:0);
    z-index: 1000;
    background: rgba(0,0,0,0.5);
}
.single{
    @include position(absolute,$top:0,$left:0,$bottom:0,$right:0);
}
.login {
    @include position(absolute,$top:50%,$left:50%);
    z-index: 1001;
    width: 400px;
    @include transform(translate(-50%,-50%));
    padding: 50px 40px 40px;
    border-radius: 10px;
    background-color: #fff;
    .login-title {
        margin: 0 0 35px;
        font-size: 25px;
        font-weight: 400;
        text-align: center;
        color: #323a45;
    }
    .el-input__inner {
        height: 46px;
    }
    .login-option {
        @include clearfix;
        margin-bottom: 10px;
        a {
            float: right;
        }
    }
}
</style>
