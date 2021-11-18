<template>
  <HomePanel title="热门品牌" subTitle="国际经典 品质保证" ref="target">
    <template v-slot:right>
      <a
        href="javascript:"
        @click="toggle(-1)"
        class="iconfont icon-angle-left prev"
      ></a>
      <a
        href="javascript:"
        @click="toggle(1)"
        class="iconfont icon-angle-right next"
      ></a>
    </template>
    <template v-slot:default>
      <div class="box">
        <ul
          class="list"
          v-if="hotBrands"
          :style="{ transform: `translateX(${-currentIndex * 1240}px)` }"
        >
          <li v-for="item in hotBrands" :key="item.id">
            <RouterLink to="/">
              <img :src="item.logo" alt="" />
            </RouterLink>
          </li>
        </ul>
        <transition name="fade">
          <div class="skeleton" v-if="!hotBrands">
            <xtx-skeleton
              class="item"
              v-for="i in 5"
              :key="i"
              animated="scroll"
              bg="#e4e4e4"
              width="240px"
              height="305px"
            />
          </div>
        </transition>
      </div>
    </template>
  </HomePanel>
</template>

<script>
import HomePanel from "@/views/home/components/HomePanel";
import useLazyData from "@/hooks/useLazyData";
import { getHotBrands } from "@/api/home";
import { ref } from "vue";
export default {
  name: "HomeBrand",
  components: { HomePanel },
  setup() {
    const { target, result: hotBrands } = useLazyData(() => {
      return getHotBrands(10);
    });
    const { toggle, currentIndex } = useToggle();
    return { target, hotBrands, toggle, currentIndex };
  },
};

function useToggle() {
  // 切换索引
  const currentIndex = ref(0);
  // 控制切换索引
  const toggle = (step) => {
    // 计算索引;
    const nextIndex = currentIndex.value + step;
    if (nextIndex < 0 || nextIndex > 1) return;
    currentIndex.value = nextIndex;
  };
  return { currentIndex, toggle };
}
</script>

<style scoped lang="less">
.home-panel {
  background: #f5f5f5;
}
.iconfont {
  width: 20px;
  height: 20px;
  background: #ccc;
  color: #fff;
  display: inline-block;
  text-align: center;
  margin-left: 5px;
  background: @xtxColor;
  &::before {
    font-size: 12px;
    position: relative;
    top: -2px;
  }
  &.disabled {
    background: #ccc;
    cursor: not-allowed;
  }
}
.box {
  display: flex;
  width: 100%;
  height: 345px;
  overflow: hidden;
  padding-bottom: 40px;
  .list {
    width: 200%;
    display: flex;
    transition: all 1s;
    li {
      margin-right: 10px;
      width: 240px;
      &:nth-child(5n) {
        margin-right: 0;
      }
      img {
        width: 240px;
        height: 305px;
      }
    }
  }
}

.skeleton {
  width: 100%;
  display: flex;
  top: 115px;
  .item {
    margin-right: 10px;
    &:nth-child(5n) {
      margin-right: 0;
    }
  }
}
</style>
