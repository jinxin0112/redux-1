import compose from './compose'

/**
 * Creates a store enhancer that applies middleware to the dispatch method
 * of the Redux store. This is handy for a variety of tasks, such as expressing
 * asynchronous actions in a concise manner, or logging every action payload.
 *
 * See `redux-thunk` package as an example of the Redux middleware.
 *
 * Because middleware is potentially asynchronous, this should be the first
 * store enhancer in the composition chain.
 *
 * Note that each middleware will be given the `dispatch` and `getState` functions
 * as named arguments.
 *
 * @param {...Function} middlewares The middleware chain to be applied.
 * @returns {Function} A store enhancer applying the middleware.
 */
export default function applyMiddleware(...middlewares) {
  return createStore => (...args) => {
    // 接收createStore和createStore的前两个参数，见createStore中的enhancer
    const store = createStore(...args)
    // 声明dispatch默认值是一个抛错函数
    let dispatch = () => {
      throw new Error(
        'Dispatching while constructing your middleware is not allowed. ' +
          'Other middleware would not be applied to this dispatch.'
      )
    }

    // 传入到中间件的api
    const middlewareAPI = {
      getState: store.getState,
      dispatch: (...args) => dispatch(...args)
    }
    // 中间件的执行结果也是方法集合
    const chain = middlewares.map(middleware => middleware(middlewareAPI))
    // 又compose将这些执行方法集合串起来执行
    dispatch = compose(...chain)(store.dispatch)

    // 返回store的结果， dispatch覆盖
    return {
      ...store,
      dispatch
    }
  }
}
