<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h1 class="text-4xl font-bold mb-8">Mes paiements</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="card">
        <p class="text-gray-600 text-sm">Paiements totaux</p>
        <p class="text-3xl font-bold">12</p>
      </div>
      <div class="card">
        <p class="text-gray-600 text-sm">Montant total</p>
        <p class="text-3xl font-bold">250,000 XOF</p>
      </div>
      <div class="card">
        <p class="text-gray-600 text-sm">En attente</p>
        <p class="text-3xl font-bold text-warning">2</p>
      </div>
    </div>
    
    <div class="card">
      <h2 class="text-xl font-bold mb-4">Historique des paiements</h2>
      <div class="space-y-2">
        <div class="flex justify-between items-center border-b pb-3">
          <div>
            <p class="font-semibold">Paiement #1</p>
            <p class="text-sm text-gray-500">22 Juillet 2024</p>
          </div>
          <div class="text-right">
            <p class="font-bold">50,000 XOF</p>
            <span class="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">Confirmé</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
