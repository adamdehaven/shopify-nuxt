<template>
  <footer class="footer">
    <div class="container">
      <div class="is-row is-vcentered">
        <div class="is-col footer-left">Shopify Nuxt</div>
        <div class="is-col footer-right"></div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
}
</script>

<style lang="scss">
.footer {
  color: $black;
  background-color: $white;
  border-top: 1px solid $black;
  margin: 0;
  padding: 3rem 1.5rem;
  font-size: 1.2rem;

  .footer-left {
    text-align: center;

    @media ($tablet) {
      text-align: left;
    }
  }

  .footer-right {
    text-align: center;

    @media ($tablet) {
      text-align: right;
    }
  }
}
</style>
