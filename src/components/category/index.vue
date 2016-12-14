<template lang="html">
    <div class="category">
        <router-link to='/category/add'>测试</router-link>
        <el-breadcrumb separator="/" class="breadcrumb">
            <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
            <el-breadcrumb-item>栏目管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="operation">
          <div class="operation-condition"></div>
          <div class="operation-btns">
              <el-button type="success" size="small" icon="plus" @click.native="add">添加</el-button>
              <el-button type="info" size="small" icon="upload" @click.native="refresh">刷新</el-button>
          </div>
        </div>
        <el-table :data="list" border style="width: 100%">
            <el-table-column prop="updateAt" label="更新日期"></el-table-column>
            <el-table-column prop="_id"  label="栏目_ID"></el-table-column>
            <el-table-column prop="pid"  label="父级PID"></el-table-column>
            <el-table-column prop="name"  label="栏目名称"></el-table-column>
            <el-table-column prop="level"  label="栏目等级"></el-table-column>
            <el-table-column prop="type"  label="栏目类型"></el-table-column>
            <el-table-column prop="router"  label="栏目路由"></el-table-column>
            <el-table-column prop="sort"  label="栏目排序"></el-table-column>
            <el-table-column prop="status"  label="是否启用"></el-table-column>
            <el-table-column prop="createAt"  label="创建时间"></el-table-column>
            <el-table-column label="操作" inline-template align="center">
                <div>
                    <el-button type="warning" size="small" icon="edit" @click.native=""></el-button>
                    <el-button type="danger" size="small" icon="delete" @click.native=""></el-button>
                </div>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    name: 'category',
    data() {
        return {
            list: [{
                updateAt: '2016-12-14'
            }]
        }
    },
    methods: {
        add() {
            console.log(this.$router);
            this.$router.push({name:'categoryAdd'});
        }
    }
}
</script>

<style lang="scss">@import "../../assets/scss/functions";
.breadcrumb {
    font-size: 14px;
}
.operation {
    margin: 10px 0;
    @include df;
    justify-content: space-between;
}
</style>
