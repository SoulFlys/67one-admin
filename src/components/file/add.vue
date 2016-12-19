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
        <img src="http://localhost:3000/0.1769457545060269" alt="">
    </div>
</template>

<script>
export default {
    data() {
        return {
            fileList: []
        };
    },
    methods: {
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        success(response, file, fileList){
            console.log(response,file,fileList)
        }
    }
}
</script>
