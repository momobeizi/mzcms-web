import service from "@/utils/service"
import type { loginSubmit } from '@/types/login'

// 登录
export function login(data: loginSubmit) {
  return service({
    url: '/user/login',
    method: 'post',
    data
  })
}

// 退出
export function logout() {
  return service({
    url: '/user/logout',
    method: 'get'
  })
}