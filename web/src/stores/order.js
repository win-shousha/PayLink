import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '../services/api'

export const useOrderStore = defineStore('order', () => {
  const orders = ref([])
  const loading = ref(false)
  const error = ref(null)

  const createOrder = async (productId, amount) => {
    loading.value = true
    try {
      const response = await api.post('/orders', { productId, amount })
      return response.data.data
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const fetchOrders = async (page = 1) => {
    loading.value = true
    try {
      const response = await api.get('/orders', { params: { page } })
      orders.value = response.data.data.orders
      return response.data.data
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const getOrderById = async (id) => {
    try {
      const response = await api.get(`/orders/${id}`)
      return response.data.data
    } catch (err) {
      error.value = err.message
    }
  }

  return {
    orders,
    loading,
    error,
    createOrder,
    fetchOrders,
    getOrderById
  }
})
