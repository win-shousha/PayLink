<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h1 class="text-4xl font-bold mb-8">Détails de la commande</h1>
    
    <div v-if="order" class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div class="md:col-span-2">
        <div class="card mb-6">
          <h2 class="text-xl font-bold mb-4">Produit</h2>
          <div class="flex justify-between items-center">
            <div>
              <h3 class="text-lg font-semibold">{{ order.product.name }}</h3>
              <p class="text-gray-600">{{ order.product.description }}</p>
            </div>
            <span class="text-2xl font-bold">{{ order.amount }} XOF</span>
          </div>
        </div>
        
        <div class="card">
          <h2 class="text-xl font-bold mb-4">Statut</h2>
          <p :class="['px-4 py-2 rounded-lg font-semibold text-center', statusClass(order.status)]">
            {{ order.status }}
          </p>
        </div>
      </div>
      
      <div class="card">
        <h2 class="text-xl font-bold mb-4">Résumé</h2>
        <div class="space-y-3">
          <div class="flex justify-between">
            <span>Montant</span>
            <span class="font-semibold">{{ order.amount }} XOF</span>
          </div>
          <div class="flex justify-between">
            <span>Commission</span>
            <span class="font-semibold">{{ order.commission }} XOF</span>
          </div>
          <div class="flex justify-between">
            <span>Frais</span>
            <span class="font-semibold">{{ order.fees }} XOF</span>
          </div>
          <div class="border-t pt-3 flex justify-between">
            <span class="font-bold">Total</span>
            <span class="font-bold text-lg text-primary">{{ order.totalAmount }} XOF</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useOrderStore } from '../stores/order'

const route = useRoute()
const orderStore = useOrderStore()
const order = ref(null)

onMounted(async () => {
  order.value = await orderStore.getOrderById(route.params.id)
})

const statusClass = (status) => {
  const classes = {
    pending: 'bg-yellow-100 text-yellow-800',
    payment_confirmed: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    failed: 'bg-red-100 text-red-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}
</script>
