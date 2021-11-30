import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


const store = new Vuex.Store({
  state: {
    userInfo: null,
    test: "dupa",
    loginApiStatus: "",
    quizList: [],
    singleQuiz: []
  },
  getters: {
    getUserInfo(state) {
      return state.userInfo
    },
    getLoginApiStatus(state) {
      return state.loginApiStatus;
    },
    getQuizList(state) {
      return state.quizList;
    },
    getSingleQuiz(state) {
      return state.singleQuiz;
    },
  },
  actions: {
    userInfoRequest(context) {
      Vue.axios.get("/api/user/profile")
        .then((res) => {
          context.commit("setUserInfo", res.data)
        });
    },
    clearUser(context) {
      context.commit("setUserInfo", null);
    },
    async loginApi({ commit }, payload) {
      await Vue.axios
        .post("/api/user/login",
          payload, { withCredentials: true, credentials: 'include' })
        .then((res) => {
          console.log(res);
          commit("setLoginApiStatus", res.data);

        })
        .catch((err) => {
          console.log(err);

        });


    },
    async userProfile({ commit }) {
      const response = await Vue.axios
        .get("/api/user/profile", { withCredentials: true, credentials: 'include' })
        .catch((err) => {
          console.log(err);
        });

      if (response && response.data) {
        commit("setUserInfo", response.data);

      }
    },
    async fetchQuizzes({commit}) {
      await Vue.axios
        .get("/quizapi/quizzes/")
        .then((res) => {
          commit("setQuizList",  res.data)
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async fetchSingleQuiz({commit}, payload) {
      await Vue.axios
        .get("/quizapi/quizzes/"+payload)
        .then((res) => {
          commit("setSingleQuiz",  res.data)
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
  mutations: {
    setUserInfo(state, data) {
      return state.userInfo = data
    },
    setLoginApiStatus(state, data) {
      state.loginApiStatus = data;
    },
    setQuizList(state, data) {
      state.quizList = data;
    },
    setSingleQuiz(state, data) {
      state.singleQuiz = data;
    },
  }
});

export default store;