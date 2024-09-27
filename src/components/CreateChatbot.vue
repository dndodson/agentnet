<template>
  <div>
    <form @submit.prevent="createAgent">
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
        <label for="urlToCrawl" class="block mb-1 text-gray-700">Site URL</label>
        <input
          type="url"
          id="urlToCrawl"
          v-model="urlToCrawl"
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
        class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed flex items-center justify-center"
        :disabled="isLoading"
      >
        <span v-if="isLoading">
          Creating...
        </span>
        <span v-else>Create Agent</span>
      </button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'
import { supabase } from '../lib/supabase'

export default {
  name: 'CreateChatbot',
  emits: ['success', 'error'],
  setup(props, { emit }) {
    const chatbotName = ref('')
    const urlToCrawl = ref('')
    const sourceText = ref('')
    const isLoading = ref(false)

    const createAgent = async () => {
      if (!chatbotName.value || (!urlToCrawl.value && !sourceText.value)) {
        emit('error', 'Please provide a name and either a URL or additional source text.')
        return
      }

      isLoading.value = true
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
          throw new Error('User not authenticated')
        }

        const { data: newAgent, error: dbError } = await supabase
          .from('agents')
          .insert({
            name: chatbotName.value,
            status: 'PENDING',
            user_id: user.id
          })
          .select()
          .single()

        if (dbError) throw dbError

        emit('success', newAgent, chatbotName.value, urlToCrawl.value, sourceText.value)

      } catch (error) {
        console.error('Error creating agent:', error)
        emit('error', error.message)
      } finally {
        isLoading.value = false
      }
    }

    return {
      chatbotName,
      urlToCrawl,
      sourceText,
      isLoading,
      createAgent,
    }
  }
}
</script>
