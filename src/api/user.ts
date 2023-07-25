import service from "@/utils/service"

// 获取用户列表
export function getUserList(data: any) {
  return service({
    url: '/user/getList',
    method: 'post',
    data
  })
}

// 删除用户
export function deleteUser(data: any) {
  return service({
    url: '/user/deleteUser',
    method: 'post',
    data
  })
}

// 添加用户
export function addUserInfo(data: any) {
  return service({
    url: '/user/addUserInfo',
    method: 'post',
    data
  })
}

// 编辑用户
export function editUserInfo(data: any) {
  return service({
    url: '/user/editUserInfo',
    method: 'post',
    data
  })
}
