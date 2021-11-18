import { ref } from "vue";
import { useIntersectionObserver } from "@vueuse/core";

export default function useLazyData(apiFunction) {
  // 1.创建用于获取元素的ref
  const target = ref();
  // 2.创建用于储存数据的变量
  const result = ref();
  // 3.监听元素是否进入可视区
  const { stop } = useIntersectionObserver(
    target,
    ([{ isIntersecting }]) => {
      // 4.当元素进入可视区以后,停止监听,获取数据
      if (isIntersecting) {
        console.log(111);
        stop();
        apiFunction().then((data) => {
          console.log(data);
          result.value = data.result;
        });
      }
    },
    { threshold: 0 }
  );
  // 4.返回数据以及元素

  return { target, result };
}
