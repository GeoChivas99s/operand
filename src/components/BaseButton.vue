<template>
    <div class="base-button">
        <button :type="type" :disabled="isLoading" @click="$emit('click')">
            <slot v-if="!isLoading" />
            <loading-component size="lg" v-if="isLoading" />
        </button>
    </div>
</template>
<script>
import LoadingComponent from './LoadingComponent.vue'

export default {
  name: 'ButtonComponent',
  components: {
    LoadingComponent
  },
  props: {
    type: {
      type: String,
      default: 'button'
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style lang="scss">
.base-button {
    button{
        border-radius: 0.7rem;
        padding: 0.9rem 0.7rem;
        border: none;
        outline: none;
        background-color: #e76f51;
        color: #fff;
        cursor: pointer;
        margin-bottom: 1.5rem;
        display: flex;
        justify-content: center;

        &:hover{
            background-color: #e76f51;
            filter: brightness(1.1);
        }

        &:disabled{
            background-color: #e76f51;
            opacity: 0.7;
            cursor: not-allowed;
        }
    }
}
</style>
