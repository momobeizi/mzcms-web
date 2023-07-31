import service from "@/utils/service"

// 获取列表
export function getLinkList(data: any) {
  return service({
    url: '/friendlyLinks/getLinkList',
    method: 'post',
    data
  })
}

// 删除
export function deleteLink(data: any) {
  return service({
    url: '/friendlyLinks/deleteLink',
    method: 'post',
    data
  })
}

// 添加
export function addLink(data: any) {
  return service({
    url: '/friendlyLinks/addLink',
    method: 'post',
    data
  })
}

// 编辑
export function editLink(data: any) {
  return service({
    url: '/friendlyLinks/editLink',
    method: 'post',
    data
  })
}
