<template>
  <nav ref="navbar" class="navbar is-fixed-top is-black">
    <div class="container">
      <div class="navbar-brand">
        <NuxtLink class="navbar-item is-unselectable site-logo" to="/" exact>Shopify Nuxt</NuxtLink>
        <div
          class="navbar-burger ml-0"
          data-target="main-nav"
          :class="{ 'is-active': mobileMenuIsActive }"
          @click.prevent="setMobileMenuActive(!mobileMenuIsActive)"
        >
          <span class="has-background-white"></span>
          <span class="has-background-white"></span>
          <span class="has-background-white"></span>
        </div>
      </div>

      <div id="main-nav" class="navbar-menu" :class="{ 'is-active': mobileMenuIsActive }">
        <div class="navbar-start">
          <NuxtLink to="/about/" class="navbar-item">About</NuxtLink>
          <NuxtLink to="/features/" class="navbar-item">Features</NuxtLink>
        </div>

        <div class="navbar-end"></div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapMutations } from 'vuex'
import debounce from 'lodash.debounce'

export default {
  name: 'Navbar',
  data() {
    return {
      navbarHeight: 70,
    }
  },
  computed: {
    mobileMenuIsActive() {
      return this.$store.state.navbar.mobileMenuIsActive
    },
  },
  watch: {
    $route: {
      handler(route) {
        if (process.client) {
          // Close mobile menu on route change
          this.setMobileMenuActive(false)
        }
      },
      deep: true,
    },
  },
  mounted() {
    if (process.client) {
      window.addEventListener('resize', this.onResize)
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize)
  },
  methods: {
    onResize: debounce(function () {
      // Close mobile menu on resize
      this.setMobileMenuActive(false)
    }, 200),
    ...mapMutations({
      setMobileMenuActive: 'navbar/setMobileMenuActive',
    }),
  },
}
</script>

<style lang="scss">
.navbar {
  height: $navbar-height;
  box-shadow: $box-shadow;
  border-bottom: 1px solid $white;
  transition: all 0.1s ease-in-out;

  .navbar-item {
    &:focus {
      background-color: transparent !important;
    }
  }

  .site-logo {
    > img {
      height: 3rem;

      @media (min-width: 380px) {
        height: 4rem;
      }

      @media ($tablet) {
        height: 4.5rem;
      }
    }
  }

  .navbar-item {
    @media ($tablet) {
      &.is-active,
      &:hover,
      &:focus,
      &:active {
        border-bottom: 1px solid $white;
      }
    }
  }

  .site-logo {
    background-color: transparent !important;

    > img {
      width: auto;
      max-height: none;
      height: 3rem;

      @media (min-width: 380px) {
        height: 4rem;
      }

      @media ($tablet) {
        height: 5.5rem;
      }

      @media ($tablet-wide) {
        height: 6rem;
      }
    }
  }

  .navbar-burger {
    span {
      height: 2px;
    }

    &:focus,
    &:hover {
      background-color: transparent;
    }
  }

  .navbar-item {
    color: $black;
    font-size: 1.8rem;
    font-weight: 400;
    transition: all 0.2s ease-in-out;
    border-bottom: 1px solid transparent;

    @media ($tablet) {
      padding: 0.5rem 1.5rem;
    }
  }

  .button .icon > img {
    margin-right: 0.25rem !important;
  }

  // Mobile menu
  @media ($under-tablet) {
    .navbar-menu {
      border-bottom: 1px solid $white;
      background-color: darken($black, 6%);
      box-shadow: $box-shadow;

      .navbar-item {
        color: $white;
        padding-top: 1.5rem;
        padding-bottom: 1.5rem;

        &:not(:last-of-type) {
          border-bottom: 1px solid $white;
        }
      }
    }
  }
}
</style>
