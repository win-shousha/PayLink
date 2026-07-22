<template>
  <footer class="bg-gray-900 text-white mt-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 class="text-xl font-bold mb-4">PayLink</h3>
          <p class="text-gray-400">Plateforme de paiement en ligne sécurisée en Afrique de l'Ouest</p>
        </div>
        
        <div>
          <h4 class="font-semibold mb-4">Produits</h4>
          <ul class="space-y-2 text-gray-400">
            <li><RouterLink to="/products" class="hover:text-white transition">Tous les produits</RouterLink></li>
            <li><RouterLink to="/faq" class="hover:text-white transition">FAQ</RouterLink></li>
          </ul>
        </div>
        
        <div>
          <h4 class="font-semibold mb-4">Support</h4>
          <ul class="space-y-2 text-gray-400">
            <li><a href="mailto:support@paylink.com" class="hover:text-white transition">Email</a></li>
            <li><RouterLink to="/support" class="hover:text-white transition" v-if="authStore.isAuthenticated">Tickets</RouterLink></li>
          </ul>
        </div>
        
        <div>
          <h4 class="font-semibold mb-4">Légal</h4>
          <ul class="space-y-2 text-gray-400">
            <li><a href="#" class="hover:text-white transition">Conditions</a></li>
            <li><a href="#" class="hover:text-white transition">Confidentialité</a></li>
          </ul>
        </div>
      </div>
      
      <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
        <p>&copy; 2024 PayLink. Tous droits réservés.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()
</script>
