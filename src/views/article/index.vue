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
              <el-button type="info" size="small" icon="upload" @click="refresh">刷新</el-button>
          </div>
        </div>
        <el-table :data="list" border style="width: 100%">
            <el-table-column inline-template label="更新日期" width="150">
                <span>{{row.updateAt | formatDate}}</span>
            </el-table-column>
            <el-table-column prop="_id" label="_ID" width="200"></el-table-column>
            <el-table-column prop="name" label="栏目" width="120" :filters="catFilters" :filter-method="catFiltersMethod"></el-table-column>
            <el-table-column inline-template label="标题" min-width="200">
                <el-tooltip placement="top">
                    <div slot="content" class="article-title-img" v-if="row.image">
                        <img :src="rootUrl + row.image" alt="" width="100%">
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
            <!-- <el-table-column inline-template prop="delete" label="在回收站" width="120" :filters="delFilters" :filter-method="delFiltersMethod">
                <div>
                    <el-tag type="danger" v-if="row.delete">在</el-tag>
                    <el-tag type="success" v-else>不在</el-tag>
                </div>
            </el-table-column> -->
            <el-table-column inline-template prop="status" label="状态" width="100" :filters="staFilters" :filter-method="staFiltersMethod">
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
import {fetchApi as api,rootUrl} from '../../api'
import _ from 'lodash'
export default {
    name: 'article',
    data() {
        return {
            list: [],
            delFilters: [],
            catFilters: [],
            staFilters: [],
            rootUrl:rootUrl
        }
    },
    mounted() {
        this.getList();
    },
    methods: {
        add() {
            this.$router.push('/article/add');
        },
        refresh() {
            this.getList();
        },
        async getList() {
            // let result1 = await api({url:'/blog/article', method:'POST',data:{currentPage:1,pageSize:5,cid:'58a16a1fa8a29222188375b8'}});
            // console.log(_.clone(result1))


            let result = await api({url:'/admin/article', method:'POST'});
            result = _.filter(result,(item)=> !item.delete);
            // console.log(_.clone(result))
            _.filter(result,(item)=> item.name = item.cid.name);
            _.each(result,(item) => {
                // this.addFilter(this.delFilters,item,'delete','在','不在');
                this.addFilter(this.catFilters,item,'name');
                this.addFilter(this.staFilters,item,'status','启用','禁用');
            });
            this.list = result;
        },
        addFilter(arr,obj,str,right,error){
            if(!(_.find(arr,(key)=> key.value === obj[str]))){
                arr.push({
                    text:right ? (obj[str] ? right: error) : obj[str],
                    value:obj[str]
                });
            }
        },
        async remove(row) {
            let result = await api({url:'/admin/article/nodelete',data:{id:row._id,del:true},method:'PUT'});
            if(result.status === 'ok'){
                this.$message({showClose: true,message: '加入回收站成功',type: 'success'});
                this.getList();
            }else{
                this.$message({showClose: true,message: '加入回收站失败',type: 'error'});
            }
        },
        // delFiltersMethod(value, row) {
        //     return row.delete === value;
        // },
        catFiltersMethod(value, row) {
            return row.name === value;
        },
        staFiltersMethod(value, row) {
            return row.status === value;
        },
        edit(row){
            this.$router.push({path:'/article/edit', query: { id: row._id }});
        }
    }
}
</script>

<style lang="scss">
    .article-title-img{
        max-width: 100px;
    }
</style>
