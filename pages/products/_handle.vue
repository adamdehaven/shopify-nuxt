<template>
  <div class="page page-product">
    <section class="section is-fullwidth-container">
      <div class="container">
        <!-- product -->
        <div v-if="product || $fetchState.pending" class="is-row">
          <div v-if="product.images && product.images.length" class="is-col">
            <figure class="image product-image">
              <img :src="product.images[0].src" />
            </figure>
            <div class="is-row">
              <div class="is-col">
                <figure v-for="img in product.images" :key="img.id" class="image product-image-thumbnail">
                  <img :src="img.src" />
                </figure>
              </div>
            </div>
          </div>
          <!-- Product Info (Loading) -->
          <div v-if="$fetchState.pending" class="is-col">
            <BaseLoading height="80px"></BaseLoading>
            <br />
            <BaseLoading :count="3"></BaseLoading>
            <br />
            <BaseLoading :count="4"></BaseLoading>
            <br />
            <BaseLoading :count="3"></BaseLoading>
          </div>
          <!-- Product Info -->
          <div v-else class="is-col">
            <h1>{{ product.title }}</h1>
            <div v-html="product.descriptionHtml"></div>
            <br />
            <button class="button is-primary is-fullwidth">Add to cart</button>
          </div>
        </div>

        <NoContent v-else>
          <p>Product not found</p>
        </NoContent>
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
    return await this.$shopify.product
      .fetchByHandle(this.$route.params.handle)
      .then((product) => {
        if (!product) {
          return error({ statusCode: 404, message: 'Product not found' })
        }

        this.setProduct(product)
      })
      .catch((err) => {
        return error({ statusCode: 403, message: 'Product does not have Storefront Permissions' })
      })
  },
  fetchOnServer: false,
  fetchKey() {
    return 'product-page-' + this.$route.params.handle
  },
  computed: {
    ...mapGetters({
      productData: 'products/product',
    }),
    product() {
      return this.productData(this.$route.params.handle)
    },
  },
  methods: {
    ...mapActions({
      fetchAllProducts: 'products/fetchAllProducts',
      setProduct: 'products/setProduct',
    }),
  },
}
</script>

<style lang="scss">
.page-product {
  .product-image {
    max-width: 380px;
    margin-left: auto;
    margin-right: auto;
  }

  .product-image-thumbnail {
    display: inline-block;
    margin: 0 0 0 2em;
    max-width: 120px;
  }
}
</style>
