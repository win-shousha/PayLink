<template>
  <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <div class="text-6xl mb-4">404</div>
    <h1 class="text-4xl font-bold mb-4">Page non trouvée</h1>
    <p class="text-gray-600 mb-8">La page que vous recherchez n'existe pas.</p>
    <RouterLink to="/" class="btn-primary">Retour à l'accueil</RouterLink>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>
