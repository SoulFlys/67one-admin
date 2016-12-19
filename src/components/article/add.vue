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
                    <el-input v-model="form.name" placeholder="请输入文章标题"></el-input>
                </el-form-item>
                <el-form-item label="文章主图" prop="title">
                    <el-input v-model="form.image" placeholder="请上传文章主图"></el-input>
                </el-form-item>
                <el-form-item label="单页设置" prop="status">
                    <el-switch on-text="是" off-text="否" v-model="form.status"></el-switch>
                </el-form-item>
                <el-form-item label="文章内容" prop="content">
                    <el-col :span="12">
                        <el-input type="textarea" v-model="form.content" @input="update" :autosize="{ minRows: 12}" placeholder="请输入文章内容（仅支持markdown语法）"></el-input>
                    </el-col>
                    <el-col :span="12" class="editormd">
                        <div class="article-result md-preview markdown shrink" v-html="markdownResult"></div>
                    </el-col>
                </el-form-item>
                <el-form-item label="文章标签" prop="title">
                    <el-input v-model="form.tags" placeholder="请输入文章标签（多个以英文逗号隔开）"></el-input>
                </el-form-item>
                <el-form-item label="加入回收站" prop="status">
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
export default {
    data() {
        return {
            form: {
                cid: '',
                name: '',
                image: '',
                status: false,
                content: '',
                tags: '',
                delete: false,
                status: false
            },
            rules: {},
            markdownResult: '',
        }
    },
    computed: {
        markdownResult: function() {
            return marked(this.form.content, {
                sanitize: true
            })
        }
    },
    mounted() {
        this.$nextTick(this.forResult);        
    },
    methods: {
        submit() {
            console.log(this.markdownResult);
        },
        goback() {
            this.$router.go(-1);
        },
        reset() {},
        forResult(){
            let textarea = document.querySelector('.el-textarea__inner');
            let result = document.querySelector('.article-result');
            result.style.height = textarea.style.height;
        },
        update() {
            this.forResult();
            _.debounce((e) => {
                this.form.content = e.target.value;
            }, 300);
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
