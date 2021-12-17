import { requestWithoutToken } from "@/utils/request";

/**
 * 根据 skuId 更新商品信息
 * @param skuId
 * @returns {Promise}
 */
export function updateGoodsOfCartBySkuId(skuId) {
  return requestWithoutToken(`/goods/stock/${skuId}`, "get", skuId);
}
