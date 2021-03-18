export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-generate#fallback
  generate: {
    fallback: true,
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: process.env.NUXT_ENV_SITE_TITLE,
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'robots', content: 'index,follow' },
      { name: 'googlebot', content: 'index,follow' },
      { name: 'application-name', content: process.env.NUXT_ENV_SITE_NAME },
      { name: 'theme-color', content: '#003049' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,600;1,400;1,600&family=Fira+Mono:wght@400;500;700&display=swap',
      },
      // override canonical URL on individual pages with hid
      { hid: 'canonical', rel: 'canonical', href: process.env.NUXT_ENV_BASE_URL },
    ],
  },

  styleResources: {
    scss: ['~/assets/styles/inc/*.scss'],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/styles/app'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/router-guards.js', '~/plugins/vue-inline-svg.js', '~/plugins/vue-awesome.js'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ['@nuxtjs/style-resources'],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['nuxt-shopify'],

  shopify: {
    domain: process.env.NUXT_ENV_SHOPIFY_DOMAIN,
    storefrontAccessToken: process.env.NUXT_ENV_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    unoptimized: true, // If you need to access Shopify Pages set to true, otherwise set to false (default)
  },

  loading: {
    color: '#f77f00',
    continuous: true,
    // throttle: 0,
  },

  router: {
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active is-active-exact',
    trailingSlash: true,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      preset: {
        features: {
          customProperties: false,
        },
      },
    },
    transpile: [/^vue-awesome/],
  },
}
