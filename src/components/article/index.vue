<template lang="html">
    <div class="article">
        <el-breadcrumb separator="/" class="breadcrumb">
            <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
            <el-breadcrumb-item>文章列表</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="operation">
          <div class="operation-condition"></div>
          <div class="operation-btns">
              <el-button type="success" size="small" icon="plus" @click="add">添加</el-button>
              <el-button type="info" size="small" icon="upload" @click="">刷新</el-button>
          </div>
        </div>
        <el-table :data="list" border style="width: 100%">
            <el-table-column inline-template label="更新日期" width="150">
                <span>{{row.meta.updateAt | formatDate}}</span>
            </el-table-column>
            <!-- <el-table-column prop="_id" label="_ID" width="190"></el-table-column> -->
            <el-table-column prop="name" label="栏目" width="100"></el-table-column>
            <el-table-column inline-template label="主图" width="100">
                <div class="">
                    <img :src="row.image" alt="" width="100%">
                </div>
            </el-table-column>
            <el-table-column prop="title" label="标题" min-width="200"></el-table-column>
            <el-table-column inline-template label="标签" min-width="100">
                <el-tag type="primary" v-for="tag in row.tags" style="margin-right:10px">{{tag}}</el-tag>
            </el-table-column>
            <el-table-column inline-template  label="是否单页" width="90">
                <div>
                    <el-tag type="success" v-if="row.alone">是</el-tag>
                    <el-tag type="danger" v-else>否</el-tag>
                </div>
            </el-table-column>
            <el-table-column inline-template label="在回收站" width="100">
                <div>
                    <el-tag type="danger" v-if="row.delete">在</el-tag>
                    <el-tag type="success" v-else>不在</el-tag>
                </div>
            </el-table-column>
            <el-table-column inline-template label="状态" width="80">
                <div>
                    <el-tag type="success" v-if="row.status">启用</el-tag>
                    <el-tag type="danger" v-else>禁用</el-tag>
                </div>
            </el-table-column>
            <el-table-column inline-template label="创建时间" width="150">
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
import {fetchApi as api} from '../../api'
import _ from 'lodash'
export default {
    name: 'article',
    data() {
        return {
            list: []
        }
    },
    mounted() {
        this.getList();
    },
    methods: {
        add() {
            this.$router.push('/article/add');
        },
        async getList() {
            let result = await api({url:'/admin/article', method:'POST'});
            _.filter(result,(item)=> item.name = item.cid.name);
            console.log(result)
            this.list = result;
        },
    }
}
</script>
