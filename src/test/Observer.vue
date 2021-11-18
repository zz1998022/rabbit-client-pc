<template>
  <div>
    <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
    <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
    <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
  </div>
  <div ref="target">HelloWorld</div>
</template>

<script>
import { ref } from "vue";
import { useIntersectionObserver } from "@vueuse/core";

export default {
  name: "Observer",
  setup() {
    // 1. 要监听的元素
    const target = ref();
    const { stop } = useIntersectionObserver(target, ([{ isIntersecting }]) => {
      // 判断元素是否进入了可视区
      if (isIntersecting) {
        console.log(111);
        // 停止监听
        stop();
      }
    });
    return {
      target,
    };
  },
};
</script>

<style scoped></style>
