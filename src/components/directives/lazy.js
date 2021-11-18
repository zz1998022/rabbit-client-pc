// 1. 获取指定所在的元素对西昂
// 2.mounted 当指定所在的元素渲染完成后做其他事情
// 3.监听元素是否进入可视区
// 4. 如果元素进入可视区 为图片设置src属性 停止监听
// 5.如果图片加载失败 显示默认图片
import defaultImage from "@/assets/images/200.png";

const lazy = {
  mounted(el, binding) {
    // el指定所在的元素
    // binding.value 获取指定的值
    const observer = new IntersectionObserver(([{ isIntersecting }]) => {
      // 判断是否进入可视区
      if (isIntersecting) {
        console.log("lazy:" + isIntersecting);
        // 停止监听
        observer.unobserve(el);
        // 加载图片
        el.src = binding.value;
        // 监听图片加载失败的情况
        el.onerror = function () {
          el.src = defaultImage;
        };
      }
    });
    observer.observe(el);
  },
};

export default lazy;
