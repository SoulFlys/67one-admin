<template lang="html">
    <div class="file">
        <el-breadcrumb separator="/" class="breadcrumb">
            <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
            <el-breadcrumb-item to="/file">文件管理</el-breadcrumb-item>
            <el-breadcrumb-item>添加文件</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="operation"></div>
        <el-row>
            <el-upload :action="action" type="drag"
                :multiple="false"
                :show-upload-list="false"
                :thumbnail-mode="true"
                :on-remove="handleRemove"
                :on-success="success">
                <i class="el-icon-upload"></i>
                <div class="el-dragger__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
        </el-row>
    </div>
</template>

<script>
import { fetchApi as api, region} from '../../api'
export default {
    data() {
        return {
            fileList: [],
            action: region + '/admin/file/add'
        };
    },
    methods: {
        handleRemove(file, fileList) {
            api({url:'/admin/file/delete',data:{id:file.id},method:'POST'});
        },
        success(response, file, fileList){
            file.id = response.id;
            file.newName = response.name;
            file.newUrl = response.url;
        }
    }
}
</script>
