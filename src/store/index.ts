import { createStore } from 'vuex'
export default createStore({
  // 1、 存储所有全局数据
  state: {
    isLoginStatus: false,
    user: {
      userId: "",
      username: "",
      token: "",
    }
  },
  // 2、 需要通容过计算获取state里的内获取的数据
  // 只能读取不可修改
  getters: {
  },
  //  3、定义对state的各种操作
  // why不直接实现在mutation里需要写到action里?
  // mtations不能执行异步操作。aq:从云端获取信息-->(等待云端反馈)更新到state异步操作
  // 因此说:对于异步操作需要放到action里，简单的直接赋值操作可以直接放到mutation里
  mutations: {
    // 例如：updateNum(state, payload) { state.num = payload }
    // 也可以直接在mutation里写api到url
    updateLoginStatusAndToken(state, payload) {
      state.isLoginStatus = payload.isLoginStatus;
      state.user.userId = payload.user.userId;
      state.user.username = payload.user.username;
      state.user.token = payload.user.token;
    },
    // 用户退出登入，或者超时要清除token和登入状态
    clearToken(state, payload) {
      state.isLoginStatus = payload.isLoginStatus;
      state.user.token = payload.token;
      state.user.userId = payload.userId;
      state.user.username = payload.username;
    },
    updateToken(state, payload) {
      state.user.token = payload.user.token;
    }


  },
  // 3、定义对state的各种操作
  // actions无法直接修改state，需要在mutations里更新
  // mutation不支持异步，所以需要在action里写api到url
  actions: {
    // 比说action定义了更新state的操作
    // 但是不可对其直接修改
    // 所有的修改操作必须放到mutations里
  },
  // state中信息过长时
  // 用来将state进行分割
  // 如下，将state树分割出一个user state。
  modules: {

  }
})
