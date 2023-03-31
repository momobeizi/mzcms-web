import service from "@/utils/service"

export function getUserInfo() {
  return service({
    url: '/user/getUserInfo',
    method: 'post'
  })
}