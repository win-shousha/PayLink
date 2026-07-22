<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h1 class="text-4xl font-bold mb-8">Support</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div class="md:col-span-2">
        <div class="card mb-8">
          <h2 class="text-xl font-bold mb-4">Créer un ticket</h2>
          <form @submit.prevent="createTicket" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Sujet</label>
              <input v-model="form.subject" type="text" required class="input-field">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea v-model="form.message" required class="input-field h-32"></textarea>
            </div>
            <select v-model="form.priority" class="input-field">
              <option value="low">Basse priorité</option>
              <option value="medium">Priorité normale</option>
              <option value="high">Haute priorité</option>
            </select>
            <button type="submit" class="btn-primary w-full">Envoyer</button>
          </form>
        </div>
      </div>
      
      <div class="card">
        <h3 class="text-lg font-bold mb-4">Aide rapide</h3>
        <ul class="space-y-2">
          <li><a href="#" class="text-primary hover:underline">FAQ</a></li>
          <li><a href="mailto:support@paylink.com" class="text-primary hover:underline">Email support</a></li>
          <li><a href="#" class="text-primary hover:underline">Documentation</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  subject: '',
  message: '',
  priority: 'medium'
})

const createTicket = () => {
  alert('Ticket créé avec succès')
  form.value = { subject: '', message: '', priority: 'medium' }
}
</script>
