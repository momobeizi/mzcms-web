<template>
  <div class="update-article">
    <el-form
      ref="articleForm"
      :model="articleSubmit"
      :rules="articleRules"
      label-width="80px"
      status-icon
    >
      <el-form-item class="article-item" label="标题" prop="title">
        <el-input v-model="articleSubmit.title" />
      </el-form-item>
      <el-form-item class="article-item" label="状态" prop="status">
        <el-radio-group v-model="articleSubmit.status"
          >0:草稿，1:已发布,2:撤回
          <el-radio-button :label="0">草稿</el-radio-button>
          <el-radio-button :label="1">已发布</el-radio-button>
          <el-radio-button :label="2">撤回</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item class="article-item" label="封面" prop="imgUrl">
        <el-upload
          class="avatar-uploader"
          action="#"
          :show-file-list="false"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="articleSubmit.imgUrl" :src="articleSubmit.imgUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item class="article-item" label="内容摘要" prop="abstract">
        <el-input v-model="articleSubmit.abstract" />
      </el-form-item>
      <el-form-item class="article-item" label="备注" prop="comments">
        <el-input v-model="articleSubmit.comments" />
      </el-form-item>
      <el-form-item class="article-item" label="url" prop="url">
        <el-input v-model="articleSubmit.url" />
      </el-form-item>
      <el-form-item label="内容描述" prop="content">
        <el-tabs type="border-card" class="article-tabs">
          <el-tab-pane label="MarkDown">
              <MdEditor v-model="articleSubmit.content" previewTheme="github"/>
          </el-tab-pane>
          <el-tab-pane label="Html">敬请期待</el-tab-pane>
        </el-tabs>
      </el-form-item>
      <el-form-item>
        <el-button @click="save" type="primary">提交保存</el-button>
        <el-button @click="$router.go(-1)">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { article } from '@/types/article'
import type { FormInstance, FormRules, Action } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import { addArticle, editArticle } from '@/api/article'
import { uploadFile } from '@/api/common'
import { useRouter } from 'vue-router'

const router = useRouter()
const state = reactive({
  list: []
})

let articleSubmit = ref<article>({
  title: '',
  imgUrl: '',
  keywords: '',
  url: '',
  status: 0,
  content: '1',
  comments: '',
  createdAt: '',
  updatedAt: ''
})
const articleForm = ref<FormInstance>()
const articleRules = reactive<FormRules>({
  title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
  imgUrl: [{ required: true, message: '请上传图片', trigger: 'change' }],
  keywords: [{ required: true, message: '请输入关键字', trigger: 'blur' }],
  abstract: [{ required: true, message: '请输入内容摘要', trigger: 'blur' }],
  url: [{ required: true, message: '请输入url', trigger: 'blur' }],
  comments: [{ required: true, message: '请输入备注', trigger: 'blur' }],
  content: [{ required: true, message: '请输入文章内容', trigger: 'blur' }]
})

// 上传图片
const beforeAvatarUpload = (file: File) => {
  const isJPG = file.type === 'image/jpeg'
  const isPNG = file.type === 'image/png'
  const isLt2M = file.size / 1024 / 1024 < 2

  if (!isJPG && !isPNG) {
    ElMessage.error('封面图片只能是 JPG/PNG 格式!')
  }
  if (!isLt2M) {
    ElMessage.error('封面图片大小不能超过 2MB!')
  }
  console.log(file)
  let fileSubmit = new FormData()
  fileSubmit.append('file', file)
  uploadFile(fileSubmit)
    .then((res) => {
      console.log(res)
      articleSubmit.value.imgUrl = res.data
    })
    .catch((err) => {
      console.log(err)
    })
}

//保存
const save = () => {
  articleForm.value?.validate(async (valid) => {
    if (valid) {
      let articleAjax = articleSubmit.value.id ? editArticle : addArticle
      articleAjax(articleSubmit.value)
        .then(() => {
          ElMessage.success('保存成功')
          router.go(-1)
        })
        .catch((err) => {
          ElMessage.error(err.msg || '保存失败')
        })
    } else {
      ElMessage.error('请检查输入内容')
      return false
    }
  })
}
</script>

<style lang="scss" scoped>
.update-article {
  .article-item {
    width: 380px;
  }
  .article-tabs {
    width: 100%;
  }
  .avatar-uploader {
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
  }
}
</style>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
