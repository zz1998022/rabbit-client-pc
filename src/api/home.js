import { requestWithoutToken } from "@/utils/request";

/**
 * 获取分类列表数据
 * @returns {Promise}
 */
export function getCategoriesApi() {
  return requestWithoutToken("/home/category/head", "get");
}
