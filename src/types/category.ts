export interface category {
  id?: string         // id
  parentId: string    // 父级id
  name: string        // 类别名称
  keywords: string    // 关键字
  url: string         // url
  enable: number     // 是否启用
  comments: string    // 描述
  createdAt: string   // 创建时间
  updatedAt: string   // 更新时间
}

export interface categoryId {
  id: string // 分类id
}