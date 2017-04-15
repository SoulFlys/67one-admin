<template lang="html">
<div class="focus">
    <el-breadcrumb separator="/" class="breadcrumb">
        <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
        <el-breadcrumb-item>聚焦管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="operation">
        <div class="operation-condition"></div>
        <div class="operation-btns">
            <el-button type="success" size="small" icon="plus" @click="add">添加</el-button>
            <el-button type="info" size="small" icon="upload" @click="refresh">刷新</el-button>
        </div>
    </div>
    <el-table :data="list" border style="width: 100%">
        <el-table-column inline-template label="更新日期" width="150">
            <span>{{row.updateAt | formatDate}}</span>
        </el-table-column>
        <el-table-column prop="sort" label="排序" sortable width="100"></el-table-column>
        <el-table-column prop="_id" label="_ID" width="210"></el-table-column>
        <el-table-column prop="title" label="标题" min-width="120"></el-table-column>
        <el-table-column inline-template label="聚焦图片" width="100">
             <img :src="rootUrl + row.pic" alt="">
         </el-table-column>
        <el-table-column prop="articleId.title" label="文章" min-width="120"></el-table-column>
        <el-table-column inline-template label="状态" width="80">
            <div>
                <el-tag type="success" v-if="row.status">启用</el-tag>
                <el-tag type="danger" v-else>禁用</el-tag>
            </div>
        </el-table-column>
        <el-table-column inline-template label="创建时间" width="150">
            <span>{{row.createAt | formatDate}}</span>
        </el-table-column>
        <el-table-column label="操作" inline-template align="center">
            <div>
                <el-button type="warning" size="small" icon="edit" @click="edit(row)"></el-button>
                <el-button type="danger" size="small" icon="delete" @click="remove(row)"></el-button>
            </div>
        </el-table-column>
    </el-table>
</div>
</template>

<script>
import {fetchApi as api, rootUrl} from '../../api'
import _ from 'lodash'
export default {
    name: 'focus',
    data() {
        return {
            list: [],
            filters: [],
            rootUrl:rootUrl
        }
    },
    mounted() {
        this.getList();
    },
    methods:{
        add(){
            this.$router.push('/focus/add');
        },
        refresh(){
            this.getList();
        },
        async getList(){
            let result = await api({url:'/admin/focus', method:'POST'});
            this.list = result;
        },
        edit(row) {
            this.$router.push({path:'/focus/edit', query: { id: row._id }});
        },
        remove(row){
            this.$confirm(`是否删除【${row.title}】?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.del(row);
            }).catch(() => {
                this.$message({type: 'info',message: '已取消删除'});
            });
        },
        async del(row){
            let result = await api({url:'/admin/focus/delete',data:{id:row._id},method:'DELETE'});
            if(result.status === 'ok'){
                this.$message({showClose: true,message: '删除成功',type: 'success'});
                this.getList();
            }else{
                this.$message({showClose: true,message: '删除失败',type: 'error'});
            }
        },
    }
}
</script>
