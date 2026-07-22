<template>
  <nav class="bg-white shadow-sm sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex items-center">
          <RouterLink to="/" class="text-2xl font-bold text-primary">PayLink</RouterLink>
        </div>
        
        <div class="hidden md:flex items-center space-x-8">
          <RouterLink to="/products" class="text-gray-600 hover:text-primary transition">Produits</RouterLink>
          <RouterLink to="/faq" class="text-gray-600 hover:text-primary transition">FAQ</RouterLink>
          
          <template v-if="authStore.isAuthenticated">
            <RouterLink to="/dashboard" class="text-gray-600 hover:text-primary transition">Tableau de bord</RouterLink>
            <RouterLink to="/orders" class="text-gray-600 hover:text-primary transition">Commandes</RouterLink>
            <div class="relative group">
              <button class="flex items-center text-gray-600 hover:text-primary transition">
                <span>{{ authStore.user?.firstName }}</span>
              </button>
              <div class="absolute right-0 mt-0 w-48 bg-white rounded-lg shadow-lg hidden group-hover:block">
                <RouterLink to="/profile" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">Profil</RouterLink>
                <button @click="logout" class="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">Déconnexion</button>
              </div>
            </div>
          </template>
          
          <template v-else>
            <RouterLink to="/login" class="btn-outline">Connexion</RouterLink>
            <RouterLink to="/register" class="btn-primary">Inscription</RouterLink>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const logout = () => {
  authStore.logout()
  router.push('/')
}
</script>
