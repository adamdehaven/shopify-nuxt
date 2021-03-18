export const state = () => ({
  checkout: {},
})

export const getters = {
  isCheckoutComplete(state) {
    return state.checkout && state.checkout.completedAt !== null && typeof state.checkout.completedAt !== 'undefined'
  },
}

export const mutations = {
  setCheckoutId(state, checkoutId) {
    this.app.$checkout.setCheckoutId(checkoutId)
  },

  updateCheckout(state, checkout) {
    state.checkout = { ...checkout }
  },
}

export const actions = {
  async createCheckout({ commit, state }) {
    await this.$shopify.checkout.create().then((checkout) => {
      commit('setCheckoutId', checkout.id)
      commit('updateCheckout', checkout)
    })
  },

  async updateCheckout({ commit }) {
    await this.$shopify.checkout.fetch(this.app.$checkout.getCheckoutId()).then((checkout) => {
      commit('updateCheckout', checkout)
    })
  },
}
