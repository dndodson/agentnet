<template>
  <div class="min-h-screen">
    <header class="bg-white">
      <nav class="w-full px-4 py-4 flex justify-between items-center shadow">
        <h1 class="text-2xl font-bold text-gray-800">AgentNet</h1>
        <div>
          <router-link to="/login" class="text-blue-600 hover:text-blue-800">Login</router-link>
        </div>
      </nav>
    </header>
    <main class="container mx-auto px-4 py-8">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
