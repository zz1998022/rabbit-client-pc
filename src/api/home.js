import { requestWithoutToken } from "@/utils/request";

/**
 * 获取分类列表数据
 * @returns {Promise}
 */
export function getCategoriesApi() {
  return requestWithoutToken("/home/category/head", "get");
}

/**
 *
 * @param {number} limit - 请求多少条数据
 * @returns {AxiosPromise}
 */
export function getBrands(limit = 6) {
  return requestWithoutToken("/home/brand", "get", { limit });
}

/**
 *
 * @param distributionSite 广告区域展示位置（投放位置 投放位置，1为首页，2为分类商品页） 默认是1
 * @returns {AxiosPromise}
 */
export function getBanners(distributionSite = 1) {
  return requestWithoutToken("/home/banner", "get", { distributionSite });
}

/**
 * 获取新鲜好物
 * @param limit 限制请求数据的数量
 * @returns {AxiosPromise}
 */
export function getNewGoods(limit = 4) {
  return requestWithoutToken("/home/new", "get", { limit });
}

/**
 * 获取人气推荐数据
 * @returns {AxiosPromise}
 */
export function getHotGoods() {
  return requestWithoutToken("/home/hot", "get");
}

/**
 * 获取热门品牌
 * @param limit
 * @returns {AxiosPromise}
 */
export function getHotBrands(limit = 4) {
  return requestWithoutToken("/home/brand", "get", limit);
}

/**
 * 获取产品区块数据
 * @returns {AxiosPromise}
 */
export function getProduct() {
  return requestWithoutToken("/home/goods", "get");
}

/**
 * 用于获取最新专题
 * @param limit
 * @returns {AxiosPromise}
 */
export function getSpecial(limit = 3) {
  return requestWithoutToken("/home/special", "get", { limit });
}
