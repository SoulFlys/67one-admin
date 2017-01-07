<template lang="html">
<div class="focus-add">
    <el-breadcrumb separator="/" class="breadcrumb">
        <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
        <el-breadcrumb-item to="/focus">聚焦列表</el-breadcrumb-item>
        <el-breadcrumb-item>添加</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="operation"></div>
    <el-row>
        <div class="operation"></div>
        <el-form :model="form" :rules="rules" ref="form" label-width="100px" label-position="right">
            <el-form-item label="聚焦标题" prop="title">
                <el-input v-model="form.title" placeholder="请输入聚焦标题"></el-input>
            </el-form-item>
            <el-form-item label="对应文章" prop="articleId">
                <el-select v-model="form.articleId" placeholder="请选择对应文章">
                    <el-option v-for="item in articles" :label="item.title" :value="item._id" ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="聚焦图片" prop="pic">
                <el-input v-model="form.pic" placeholder="请上传聚焦图片" :disabled="true"></el-input>
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
            <el-form-item label="聚焦排序" prop="sort">
                <el-input-number v-model="form.sort" :min="0"></el-input-number>
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
import {fetchApi as api, region, rootUrl} from '../../api'
import _ from 'lodash'
export default {
    data() {
        return {
            form:{
                title:'',
                articleId:'',
                pic:'',
                sort:0,
                status:true
            },
            rules:{
                title: [{required: true, message: '请输入聚焦标题',trigger: 'foucs'}],
                articleId: [{required: true, message: '请选择对应文章',trigger: 'foucs'}],
                pic: [{required: true, message: '请上传聚焦图片',trigger: 'foucs'}]
            },
            list:[],
            action: region + '/admin/file/add',
            articles:[]
        }
    },
    mounted(){
        this.getArticles();
    },
    methods:{
        async getArticles(){
            let result = await api({url:'/admin/article', method:'POST'});
            this.articles = result;
        },
        remove(file, fileList){
            api({url:'/admin/file/delete',data:{id:file.id},method:'POST'});
            this.form.pic = '';
        },
        success(response, file, fileList){
            file.id = response.id;
            file.newName = response.name;
            file.path = response.path;
            file.newUrl = response.url;
            this.form.pic = response.path;
        },
        submit(){
            this.$refs.form.validate((valid) => {
                return valid ? this.add() : false;
            })
        },
        goback(){
            this.$router.go(-1);
        },
        reset(){
            this.$refs.form.resetFields();
        },
        async add(){
            let data = _.clone(this.form);
            let result = await api({url:'/admin/focus/add', data:data, method:'post'});
            if(result.status === 'ok'){
                this.$message({
                    showClose: true,
                    message: '新增成功',
                    type: 'success'
                });
                this.$router.push('/focus');
            }else{
                this.$message({
                    showClose: true,
                    message: '新增失败',
                    type: 'error'
                });
            }
            this.getList();
        },
    }
}
</script>
