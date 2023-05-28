import service from "@/utils/service"
import type { category, categoryId } from '@/types/category'

// 获取文章列表
export function getArticleList() {
  return service({
    url: '/content/findAll',
    method: 'post'
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