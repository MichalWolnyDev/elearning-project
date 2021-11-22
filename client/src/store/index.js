import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


const store = new Vuex.Store({
    state: {
        userInfo: null,
        test: "dupa",
        loginApiStatus: ""
    },
    getters: {
        getUserInfo(state) { 
            return state.userInfo
        },
        getLoginApiStatus(state) {
            return state.loginApiStatus;
          },
    },
    actions: {
        userInfoRequest(context) {
            Vue.axios.get("/api/user/profile")
                .then((res) => {
                    context.commit("setUserInfo", res.data)
                });
        },
        clearUser(context){
          context.commit("setUserInfo", null);
        },
        async loginApi({ commit }, payload) {
            const response = await Vue.axios
              .post("/api/user/login", 
              payload,{withCredentials: true, credentials: 'include'})
              .catch((err) => {
                console.log(err);
              });
         
            if (response && response.data) {
              commit("setLoginApiStatus", "success");
            } else {
              commit("setLoginApiStatus", "failed");
            }
          },
          async userProfile({commit}){
            const response = await Vue.axios
            .get("/api/user/profile",{withCredentials: true, credentials: 'include'})
            .catch((err) => {
              console.log(err);
            });
           
            if(response && response.data){
              commit("setUserInfo", response.data);

            }
          }
    },
    mutations:{
        setUserInfo(state, data) {
            return state.userInfo = data
        },
        setLoginApiStatus(state, data) {
            state.loginApiStatus = data;
          },
    }
});

export default store;