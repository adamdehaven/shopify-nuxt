<template>
  <div
    v-if="active"
    class="component-base-loading-skeleton is-unselectable"
    :class="[
      {
        'is-animated': animated,
        'has-text-left': align === 'left',
        'has-text-centered': align === 'center',
        'has-text-right': align === 'right',
      },
    ]"
    title="Loading..."
    :style="{ cursor: 'wait' }"
    aria-label="Loading..."
    role="status"
  >
    <div v-for="n in count" :key="'skeleton-item-' + n" class="skeleton-item" :style="skeletonItemStyles"></div>
  </div>
</template>

<script>
export default {
  name: 'BaseLoading',
  props: {
    active: {
      type: Boolean,
      default: true,
    },
    animated: {
      type: Boolean,
      default: true,
    },
    height: {
      type: [Number, String],
      default: null,
    },
    width: {
      type: [Number, String],
      default: null,
    },
    randomWidth: {
      type: Boolean,
      default: false,
    },
    circle: {
      type: Boolean,
      default: false,
    },
    align: {
      type: String,
      default: null,
      validator(value) {
        return ['left', 'center', 'right'].indexOf(value) !== -1
      },
    },
    count: {
      type: Number,
      default: 1,
    },
  },
  computed: {
    skeletonItemStyles() {
      let skeletonWidth = this.width
      // If randomWidth is true, calculate random width percentage
      if (!this.width && this.randomWidth) {
        skeletonWidth = Math.floor(Math.random() * (10 - 1 + 1) + 1) * 10 + '%'
      }

      return {
        width: !skeletonWidth ? null : isNaN(skeletonWidth) ? skeletonWidth : skeletonWidth + 'px',
        height: !this.height ? null : isNaN(this.height) ? this.height : this.height + 'px',
        borderRadius: this.circle ? '50%' : null,
      }
    },
  },
}
</script>

<style lang="scss">
$loading-skeleton-line-height: 1;
$loading-skeleton-background: linear-gradient(
  90deg,
  $border-color 25%,
  rgba($border-color, 0.5) 50%,
  $border-color 75%
);
$loading-skeleton-border-radius: $radius;
$loading-skeleton-duration: 1.5s;

.component-base-loading-skeleton {
  width: 100%;
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 0.5rem;

  &:first-of-type {
    margin-top: 0 !important;
  }

  > .skeleton-item {
    width: 100%;
    max-width: 100%;
    display: inline-block;
    background: $loading-skeleton-background;
    background-size: 400% 100%;
    line-height: $loading-skeleton-line-height;
    border-radius: $loading-skeleton-border-radius;
    margin-top: 0.5rem;

    &:first-of-type {
      margin-top: 0;
    }

    &::after {
      content: '\00a0';
    }
  }

  &.is-animated {
    > .skeleton-item {
      animation: skeletonIsLoading $loading-skeleton-duration infinite;
    }
  }
}

@keyframes skeletonIsLoading {
  0% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0 50%;
  }
}
</style>
