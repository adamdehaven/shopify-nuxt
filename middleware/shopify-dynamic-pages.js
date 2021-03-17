export default async function ({ $shopify, route, error }) {
  const query = $shopify.graphQLClient.query((root) => {
    root.addConnection('pages', { args: { first: 250 } }, (page) => {
      page.add('title')
      page.add('handle')
      page.add('id')
    })
  })

  let allShopifyPages = await $shopify.graphQLClient.send(query).then(({ data }) => {
    let { edges } = data.pages
    return edges
  })

  const exists = (page) => page.node.handle === route.path.replace(/\//g, '')
  if (!allShopifyPages.some(exists)) {
    return error({ statusCode: 404, message: 'Page not found' })
  }
}
