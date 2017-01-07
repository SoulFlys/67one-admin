<template lang="html">
    <div class="article-add">
        <el-breadcrumb separator="/" class="breadcrumb">
            <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
            <el-breadcrumb-item to="/article">文章列表</el-breadcrumb-item>
            <el-breadcrumb-item>添加</el-breadcrumb-item>
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
import _ from 'lodash'
import {fetchApi as api} from '../../api'
import Markdown from './markdown.vue'

export default {
    components: {
        Markdown
    },
    data() {
        return {
            category: [],
            form: {
                cid: '',
                title: '',
                image: 'http://localhost:3000/2016.12.22.16.21.24.30.jpg',
                alone: false,
                content: '',
                tags: '',
                delete: false,
                status: false
            },
            rules: {
                cid:  [{required: true, message: '请选择栏目',trigger: 'foucs'}],
                title: [{required: true, message: '请输入文章标题',trigger: 'foucs'}],
                content: [{required: true, message: '请输入文章内容',trigger: 'foucs'}]
            },
            markdownResult: '',
            list:[],
            action: region + '/admin/file/add',
        }
    },
    computed: {
        markdownResult: function() {
            return marked(this.form.content, {
                // sanitize: true
            })
        }
    },
    mounted() {
        this.getCategory();
    },
    methods: {
        submit() {
            console.log(this.form);
            console.log(this.markdownResult);
            this.$refs.form.validate((valid) => {
                return valid ? this.add() : false;
            })
        },
        goback() {
            this.$router.go(-1);
        },
        reset() {},
        async getCategory() {
            let result = await api({url:'/admin/category', method:'POST'});
            this.category = result;
        },
        async add() {
            let data = _.clone(this.form);
            data.content = this.markdownResult;
            data.tags = _.filter(data.tags.split(','), (item) => item != '');
            data.description = '这是临时的描述';
            let result = await api({url:'/admin/article/add', data:data, method:'post'});
            if(result.status === 'ok'){
                this.$message({
                    showClose: true,
                    message: '添加成功',
                    type: 'success'
                });
                this.$router.push('/article');
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

<style lang="scss" scoped>
@import "../../assets/scss/functions";
.article-result {
    @include boxSizing;
    border: 1px solid #c0ccda;
    font-size: 14px;
    color: #1f2d3d;
    padding: 5px 7px;
    line-height: 1.5;
    @include borderRadius(4px);
}
</style>
