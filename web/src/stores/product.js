import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '../services/api'

export const useProductStore = defineStore('product', () => {
  const products = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchProducts = async (category = null, page = 1) => {
    loading.value = true
    try {
      const params = { page, limit: 20 }
      if (category) params.category = category
      const response = await api.get('/products', { params })
      products.value = response.data.data.products
      return response.data.data
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const searchProducts = async (query, page = 1) => {
    loading.value = true
    try {
      const response = await api.get('/products/search', { params: { q: query, page } })
      return response.data.data
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const getProductById = async (id) => {
    loading.value = true
    try {
      const response = await api.get(`/products/${id}`)
      return response.data.data
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  return {
    products,
    loading,
    error,
    fetchProducts,
    searchProducts,
    getProductById
  }
})
