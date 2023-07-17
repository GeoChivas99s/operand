<template>
    <div class="login-page">
        <div class="login-page__form-container">
            <form @submit.prevent="onSubmit" class="login-page__form">
                <div class="login-page__form-title">
                    <h1>Entrar</h1>
                </div>
                <base-input v-model.trim="email" label="Digite o seu e-mail" type="email" place-holder="Digite aqui o seu e-mail"/>
                <div class="error" >Campo brigatório</div>
                <div class="error" >Insira um e-mail válido</div>
                <base-input
                v-model="password"
                label="Digite a sua password" type="password"
                place-holder="Digite aqui a sua password"
                />
                <div class="error">
                Campo obrigatório
                </div>
                <base-button :is-loading="isLoading" type="submit">Entrar</base-button>
            </form>
            <div>
                <router-link class="link" to="/register">Não tem uma conta? Clique aqui</router-link>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
import BaseInput from '@/components/BaseInput.vue'
import BaseButton from '@/components/BaseButton.vue'
// import { required, email } from 'vuelidate/lib/validators'
// import Swal from 'sweetalert2'

export default {
  components: {
    BaseInput,
    BaseButton
  },
  data () {
    return {
      email: null,
      password: null,
      isLoading: false
    }
  },
  methods: {
    ...mapActions({
      login: 'authStore/LOGIN'
    }),
    async onSubmit () {
      this.isLoading = true
      // this.$v.$touch()

      // const Isinvalid = await this.$v.$invalid
      // console.log(Isinvalid)
      // if (Isinvalid) {
      //   this.isLoading = false
      //   return
      // }

      // const { user, error } = await this.login({ email: this.email, password: this.password })
      const t = await this.login({ email: this.email, password: this.password })

      if (t) {
        this.$router.push('/').catch(() => {})
      } else {
        this.isLoading = false
        // eslint-disable-next-line no-undef
        // Swal.fire('Usuário ou senha inválidos!', '', 'error')
      }
    }
  }
  // validations () {
  //   return {
  //     email: { required, email },
  //     password: { required }
  //   }
  // }
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

    .link{
        font-size: 0.9rem;
    }

    .error{
        color: rgb(207, 66, 66);
        font-size: 0.9rem;
    }
  }
}
</style>
