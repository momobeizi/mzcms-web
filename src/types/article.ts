export interface article {
  id?: string         // id
  title: string    // 标题
  abstract: string        // 摘要
  status: string    // 关键字
  url: string         // 状态
  contentCategory: string     // 文章类别
  imgUrl: string    // 文章封面
  readNum: string   // 阅读量
  recommend: string   // 是否推荐
  label: string   // 标签
  contentType: string   // 内容格式
  createdAt: string   // 创建时间
  updatedAt: string   // 更新时间
}

export interface articleId {
  id: string // 文章id
}