<template>
  <div id="app" class="min-h-screen bg-gray-50">
    <Navbar />
    <main class="py-8">
      <RouterView />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
</script>
