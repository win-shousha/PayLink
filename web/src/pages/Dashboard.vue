<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h1 class="text-4xl font-bold mb-8">Tableau de bord</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      <div class="card">
        <h3 class="text-gray-600 text-sm font-semibold mb-2">Commandes totales</h3>
        <p class="text-3xl font-bold">12</p>
      </div>
      
      <div class="card">
        <h3 class="text-gray-600 text-sm font-semibold mb-2">Dépenses totales</h3>
        <p class="text-3xl font-bold">250,000 XOF</p>
      </div>
      
      <div class="card">
        <h3 class="text-gray-600 text-sm font-semibold mb-2">Transactions</h3>
        <p class="text-3xl font-bold">8</p>
      </div>
    </div>
    
    <div class="card">
      <h2 class="text-xl font-bold mb-4">Commandes récentes</h2>
      <div v-if="orderStore.orders.length" class="space-y-2">
        <div v-for="order in orderStore.orders.slice(0, 5)" :key="order.id" class="flex justify-between items-center border-b pb-2">
          <div>
            <p class="font-semibold">{{ order.product.name }}</p>
            <p class="text-sm text-gray-500">{{ new Date(order.createdAt).toLocaleDateString() }}</p>
          </div>
          <span class="font-bold">{{ order.totalAmount }} XOF</span>
        </div>
      </div>
      <p v-else class="text-gray-500">Pas de commandes</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useOrderStore } from '../stores/order'

const orderStore = useOrderStore()

onMounted(() => {
  orderStore.fetchOrders()
})
</script>
