<template>
  <div class="control-panel flex h-[calc(100vh-var(--navbar-height))]">
    <div class="sidebar w-64 flex flex-col border-r border-gray-200">
      <div class="top-tabs p-4">
        <button class="tab w-full py-2 px-4 text-left bg-gray-100 rounded">My Agents</button>
      </div>
      <div class="bottom-tabs p-4">
        <button class="tab w-full py-2 px-4 text-left hover:bg-gray-100 rounded">Settings</button>
      </div>
    </div>
    <div class="main-content flex-grow p-6">
      <div v-if="!showCreateForm">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-2xl font-semibold">My Agents</h2>
          <button @click="showCreateForm = true" class="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        </div>
        <ul class="space-y-2">
          <!-- Agent list items will go here -->
        </ul>
      </div>
      <div v-else>
        <div class="flex items-center mb-4">
          <button @click="showCreateForm = false" class="mr-4 text-gray-600 hover:text-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <h2 class="text-2xl font-semibold">Create New Agent</h2>
        </div>
        <CreateChatbot @close="showCreateForm = false" />
      </div>
    </div>
  </div>
</template>

<script>
import CreateChatbot from '../components/CreateChatbot.vue'

export default {
  name: 'ControlPanel',
  components: {
    CreateChatbot
  },
  data() {
    return {
      showCreateForm: false
    }
  }
}
</script>