import service from "@/utils/service"

// 获取用户信息
export function getUserInfo() {
  return service({
    url: '/user/getUserInfo',
    method: 'post'
  })
}

// 上传图片
export function uploadFile(data: any) {
  return service({
    url: '/setting/uploadFile',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    method: 'post',
    data
  })
}

// 更新用户信息
export function updateUserInfo(data: any) {
  return service({
    url: '/user/changeInfo',
    method: 'post',
    data
  })
}

