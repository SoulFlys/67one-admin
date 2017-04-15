<template lang="html">
    <div class="link-edit">
        <el-breadcrumb separator="/" class="breadcrumb">
            <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
            <el-breadcrumb-item to="/link">友情链接</el-breadcrumb-item>
            <el-breadcrumb-item>修改</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="operation"></div>
        <el-row>
            <el-form :model="form" :rules="rules" ref="form" label-width="100px" label-position="right">
                <el-form-item label="链接名称" prop="name">
                    <el-input v-model="form.name" placeholder="请输入链接名称"></el-input>
                </el-form-item>
                <el-form-item label="友链描述" prop="description">
                    <el-input v-model="form.description" placeholder="请输入友链描述"></el-input>
                </el-form-item>
                <el-form-item label="友链地址" prop="href">
                    <el-input v-model="form.href" placeholder="请输入友链地址"></el-input>
                </el-form-item>
                <el-form-item label="友链类型" prop="type">
                    <el-input v-model="form.type" placeholder="请输入友链类型"></el-input>
                </el-form-item>
                <el-form-item label="友链排序" prop="sort">
                    <el-input-number v-model="form.sort" :min="0"></el-input-number>
                </el-form-item>
                <el-form-item label="是否启用" prop="status">
                    <el-switch on-text="启用" off-text="禁用" v-model="form.status"></el-switch>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submit">立即更新</el-button>
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
            form: {},
            rules: {
                name: [{required: true, message: '请输入链接名称',trigger: 'foucs'}],
                description: [{required: true, message: '请输入友链描述',trigger: 'foucs'}],
                href: [{required: true, message: '请输入友链地址',trigger: 'foucs'}],
                type: [{required: true, message: '请输入友链类型',trigger: 'foucs'}]
            }
        }
    },
    mounted(){
        let id = this.$route.query.id;
        if(id) this.findById(id);
    },
    methods: {
        submit() {
            this.$refs.form.validate((valid) => {
                return valid ? this.update() : false;
            })
        },
        reset() {
            this.$refs.form.resetFields();
        },
        goback() {
            this.$router.go(-1);
        },
        async findById(id){
            let result = await api({url:'/admin/link/findById', data:{id:id}, method:'POST'});
            this.form = result;
        },
        async update(){
            let data = _.clone(this.form);
            data.id = this.$route.query.id;
            let result = await api({url:'/admin/link/update', data:data, method:'PUT'});
            if(result.status === 'ok'){
                this.$message({
                    showClose: true,
                    message: '更新成功',
                    type: 'success'
                });
                this.$router.push('/link');
            }else{
                this.$message({
                    showClose: true,
                    message: '更新失败',
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
