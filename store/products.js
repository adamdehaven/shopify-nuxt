export const state = () => ({
  allProducts: [],
  fetchDelay: process.env.NUXT_ENV_SHOPIFY_FETCH_DELAY_MILLISECONDS || 300000, // default 5 minutes
  lastFetched: null,
})

export const getters = {
  product: (state) => (handle) => {
    return state.allProducts.find((p) => p.handle === handle)
  },
}

export const mutations = {
  setAllProducts(state, allProducts) {
    state.allProducts = [...allProducts]
  },
  setLastFetched(state, timestamp) {
    state.lastFetched = timestamp
  },
}

export const actions = {
  async fetchAllProducts({ commit, state }) {
    // Do not fetch again if last fetch less than fetchDelay time ago
    if (state.lastFetched > Date.now() - state.fetchDelay) {
      return
    }

    await this.$shopify.product.fetchAll(250).then((products) => {
      commit('setAllProducts', products)
      // Update lastFetched timestamp
      commit('setLastFetched', Date.now())
    })
  },
}
