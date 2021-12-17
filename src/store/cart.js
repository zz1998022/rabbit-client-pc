import { updateGoodsOfCartBySkuId } from "@/api/cart";

const cart = {
  // 使用命名空间模块
  namespaced: true,
  state() {
    return {
      list: [],
    };
  },
  mutations: {
    // 将商品加入购物车(本地)
    addGoodsToCart(state, goods) {
      console.log(state);
      // 1.查看当前要添加的商品是否已经在购物车中,通过findIndex去查找
      const index = state.list.findIndex((item) => item.skuId === goods.skuId);
      // 找到了
      if (index > -1) {
        // 找到了 累加商品数量
        state.list[index].count += goods.count;
        // 将该商品添加到购物车列表的顶部
        state.list.unshift(state.list.splice(index, 1)[0]);
        console.log(111);
      } else {
        // 没找到 直接将商品添加到购物车列表的顶部
        state.list.unshift(goods);
      }
    },
    // 删除购物车中的商品(skuId)
    deleteGoodsOfCart(state, skuId) {
      // 1.通过skuId查找商品 返回商品的索引
      const index = state.list.findIndex((item) => item.skuId === skuId);
      // 2.删除
      if (index > -1) {
        // slice 从数组中进行截取 返回截取数组

        state.list = [
          ...state.list.slice(0, index),
          ...state.list.slice(index + 1),
        ];
      }
    },
    // 根据 skuId 更新商品信息
    updateGoodsBySkuId(state, partOfGoods) {
      const index = state.list.findIndex(
        (item) => item.skuId === partOfGoods.skuId
      );
      // 更新商品
      state.list[index] = {
        ...state.list[index],
        ...partOfGoods,
      };
    },
  },
  actions: {
    // 将商品加入购物车
    addGoodsToCart({ rootState, commit }, goods) {
      // 1.如果要加入购物车的商品已经在购物车中了,累加该商品的数量
      // 2.新添加的商品要放置在购物车列表的顶部
      // 3.判断用户是否登录,如果登录,操作服务器端购物车,如果没有登录 操作本地购物车
      if (rootState.user.profile.token) {
        // 已登录
      } else {
        console.log(222);
        // 未登录
        commit("addGoodsToCart", goods);
      }
    },
    // 删除购物车中的商品(skuId)
    deleteGoodsOfCart({ rootState, commit }, skuId) {
      if (rootState.user.profile.token) {
        // 已登录
      } else {
        // 未登录
        commit("deleteGoodsOfCart", skuId);
      }
    },
    // 更新购物车中的商品信息(自动更新)
    updateGoodsBySkuId({ rootState, commit }) {
      // 判断用户是否登录
      if (rootState.user.profile.token) {
        // 已登录
      } else {
        // 未登录
        // 发送请求更新商品信息 返回 Promise数组
        const promiseAry = rootState.cart.list.map((item) =>
          updateGoodsOfCartBySkuId(item.skuId)
        );
        // 按照顺序发送请求 安卓顺序拿请求结果
        Promise.all(promiseAry).then((data) => {
          data.forEach((item, index) => {
            item.result.skuId = rootState.cart.list[index].skuId;
            commit("updateGoodsBySkuId", item.result);
          });
        });
      }
    },
  },
  getters: {
    // 可购买的商品列表
    effectiveGoodsList(state) {
      // 1.商品库存大于0
      // 2.isEffective 字段为真
      return state.list.filter((item) => item.stock > 0 && item.isEffective);
    },
    // 可购买的商品价格
    effectiveGoodsPrice(state, getters) {
      return getters.effectiveGoodsList.reduce((price, item) => {
        // 累加商品价格 商品数量 * 商品价格
        return price + item.count * Number(item.nowPrice);
      }, 0);
    },
    // 可购买的商品总数
    effectiveGoodsCount(state, getters) {
      return getters.effectiveGoodsList.reduce((count, item) => {
        return count + item.count;
      }, 0);
    },
    // 无效商品列表
    invalidGoodsList(state) {
      // 库存等于0
      // isEffective true
      return state.list.filter((item) => item.stock === 0 || !item.isEffective);
    },
    // 用户选择的的商品列表
    selectedGoodsList(state, getters) {
      return getters.effectiveGoodsList.filter((item) => item.selected);
    },
    // 用户选的商品总价
    selectedGoodsPrice(state, getters) {
      return getters.selectedGoodsList.reduce((price, item) => {
        return price + item.count * Number(item.nowPrice);
      }, 0);
    },
    // 用户选择的商品数量
    selectedGoodsCount(state, getters) {
      return getters.selectedGoodsList.reduce((count, item) => {
        return count + item.count;
      }, 0);
    },
  },
};

export default cart;
