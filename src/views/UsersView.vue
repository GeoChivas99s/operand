<template>
  <div class="users-page">
    <div>
        <base-button @click="handleLogOut">
            Sair
        </base-button>
    </div>
    <table class="users-table">
      <tr>
        <th>Name</th>
        <th>E-mail</th>
        <th>Data de nascimento</th>
        <th>Actions</th>
      </tr>
      <tr v-for="user in users" :key="user.id">
        <td>{{user.name}}</td>
        <td>{{user.email}}</td>
        <td>{{user.birthDate}}</td>
        <td>
          <font-awesome-icon @click="handleEditUser(user)" class="edit" icon="pen-to-square" />
          <font-awesome-icon v-if="user.email !== currentUser.email" class="delete" @click="handleDeleteUser(user.id)" icon="trash" />
        </td>
      </tr>
    </table>
    <edit-user-modal @close="closeModal" v-if="showModal" :user="userToEdit" />
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import EditUserModal from '@/components/EditUserModal.vue'
import BaseButton from '@/components/BaseButton.vue'
import Swal from 'sweetalert2'

export default {
  name: 'UsersView',
  components: {
    BaseButton,
    EditUserModal
  },
  data () {
    return {
      userToEdit: null,
      showModal: false
    }
  },
  computed: {
    ...mapGetters({
      users: 'authStore/users',
      currentUser: 'authStore/user'
    })
  },
  mounted () {
    this.getUsers()
    console.log(this.user)
  },
  methods: {
    ...mapActions({
      getUsers: 'authStore/GET_USERS',
      logOut: 'authStore/LOG_OUT',
      deleteUser: 'authStore/DELETE_USER'
    }),
    handleLogOut () {
      this.logOut()
    },
    handleEditUser (user) {
      this.userToEdit = { ...user }
      this.showModal = true
    },
    async handleDeleteUser (id) {
      Swal.fire({
        title: 'Deseja eliminar este usuário?',
        showCancelButton: true,
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não'
      }).then(async (result) => {
        if (result.isConfirmed) {
          await this.deleteUser({ id: id })
          Swal.fire('Usuário eliminado!', '', 'success')
        }
      })
    },
    closeModal () {
      this.showModal = false
    }
  }
}
</script>
<style lang="scss">
.users-page{
    padding: 2rem;
}

.users-table {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;

  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
  }

  tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  tr:hover {
    background-color: #ddd;
  }

  th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #04aa6d;
    color: white;
  }

  svg{
    cursor: pointer;
    margin-right: 0.5rem;
  }

  .edit{
    color: #ffb703;
  }

  .delete{
    color: red;
  }
}
</style>
