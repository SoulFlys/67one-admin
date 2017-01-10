<template lang="html">
<div class="article-edit">
    <el-breadcrumb separator="/" class="breadcrumb">
        <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
        <el-breadcrumb-item to="/focus">文章列表</el-breadcrumb-item>
        <el-breadcrumb-item>修改</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="operation"></div>
    <el-row>
        <div class="operation"></div>
        <el-form :model="form" :rules="rules" ref="form" label-width="100px" label-position="right">
            <el-form-item label="文章栏目" prop="cid">
                <el-select v-model="form.cid" placeholder="请选择文章栏目">
                    <el-option v-for="item in category" :label="item.name" :value="item._id" ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="文章标题" prop="title">
                <el-input v-model="form.title" placeholder="请输入文章标题"></el-input>
            </el-form-item>
            <el-form-item label="文章主图" prop="image">
                <el-input v-model="form.image" placeholder="请上传文章主图"></el-input>
            </el-form-item>
            <el-form-item label="单页设置" prop="alone">
                <el-switch on-text="是" off-text="否" v-model="form.alone"></el-switch>
            </el-form-item>
            <el-form-item label="文章内容" prop="content">
                <markdown v-model="form.content"></markdown>
            </el-form-item>
            <el-form-item label="文章标签" prop="tags">
                <el-input v-model="form.tags" placeholder="请输入文章标签（多个以英文逗号隔开）"></el-input>
            </el-form-item>
            <el-form-item label="加入回收站" prop="delete">
                <el-switch on-text="是" off-text="否" v-model="form.delete"></el-switch>
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
import marked from 'marked'
import {fetchApi as api, region, rootUrl} from '../../api'
import _ from 'lodash'
import Markdown from './markdown.vue'

export default {
    components: {
        Markdown
    },
    data(){
        return {
            category: [],
            form:{},
            rules:{},
            markdownResult:'',
            list:[],
            action: region + '/admin/file/add',
        }
    },
    mounted(){
        this.getCategory();
        let id = this.$route.query.id;
        if(id) this.findById(id);
    },
    methods:{
        async findById(id){
            let result = await api({url:'/admin/Article/findById', data:{id:id}, method:'POST'});
            console.log(result);
        },
        async getCategory() {
            let result = await api({url:'/admin/category', method:'POST'});
            this.category = result;
        },
    }
}
</script>
