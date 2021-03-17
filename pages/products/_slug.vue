<template>
  <div class="page page-homepage">
    <section class="section is-fullwidth-container">
      <div class="container">
        <!-- products -->
        <div class="is-row is-centered">
          <div v-if="product" class="is-col is-half">
            <div class="box">
              <div v-if="product.images && product.images.length" class="is-row">
                <div class="is-col">
                  <figure class="image">
                    <img :src="product.images[0].src" :alt="product.description" />
                  </figure>
                </div>
              </div>
              <div class="is-row">
                <div class="is-col">
                  <p>
                    <b>{{ product.title }}</b> <br /><small v-if="product.vendor">{{ product.vendor }} </small>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="is-col is-half has-text-centered">
            <p><b>Product not found.</b></p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Product',
  // Initial server fetch
  async asyncData({ $shopify, route, error }) {
    const product = await $shopify.product.fetchByHandle(route.params.slug).catch((err) => {
      return error({ statusCode: 404, message: 'Product not found' })
    })

    return { product }
  },
  async fetch() {
    const product = await this.$shopify.product.fetchByHandle(this.$route.params.slug).then((product) => {
      this.product = product
    })
  },
  fetchOnServer: false,
  fetchKey() {
    return 'product-page-' + this.$route.params.slug
  },
}
</script>

<style lang="scss">
.product {
  .image img {
    width: auto !important;
    max-height: 200px;
    margin: 0 auto;
  }
}
</style>
