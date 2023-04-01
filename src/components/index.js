const importFn = require.context('./', false, /\.vue$/)
export default {
  install(app) {
    // 根据keys批量注册
    importFn.keys().forEach((path) => {
      // 导入组件
      const component = importFn(path).default
      // 组件全局注册
      app.component(component.name, component)
    })
  }
}
