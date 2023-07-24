<template>
  <div class="category-container">
    <search>
      <template v-slot:searchBtns>
        <el-button type="primary" @click="state.editVisible = true">新增</el-button>
      </template>
    </search>
    <el-table :data="state.list" border stripe style="width: 100%">
      <el-table-column prop="name" label="类别名称" />
      <el-table-column prop="keywords" label="关键字" />
      <el-table-column prop="url" label="url" />
      <el-table-column prop="enable" label="是否启用" />
      <el-table-column prop="comments" label="描述" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="primary" @click="categoryEdit(scope)">修改</el-button>
          <el-button type="primary" @click="categoryDelete(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="state.editVisible" title="新增类别" width="50%">
      <div class="edit-content">
        <el-form ref="editCategory" :model="state.editSubmit" label-width="80px" status-icon>
          <el-form-item class="category-item" label="类别" prop="name">
            <el-input v-model="state.editSubmit.name" />
          </el-form-item>
          <el-form-item class="category-item" label="父级" prop="parentId">
            <el-select v-model="state.editSubmit.parentId" placeholder="请选择父级" size="large">
              <el-option label="顶级" value="0"></el-option>
              <el-option
                v-for="item in state.list"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item class="category-item" label="关键字" prop="keywords">
            <el-input v-model="state.editSubmit.keywords" />
          </el-form-item>
          <el-form-item class="category-item" label="是否启用" prop="enable">
            <el-radio-group v-model="state.editSubmit.enable">
              <el-radio :label="0" size="large">停用</el-radio>
              <el-radio :label="1" size="large">启用</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item class="category-item" label="备注" prop="comments">
            <el-input v-model="state.editSubmit.comments" />
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="state.editVisible = false">取消</el-button>
          <el-button type="primary" @click="save" :loading="editSubmitLoading">保存</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { getCategoryList, addCategory } from '@/api/category'

const state = reactive({
  list: [],
  editVisible: false,
  editSubmit: {
    parentId: '0',
    name: '',
    keywords: '',
    url: '',
    enable: 0,
    comments: ''
  }
})

let editSubmitLoading = ref(false)

// 获取类别列表
const getList = () => {
  getCategoryList().then((res) => {
    state.list = res.data
  })
}
getList()

// 新增类别

const save = () => {
  editSubmitLoading.value = true
  addCategory(state.editSubmit)
    .finally(() => {
      editSubmitLoading.value = false
      state.editVisible = false
      getList()
    })
}
</script>
<style lang="scss" scoped>
.category-container {
  .category-item {
    width: 300px;
  }
}
</style>
