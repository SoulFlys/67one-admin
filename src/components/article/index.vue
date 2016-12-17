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
            <el-table-column prop="sort" label="排序" sortable width="80"></el-table-column>
            <el-table-column prop="_id" label="_ID" width="190"></el-table-column>
            <el-table-column prop="name" label="栏目" width="100"></el-table-column>
            <el-table-column prop="image" label="主图" width="100"></el-table-column>
            <el-table-column prop="title" label="标题" min-width="200"></el-table-column>
            <el-table-column prop="tags" label="标签" min-width="120"></el-table-column>
            <el-table-column prop="alone" label="单页" width="80"></el-table-column>
            <el-table-column prop="delete" label="回收站" width="80"></el-table-column>
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
export default {
    name: 'article',
    data() {
        return {
            list: []
        }
    },
    methods: {
        add() {
            this.$router.push('/article/add');
        },
    }
}
</script>
