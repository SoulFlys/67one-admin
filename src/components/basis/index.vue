<template lang="html">
    <div class="basis">
        <el-breadcrumb separator="/" class="breadcrumb">
            <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
            <el-breadcrumb-item>基本信息</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="operation"></div>
        <el-row>
            <div class="operation"></div>
            <el-form :model="form" :rules="rules" ref="form" label-width="100px" label-position="right">
                <el-form-item label="网站logo" prop="logo">
                    <el-input v-model="form.logo" placeholder="请在下方上传网站logo" :disabled="true"></el-input>
                    <div class="operation"></div>
                    <el-upload :action="action" type="drag"
                        :multiple="false"
                        :show-upload-list="false"
                        :thumbnail-mode="true"
                        :on-remove="logoRemove"
                        :on-success="logoSuccess"
                        :default-file-list="logoList" class="logo">
                        <i class="el-icon-upload"></i>
                        <div class="el-dragger__text">将文件拖到此处，或<em>点击上传</em></div>
                    </el-upload>
                </el-form-item>
                <el-form-item label="博主头像" prop="pic">
                    <el-input v-model="form.pic" placeholder="请输入博主头像地址" :disabled="true"></el-input>
                    <div class="operation"></div>
                    <el-upload :action="action" type="drag"
                        :multiple="false"
                        :show-upload-list="false"
                        :thumbnail-mode="true"
                        :on-remove="picRemove"
                        :on-success="picSuccess"
                        :default-file-list="picList" class="pic">
                        <i class="el-icon-upload"></i>
                        <div class="el-dragger__text">将文件拖到此处，或<em>点击上传</em></div>
                    </el-upload>
                </el-form-item>
                <el-form-item label="博主昵称" prop="nick">
                    <el-input v-model="form.nick" placeholder="请输入博主昵称"></el-input>
                </el-form-item>

                <el-form-item label="微博" prop="weibo">
                    <el-input v-model="form.weibo" placeholder="请输入微博地址"></el-input>
                </el-form-item>
                <el-form-item label="QQ" prop="qq">
                    <el-input v-model="form.qq" placeholder="请输入QQ号"></el-input>
                </el-form-item>
                <el-form-item label="github" prop="github">
                    <el-input v-model="form.github" placeholder="请输入github地址"></el-input>
                </el-form-item>
                <el-form-item label="微信" prop="weixin">
                    <el-input v-model="form.weixin" placeholder="请上传微信图片" :disabled="true"></el-input>
                    <div class="operation"></div>
                    <el-upload :action="action" type="drag"
                        :multiple="false"
                        :show-upload-list="false"
                        :thumbnail-mode="true"
                        :on-remove="weixinRemove"
                        :on-success="weixinSuccess"
                        :default-file-list="weixinList" class="weixin">
                        <i class="el-icon-upload"></i>
                        <div class="el-dragger__text">将文件拖到此处，或<em>点击上传</em></div>
                    </el-upload>
                </el-form-item>
                <el-form-item label="banner" prop="banner">
                    <el-input v-model="form.banner" placeholder="请上传banner图片" :disabled="true"></el-input>
                    <div class="operation"></div>
                    <el-upload :action="action" type="drag"
                        :multiple="false"
                        :show-upload-list="false"
                        :thumbnail-mode="true"
                        :on-remove="bannerRemove"
                        :on-success="bannerSuccess"
                        :default-file-list="bannerList" class="banner">
                        <i class="el-icon-upload"></i>
                        <div class="el-dragger__text">将文件拖到此处，或<em>点击上传</em></div>
                    </el-upload>
                </el-form-item>
                <el-form-item label="公告" prop="tip">
                    <el-input type="textarea" :rows="3" v-model="form.tip" placeholder="请输入公告"></el-input>
                </el-form-item>

                <el-form-item label="版权信息" prop="copyright">
                    <el-input v-model="form.copyright" placeholder="请输入版权信息"></el-input>
                </el-form-item>
                <el-form-item label="备案号" prop="record">
                    <el-input v-model="form.record" placeholder="请输入备案号"></el-input>
                </el-form-item>
                <el-form-item label="访问量">
                    <el-input v-model="form.hits" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submit">更新设置</el-button>
                </el-form-item>
            </el-form>
        </el-row>
    </div>
</template>

<script>
import {fetchApi as api, region, rootUrl} from '../../api'
import _ from 'lodash'
export default {
    name: 'basis',
    data() {
        return {
            form:{
                logo:'',
                pic:'',
                nick:'',
                weibo:'',
                qq:'',
                github:'',
                weixin:'',
                banner:'',
                tip: '',
                copyright:'',
                record:'',
                hits:''
            },
            rules: {
                logo: [{required: true, message: '请输入网站logo地址',trigger: 'foucs'}],
                pic: [{required: true, message: '请输入博主头像地址',trigger: 'foucs'}],
                banner: [{required: true, message: '请输入banner地址',trigger: 'foucs'}],
                nick: [{required: true, message: '博主昵称',trigger: 'foucs'}],
                copyright: [{required: true, message: '请输入版权信息',trigger: 'foucs'}],
                record: [{required: true, message: '请输入备案号',trigger: 'foucs'}]
            },
            isUpdate: false,
            id: '',
            logoList:[],
            picList:[],
            weixinList:[],
            bannerList:[],
            action: region + '/admin/file/add',
            articles:[]
        }
    },
    mounted() {
        this.getList();
    },
    methods: {
        async getList() {
            let result = await api({url:'/admin/basis', method:'POST'});
            this.isUpdate = result.length > 0 ? true : false;
            this.form = result[0] || {};
            this.id = result[0] ? result[0]._id || '' : '';
            this.logoList = [{
                name:'logo',
                url: rootUrl + this.form.logo
            }];
            this.picList = [{
                name:'pic',
                url: rootUrl + this.form.pic
            }];
            this.weixinList = [{
                name:'weixin',
                url: rootUrl + this.form.weixin
            }];
            this.bannerList = [{
                name:'banner',
                url: rootUrl + this.form.banner
            }];
        },
        submit() {
            this.$refs.form.validate((valid) => {
                console.log(this.isUpdate?'更新':'增加');
                return valid ? (this.isUpdate ? this.update() : this.add()) : false;
            })
        },
        async add(){
            let data = _.clone(this.form);
            let result = await api({url:'/admin/basis/add', data:data, method:'post'});
            if(result.status === 'ok'){
                this.$message({
                    showClose: true,
                    message: '更新成功',
                    type: 'success'
                });
            }else{
                this.$message({
                    showClose: true,
                    message: '更新失败',
                    type: 'error'
                });
            }
            this.getList();
        },
        async update(){
            let data = _.clone(this.form);
            data.id = this.id;
            delete data.hits;
            let result = await api({url:'/admin/basis/update', data:data, method:'PUT'});
            if(result.status === 'ok'){
                this.$message({
                    showClose: true,
                    message: '更新成功',
                    type: 'success'
                });
            }else{
                this.$message({
                    showClose: true,
                    message: '更新失败',
                    type: 'error'
                });
                console.log('result',result);
            }
            this.getList();
        },
        logoRemove(file, fileList) {
            api({url:'/admin/file/delete',data:{id:file.id},method:'POST'});
            this.form.logo = '';
        },
        logoSuccess(response, file, fileList){
            file.id = response.id;
            file.newName = response.name;
            file.path = response.path;
            file.newUrl = response.url;
            this.form.logo = response.path;
        },
        picRemove(file, fileList) {
            api({url:'/admin/file/delete',data:{id:file.id},method:'POST'});
            this.form.pic = '';
        },
        picSuccess(response, file, fileList){
            file.id = response.id;
            file.newName = response.name;
            file.path = response.path;
            file.newUrl = response.url;
            this.form.pic = response.path;
        },
        weixinRemove(file, fileList) {
            api({url:'/admin/file/delete',data:{id:file.id},method:'POST'});
            this.form.weixin = '';
        },
        weixinSuccess(response, file, fileList){
            file.id = response.id;
            file.newName = response.name;
            file.path = response.path;
            file.newUrl = response.url;
            this.form.weixin = response.path;
        },
        bannerRemove(file, fileList) {
            api({url:'/admin/file/delete',data:{id:file.id},method:'POST'});
            this.form.banner = '';
        },
        bannerSuccess(response, file, fileList){
            file.id = response.id;
            file.newName = response.name;
            file.path = response.path;
            file.newUrl = response.url;
            this.form.banner = response.path;
        },
    }
}
</script>

<style lang="scss" scoped>
.basis{
    .pic,.weixin,.logo{
        width:150px;
        height:150px;
    }
    .banner{
        height:150px;
    }
}

</style>
