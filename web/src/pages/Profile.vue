<template>
  <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
    <h1 class="text-4xl font-bold mb-8">Mon Profil</h1>
    
    <div class="card">
      <form @submit.prevent="updateProfile" class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Prénom</label>
            <input v-model="form.firstName" type="text" class="input-field">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Nom</label>
            <input v-model="form.lastName" type="text" class="input-field">
          </div>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input v-model="form.email" type="email" disabled class="input-field opacity-50">
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
          <input v-model="form.phone" type="tel" disabled class="input-field opacity-50">
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Pays</label>
          <input v-model="form.country" type="text" class="input-field">
        </div>
        
        <button type="submit" class="btn-primary w-full">Mettre à jour</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()
const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  country: ''
})

onMounted(() => {
  if (authStore.user) {
    form.value = {
      firstName: authStore.user.firstName,
      lastName: authStore.user.lastName,
      email: authStore.user.email,
      phone: authStore.user.phone,
      country: authStore.user.country || ''
    }
  }
})

const updateProfile = async () => {
  try {
    await authStore.updateProfile(form.value)
    alert('Profil mis à jour')
  } catch (error) {
    alert('Erreur lors de la mise à jour')
  }
}
</script>
