<template lang="html">
    <div class="article">
        <el-breadcrumb separator="/" class="breadcrumb">
            <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
            <el-breadcrumb-item>回收站管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="operation">
          <div class="operation-condition"></div>
          <div class="operation-btns">
              <el-button type="info" size="small" icon="upload" @click="refresh">刷新</el-button>
          </div>
        </div>
        <el-table :data="list" border style="width: 100%">
            <el-table-column inline-template label="更新日期" width="150">
                <span>{{row.meta.updateAt | formatDate}}</span>
            </el-table-column>
            <el-table-column prop="_id" label="_ID" width="200"></el-table-column>
            <el-table-column prop="name" label="栏目" width="120"></el-table-column>
            <el-table-column inline-template label="标题" min-width="200">
                <el-tooltip placement="top">
                    <div slot="content" class="article-title-img">
                        <img :src="row.image" alt="" width="100%">
                    </div>
                    <p>{{row.title}}</p>
                </el-tooltip>
            </el-table-column>
            <el-table-column inline-template label="标签" min-width="100">
                <el-tag type="primary" v-for="tag in row.tags" style="margin-right:10px">{{tag}}</el-tag>
            </el-table-column>
            <el-table-column prop="readings" label="阅读数" width="100"></el-table-column>
            <el-table-column inline-template  label="是否单页" width="90">
                <div>
                    <el-tag type="success" v-if="row.alone">是</el-tag>
                    <el-tag type="danger" v-else>否</el-tag>
                </div>
            </el-table-column>
            <el-table-column inline-template prop="status" label="状态" width="100">
                <div>
                    <el-tag type="success" v-if="row.status">启用</el-tag>
                    <el-tag type="danger" v-else>禁用</el-tag>
                </div>
            </el-table-column>
            <el-table-column inline-template label="创建时间" width="150">
                <span>{{row.meta.createAt | formatDate}}</span>
            </el-table-column>
            <el-table-column label="操作" inline-template align="center" min-width="150">
                <div>
                    <el-button type="success" size="small" @click="revoke(row)">撤回删除</el-button>
                    <el-button type="danger" size="small" @click="remove(row)">彻底删除</el-button>
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
            list: [],
        }
    },
    mounted() {
        this.getList();
    },
    methods: {
        refresh() {
            this.getList();
        },
        async getList() {
            let result = await api({url:'/admin/article/trash', method:'POST'});
            _.filter(result,(item)=> item.name = item.cid.name);
            this.list = result;
        },
        async revoke(row){
            let result = await api({url:'/admin/article/nodelete',data:{id:row._id,del:false},method:'PUT'});
            if(result.status === 'ok'){
                this.$message({showClose: true,message: '恢复文章成功',type: 'success'});
                this.getList();
            }else{
                this.$message({showClose: true,message: '恢复文章失败',type: 'error'});
            }
        },
        async remove(row){
            let result = await api({url:'/admin/article/delete',data:{id:row._id},method:'DELETE'});
            if(result.status === 'ok'){
                this.$message({showClose: true,message: '删除成功',type: 'success'});
                this.getList();
            }else{
                this.$message({showClose: true,message: '删除失败',type: 'error'});
            }
        }
    }
}
</script>

<style lang="scss">
    .article-title-img{
        max-width: 100px;
    }
</style>
