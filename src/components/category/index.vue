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
            <el-table-column prop="meta.updateAt" label="更新日期" width="180"></el-table-column>
            <el-table-column prop="_id"  label="栏目_ID" width="210"></el-table-column>
            <el-table-column prop="pid"  label="父级PID" width="210"></el-table-column>
            <el-table-column prop="name"  label="栏目名称" width="100"></el-table-column>
            <el-table-column prop="level"  label="栏目等级" width="100"></el-table-column>
            <el-table-column prop="type"  label="栏目类型" width="100"></el-table-column>
            <el-table-column prop="router"  label="栏目路由" width="100"></el-table-column>
            <el-table-column prop="sort"  label="栏目排序" width="100"></el-table-column>
            <el-table-column prop="status"  label="是否启用" width="100"></el-table-column>
            <el-table-column prop="meta.createAt"  label="创建时间" width="180"></el-table-column>
            <el-table-column label="操作" inline-template align="center">
                <div>
                    <el-button type="warning" size="small" icon="edit" @click=""></el-button>
                    <el-button type="danger" size="small" icon="delete" @click=""></el-button>
                </div>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import api from '../../api'
export default {
    name: 'category',
    data() {
        return {
            list: []
        }
    },
    mounted() {
        this.getList();
    },
    methods: {
        async getList() {
            let result = await api({url:'/admin/category', method:'post'});
            console.log(result)
            this.list = result;
        },
        add() {
            this.$router.push('/category/add');
        },
        refresh() {

        }
    }
}
</script>

<style lang="scss">@import "../../assets/scss/functions";
.el-table__body-wrapper{
    font-size: 12px;
}
.cell {
    padding-left:12px;
    padding-right:12px;
}
</style>
