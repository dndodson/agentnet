<template>
    <div class="max-w-md mx-auto">
      <h2 class="text-2xl font-bold mb-4 text-gray-800">Login</h2>
      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label for="email" class="block mb-1 text-gray-700">Email</label>
          <input type="email" id="email" v-model="email" required class="w-full px-3 py-2 border rounded text-gray-800">
        </div>
        <div>
          <label for="password" class="block mb-1 text-gray-700">Password</label>
          <input type="password" id="password" v-model="password" required class="w-full px-3 py-2 border rounded text-gray-800">
        </div>
        <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Login</button>
      </form>
    </div>
  </template>
  
  <script>
  import { supabase } from '../supabase'

  export default {
    name: 'Login',
    data() {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      async handleLogin() {
        try {
          const { user, error } = await supabase.auth.signIn({
            email: this.email,
            password: this.password,
          })
          if (error) throw error
          console.log('User logged in:', user)
          // TODO: Redirect to dashboard or home page
        } catch (error) {
          console.error('Error logging in:', error.message)
          // TODO: Show error message to user
        }
      }
    }
  }
  </script>