<template>
  <router-view />
</template>

<script>
import { requestWithoutToken } from "@/utils/request";

export default {
  setup() {
    const clickHandle = async () => {
      const res = await requestWithoutToken("/home/banner", "get", {
        distributionSite: 1,
      });
      console.log(res);
    };
    return {
      clickHandle,
    };
  },
};
</script>
<style lang="less">
.box {
  color: @xtxColor;
}
</style>
