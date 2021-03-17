export const actions = {
  async nuxtServerInit({ commit, dispatch }, { $shopify }) {
    // Fetch all products
    await dispatch('products/fetchAllProducts')

    // Fetch all pages
    await dispatch('pages/fetchAllPages')
  },
}
