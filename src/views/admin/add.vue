<template lang="html">
    <div class="admin-add">
        <el-breadcrumb separator="/" class="breadcrumb">
            <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
            <el-breadcrumb-item to="/admin">友情链接</el-breadcrumb-item>
            <el-breadcrumb-item>添加</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="operation"></div>
        <el-row>
            <el-form :model="form" :rules="rules" ref="form" label-width="100px" label-position="right">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="昵称" prop="nickname">
                    <el-input v-model="form.nickname" placeholder="请输入昵称"></el-input>
                </el-form-item>
                <el-form-item label="真实姓名" prop="realname">
                    <el-input v-model="form.realname" placeholder="请输入真实姓名"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item label="是否启用" prop="status">
                    <el-switch on-text="启用" off-text="禁用" v-model="form.status"></el-switch>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submit">立即创建</el-button>
                    <el-button @click="goback">返回</el-button>
                    <el-button type="info" @click="reset">重置</el-button>
                </el-form-item>
            </el-form>
        </el-row>
    </div>
</template>

<script>
import {fetchApi as api} from '../../api'
import _ from 'lodash'
export default {
    data(){
        return {
            form: {
                username: '',
                nickname: '',
                realname: '',
                password: '',
                status: true
            },
            rules: {
                username: [{required: true, message: '请输入用户名',trigger: 'foucs'}],
                password: [{required: true, message: '请输入密码',trigger: 'foucs'}]
            }
        }
    },
    methods: {
        submit() {
            this.$refs.form.validate((valid) => {
                return valid ? this.add() : false;
            })
        },
        reset() {
            this.$refs.form.resetFields();
        },
        goback() {
            this.$router.go(-1);
        },
        async add(){
            let data = _.clone(this.form);
            let result = await api({url:'/admin/admin/add', data:data, method:'post'});
            if(result.status === 'ok'){
                this.$message({
                    showClose: true,
                    message: '添加成功',
                    type: 'success'
                });
                this.$router.push('/admin');
            }else{
                this.$message({
                    showClose: true,
                    message: '添加失败',
                    type: 'error'
                });
                console.log('result',result);
            }
        }
    }
}
</script>

<style lang="css">
</style>
