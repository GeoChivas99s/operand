// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyAafd-LxxZnls3Ve8KYNsokBxTR-4RjD9M',
  authDomain: 'operand-14ea7.firebaseapp.com',
  projectId: 'operand-14ea7',
  storageBucket: 'operand-14ea7.appspot.com',
  messagingSenderId: '7621196892',
  appId: '1:7621196892:web:e4ff36241617072f0fba99',
  measurementId: 'G-1WX0VNGR0P'
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
