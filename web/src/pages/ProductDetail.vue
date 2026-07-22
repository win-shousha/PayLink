<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    <div v-if="product" class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Image -->
      <div>
        <img v-if="product.image" :src="product.image" :alt="product.name" class="w-full rounded-lg">
        <div v-else class="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400">Pas d'image</div>
      </div>
      
      <!-- Details -->
      <div>
        <h1 class="text-4xl font-bold mb-4">{{ product.name }}</h1>
        <p class="text-gray-600 mb-4">{{ product.description }}</p>
        
        <div class="mb-6">
          <span class="text-4xl font-bold text-primary">{{ product.price }} XOF</span>
          <div class="flex items-center mt-2">
            <span class="text-yellow-500 text-xl">⭐ {{ product.rating }}</span>
            <span class="text-gray-500 ml-2">({{ product.reviewCount }} avis)</span>
          </div>
        </div>
        
        <button @click="addToCart" class="btn-primary w-full mb-4">Acheter maintenant</button>
        <button class="btn-outline w-full">Ajouter aux favoris</button>
        
        <!-- Variants -->
        <div v-if="variants.length" class="mt-8">
          <h3 class="text-xl font-bold mb-4">Variantes</h3>
          <div class="space-y-2">
            <div v-for="variant in variants" :key="variant.id" class="card cursor-pointer hover:border-primary">
              <div class="flex justify-between items-center">
                <span>{{ variant.name }}</span>
                <span class="font-bold">{{ variant.price }} XOF</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useProductStore } from '../stores/product'
import { useOrderStore } from '../stores/order'

const route = useRoute()
const productStore = useProductStore()
const orderStore = useOrderStore()
const product = ref(null)
const variants = ref([])

onMounted(async () => {
  product.value = await productStore.getProductById(route.params.id)
})

const addToCart = async () => {
  try {
    const order = await orderStore.createOrder(product.value.id, product.value.price)
    alert('Commande créée avec succès')
  } catch (error) {
    alert('Erreur lors de la création de la commande')
  }
}
</script>
