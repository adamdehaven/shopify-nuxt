export const state = () => ({
  allPages: [],
  fetchDelay: process.env.NUXT_ENV_SHOPIFY_FETCH_DELAY_MILLISECONDS || 300000, // default 5 minutes
  lastFetched: null,
})

export const getters = {
  page: (state) => (handle) => {
    return state.allPages.find((p) => p.handle === handle)
  },
}

export const mutations = {
  setAllPages(state, allPages) {
    state.allPages = [...allPages]
  },
  setLastFetched(state, timestamp) {
    state.lastFetched = timestamp
  },
}

export const actions = {
  async fetchAllPages({ commit }) {
    // Do not fetch again if last fetch less than fetchDelay time ago
    if (state.lastFetched > Date.now() - state.fetchDelay) {
      return
    }

    const allPagesQuery = this.$shopify.graphQLClient.query((root) => {
      root.addConnection('pages', { args: { first: 250 } }, (page) => {
        page.add('title')
        page.add('handle')
        page.add('body')
        page.add('createdAt')
        page.add('updatedAt')
        page.add('id')
      })
    })

    await this.$shopify.graphQLClient.send(allPagesQuery).then(({ data }) => {
      let { edges } = data.pages

      let pages = []
      edges.forEach((p) => {
        pages.push(p.node)
      })

      commit('setAllPages', pages)
    })
  },
}
