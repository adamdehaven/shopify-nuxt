<template>
  <div class="page page-error">
    <section class="section is-fullwidth-container is-small">
      <div class="container">
        <div class="is-row is-vcentered error-header">
          <div class="is-col has-text-left-tablet">
            <h1 class="has-text-black">
              <span v-if="error.statusCode === 404">{{ error.message || 'Page not found' }}</span>
              <span v-else>Well, this isn't great</span>
            </h1>
          </div>
        </div>
      </div>
    </section>

    <section class="section is-fullwidth-container">
      <div class="container">
        <div class="is-row is-centered">
          <div class="is-col is-half-tablet">
            <div class="box">
              <div class="is-row">
                <div class="is-col has-text-centered">
                  <h3>You landed on a page that doesn't exist or has&nbsp;been&nbsp;moved.</h3>
                  <br />
                  <p>Use one of the links below to get back on the&nbsp;right&nbsp;track.</p>
                </div>
              </div>
              <div class="is-row is-centered">
                <div class="is-col">
                  <div class="buttons is-centered">
                    <a v-if="canGoBack" @click.prevent="$router.back()" class="button is-black is-outlined" href="#"
                      >Go Back</a
                    >
                    <NuxtLink to="/" :exact="true" class="button is-black">Take Me Home</NuxtLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'Error',
  props: ['error'],
  data() {
    return {
      requestedPath: this.$route.params.pathMatch,
      canGoBack: true,
    }
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      // access to component's instance using `vm` .
      // If user cannot go back, set canGoBack to false
      if (!from.name) {
        vm.canGoBack = false
      }
      next()
    })
  },
}
</script>

<style lang="scss">
.page-error {
  .error-header {
    @media ($under-tablet) {
      display: flex;
      flex-flow: column-reverse;
    }
  }

  h1 {
    font-size: 3rem;
    margin-top: 2rem;

    @media ($tablet) {
      margin: 0;
    }
  }

  .error-header-image {
    max-width: 300px;
    margin: 0 auto;
  }
}
</style>
