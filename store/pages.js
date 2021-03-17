export const state = () => ({
  allPages: [],
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
}

export const actions = {
  async fetchAllPages({ commit }) {
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
