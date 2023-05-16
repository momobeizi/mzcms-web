import service from "@/utils/service"
import type { category, categoryId } from '@/types/category'

// 获取文章列表
export function getArticleList() {
  return service({
    url: '/content/findAll',
    method: 'post'
  })
}
