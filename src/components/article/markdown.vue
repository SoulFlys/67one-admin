<template>
    <div class="editor">
        <el-menu class="editor-menu" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1">加粗</el-menu-item>
            <el-menu-item index="2">斜体</el-menu-item>
            <el-menu-item index="3">引用</el-menu-item>
            <el-menu-item index="4">代码</el-menu-item>
            <el-menu-item index="5">分隔符</el-menu-item>
            <el-menu-item index="8">链接</el-menu-item>
            <el-menu-item index="9">图片</el-menu-item>
            <el-submenu index="6">
                <template slot="title">插入图片</template>
                    <el-menu-item index="6-1"><i class="el-icon-upload2"></i>上传图片</el-menu-item>
                    <el-menu-item index="6-2"><i class="el-icon-upload"></i>网络图片</el-menu-item>
                </el-submenu>
                <el-submenu index="7">
                    <template slot="title">{{labels[mode]}}</template>
                    <el-menu-item index="7-1">{{labels['edit']}}</el-menu-item>
                    <el-menu-item index="7-2">{{labels['split']}}</el-menu-item>
                    <el-menu-item index="7-3">{{labels['preview']}}</el-menu-item>
                    <el-menu-item index="7-4">{{labels['full']}}</el-menu-item>
                </el-submenu>
            </el-menu>
        </el-menu>
        <div class="editor-con" :class="mode">
            <textarea class="editor-textarea" ref="markdown" :value="value" @input="handleInput"></textarea>
            <div id="markdown" class="markdown" v-html="compiledMarkdown"></div>
        </div>
        <el-dialog class="editor-dialog" title="图片上传" v-model="isUploadShow">
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
        </el-dialog>
    </div>
</template>

<script>
import _ from 'lodash'
import marked from 'marked'
import { fetchApi as api,region } from '../../api'
export default {
    name: 'markdown',
    props: ['value'],
    data() {
        return {
            labels: {
                'edit': '编辑模式',
                'split': '分屏模式',
                'preview': '预览模式',
                'full': '全屏模式'
            },
            mode: 'split',
            isUploadShow: false,
            action: region + '/admin/file/add'
        }
    },
    computed: {
        compiledMarkdown() {
            return marked(this.value);
        }
    },
    methods: {
        handleSelect(key, keyPath) {
            if (keyPath.length === 1) {
                switch (key) {
                    case '1':
                        this._boldText()
                        break
                    case '2':
                        this._italicText()
                        break
                    case '3':
                        this._blockquoteText()
                        break
                    case '4':
                        this._codeText()
                        break
                    case '5':
                        this._insertSeparator()
                        break
                    case '8':
                        this._insertHref()
                        break
                    case '9':
                        this._insertImage()
                        break
                }
            } else if (keyPath.length === 2) {
                switch (key) {
                    case '6-1':
                        this._uploadImage()
                        break
                    case '6-2':
                        this._importImage()
                        break
                    case '7-1':
                        this.mode = 'edit'
                        break
                    case '7-2':
                        this.mode = 'split'
                        break
                    case '7-3':
                        this.mode = 'preview'
                        break
                    case '7-4':
                        this.mode = 'edit'
                        break
                }
            }
        },
        handleInput: _.debounce(function(e) {
            let value = e.target.value
            this.$emit('input', value)
        }, 300),
        handleRemove(file, fileList) {
            api({url: '/admin/file/delete',data: {id: file.id},method: 'POST'});
        },
        success(response, file, fileList) {
            file.id = response.id;
            file.newName = response.name;
            file.newUrl = response.url;
            let text = `![${file.newName}](${file.newUrl})`;
            this.$confirm(text, '上传成功，是否插入图片链接?', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                closeOnClickModal: false
            }).then(() => {
                this.isUploadShow = false
                this._preInputText(text, 12, 12)
                this.$message({
                    type: 'success',
                    message: '已插入图片链接'
                })
            }).catch(() => {
                this.isUploadShow = false
                this.$message({
                    type: 'info',
                    message: '已取消插入图片链接'
                })
            })
        },
        _preInputText(text, preStart, preEnd) {
            let textControl = this.$refs.markdown
            const start = textControl.selectionStart
            const end = textControl.selectionEnd
            const origin = this.value
            if (start !== end) {
                const exist = origin.slice(start, end)  //当前选中的值
                text = text.slice(0, preStart) + exist + text.slice(preEnd)
                preEnd = preStart + exist.length
            }
            let input = origin.slice(0, start) + text + origin.slice(end)
            this.$emit('input', input)
        },

        _uploadImage() {
            this.isUploadShow = true
        },
        _importImage() {
            this.$prompt('请输入图片的链接', '导入图片链接', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(({
                value
            }) => {
                this._preInputText(`![](${value})`, 12, 12)
                this.$message({
                    type: 'success',
                    message: '已插入图片链接'
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消插入图片链接'
                })
            })
        },
        _boldText() {
            this._preInputText('**加粗文字**', 2, 6)
        },
        _italicText() {
            this._preInputText('_斜体文字_', 1, 5)
        },
        _blockquoteText() {
            this._preInputText('> 引用', 2, 5)
        },
        _codeText() {
            this._preInputText('\n```\ncode block\n```', 5, 15)
        },
        _insertSeparator() {
            this._preInputText('\n\n------------\n', 12, 12)
        },
        _insertHref() {
            this._preInputText('[67one](http://www.67one.com)', 0, 0)
        },
        _insertImage() {
            this._preInputText('![](http://www.67one.com/67one/Uploads/day/2014-08-29/54001159af79e.jpg)', 0, 0)
        }
    }
}
</script>

<style lang="scss">
@import '../../assets/scss/functions.scss';
@import "../../assets/css/github-markdown.css";
.editor{
    border: 1px solid #ccc;
    border-radius: 3px;
    font-size: 14px;
    overflow: hidden;
    .editor-menu{
        border-bottom: 1px solid #cccccc;
        .el-menu-item,.el-submenu .el-submenu__title{
            @include linHeight(50px);
        }
        .el-submenu .el-menu{
            top:50px;
        }
    }
    .editor-con{
        width: 100%;
        height: auto;
        background-color: #fff;
        transition: width 0.3s;
        @include position(relative);
        .editor-textarea {
            @include boxSizing;
            @include db;
            border-style: none;
            resize: none;
            outline: 0;
            height: 100%;
            min-height: 500px;
            width: 100%;
            padding: 15px 15px 0;
        }
        .markdown{
            box-sizing: border-box;
            position: absolute;
            word-wrap: break-word;
            word-break: normal;
            width: 50%;
            height: 100%;
            left: 100%;
            top: 0;
            background-color: #FFFFFF;
            border-left: 1px solid #ccc;
            overflow: auto;
            transition: left 0.3s, width 0.3s;
            padding: 15px 15px 0;
        }
        &.edit {
            .editor-textarea {width: 100%;}
        }
        &.split {
            .editor-textarea {width: 50%;}
            .markdown {width: 50%; left: 50%;}
        }
        &.preview {
            .editor-textarea {width: 50%;}
            .md-preview {
                left: 0;
                width: 100%;
                border-left-style: none;
            }
        }
    }
    .editor-dialog{
        text-align: center;
        .el-dialog{
            width: 31%;
            .el-upload{
                margin: 0 auto;
            }
        }
    }
}
// .md-panel #markdown{
//     color: #2f2f2f;
//     font-size: 16px;
//     font-weight: normal;
//     line-height: 1.7;
//
//     h1,h2,h3,h4,h5,h6{
//         margin: 0;
//         color: inherit;
//         line-height: 1.8;
//         text-rendering: optimizelegibility;
//         font-family: inherit;
//         font-weight: bold;
//     }
//     h1{font-size:26px;}
//     h2{font-size:24px;}
//     h3{font-size:22px;}
//     h4{font-size:20px;}
//     h5{font-size:18px;}
//     h6{font-size:16px;}
//     p{
//         text-align: justify;
//         text-justify: inter-ideograph;
//         word-break: initial;
//         word-break: break-word;
//         margin: 0 0 10px 0;
//     }
//     blockquote{
//         padding: 10px 15px;
//         margin-bottom: 20px;
//         background-color: whitesmoke;
//         border-left: 4px solid #999999;
//         word-break: break-word;
//         font-size: 15px;
//         font-weight: normal;
//         line-height: 30px;
//         margin: 0 0 20px;
//         p{
//             font-size: 15px;
//             font-weight: normal;
//             line-height: 1.7;
//         }
//     }
//     ul{
//         li{
//             padding-left: 30px;
//             line-height: 30px;
//         }
//     }
//     code, pre {
//         padding: 0 3px 2px;
//         font-family: Menlo, Monaco, Consolas, "Courier New", monospace;
//         font-size: 12px;
//         color: #3f3f3f;
//         -webkit-border-radius: 3px;
//         -moz-border-radius: 3px;
//         border-radius: 3px
//     }
//     code {
//         padding: 2px 4px;
//         color: #d14;
//         background-color: #f7f7f9;
//     }
//     pre {
//         display: block;
//         padding: 9.5px;
//         margin: 0 0 10px;
//         font-size: 13px;
//         line-height: 20px;
//         word-break: break-all;
//         word-wrap: break-word;
//         white-space: pre;
//         white-space: pre-wrap;
//         background-color: #f5f5f5;
//         border: 1px solid #ccc;
//         border: 1px solid rgba(0, 0, 0, 0.15);
//         -webkit-border-radius: 4px;
//         -moz-border-radius: 4px;
//         border-radius: 4px
//     }
// }
</style>
