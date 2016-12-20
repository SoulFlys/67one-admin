<template lang="html">
    <div class="file">
        <el-upload action="http://localhost:3000/67api/admin/file/add" type="drag"
            :multiple="false"
            :show-upload-list="false"
            :thumbnail-mode="true"
            :on-remove="handleRemove"
            :on-success="success">
            <i class="el-icon-upload"></i>
            <div class="el-dragger__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
    </div>
</template>

<script>
import api from '../../api'
export default {
    data() {
        return {
            fileList: []
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
