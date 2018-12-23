
 import Vuex from 'vuex';

 const createStore = () => {
  return new Vuex.Store({
    state: {
      headlines: [],
      category: '',
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
      }
    },
    getters: {
      headlines: state => state.headlines,
      category: state => state.category,
      loading: state => state.loading,
    }
  });
 }

 export default createStore;
