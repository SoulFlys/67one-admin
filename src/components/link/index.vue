<template lang="html">
    <div class="link">
        <el-breadcrumb separator="/" class="breadcrumb">
            <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
            <el-breadcrumb-item>友情链接</el-breadcrumb-item>
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
            <el-table-column prop="type" label="类型" inline-template width="120" :filters="filters" :filter-method="filterTag">
                <el-tag type="primary" close-transition>{{row.type}}</el-tag>
            </el-table-column>
            <el-table-column prop="name" label="名称" min-width="120"></el-table-column>
            <el-table-column inline-template label="地址" min-width="120">
                <a :href="row.href" target="_blank">{{row.href}}</span>
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
import {fetchApi as api, rootUrl} from '../../api'
import _ from 'lodash'
export default {
    name: 'link',
    data() {
        return {
            list: [],
            filters: []
        }
    },
    mounted() {
        this.getList();
    },
    methods: {
        add() {
            this.$router.push('/link/add');
        },
        refresh() {
            this.getList();
        },
        async getList(){
            let result = await api({url:'/admin/link', method:'POST'});
            _.each(result,(item) => {
                this.addFilter(this.filters,item,'type');
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
        edit(row) {
            this.$router.push({path:'/link/edit', query: { id: row._id }});
        },
        remove(row){
            this.$confirm(`是否删除【${row.name}】的友情链接?`, '提示', {
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
            let result = await api({url:'/admin/link/delete',data:{id:row._id},method:'DELETE'});
            if(result.status === 'ok'){
                this.$message({showClose: true,message: '删除成功',type: 'success'});
                this.getList();
            }else{
                this.$message({showClose: true,message: '删除失败',type: 'error'});
            }
        },
        filterTag(value, row){
            return row.type === value;
        }
    }
}
</script>
