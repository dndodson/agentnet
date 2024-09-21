<template>
  <div class="min-h-screen">
    <header class="bg-white">
      <nav class="w-full px-4 py-4 flex justify-between items-center shadow">
        <h1 class="text-2xl font-bold text-gray-800">AgentNet</h1>
        <div>
          <button v-if="!session" @click="$router.push('/login')" class="text-blue-600 hover:text-blue-800">Login</button>
          <button v-else @click="handleLogout" class="text-blue-600 hover:text-blue-800">Log out</button>
        </div>
      </nav>
    </header>
    <main class="container px-4 py-8">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { supabase } from './lib/supabase'
import { useRouter } from 'vue-router'

export default {
  name: 'App',
  setup() {
    const session = ref(null)
    const router = useRouter()

    onMounted(() => {
      supabase.auth.getSession().then(({ data }) => {
        session.value = data.session
      })

      supabase.auth.onAuthStateChange((_, _session) => {
        session.value = _session
      })
    })

    const handleLogout = async () => {
      await supabase.auth.signOut()
      router.push('/')
    }

    return {
      session,
      handleLogout
    }
  }
}
</script>
