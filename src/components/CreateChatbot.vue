<template>
  <div class="max-w-md mx-auto">
    <h2 class="text-2xl font-bold mb-4 text-gray-800">Create Agent</h2>
    <form @submit.prevent="createChatbot" class="space-y-4">
      <div>
        <label for="chatbotName" class="block mb-1 text-gray-700">Agent Name</label>
        <input
          type="text"
          id="chatbotName"
          v-model="chatbotName"
          required
          class="w-full px-3 py-2 border rounded text-gray-800"
        />
      </div>
      <div>
        <label for="sourceText" class="block mb-1 text-gray-700">Source Text</label>
        <textarea
          id="sourceText"
          v-model="sourceText"
          required
          class="w-full px-3 py-2 border rounded text-gray-800"
        ></textarea>
      </div>
      <button
        type="submit"
        class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Create Agent
      </button>
    </form>
    <div v-if="chatbotUrl" class="mt-4">
      <p>
        Your chatbot has been created:
        <a :href="chatbotUrl" target="_blank">{{ chatbotUrl }}</a>
      </p>
    </div>
  </div>
</template>

<script>
import { supabase } from '../lib/supabase'

export default {
  name: 'CreateChatbot',
  data() {
    return {
      chatbotName: '',
      sourceText: '',
      chatbotUrl: '',
    }
  },
  methods: {
    async createChatbot() {
      try {
        const { data, error } = await supabase.functions.invoke('createChatbot', {
          body: { chatbotName: this.chatbotName, sourceText: this.sourceText },
        })

        if (error) {
          throw error
        }

        this.chatbotUrl = data.chatbot_url
      } catch (error) {
        console.error('Error creating chatbot:', error.message)
        alert('Failed to create chatbot. Please try again.')
      }
    },
  },
}
</script>
