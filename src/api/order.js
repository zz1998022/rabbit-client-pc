import { requestWithToken } from "@/utils/request";

/**
 * 创建订单, 返回订单信息
 * @return {Promise}
 */
export function createOrder() {
  return requestWithToken("/member/order/pre", "get");
}
