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
  async setProduct({ commit, state }, product) {
    // Boolean if item was replaced
    let replaced = false
    // Find existing product, and replace it
    let allProducts = [...state.allProducts].map((p) => {
      if (p.handle === product.handle) {
        replaced = true
        return product
      } else {
        return p
      }
    })

    // Item was not replaced, so it wasn't in array. Add to allProducts
    if (!replaced) {
      allProducts.push(product)
    }

    // Update store
    commit('setAllProducts', allProducts)
  },
}
