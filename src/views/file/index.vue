<template lang="html">
    <div class="file">
        <el-breadcrumb separator="/" class="breadcrumb">
            <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
            <el-breadcrumb-item>文件管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="operation">
            <div class="operation-condition"></div>
            <div class="operation-btns">
                <el-button type="success" size="small" icon="plus" @click="add">添加</el-button>
                <el-button type="info" size="small" icon="upload" @click="refresh">刷新</el-button>
            </div>
        </div>
        <div class="file-list">
            <div class="file-list-item" v-for="list in lists">
                <img :src="list.url" alt="">
                <div class="file-list-box">
                    <div>
                        <span><i class="el-icon-view"></i></span>
                        <span @click.stop.prevent="remove(list._id)"><i class="el-icon-delete"></i></span>
                    </div>
                </div>
                <h4 class="file-list-h4">{{list.name}}</h4>
            </div>
            <div class="file-list-no" v-if="lists.length <= 0">
                暂时没有任何文件资源
            </div>
        </div>
    </div>
</template>

<script>
import {fetchApi as api} from '../../api'
import _ from 'lodash'
export default {
    data() {
        return {
            lists: []
        };
    },
    mounted(){
        this.getList();
    },
    methods: {
        async getList() {
            let result = await api({url:'/admin/file', method:'POST'});
            this.lists = result;
        },
        refresh(){
            this.getList();
        },
        add() {
            this.$router.push('/file/add');
        },
        async remove(id) {
            let result = await api({url:'/admin/file/delete',data:{id:id},method:'POST'});
            if(result.status === 'ok')
                this.lists = _.filter(this.lists,(list) => list._id !== id);
        }
    }
}
</script>

<style lang="scss">
@import "../../assets/scss/functions";
.file-list{
    @include bower(column-width,250px);
    @include bower(column-gap,10px);
    .file-list-item{
        width: 250px;
        margin:10px 0;
        cursor: pointer;
        position: relative;
        img{
            width: 100%;
            border:1px solid #ccc;
            padding:6px;
            @include borderRadius(4px);
            @include boxShadow(0 2px 2px #ccc);
            @include boxSizing;
        }
        .file-list-box{
            @include position(absolute,$top:0,$left:0,$zIndex:1);
            width:100%;
            height:100%;
            background-color: rgba(0,0,0,.72);
            text-align: center;
            border:1px solid #ccc;
            @include boxSizing;
            @include borderRadius(4px);
            overflow: hidden;
            >div{
                width:100%;
                @include position(absolute,$top:25%);
                color: #fff;
                font-size: 24px;
                >span{
                    padding:0 15px;
                    @include dib;
                }
            }
            @include opacity(0);
        }
        .file-list-h4{
            @include linHeight(40px);
            background-color: #fff;
            @include position(absolute,$bottom:1px,$left:1px,$right:1px,$zIndex:1);
            @include borderRadius(0 0 4px 4px);
            overflow: hidden;
            padding-left: 4px;
            @include opacity(0);
        }
        &:hover{
            .file-list-box{
                @include opacity(1);
                @include transition(opacity  0.5s);
            }
            .file-list-h4{
                @include opacity(1);
                @include transition(opacity  0.5s);
            }
        }
    }
}
</style>
