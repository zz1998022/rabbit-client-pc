import { requestWithoutToken } from "@/utils/request";

/**
 * 根据账号密码进行登录
 * @param account
 * @param password
 * @returns {Promise}
 */
export function loginByAccount({ account, password }) {
  return requestWithoutToken("/login", "post", { account, password });
}

/**
 * 获取手机验证码
 * @param mobile 手机号
 * @returns {Promise}
 */
export function getMsgCodeByMobileLogin(mobile) {
  return requestWithoutToken("/login/code", "get", { mobile });
}

/**
 * 通过手机号进行登录
 * @param mobile 手机号
 * @param code 验证码
 * @returns {Promise}
 */
export function loginByMobile({ mobile, code }) {
  return requestWithoutToken("/login/code", "post", { mobile, code });
}

/**
 * 根据openid检索小兔鲜账号
 * @param unionId
 * @returns {Promise}
 */
export function findAccountByOpenId({ unionId }) {
  return requestWithoutToken("/login/social", "post", { unionId, source: 1 });
}

/**
 * 获取手机验证码(绑定手机号和QQ号)
 * @param mobile
 * @returns {Promise}
 */
export function getMsgCodeWhenBindQQ(mobile) {
  return requestWithoutToken("/login/social/code", "get", { mobile });
}

/**
 * 绑定手机号和qq号
 * @param mobile 手机号
 * @param code 验证码
 * @param unionId qq openid
 * @returns {Promise}
 */
export function bindMobileAndQQ({ mobile, code, unionId }) {
  console.log(mobile, code, unionId);
  return requestWithoutToken("/login/social/bind", "post", {
    mobile,
    code,
    unionId,
  });
}

/**
 * 检测用户名或者手机号是否唯一
 * @param account 手机号或者用户名
 * @returns {Promise}
 */
export function checkUsernameIsUnique({ account }) {
  return requestWithoutToken("/register/check", "get", { account });
}

/**
 * 获取手机验证码 (完善账号)
 * @param mobile
 * @returns {Promise}
 */
export function getMsgCodeByRegister(mobile) {
  return requestWithoutToken("/register/code", "get", { mobile });
}

/**
 * 注册新账号并绑定手机号
 * @param unionId
 * @param account
 * @param mobile
 * @param code
 * @param password
 * @returns {AxiosPromise}
 */
export function registerAndBindQQ({
  unionId,
  account,
  mobile,
  code,
  password,
}) {
  return requestWithoutToken(`/login/social/${unionId}/complement`, "post", {
    account,
    mobile,
    code,
    password,
  });
}
