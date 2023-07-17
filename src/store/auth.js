import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '@/config/firebase'
import { setDoc, doc, collection, serverTimestamp, getDocs, deleteDoc, updateDoc } from 'firebase/firestore'
import { FirebaseError } from 'firebase/app'
import Swal from 'sweetalert2'
import router from '@/router/index.js'

const collectionRef = collection(db, 'users')

export const authStore = {
  namespaced: true,
  state: {
    user: {},
    users: []
  },
  mutations: {
    setUser (state, user) {
      state.user = user
    },
    setUsers (state, users) {
      state.users = users
    }
  },
  actions: {
    async LOGIN ({ commit }, { email, password }) {
      try {
        const response = await signInWithEmailAndPassword(
          auth,
          email,
          password
        )
        if (response.user) {
          commit('setUser', response.user)
          await router.push('/users')
          return { user: response.user }
        }
      } catch (error) {
        if (error instanceof FirebaseError) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Usuário ou senha inválidos'
          })
        }
      }
    },
    async CREATE_USER ({ commit }, { email, password, name, birthDate }) {
      try {
        const response = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        )
        if (response.user) {
          const documentRef = doc(collectionRef)

          await setDoc(documentRef, {
            name,
            email,
            birthDate,
            created_at: serverTimestamp()
          })

          commit('setUser', response.user)

          await router.push('/users')
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Usuário foi cadastrado com sucesso',
            showConfirmButton: false,
            timer: 1500
          })

          return response.user
        }
      } catch (error) {
        if (error instanceof FirebaseError) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.message
          })
          return { error }
        }
      }
    },
    async UPDATE_USER ({ commit, dispatch }, { id, name, birthDate }) {
      const documentRef = doc(db, 'users', id)

      await updateDoc(documentRef, {
        name,
        birthDate,
        updated_at: serverTimestamp()
      })

      await dispatch('GET_USERS')
    },
    async DELETE_USER ({ commit, dispatch }, { id }) {
      const docRef = doc(db, 'users', id)
      if (auth.currentUser.uid === id) {
        await dispatch('LOG_OUT')
      }

      await deleteDoc(docRef)
      await dispatch('GET_USERS')
    },
    async GET_USERS ({ commit }) {
      const users = []
      const querySnapshot = await getDocs(collectionRef)

      querySnapshot.forEach((doc) => {
        users.push({
          id: doc.id,
          ...doc.data()
        })
      })

      commit('setUsers', users)
    },
    async LOG_OUT ({ commit }) {
      await auth.signOut()
      commit('setUser', null)
      await router.push('/login')
    }
  },
  getters: {
    user (state) {
      return state.user
    },
    users (state) {
      return state.users
    }
  }
}
