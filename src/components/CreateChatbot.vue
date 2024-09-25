<template>
  <div class="max-w-md mx-auto">
    <h2 class="text-2xl font-bold mb-4 text-gray-800">Create Agent</h2>
    <div v-if="errorMessage" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
      <strong class="font-bold">Error: </strong>
      <span class="block sm:inline"> {{ errorMessage }}</span>
      <span class="absolute top-0 bottom-0 right-0 px-4 py-3" @click="errorMessage = ''">
        <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
      </span>
    </div>
    <form @submit.prevent="createChatbot" class="space-y-4">
      <div>
        <label for="chatbotName" class="block mb-1 text-gray-700">Agent Name</label>
        <input
          type="text"
          id="chatbotName"
          v-model="chatbotName"
          class="w-full px-3 py-2 border rounded text-gray-800"
        />
      </div>
      <div>
        <label for="urlToScrape" class="block mb-1 text-gray-700">Site URL</label>
        <input
          type="url"
          id="urlToScrape"
          v-model="urlToScrape"
          class="w-full px-3 py-2 border rounded text-gray-800"
        />
      </div>
      <div>
        <label for="sourceText" class="block mb-1 text-gray-700">Additional Source Text</label>
        <textarea
          id="sourceText"
          v-model="sourceText"
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
  </div>
</template>

<script>
import { supabase } from '../lib/supabase'

export default {
  name: 'CreateChatbot',
  emits: ['success', 'error'],
  data() {
    return {
      chatbotName: '',
      urlToScrape: '',
      sourceText: '',
      errorMessage: '',
    }
  },
  methods: {
    async createChatbot() {
      if (!this.chatbotName || (!this.urlToScrape && !this.sourceText)) {
        this.errorMessage = 'Please provide a name and either a URL or additional source text.';
        return;
      }

      try {
        const { data, error } = await supabase.functions.invoke('createChatbot', {
          body: { 
            chatbotName: this.chatbotName, 
            urlsToScrape: this.urlToScrape ? [this.urlToScrape] : undefined,
            sourceText: this.sourceText || undefined
          },
        })

        if (error) {
          if (error.context && error.context instanceof Response) {
            const responseData = await error.context.json();
            if (responseData && responseData.error) {
              let errorMessage = responseData.error;
              if (responseData.details) {
                errorMessage += `. Details: ${JSON.stringify(responseData.details.message)}`;
              }
              throw new Error(errorMessage);
            }
          }
          // If we couldn't get a specific error message, throw the original error
          throw error;
        }

        this.$emit('success', { name: this.chatbotName, id: data.chatbotId })
        this.resetForm()
      } catch (error) {
        console.error('Error creating chatbot:', error.message)
        this.errorMessage = error.message;
      }
    },
    resetForm() {
      this.chatbotName = ''
      this.urlToScrape = ''
      this.sourceText = ''
      this.errorMessage = ''
    },
  },
}
</script>
