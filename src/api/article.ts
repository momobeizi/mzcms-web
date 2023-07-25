import service from "@/utils/service"

// 获取文章列表
export function getArticleList(data: any) {
  return service({
    url: '/content/findAll',
    method: 'post',
    data
  })
}

// 添加文章
export function addArticle(data: any) {
  return service({
    url: '/content/add',
    method: 'post',
    data
  })
}

// 编辑文章
export function editArticle(data: any) {
  return service({
    url: '/content/edit',
    method: 'post',
    data
  })
}

// 删除文章
export function deleteArticle(data: any) {
  return service({
    url: '/content/delete',
    method: 'post',
    data
  })
}

// 获取单条文章数据
export function findOneArticle(data: any) {
  return service({
    url: '/content/findOne',
    method: 'post',
    data
  })
}