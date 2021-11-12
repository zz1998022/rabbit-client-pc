import { onMounted, onUnmounted, ref } from "vue";

export default function useScrollTop() {
  const scrollTop = ref(0);
  const scrollTopHandle = () => {
    scrollTop.value = document.documentElement.scrollTop;
  };

  // 组件挂载的时候绑事件
  onMounted(() => {
    window.addEventListener("scroll", scrollTopHandle);
  });
  // 组件卸载的时候移除事件
  onUnmounted(() => {
    window.removeEventListener("scroll", scrollTopHandle);
  });

  return scrollTop;
}
