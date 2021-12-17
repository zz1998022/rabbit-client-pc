<template>
  <AppLayout>
    <div class="xtx-goods-page" v-if="goodsDetail">
      <div class="container">
        <!-- 面包屑 -->
        <XtxBread>
          <XtxBreadItem path="/">首页</XtxBreadItem>
          <XtxBreadItem :path="`/category/${goodsDetail.categories[1].id}`">{{
            goodsDetail.categories[1].name
          }}</XtxBreadItem>
          <XtxBreadItem
            :path="`/category/sub/${goodsDetail.categories[0].id}`"
            >{{ goodsDetail.categories[0].name }}</XtxBreadItem
          >
          <XtxBreadItem>{{ goodsDetail.name }}</XtxBreadItem>
        </XtxBread>
        <!-- 商品信息 -->
        <div class="goods-info">
          <!-- 左侧 -->
          <div class="media">
            <GoodsImages :images="goodsDetail.mainPictures" />
            <!-- 商品售卖信息组件 -->
            <GoodsSales />
          </div>
          <!-- 右侧 -->
          <div class="spec">
            <GoodsInfo :goods="goodsDetail" />
            <!-- 规格组件 -->
            <GoodsSku
              @onSpecChanged="onSpecChanged"
              @onSpecHalfChanged="goodsDetail.currentSkuId = null"
              :skus="goodsDetail.skus"
              :specs="goodsDetail.specs"
            />
            <!-- 商品数量组件 -->
            <XtxNumberBox
              label="数量"
              v-model="goodsCount"
              :max="goodsDetail.inventory"
            />
            <!-- 加入购物车 -->
            <XtxButton
              type="primary"
              style="margin-top: 15px"
              @click="addGoodsToCart"
              >加入购物车</XtxButton
            >
          </div>
        </div>
        <!-- 商品推荐 -->
        <GoodsRelevant></GoodsRelevant>
        <!-- 商品详情 -->
        <div class="goods-footer">
          <div class="goods-article">
            <!-- 商品+评价 -->
            <GoodsTab />
            <!-- 注意事项 -->
            <div class="goods-warn">
              <GoodsWarn />
            </div>
          </div>
          <!-- 24热榜 -->
          <div class="goods-aside">
            <GoodsHot :type="1" />
            <GoodsHot :type="2" />
            <GoodsHot :type="3" />
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script>
import GoodsRelevant from "@/views/goods/components/GoodsRelevant";
import AppLayout from "@/components/AppLayout";
import { provide, ref } from "vue";
import { getGoodsDetail } from "@/api/goods";
import { onBeforeRouteUpdate, useRoute } from "vue-router";
import GoodsImages from "@/views/goods/components/GoodsImages";
import GoodsSales from "@/views/goods/components/GoodsSales";
import GoodsInfo from "@/views/goods/components/GoodsInfo";
import GoodsSku from "@/views/goods/components/GoodsSku";
import GoodsTab from "@/views/goods/components/GoodsTab";
import GoodsHot from "@/views/goods/components/GoodsHot";
import GoodsWarn from "@/views/goods/components/GoodsWarn";
import Message from "@/components/library/Message";
import { useStore } from "vuex";
export default {
  name: "GoodsDetailPage",
  components: {
    GoodsWarn,
    GoodsHot,
    GoodsTab,
    GoodsSku,
    GoodsInfo,
    GoodsSales,
    GoodsImages,
    GoodsRelevant,
    AppLayout,
  },
  setup() {
    const { goodsDetail, getData } = useGoodsDetail();
    // 获取路由参数
    const route = useRoute();
    // 获取store对象
    const store = useStore();
    // 用于储存用户选择的商品数量
    const goodsCount = ref(0);
    getData(route.params.id);
    const onSpecChanged = (data) => {
      goodsDetail.value.price = data.price;
      goodsDetail.value.oldPrice = data.oldPrice;
      goodsDetail.value.inventory = data.inventory;
      goodsDetail.value.currentSkuId = data.skuId;
      goodsDetail.value.currentAttrsText = data.attrsText;
    };
    provide("goodsDetail", goodsDetail);
    // 将商品加入到购物车中
    const addGoodsToCart = () => {
      console.log(goodsDetail.value.currentSkuId);
      // 1. 判断用户是否选择了规格 如果用户没有选择规格的话，不能让他将商品加入购物车
      if (!goodsDetail.value.currentSkuId) {
        Message({ type: "warn", text: "请选择商品规格" });
        return;
      }
      // 2.收集商品信息
      const goods = {
        // 商品id
        id: goodsDetail.value.id,
        // 商品 skuId
        skuId: goodsDetail.value.currentSkuId,
        // 商品名称
        name: goodsDetail.value.name,
        // 商品规格属性文字
        attrsText: goodsDetail.value.currentAttrsText,
        // 商品图片
        picture: goodsDetail.value.mainPictures[0],
        // 商品原价
        price: goodsDetail.value.oldPrice,
        // 商品现价
        nowPrice: goodsDetail.value.price,
        // 是否选中
        selected: true,
        // 商品库存
        stock: goodsDetail.value.inventory,
        // 用户选择的商品数量
        count: goodsCount.value,
        // 是否为有效商品
        isEffective: false,
      };
      // 将商品加入购物车
      store.dispatch("cart/addGoodsToCart", goods);
    };
    return { goodsDetail, onSpecChanged, goodsCount, addGoodsToCart };
  },
};

function useGoodsDetail() {
  const goodsDetail = ref();
  const getData = (id) => {
    getGoodsDetail(id).then((data) => {
      goodsDetail.value = data.result;
    });
  };
  // 当路由参数发生变化时(商品id)
  onBeforeRouteUpdate((to) => {
    // 重新向服务器端发送请求重新获取数据
    getData(to.params.id);
  });
  return { goodsDetail, getData };
}
</script>

<style scoped lang="less">
.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;
  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }
  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
}
.goods-footer {
  display: flex;
  margin-top: 20px;
  .goods-article {
    width: 940px;
    margin-right: 20px;
  }
  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }
}
.goods-tabs {
  min-height: 600px;
  background: #fff;
}
.goods-warn {
  min-height: 600px;
  background: #fff;
  margin-top: 20px;
}
</style>
