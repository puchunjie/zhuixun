const user = {
    state: {
        isTeacher: true,
        userinfo: {}
    },
    getters: {
        userinfo: state => state.userinfo,
        isTeacher: state => state.isTeacher
    },
    actions: {
        setUserInfo(context, payload) {
            context.commit('SET_USER_INFO', payload);
        },
        setTeacher(context, payload) {
            context.commit('SET_TEACHER', payload)
        }
    },
    mutations: {
        'SET_USER_INFO': (state, payload) => {
            let user = JSON.parse(JSON.stringify(payload));
            state.userinfo = user;
        },
        'SET_TEACHER': (state, payload) => {
            state.isTeacher = payload;
        }
    }
}


export default user