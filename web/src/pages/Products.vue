<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h1 class="text-4xl font-bold mb-8">Produits</h1>
    
    <!-- Search and Filters -->
    <div class="mb-8 flex flex-col md:flex-row gap-4">
      <input 
        v-model="searchQuery" 
        type="text" 
        placeholder="Rechercher un produit..." 
        class="input-field flex-1"
        @input="search"
      >
      <select 
        v-model="selectedCategory" 
        class="input-field md:w-48"
        @change="fetchProducts"
      >
        <option value="">Toutes les catégories</option>
        <option value="streaming">Streaming</option>
        <option value="ai">IA</option>
        <option value="games_pc">Jeux PC</option>
        <option value="gift_cards">Cartes cadeaux</option>
      </select>
    </div>

    <!-- Products Grid -->
    <div v-if="!productStore.loading" class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <RouterLink 
        v-for="product in productStore.products" 
        :key="product.id"
        :to="`/products/${product.id}`"
        class="card hover:shadow-lg transition cursor-pointer"
      >
        <img v-if="product.image" :src="product.image" :alt="product.name" class="w-full h-48 object-cover rounded mb-4">
        <h3 class="font-bold text-lg mb-2">{{ product.name }}</h3>
        <p class="text-gray-600 text-sm mb-4 line-clamp-2">{{ product.description }}</p>
        <div class="flex justify-between items-center">
          <span class="text-2xl font-bold text-primary">{{ product.price }} XOF</span>
          <span class="text-yellow-500">⭐ {{ product.rating }}</span>
        </div>
      </RouterLink>
    </div>
    
    <div v-else class="flex justify-center items-center h-96">
      <div class="text-gray-500">Chargement...</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useProductStore } from '../stores/product'

const productStore = useProductStore()
const searchQuery = ref('')
const selectedCategory = ref('')
const searchTimeout = ref(null)

onMounted(() => {
  fetchProducts()
})

const fetchProducts = () => {
  productStore.fetchProducts(selectedCategory.value || null)
}

const search = () => {
  clearTimeout(searchTimeout.value)
  searchTimeout.value = setTimeout(() => {
    if (searchQuery.value) {
      productStore.searchProducts(searchQuery.value)
    } else {
      fetchProducts()
    }
  }, 300)
}
</script>
