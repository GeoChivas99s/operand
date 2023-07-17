<template>
    <div class="edit-modal">
        <div class="content">
            <form @submit.prevent="onSubmit">
                <h1>Editar usuário</h1>
                <div>
                    <label>Nome</label>
                    <base-input v-model="userData.name" />
                </div>
                <div>
                    <label>Data de nascimento</label>
                    <base-input type="date" v-model="userData.birthDate" />
                </div>
                <div class="buttons">
                    <base-button type="submit">Salvar</base-button>
                    <base-button @click="$emit('close')">Cancelar</base-button>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
import BaseInput from '@/components/BaseInput.vue'
import BaseButton from '@/components/BaseButton.vue'
import Swal from 'sweetalert2'

export default {
  components: {
    BaseInput,
    BaseButton
  },
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      userData: {
        name: '',
        birthDate: ''
      }
    }
  },
  methods: {
    ...mapActions({
      updateUser: 'authStore/UPDATE_USER'
    }),
    async onSubmit () {
      await this.updateUser(this.userData)
      this.$emit('close')
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Uusário atualizado com sucesso!',
        showConfirmButton: false,
        timer: 1500
      })
    }
  },
  mounted () {
    this.userData = this.user
  }
}
</script>
<style lang="scss">
.edit-modal {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    display: flex;
    justify-content: center;
    align-items: center;

    .content {
        width: 60rem;

        @media screen and (max-width: 768px) {
        width: 95%;
        }
        background-color: #fff;
        border-radius: 0.7rem;
        padding: 0.3rem 1rem 1rem;

        .buttons{
            display: flex;
            justify-content: flex-end;
            margin-top: 1rem;

            .base-button {
                margin-left: 1rem;

                &:first-child {
                    button{
                        background-color: rgb(100, 164, 4);
                    }
                }
            }

        }
    }
}
</style>
