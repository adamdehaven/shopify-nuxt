<template>
  <div class="page page-homepage">
    <section class="section is-fullwidth-container">
      <div class="container">
        <!-- product -->
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
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Product',
  middleware: 'shopify-products',
  async fetch() {
    await this.fetchAllProducts().catch((error) => {
      console.error('fetchAllProducts: %o', error)
    })
  },
  fetchOnServer: false,
  fetchKey() {
    return 'product-page-' + this.$route.params.slug
  },
  computed: {
    ...mapGetters({
      productData: 'products/product',
    }),
    product() {
      return this.productData(this.$route.params.slug)
    },
  },
  methods: {
    ...mapActions({
      fetchAllProducts: 'products/fetchAllProducts',
    }),
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
