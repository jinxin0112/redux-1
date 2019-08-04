/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */

export default function compose(...funcs) {
  // 如果参数为空，则返回一个函数
  if (funcs.length === 0) {
    return arg => arg
  }

  // 如果只有一个参数， 则返回这个参数
  if (funcs.length === 1) {
    return funcs[0]
  }

  // 经典代码
  // return funcs.reduce((pre, cur) => {
  //   return function(...args) {
  //     return pre(cur(...args))
  //   }
  // })
  // 串式调用
  return funcs.reduce((a, b) => (...args) => a(b(...args)))

}
