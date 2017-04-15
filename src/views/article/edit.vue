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
                    <el-input v-model="form.image" placeholder="请上传文章主图" :disabled="true"></el-input>
                    <div class="operation"></div>
                    <el-upload :action="action" type="drag"
                        :multiple="false"
                        :show-upload-list="false"
                        :thumbnail-mode="true"
                        :on-remove="remove"
                        :on-success="success"
                        :default-file-list="list" class="weixin">
                        <i class="el-icon-upload"></i>
                        <div class="el-dragger__text">将文件拖到此处，或<em>点击上传</em></div>
                    </el-upload>
                </el-form-item>
            <el-form-item label="单页设置" prop="alone">
                <el-switch on-text="是" off-text="否" v-model="form.alone"></el-switch>
            </el-form-item>
            <el-form-item label="文章描述" prop="description">
                <el-input  v-model="form.description" placeholder="请输入文章描述" type="textarea" :autosize="{ minRows: 3, maxRows: 6}"></el-input>
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
                <el-button type="primary" @click="submit">立即修改</el-button>
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
            form:{
                cid: '',
                title: '',
                image: '',
                alone: false,
                description:'',
                content: '',
                tags: '',
                delete: false,
                status: false
            },
            rules:{
                cid:  [{required: true, message: '请选择栏目',trigger: 'foucs'}],
                title: [{required: true, message: '请输入文章标题',trigger: 'foucs'}],
                description: [{required: true, message: '请输入文章描述',trigger: 'foucs'}],
                content: [{required: true, message: '请输入文章内容',trigger: 'foucs'}]
            },
            markdownResult:'',
            list:[],
            action: region + '/admin/file/add',
        }
    },
    // computed: {
    //     markdownResult: function() {
    //         return this.form.content;
    //         // return marked(this.form.content, {
    //         //     gfm: true,
    //         //     tables: true,
    //         //     breaks: true,
    //         //     pedantic: false,
    //         //     sanitize: false,
    //         //     smartLists: true,
    //         //     smartypants: false,
    //         //     highlight (code) {
    //         //         return require('highlight.js').highlightAuto(code).value;
    //         //     }
    //         // });
    //     }
    // },
    mounted(){
        this.getCategory();
        let id = this.$route.query.id;
        if(id) this.findById(id);
    },
    methods:{
        async findById(id){
            let result = await api({url:'/admin/Article/findById', data:{id:id}, method:'POST'});
            this.list.push({
                name:result.image,
                url:rootUrl + result.image
            })
            result.tags = _.join(result.tags);
            this.form = result;
        },
        async getCategory() {
            let result = await api({url:'/admin/category', method:'POST'});
            this.category = result;
        },
        submit() {
            this.$refs.form.validate((valid) => {
                return valid ? this.edit() : false;
            })
        },
        goback() {
            this.$router.go(-1);
        },
        reset() {
            this.$refs.form.resetFields();
        },
        remove(file, fileList){
            api({url:'/admin/file/delete',data:{id:file.id},method:'POST'});
            this.form.image = '';
        },
        success(response, file, fileList){
            file.id = response.id;
            file.newName = response.name;
            file.path = response.path;
            file.newUrl = response.url;
            this.form.image = response.path;
        },
        async edit(){
            let data = _.clone(this.form);
            data.id = this.$route.query.id;
            data.tags = _.filter(data.tags.split(','), (item) => item != '');
            let result = await api({url:'/admin/article/update', data:data, method:'PUT'});
            if(result.status === 'ok'){
                this.$message({
                    showClose: true,
                    message: '修改成功',
                    type: 'success'
                });
                this.$router.push('/article');
            }else{
                this.$message({
                    showClose: true,
                    message: '修改失败',
                    type: 'error'
                });
                console.log('result',result);
            }
        }
    }
}
</script>
