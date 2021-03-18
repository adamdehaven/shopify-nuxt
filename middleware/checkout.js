export default async function ({ store }) {
  // Create a checkoutId, once per session and allow SSR usage
  if (!store.state.checkout.checkout.id) {
    await store.dispatch('checkout/createCheckout')
  }

  // Force a checkout refresh on each page load
  if (store.state.checkout.checkout.id) {
    await store.dispatch('checkout/updateCheckout')

    // If checkout is complete, create a new checkout Id
    // if (app.store.getters['checkout/isCheckoutComplete']) {
    //   await app.store.dispatch('checkout/createCheckout')
    // }
  }
}
