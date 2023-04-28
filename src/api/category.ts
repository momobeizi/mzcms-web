import service from "@/utils/service"
import type { category, categoryId } from '@/types/category'

// 获取所有类别
export function getCategoryList() {
  return service({
    url: '/contentCategory/findAll',
    method: 'post'
  })
}

// 新增类别
export function addCategory(data: category) {
  return service({
    url: '/contentCategory/add',
    method: 'post',
    data
  })
}

// 修改类别
export function editCategory(data: category) {
  return service({
    url: '/contentCategory/edit',
    method: 'post',
    data
  })
}

// 删除类别
export function deleteCategory(data: categoryId) {
  return service({
    url: '/contentCategory/delete',
    method: 'post',
    data
  })
}

// 获取类别详情
export function findOneCategory(data: categoryId) {
  return service({
    url: '/contentCategory/findOne',
    method: 'post',
    data
  })
}
