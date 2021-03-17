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
  name: 'DynamicPage',
  middleware: 'shopify-dynamic-pages',
  // Initial server fetch
  async asyncData({ $shopify, route }) {
    const handleFromRoute = route.path.replace(/\//g, '')
    const query = $shopify.graphQLClient.query((root) => {
      root.add('pageByHandle', { args: { handle: handleFromRoute } }, (page) => {
        page.add('title')
        page.add('handle')
        page.add('body')
        page.add('updatedAt')
        page.add('id')
      })
    })

    let pageData = await $shopify.graphQLClient.send(query).then(({ data }) => {
      let { pageByHandle } = data
      return pageByHandle
    })

    return { pageData }
  },
  // Fetch again on client-side in case there are updates
  async fetch() {
    const handleFromRoute = this.$route.path.replace(/\//g, '')
    const query = this.$shopify.graphQLClient.query((root) => {
      root.add('pageByHandle', { args: { handle: handleFromRoute } }, (page) => {
        page.add('title')
        page.add('handle')
        page.add('body')
        page.add('updatedAt')
        page.add('id')
      })
    })

    let page = await this.$shopify.graphQLClient.send(query).then(({ data }) => {
      let { pageByHandle } = data
      return pageByHandle
    })

    this.pageData = page
  },
  fetchOnServer: false,
  fetchKey() {
    return 'dynamic-page-' + this.$route.path.replace(/\//g, '')
  },
}
</script>
