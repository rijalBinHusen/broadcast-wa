<template>
  <header>
    <div class="wrapper">
      <Sidebar @move-to-page="setPage($event)" />
			<component :is="activePage"></component>
    </div>
  </header>
</template>

<script setup lang="ts">
  import { ref, defineComponent } from "vue";
  import Sidebar from "./components/Sidebar.vue";
  import Mentions from "./views/Mentions.vue";
  import Contacts from "./views/Contacts.vue";
  import Messages from "./views/Messages.vue";
  import Links from "./views/Links.vue";
  
  const activePage = ref('Mentions');
  const pages = {
    Mentions,
    Contacts,
    Messages,
    Links
  }

  function setPage (pageName: keyof typeof pages) {
    activePage.value = pages[pageName];
  }
</script>