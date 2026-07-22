import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '../services/api'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(localStorage.getItem('token'))
  const isAuthenticated = computed(() => !!token.value)

  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { identifier: email, password })
      token.value = response.data.data.accessToken
      user.value = response.data.data.user
      localStorage.setItem('token', token.value)
      return response.data.data
    } catch (error) {
      console.error('Login failed:', error)
      throw error
    }
  }

  const register = async (data) => {
    try {
      const response = await api.post('/auth/register', data)
      token.value = response.data.data.accessToken
      user.value = response.data.data.user
      localStorage.setItem('token', token.value)
      return response.data.data
    } catch (error) {
      console.error('Register failed:', error)
      throw error
    }
  }

  const logout = () => {
    token.value = null
    user.value = null
    localStorage.removeItem('token')
  }

  const updateProfile = async (data) => {
    try {
      const response = await api.put('/users/profile', data)
      user.value = response.data.data
      return response.data.data
    } catch (error) {
      console.error('Update profile failed:', error)
      throw error
    }
  }

  return {
    user,
    token,
    isAuthenticated,
    login,
    register,
    logout,
    updateProfile
  }
})
