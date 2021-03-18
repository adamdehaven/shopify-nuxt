<template>
  <div class="page page-homepage">
    <section class="section is-fullwidth-container">
      <div class="container">
        <!-- products -->
        <h2>Products</h2>
        <div v-if="products && products.length" class="is-row">
          <div v-for="product in products" :key="product.id" class="is-col is-one-third">
            <div class="box product">
              <div v-if="product.images && product.images.length" class="is-row">
                <div class="is-col">
                  <NuxtLink :to="`/products/${product.handle}/`">
                    <figure class="image">
                      <img :src="product.images[0].src" :alt="product.description" />
                    </figure>
                  </NuxtLink>
                </div>
              </div>
              <div class="is-row">
                <div class="is-col">
                  <p>
                    <NuxtLink :to="`/products/${product.handle}/`">{{ product.title }}</NuxtLink>
                    <br /><small v-if="product.vendor">{{ product.vendor }} </small>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="is-row">
          <div class="is-col is-one-third">
            <p>No products available.</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Homepage',
  // Fetch again on client-side in case there are updates
  async fetch() {
    await this.fetchAllProducts().catch((error) => {
      console.error('fetchAllProducts: %o', error)
    })
  },
  fetchOnServer: false,
  fetchKey: 'homepage-products',
  computed: {
    products() {
      return this.$store.state.products.allProducts
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
