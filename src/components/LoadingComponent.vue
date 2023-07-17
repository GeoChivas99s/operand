<template>
    <div class="loader" :class="getSize()"></div>
</template>
<script>

export default {
  name: 'LoadingComponent',
  props: {
    size: {
      type: String,
      default: 'md'
    }
  },
  methods: {
    getSize () {
      return `loader-${this.size.size}`
    }
  }
}

</script>
<style scoped lang="scss">
$background: #ffffff50;
$circle: #ffffff;

.loader {
    border: 0.25rem solid $background;
    border-radius: 50%;
    border-top: 0.25rem solid $circle;
    width: 0.75rem;
    height: 0.75rem;
    -webkit-animation: spin 2s linear infinite;
    animation: spin 1s linear infinite;
}

.loader-sm {
    border: 0.188rem solid $background;
    border-top: 0.188rem solid $circle;
    width: 0.625rem;
    height: 0.625rem;
}

.loader-lg {
    border: 0.313rem solid $background;
    border-top: 0.313rem solid $circle;
    width: 1.2rem;
    height: 1.2rem;
}

@-webkit-keyframes spin {
    0% {
        -webkit-transform: rotate(0deg);
    }

    100% {
        -webkit-transform: rotate(360deg);
    }
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>
