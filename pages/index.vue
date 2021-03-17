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
                  <figure class="image">
                    <img :src="product.images[0].src" :alt="product.description" />
                  </figure>
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
export default {
  name: 'Homepage',
  // Initial server fetch
  async asyncData({ $shopify }) {
    const products = await $shopify.product.fetchAll(250)

    return { products }
  },
  // Fetch again on client-side in case there are updates
  async fetch() {
    const products = await this.$shopify.product.fetchAll(250).then((products) => {
      this.products = products
    })
  },
  fetchOnServer: false,
  fetchKey: 'homepage-products',
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
