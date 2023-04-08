import service from "@/utils/service"

export function getCategoryList() {
  return service({
    url: '/contentCategory/findAll',
    method: 'post'
  })
}