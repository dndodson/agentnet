<template>
    <div class="control-panel">
      <div class="sidebar">
        <div class="top-tabs">
          <button class="tab active">Dashboard</button>
        </div>
        <div class="content">
          <!-- Content area -->
        </div>
        <div class="bottom-tabs">
          <button class="tab">Settings</button>
        </div>
      </div>
      <div class="main-content">
        <!-- Main content area -->
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ControlPanel',
  }
  </script>
  
  <style scoped>
  .control-panel {
    display: flex;
    height: calc(100vh - var(--navbar-height));
  }
  
  .sidebar {
    width: 200px;
    display: flex;
    flex-direction: column;
    border-right: 1px solid #ccc;
  }
  
  .top-tabs, .bottom-tabs {
    padding: 10px;
  }
  
  .content {
    overflow-y: auto; /* Add scrollbar to content if needed */
  }
  
  .tab {
    display: block;
    width: 100%;
    padding: 10px;
    text-align: left;
    background: none;
    border: none;
    cursor: pointer;
  }
  
  .tab.active {
    background-color: #e0e0e0;
  }
  
  .main-content {
    flex-grow: 1;
    padding: 20px;
  }
  </style>