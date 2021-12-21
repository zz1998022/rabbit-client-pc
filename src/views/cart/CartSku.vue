<template>
  <div class="cart-sku" ref="target">
    <div class="attrs" @click="toggle">
      <span class="ellipsis">颜色：粉色 尺寸：14cm 产地：中国</span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="layer" v-if="visible">
      <div class="loading" v-if="loading"></div>
      <GoodsSku
        v-if="!loading"
        :specs="specsAndSkus.specs"
        :skus="specsAndSkus.skus"
        :skuId="skuId"
        @onSpecChanged="onSpecChanged"
      />
      <XtxButton
        @click="submitSku"
        v-if="!loading && specsAndSkus"
        type="primary"
        size="mini"
        style="margin-left: 60px"
      >
        确定
      </XtxButton>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";
import { getGoodsOfSkuInfo } from "@/api/cart";
import GoodsSku from "@/views/goods/components/GoodsSku";
import { useStore } from "vuex";

export default {
  name: "CartSku",
  components: { GoodsSku },
  props: {
    attrsText: {
      type: String,
      default: "",
    },
    skuId: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const target = ref();
    const visible = ref(false);
    const store = useStore();
    // 规格组件所需数据
    const specsAndSkus = ref();
    // loading
    const loading = ref(false);
    // 显示弹仓
    const show = () => {
      visible.value = true;
      // 数据的加载状态
      loading.value = true;
      getGoodsOfSkuInfo(props.skuId).then((response) => {
        specsAndSkus.value = response.result;
        loading.value = false;
      });
    };
    // 隐藏弹层
    const hide = () => {
      visible.value = false;
    };
    const toggle = () => {
      visible.value ? hide() : show();
    };
    // 在元素外面点击时,隐藏弹层
    onClickOutside(target, hide);
    // 储存用户选择的新的规格数据
    let newSku = null;
    // 当用户选择了一个完整的规格的时候
    const onSpecChanged = (data) => {
      newSku = data;
    };
    const submitSku = () => {
      // 当用户没有选择的规格
      // 或者说用户选择了规格但是选择的规格和以前一样
      if (!newSku || (newSku && newSku.skuId === props.skuId)) return;
      store.dispatch("cart/updateGoodsOfCartBySkuChanged", {
        oldSkuId: props.skuId,
        newSku,
      });
    };
    return {
      target,
      visible,
      specsAndSkus,
      toggle,
      loading,
      onSpecChanged,
      submitSku,
    };
  },
};
</script>
<style scoped lang="less">
.cart-sku {
  height: 28px;
  border: 1px solid #f5f5f5;
  padding: 0 6px;
  position: relative;
  margin-top: 10px;
  display: inline-block;
  .attrs {
    line-height: 24px;
    display: flex;
    span {
      max-width: 230px;
      font-size: 14px;
      color: #999;
    }
    i {
      margin-left: 5px;
      font-size: 14px;
    }
  }
  .layer {
    position: absolute;
    left: -1px;
    top: 40px;
    z-index: 10;
    width: 400px;
    border: 1px solid @xtxColor;
    box-shadow: 2px 2px 4px lighten(@xtxColor, 50%);
    background: #fff;
    border-radius: 4px;
    font-size: 14px;
    padding: 20px;
    &::before {
      content: "";
      width: 12px;
      height: 12px;
      border-left: 1px solid @xtxColor;
      border-top: 1px solid @xtxColor;
      position: absolute;
      left: 12px;
      top: -8px;
      background: #fff;
      transform: scale(0.8, 1) rotate(45deg);
    }
    .loading {
      height: 224px;
      background: url(../../assets/images/loading.gif) no-repeat center;
    }
  }
}
</style>
