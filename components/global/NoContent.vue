<template>
  <div class="is-row is-centered">
    <div class="is-col is-half-tablet">
      <div class="box">
        <div class="is-row">
          <div class="is-col has-text-centered">
            <slot name="default"></slot>
          </div>
        </div>
        <div v-if="!!$slots['buttons']" class="is-row is-centered">
          <div class="is-col">
            <div class="buttons is-centered">
              <slot name="buttons"></slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NoContent',
}
</script>
