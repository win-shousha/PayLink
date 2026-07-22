<template>
  <div class="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
    <h1 class="text-3xl font-bold mb-8 text-center">Connexion</h1>
    
    <form @submit.prevent="login" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Email ou téléphone</label>
        <input v-model="form.identifier" type="text" required class="input-field">
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Mot de passe</label>
        <input v-model="form.password" type="password" required class="input-field">
      </div>
      
      <button type="submit" class="btn-primary w-full">Se connecter</button>
    </form>
    
    <div class="mt-4 text-center">
      <p class="text-gray-600">Pas de compte? <RouterLink to="/register" class="text-primary font-bold hover:underline">S'inscrire</RouterLink></p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const form = ref({ identifier: '', password: '' })

const login = async () => {
  try {
    await authStore.login(form.value.identifier, form.value.password)
    router.push('/dashboard')
  } catch (error) {
    alert('Erreur de connexion')
  }
}
</script>
