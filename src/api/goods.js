import { requestWithoutToken } from "@/utils/request";

export function getGoodsDetail(id) {
  return requestWithoutToken("/goods", "get", { id });
}

/**
 * 获取同类商品或猜你喜欢
 * @param id 商品id
 * @param limit 最大数量
 * @returns {AxiosPromise}
 */
export function getRelevantGoods({ id, limit = 16 }) {
  return requestWithoutToken("/goods/relevant", "get", { id, limit });
}

/**
 * 获取榜单数据
 * @param id 商品id
 * @param limit 一次请求获取数据量
 * @param type 热销类型，1为24小时，2为周榜，3为总榜，默认为1
 * @returns {AxiosPromise}
 */
export function getHotGoods({ id, limit, type }) {
  return requestWithoutToken("/goods/hot", "get", { id, limit, type });
}

/**
 * 获取评价组件头部信息
 * @param id 商品id
 * @returns {Promise}
 */
export function getComponentInfo(id) {
  return requestWithoutToken(
    `https://mock.boxuegu.com/mock/1175/goods/${id}/evaluate`,
    "get"
  );
}

/**
 * 获取评价列表数据
 * @param params 参数对象 分页信息 商品id tag hasPicture ...
 * @returns {AxiosPromise}
 */
export function getCommentList(params) {
  return requestWithoutToken(
    `https://mock.boxuegu.com/mock/1175/goods/${params.id}/evaluate/page`,
    "get",
    params
  );
}
