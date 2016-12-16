<template lang="html">
    <div class="category">
        <el-breadcrumb separator="/" class="breadcrumb">
            <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
            <el-breadcrumb-item>栏目管理</el-breadcrumb-item>
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
                <span>{{row.meta.updateAt | formatDate}}</span>
            </el-table-column>
            <el-table-column prop="sort" label="排序" sortable width="100"></el-table-column>
            <el-table-column prop="_id" label="_ID" width="210"></el-table-column>
            <el-table-column prop="pid" label="PID" width="210"></el-table-column>
            <el-table-column inline-template label="名称" min-width="120">
                <span class="category-name">{{row.name}}</span>
            </el-table-column>
            <el-table-column prop="level" label="等级" width="90"></el-table-column>
            <el-table-column prop="type" label="类型" width="90"></el-table-column>
            <el-table-column prop="router" label="路由" width="100"></el-table-column>
            <el-table-column inline-template label="状态" width="80">
                <div>
                    <el-tag type="success" v-if="row.status">启用</el-tag>
                    <el-tag type="danger" v-else>禁用</el-tag>
                </div>
            </el-table-column>
            <el-table-column inline-template label="创建时间" width="180">
                <span>{{row.meta.createAt | formatDate}}</span>
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
import api from '../../api'
import _ from 'lodash'
export default {
    name: 'category',
    data() {
        return {
            list: []
        }
    },
    computed: {},
    mounted() {
        this.getList();
    },
    methods: {
        async getList() {
            let result = await api({url:'/admin/category', method:'POST'});
            _.filter(result,(item)=>{
                item.level = item.level === 1 ? '一级栏目' : '二级栏目';
                item.type = item.type === 1 ? '分类栏目' : '单独页面';
            })
            this.list = result;
        },
        add() {
            this.$router.push('/category/add');
        },
        refresh() {
            this.getList();
        },
        async remove(row){
            let result = await api({url:'/admin/category/delete',data:{id:row._id},method:'DELETE'});
            if(result.status === 'ok'){
                this.$message({showClose: true,message: '删除成功',type: 'success'});
                this.getList();
            }else{
                this.$message({showClose: true,message: '删除失败',type: 'error'});
            }
        },
        edit(row){
            this.$router.push({path:'/category/edit', query: { id: row._id }});
        }
    }
}
</script>

<style lang="scss">@import "../../assets/scss/functions";
.category-name{
    background-color: #8492a6;
    display: inline-block;
    padding: 0 5px;
    line-height: 22px;
    color: #fff;
    border-radius: 4px;
    box-sizing: border-box;
    border: 1px solid transparent;
}
</style>
