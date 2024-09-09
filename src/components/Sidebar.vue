  
<script setup lang="ts">

    const navItems = [
        { id: 1, label: 'Mentions' },
        { id: 2, label: 'Contacts' },
        { id: 3, label: 'Messages' },
        { id: 4, label: 'Links' },
    ];
</script>

<template>
    <div class="sidebar">
      <h2 class="sidebar-header">Broadcast</h2>
      <ul class="sidebar-nav">
        <li v-for="item in navItems" :key="item.id">
            <a href="#">{{ item.label }}</a>
        </li>
      </ul>
    </div>
  </template>
  
  <style scoped>
  .sidebar {
    background-color: var(--sidebar-bg-color);
    color: var(--sidebar-text-color);
    padding: 1rem;
    width: 200px;
    height: 100vh;
  }
  
  .sidebar-header {
    margin-bottom: 1rem;
  }
  
  .sidebar-nav {
    list-style: none;
    padding: 0;
  }
  
  .sidebar-nav li {
    margin-bottom: 0.5rem;
  }
  
  .sidebar-nav a {
    display: block;
    padding: 0.5rem;
    text-decoration: none;
    color: inherit;
  }
  
  .sidebar-nav a:hover {
    background-color: var(--sidebar-hover-bg-color);
  }
  
  /* Dark mode styles */
  .dark-theme .sidebar {
    background-color: var(--dark-sidebar-bg-color);
    color: var(--dark-sidebar-text-color);
  }
  
  .dark-theme .sidebar-nav a:hover {
    background-color: var(--dark-sidebar-hover-bg-color);
  }
  </style>