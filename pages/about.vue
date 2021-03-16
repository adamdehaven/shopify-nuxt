<template>
  <div class="page page-about">
    <section class="section is-fullwidth-container">
      <div class="container">
        <div v-if="pageData" class="is-row">
          <div class="is-col">
            <h1>{{ pageData.title }}</h1>
            <div class="content" v-html="pageData.body"></div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'About',
  data() {
    return {
      pageData: null,
    }
  },
  // Working, but better solution below
  // async fetch() {
  //   const query = this.$shopify.graphQLClient.query((root) => {
  //     root.addConnection('pages', { args: { first: 1 } }, (page) => {
  //       page.add('id')
  //       page.add('title')
  //       page.add('handle')
  //       page.add('updatedAt')
  //       page.add('body')
  //     })
  //   })

  //   let page = await this.$shopify.graphQLClient.send(query).then(({ data }) => {
  //     let { node } = data.pages.edges[0]
  //     return node
  //   })

  //   this.pageData = page
  // },
  async fetch() {
    const query = this.$shopify.graphQLClient.query((root) => {
      root.add('pageByHandle', { args: { handle: 'about-page' } }, (page) => {
        page.add('body')
        page.add('id')
        page.add('title')
        page.add('handle')
        page.add('updatedAt')
      })
    })

    let page = await this.$shopify.graphQLClient.send(query).then(({ data }) => {
      let { pageByHandle } = data
      return pageByHandle
    })

    this.pageData = page
  },
  fetchKey: 'about-page',
  mounted() {
    this.$fetch()
  },
}
</script>
