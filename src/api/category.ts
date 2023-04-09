import service from "@/utils/service"

// 获取所有类别
export function getCategoryList() {
  return service({
    url: '/contentCategory/findAll',
    method: 'post'
  })
}

// 新增类别
export function addCategory() {
  return service({
    url: '/contentCategory/add',
    method: 'post'
  })
}

// 修改类别
export function editCategory() {
  return service({
    url: '/contentCategory/edit',
    method: 'post'
  })
}

// 删除类别
export function deleteCategory() {
  return service({
    url: '/contentCategory/delete',
    method: 'post'
  })
}

// 获取类别详情
export function findOneCategory() {
  return service({
    url: '/contentCategory/findOne',
    method: 'post'
  })
}
