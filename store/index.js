
 import Vuex from 'vuex';

 const createStore = () => {
  return new Vuex.Store({
    state: {
      headlines: [],
      category: '',
      country: 'br',
      loading: false
    },
    actions: {
      async loadHeadlines({ commit }, apiUrl){
        commit('setLoading', true)
        const { articles } = await this.$axios.$get(apiUrl);
        commit('setLoading', false)
        commit('setHeadlines', articles)
      }
    },
    mutations: {
      setHeadlines(state, headlines){
        state.headlines = headlines;
      },
      setCategory(state, category) {
        state.category = category
      },
      setLoading(state, loading) {
        state.loading = loading
      },
      setCountry(state, country) {
        state.country = country
      }
    },
    getters: {
      headlines: state => state.headlines,
      category: state => state.category,
      loading: state => state.loading,
      country: state => state.country,
    }
  });
 }

 export default createStore;
