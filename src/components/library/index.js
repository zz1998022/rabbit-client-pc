import lazy from "@/components/directives/lazy";
import Message from "@/components/library/Message";

// 1.获取模块路径集合

const importFn = require.context("./", false, /\.vue$/);

// 2.获取要导入文件的路径
const keys = importFn.keys();

export default {
  install(app) {
    app.directive("lazy", lazy);
    // 将Message方法添加到全局属性中
    app.config.globalProperties.$message = Message;
    // 遍历要导入的文件路径
    keys.forEach((item) => {
      // 动态导入组件
      const compoment = importFn(item).default;
      // 注册组件
      app.component(compoment.name, compoment);
    });
  },
};
