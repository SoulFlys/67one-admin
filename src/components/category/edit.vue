<template lang="html">
    <div class="category-edit">
        <el-breadcrumb separator="/" class="breadcrumb">
            <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
            <el-breadcrumb-item to="/category">栏目管理</el-breadcrumb-item>
            <el-breadcrumb-item>修改</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="operation"></div>
        <el-row>
            <el-alert title="当前栏目管理只提供最多二级栏目的添加" type="warning" show-icon></el-alert>
            <div class="operation"></div>
            <el-form :model="form" :rules="rules" ref="form" label-width="100px" label-position="right">
                <el-form-item label="父级栏目" prop="pid">
                    <el-select v-model="form.pid" placeholder="请选择父级栏目(不选则为一级栏目)">
                        <el-option label="默认为一级栏目" value="0"></el-option>
                        <el-option v-for="item in category" :label="item.name" :value="item._id" ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="栏目名称" prop="name">
                    <el-input v-model="form.name" placeholder="请输入栏目名称"></el-input>
                </el-form-item>
                <el-form-item label="栏目类型" prop="type">
                    <el-radio-group v-model="form.type">
                        <el-radio label="1">分类栏目</el-radio>
                        <el-radio label="2">单独页面</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="栏目路由" prop="router">
                    <el-input v-model="form.router" placeholder="请输入栏目路由"></el-input>
                </el-form-item>
                <el-form-item label="栏目排序" prop="sort">
                    <el-input-number v-model="form.sort" :min="0"></el-input-number>
                </el-form-item>
                <el-form-item label="是否启用" prop="status">
                    <el-switch on-text="启用" off-text="禁用" v-model="form.status"></el-switch>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="update">立即更新</el-button>
                    <el-button @click="goback">返回</el-button>
                    <el-button type="info" @click="reset">重置</el-button>
                </el-form-item>
            </el-form>
        </el-row>
    </div>
</template>

<script>
import api from '../../api'
import _ from 'lodash'
export default {
    data() {
        return {
            category: [],
            form: {
                pid: '',
                name: '',
                type: '',
                router: '',
                sort: 0,
                status: true
            },
            rules: {
                name: [{required: true, message: '请输入栏目名称',trigger: 'foucs'}],
                router: [{required: true, message: '请输入栏目路由',trigger: 'foucs'}]
            }
        }
    },
    mounted(){
        let id = this.$route.query.id;
        if(id) this.getList();
        if(id) this.findById(id);
    },
    methods: {
        submit(ev) {
            this.$refs.form.validate((valid) => {
                return valid ? this.edit() : false;
            })
        },
        reset() {
            this.$refs.form.resetFields();
        },
        goback() {
            this.$router.go(-1);
        },
        async getList(){
            let result = await api({url:'/admin/category', method:'POST'});
            let id = this.$route.query.id;
            result = _.filter(result,(item) => item._id !== id);
            this.category = result;
        },
        async findById(id){
            let result = await api({url:'/admin/category/findById', data:{id:id}, method:'POST'});
            result.status = result.status === 1 ? true : false;
            result.type = String(result.type);
            this.form = result;
        },
        async update() {
            let data = {};
                data.id = this.$route.query.id;
                data.pid = this.form.pid || 0;
                data.name = this.form.name;
                data.type = this.form.type;
                data.router = this.form.router;
                data.sort = this.form.sort;
                data.status = this.form.status ? 1 : 0;
                data.level = data.pid ? 2 : 1;
            let result = await api({url:'/admin/category/update', data:data, method:'PUT'});
            // console.log(result);
            if(result.status === 'ok'){
                this.$message({
                    showClose: true,
                    message: '更新成功',
                    type: 'success'
                });
                this.$router.push('/category');
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
