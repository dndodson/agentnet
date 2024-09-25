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
        <div v-if="showSuccessBanner" class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong class="font-bold">Success!</strong>
          <span class="block sm:inline"> New agent created successfully.</span>
          <span class="absolute top-0 bottom-0 right-0 px-4 py-3" @click="showSuccessBanner = false">
            <svg class="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
          </span>
        </div>
        <ul class="space-y-4">
          <li v-for="agent in agents" :key="agent.id" class="bg-white shadow rounded-lg p-4">
            <h3 class="text-lg font-semibold mb-2">{{ agent.name }}</h3>
            <p class="text-gray-600">ID: {{ agent.id }}</p>
          </li>
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
        <div v-if="errorMessage" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong class="font-bold">Error!</strong>
          <span class="block sm:inline"> {{ errorMessage }}</span>
          <span class="absolute top-0 bottom-0 right-0 px-4 py-3" @click="errorMessage = ''">
            <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
          </span>
        </div>
        <CreateChatbot @success="handleSuccess" @error="handleError" />
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
      showCreateForm: false,
      agents: [],
      errorMessage: '',
      showSuccessBanner: false
    }
  },
  methods: {
    handleSuccess(agent) {
      this.agents.push(agent)
      this.showCreateForm = false
      this.errorMessage = ''
      this.showSuccessBanner = true
      // Automatically hide the success banner after 5 seconds
      setTimeout(() => {
        this.showSuccessBanner = false
      }, 5000)
    },
    handleError(message) {
      this.errorMessage = message
    }
  }
}
</script>