const user = {
    state: {
        isAdimin: false,
        userinfo: {}
    },
    getters: {
        userinfo: state => state.userinfo,
        isAdimin: state => state.isAdimin
    },
    actions: {
        setUserInfo(context, payload) {
            context.commit('SET_USER_INFO', payload);
        }
    },
    mutations: {
        'SET_USER_INFO': (state, payload) => {
            let user = JSON.parse(JSON.stringify(payload));
            state.userinfo = user;
            state.isAdimin = user.isAdmin === 1
        }
    }
}


export default user