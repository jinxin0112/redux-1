/**
 * @param {any} obj The object to inspect.
 * @returns {boolean} True if the argument appears to be a plain object.
 */

// 判断是否是普通对象
export default function isPlainObject(obj) {
  if (typeof obj !== 'object' || obj === null) return false
  // todo: 是否需要兼容 Object.create(null)
  if (Object.getPrototypeOf(obj) === null) return true

  let proto = obj
  // redux是为了防止跨iframe访问变量时的类型判断错误
  // 不同的javascript 执行环境 Object.prototype 不等
  // 遍历拿到真实的构造原型
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto)
  }

  return Object.getPrototypeOf(obj) === proto
}
