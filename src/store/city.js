const city = {
    state: {
        cityData: []
    },
    getters: {
        cityData: state => state.cityData
    },
    actions: {
        setCityData(context, payload) {
            context.commit('SET_CITY_DATA', payload);
        }
    },
    mutations: {
        'SET_CITY_DATA': (state, payload) => {
            state.cityData = payload;
        }
    }
}


export default city