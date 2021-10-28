import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


const store = new Vuex.Store({
    state: {
        userInfo: null,
        test: "dupa"
    },
    getters: {
        getUserInfo(state) { 
            return state.userInfo
        }
    },
    actions: {
        userInfoRequest(context) {
            this.$http.get("http://localhost:9000/api/profile")
                .then((res) => {
                    context.commit("setUserInfo", res.data)
                });
        },
    },
    mutations:{
        setUserInfo(state, data) {
            return state.userInfo = data
        },
    }
});

export default store;