<template lang="html">
<div class="admin">
    <el-breadcrumb separator="/" class="breadcrumb">
        <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
        <el-breadcrumb-item>管理员列表</el-breadcrumb-item>
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
        <el-table-column prop="_id" label="_ID" width="210"></el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="nickname" label="昵称"></el-table-column>
        <el-table-column prop="realname" label="真实姓名"></el-table-column>
        <el-table-column prop="createip" label="创建IP"></el-table-column>
        <el-table-column prop="lastloginip" label="最后一次登录的ip"></el-table-column>
        <el-table-column prop="lastlogintime" label="最后登录时间"></el-table-column>
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
                <el-button type="danger" size="small" icon="delete" v-if="row.username !== 'xiaofang'" @click="remove(row)"></el-button>
            </div>
        </el-table-column>
    </el-table>
</div>
</template>

<script>
import {fetchApi as api, rootUrl} from '../../api'
import _ from 'lodash'
export default {
    data(){
        return {
            list: [],
        }
    },
    mounted() {
        this.getList();
    },
    methods: {
        add() {
            this.$router.push('/admin/add');
        },
        refresh() {
            this.getList();
        },
        async getList(){
            let result = await api({url:'/admin/admin', method:'POST'});
            if(result.status){
                this.list = result.result;
            }else{
                this.$message({showClose: true,message: '获取失败',type: 'error'});
            }
        },
        addFilter(arr,obj,str,right,error){
            if(!(_.find(arr,(key)=> key.value === obj[str]))){
                arr.push({
                    text:right ? (obj[str] ? right: error) : obj[str],
                    value:obj[str]
                });
            }
        },
        edit(row) {
            this.$router.push({path:'/admin/edit', query: { id: row._id }});
        },
        remove(row){
            this.$confirm(`是否删除【${row.username}】？`, '提示', {
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
            let result = await api({url:'/admin/admin/delete',data:{id:row._id},method:'DELETE'});
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

<style lang="css">
</style>
