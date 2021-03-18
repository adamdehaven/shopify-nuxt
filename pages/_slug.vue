<template>
  <div class="page" :class="['page-' + page.handle]">
    <section class="section is-fullwidth-container">
      <div class="container">
        <div v-if="page" class="is-row">
          <div class="is-col">
            <h1>{{ page.title }}</h1>
            <div class="content" v-html="page.body"></div>
          </div>
        </div>

        <NoContent v-else>
          <p>Page not found</p>
        </NoContent>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'DynamicPage',
  middleware: 'shopify-dynamic-pages',
  async fetch() {
    await this.fetchAllPages().catch((error) => {
      console.error('fetchAllPages: %o', error)
    })
  },
  fetchOnServer: false,
  fetchKey() {
    return 'dynamic-page-' + this.$route.params.slug
  },
  computed: {
    page() {
      return this.pageData(this.$route.params.slug)
    },
    ...mapGetters({
      pageData: 'pages/page',
    }),
  },
  methods: {
    ...mapActions({
      fetchAllPages: 'pages/fetchAllPages',
    }),
  },
}
</script>
