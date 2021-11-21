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
