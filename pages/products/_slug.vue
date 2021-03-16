<template>
  <div class="page page-homepage">
    <section class="section is-fullwidth-container">
      <div class="container">
        <!-- products -->
        <p v-if="$fetchState.pending">Fetching product...</p>
        <p v-else-if="$fetchState.error">An error occurred while fetching the product.</p>
        <div v-else class="is-row is-centered">
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
  data() {
    return {
      product: null,
    }
  },
  async fetch() {
    const product = await this.$shopify.product
      .fetchByHandle(this.$route.params.slug)
      .then((product) => {
        this.product = product
      })
      .catch((error) => {
        this.product = null
        console.log('product', error)
      })
  },
  fetchKey: 'product-page',
  activated() {
    // Call fetch again if last fetch more than 4 minutes ago
    if (this.$fetchState.timestamp <= Date.now() - 240000) {
      this.$fetch()
    }
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
