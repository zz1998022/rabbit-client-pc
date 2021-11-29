import { requestWithoutToken } from "@/utils/request";

export function getGoodsDetail(id) {
  return requestWithoutToken("/goods", "get", { id });
}
