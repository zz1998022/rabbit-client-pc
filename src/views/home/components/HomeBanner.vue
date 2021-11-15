<template>
  <div class="home-banner">
    <XtxCarousel
      :autoplay="true"
      :duration="3000"
      :carousels="banners"
      v-if="banners"
    />
  </div>
</template>
<script>
import { getBanners } from "@/api/home";
import { ref } from "vue";

export default {
  name: "HomeBanner",
  setup() {
    const { banners, getData } = useBanners();
    getData();
    return { banners };
  },
};

function useBanners() {
  const banners = ref();
  const getData = () => {
    getBanners().then((data) => {
      banners.value = data.result;
    });
  };
  return { banners, getData };
}
</script>
<style scoped lang="less">
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;
  .xtx-carousel {
    :deep(.carousel-btn.prev) {
      left: 270px;
    }
    :deep(.carousel-indicator) {
      padding-left: 250px;
    }
  }
}
</style>
