import { requestWithoutToken } from "@/utils/request";

/**
 * 获取一级分类的具体信息
 * @param id
 * @returns {AxiosPromise}
 */
export function getTopCategoryById(id) {
  return requestWithoutToken("/category", "get", { id });
}

/**
 * 获取二级分类晒先条件
 * @param id 二级分类id
 * @returns {AxiosPromise}
 */
export function getSubCategoryFilters(id) {
  return requestWithoutToken("/category/sub/filter", "get", { id });
}

/**
 * 获取二级分类列表
 * @param reqParams 请求参数:二级分类ID,排序条件,筛选条件、分页信息
 * @returns {AxiosPromise}
 */
export function getGoodsList(reqParams) {
  console.log(11111111111111, reqParams);
  return requestWithoutToken("/category/goods", "post", reqParams);
}
