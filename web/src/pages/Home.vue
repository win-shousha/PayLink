<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <!-- Hero Section -->
    <div class="bg-gradient-to-r from-primary to-secondary rounded-lg text-white p-12 mb-12">
      <h1 class="text-4xl md:text-5xl font-bold mb-4">Bienvenue sur PayLink</h1>
      <p class="text-xl mb-8">Achetez vos services digitaux en toute sécurité</p>
      <RouterLink to="/products" class="btn-outline bg-white text-primary hover:bg-gray-100">Commencer</RouterLink>
    </div>

    <!-- Features -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
      <div class="card">
        <div class="text-3xl mb-4">🛡️</div>
        <h3 class="text-xl font-bold mb-2">Sécurisé</h3>
        <p class="text-gray-600">Vos transactions sont protégées par les meilleures standards de sécurité</p>
      </div>
      
      <div class="card">
        <div class="text-3xl mb-4">⚡</div>
        <h3 class="text-xl font-bold mb-2">Rapide</h3>
        <p class="text-gray-600">Livraison instantanée de vos services digitaux</p>
      </div>
      
      <div class="card">
        <div class="text-3xl mb-4">🌍</div>
        <h3 class="text-xl font-bold mb-2">Local</h3>
        <p class="text-gray-600">Support adapté à l'Afrique de l'Ouest</p>
      </div>
    </div>

    <!-- Categories -->
    <h2 class="text-3xl font-bold mb-8">Catégories populaires</h2>
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
      <RouterLink to="/products?category=streaming" class="card hover:shadow-lg transition cursor-pointer">
        <div class="text-4xl mb-4">📺</div>
        <h3 class="font-bold">Streaming</h3>
      </RouterLink>
      
      <RouterLink to="/products?category=ai" class="card hover:shadow-lg transition cursor-pointer">
        <div class="text-4xl mb-4">🤖</div>
        <h3 class="font-bold">IA</h3>
      </RouterLink>
      
      <RouterLink to="/products?category=games_pc" class="card hover:shadow-lg transition cursor-pointer">
        <div class="text-4xl mb-4">🎮</div>
        <h3 class="font-bold">Jeux PC</h3>
      </RouterLink>
      
      <RouterLink to="/products?category=gift_cards" class="card hover:shadow-lg transition cursor-pointer">
        <div class="text-4xl mb-4">🎁</div>
        <h3 class="font-bold">Cartes cadeaux</h3>
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>
