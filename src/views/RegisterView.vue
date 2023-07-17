<template>
    <div class="login-page">
        <div class="login-page__form-container">
            <form @submit.prevent="onSubmit" class="login-page__form">
                <div class="login-page__form-title">
                    <h1>Registar</h1>
                </div>
                <base-input v-model="data.name" label="Digite o seu nome" place-holder="Nome" />
                <base-input v-model="data.birthDate" label="Digite a sua data de nascimento" type="date" />
                <base-input v-model="data.email" label="Digite o seu e-mail" place-holder="exemplo@gmail.com" />
                <base-input v-model="data.password" label="Digite a sua passowrd" place-holder="password" type="password" />
                <base-button :is-loading="isLoading" type="submit">Registar</base-button>
                {{ data.birthDate }}
            </form>
            <div>
                <router-link class="link" to="/login">Já tem uma conta? Clique aqui</router-link>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
import BaseInput from '@/components/BaseInput.vue'
import BaseButton from '@/components/BaseButton.vue'

export default {
  components: {
    BaseInput,
    BaseButton
  },
  data () {
    return {
      data: {
        name: '',
        birthDate: '',
        email: '',
        password: ''
      },
      isLoading: false
    }
  },
  methods: {
    ...mapActions({
      register: 'authStore/CREATE_USER'
    }),
    async onSubmit () {
      this.isLoading = true
      const response = await this.register(this.data)

      if (response.error) {
        this.isLoading = false
      }
    }
  }
}
</script>
<style lang="scss">
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  .login-page__form-container {
    width: 30rem;
    max-width: 95%;
    padding: 1.6rem 1.8rem;
    border-radius: 0.7rem;
    box-shadow: 0 0 6px rgb(225, 225, 225);

    .login-page__form {
      width: 100%;

      .login-page__form-title {
        text-align: center;
        margin-bottom: 1rem;
      }
    }
  }
}
</style>
