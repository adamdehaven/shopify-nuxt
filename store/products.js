export const state = () => ({
  allProducts: [],
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
}

export const actions = {
  async fetchAllProducts({ commit }) {
    await this.$shopify.product.fetchAll(250).then((products) => {
      commit('setAllProducts', products)
    })
  },
}
