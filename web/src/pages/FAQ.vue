<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h1 class="text-4xl font-bold mb-8">FAQ - Questions Fréquemment Posées</h1>
    
    <!-- Search -->
    <div class="mb-8 flex gap-4">
      <input 
        v-model="searchQuery" 
        type="text" 
        placeholder="Rechercher dans la FAQ..." 
        class="input-field flex-1"
        @input="search"
      >
      <select v-model="selectedCategory" class="input-field md:w-48" @change="filterByCategory">
        <option value="">Toutes les catégories</option>
        <option value="account">Compte</option>
        <option value="payments">Paiements</option>
        <option value="orders">Commandes</option>
        <option value="support">Support</option>
      </select>
    </div>
    
    <!-- FAQ Items -->
    <div class="space-y-4">
      <div v-for="faq in filteredFaqs" :key="faq.id" class="card cursor-pointer hover:shadow-lg transition" @click="toggleFaq(faq.id)">
        <div class="flex justify-between items-start">
          <h3 class="text-lg font-semibold flex-1">{{ faq.question }}</h3>
          <span class="text-2xl ml-4">{{ expandedFaqs.includes(faq.id) ? '−' : '+' }}</span>
        </div>
        
        <Transition name="expand">
          <div v-if="expandedFaqs.includes(faq.id)" class="mt-4 pt-4 border-t">
            <p class="text-gray-700 mb-4">{{ faq.answer }}</p>
            <div class="flex gap-2">
              <button @click.stop="markHelpful(faq.id)" class="btn-outline text-sm">👍 Utile</button>
              <button @click.stop="markUnhelpful(faq.id)" class="btn-outline text-sm">👎 Pas utile</button>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import api from '../services/api'

const faqs = ref([])
const searchQuery = ref('')
const selectedCategory = ref('')
const expandedFaqs = ref([])

const filteredFaqs = computed(() => {
  return faqs.value.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                         faq.answer.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesCategory = !selectedCategory.value || faq.category === selectedCategory.value
    return matchesSearch && matchesCategory
  })
})

onMounted(async () => {
  try {
    const response = await api.get('/faq')
    faqs.value = response.data.data.faqs
  } catch (error) {
    console.error('Failed to load FAQ:', error)
  }
})

const toggleFaq = (id) => {
  const index = expandedFaqs.value.indexOf(id)
  if (index > -1) {
    expandedFaqs.value.splice(index, 1)
  } else {
    expandedFaqs.value.push(id)
  }
}

const search = () => {
  // Search is handled by computed property
}

const filterByCategory = () => {
  // Filter is handled by computed property
}

const markHelpful = async (id) => {
  try {
    await api.post(`/faq/${id}/helpful`)
    alert('Merci pour votre retour!')
  } catch (error) {
    console.error('Error marking as helpful:', error)
  }
}

const markUnhelpful = async (id) => {
  try {
    await api.post(`/faq/${id}/unhelpful`)
    alert('Merci pour votre retour!')
  } catch (error) {
    console.error('Error marking as unhelpful:', error)
  }
}
</script>

<style scoped>
.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease;
}

.expand-enter-from,
.expand-leave-to {
  opacity: 0;
  max-height: 0;
}
</style>
