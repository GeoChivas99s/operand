<template>
  <div class="base-input">
    <div class="base-input__label">
      <label>{{ label }}</label>
    </div>
    <div class="base-input__input-holder">
      <input
        :value="value"
        @input="$emit('input', $event.target.value)"
        :type="type"
        :placeholder="placeHolder"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: 'BaseInput',
  props: {
    type: {
      type: String,
      default: 'text'
    },
    label: {
      type: String
    },
    placeHolder: {
      type: String,
      default: 'Digite aqui'
    },
    value: {
      type: String
    },
    error: {
      required: false
    }
  }
}
</script>
<style lang="scss">
.base-input {
  .base-input__label {
    font-size: 0.9rem;
    font-weight: 500;
    margin-bottom: 0.6rem;
  }

  .base-input__input-holder {
    border: 1px solid rgb(156, 156, 156);
    display: flex;
    border-radius: 0.7rem;
    margin-bottom: 1.5rem;
    display: flex;
    flex-direction: column;

    .haserror {
      border: 1px solid red;
    }

    input {
      width: 100%;
      border-radius: inherit;
      padding: 0.9rem 0.7rem;
      border: none;
      outline: none;

      &::placeholder {
        color: rgba(156, 156, 156, 0.561);
      }
    }
  }
}
</style>
