import service from "@/utils/service"
import type { loginSubmit } from '@/types/login'


export function login(data: loginSubmit) {
  return service({
    url: '/user/login',
    method: 'post',
    data
  })
}