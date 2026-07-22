<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h1 class="text-4xl font-bold mb-8">Mes commandes</h1>
    
    <div v-if="orderStore.orders.length" class="space-y-4">
      <div v-for="order in orderStore.orders" :key="order.id" class="card">
        <div class="flex justify-between items-start">
          <div>
            <h3 class="text-xl font-bold">{{ order.product.name }}</h3>
            <p class="text-gray-600">Commande #{{ order.id.slice(0, 8) }}</p>
            <p class="text-sm text-gray-500 mt-2">{{ new Date(order.createdAt).toLocaleDateString() }}</p>
          </div>
          <div class="text-right">
            <p class="text-2xl font-bold text-primary">{{ order.totalAmount }} XOF</p>
            <span :class="['px-3 py-1 rounded-full text-sm font-semibold', statusClass(order.status)]">
              {{ order.status }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="card text-center py-12">
      <p class="text-gray-500 text-lg">Vous n'avez pas encore de commandes</p>
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

const statusClass = (status) => {
  const classes = {
    pending: 'bg-yellow-100 text-yellow-800',
    payment_confirmed: 'bg-blue-100 text-blue-800',
    processing: 'bg-purple-100 text-purple-800',
    completed: 'bg-green-100 text-green-800',
    failed: 'bg-red-100 text-red-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}
</script>
