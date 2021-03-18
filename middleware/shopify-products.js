export default async function ({ store, route, error }) {
  // If product does not exist in the store, redirect
  const exists = (product) => product.handle === route.params.handle
  if (!store.state.products.allProducts.some(exists)) {
    return error({ statusCode: 404, message: 'Product not found' })
  }
}
