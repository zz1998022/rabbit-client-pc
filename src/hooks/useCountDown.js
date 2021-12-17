import { useIntervalFn } from "@vueuse/core";
import { ref } from "vue";

export default function useCountDown() {
  // 此方和和原生js中的setInterval的作用是一样的
  // pause 清除定时器
  // resume 重新开启定时器
  // isActive 定时器是否正在执行
  // 定时器不能立即执行，在验证码发送成功以后才执行
  // immediate: false 组织定时器立即执行
  const count = ref(0);
  const { pause, resume, isActive } = useIntervalFn(
    () => {
      // 判断数值是否小于等于0
      if (count.value <= 0) {
        // 清除定时器
        pause();
      } else {
        // 让count减一
        count.value = count.value - 1;
      }
    },
    1000,
    {
      immediate: false,
    }
  );
  // 外放调用此方法用于开始倒计时
  const start = (value) => {
    count.value = value;
    if (isActive.value) {
      resume();
    }
    resume();
  };
  return {
    count,
    start,
    isActive,
  };
}
