<template>
  <div class="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
    <h1 class="text-3xl font-bold mb-8 text-center">Inscription</h1>
    
    <form @submit.prevent="register" class="space-y-4">
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Prénom</label>
          <input v-model="form.firstName" type="text" required class="input-field">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Nom</label>
          <input v-model="form.lastName" type="text" required class="input-field">
        </div>
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
        <input v-model="form.email" type="email" required class="input-field">
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
        <input v-model="form.phone" type="tel" required class="input-field" placeholder="+229XXXXXXXXX">
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Mot de passe</label>
        <input v-model="form.password" type="password" required class="input-field">
      </div>
      
      <button type="submit" class="btn-primary w-full">S'inscrire</button>
    </form>
    
    <div class="mt-4 text-center">
      <p class="text-gray-600">Déjà inscrit? <RouterLink to="/login" class="text-primary font-bold hover:underline">Se connecter</RouterLink></p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: ''
})

const register = async () => {
  try {
    await authStore.register(form.value)
    router.push('/dashboard')
  } catch (error) {
    alert('Erreur lors de l\'inscription')
  }
}
</script>
