export default async function ({ store, route, error }) {
  // If page does not exist in the store, redirect
  const exists = (page) => page.handle === route.params.handle
  if (!store.state.pages.allPages.some(exists)) {
    return error({ statusCode: 404, message: 'Page not found' })
  }
}
