<template>
    <form class="margin-bottom" @submit.prevent="handleSubmit">
      <p class="w3-row">New message title : </p>
      
      <input 
      v-model="form.titleMessage"
      class="w3-mobile w3-input w3-large w3-margin-bottom" 
      type="text" 
      placeholder="Title" 
      />
      
      <p class="w3-row">New message text : </p>
      <textarea class="w3-mobile" placeholder="Text message" v-model="form.message" style="width:100%" name="message" id="message" cols="90" rows="10">
        
      </textarea>
  
      <Button 
        primary 
        class="w3-large" 
        :value="message.id ? 'Update' : 'Add'" 
        type="button"
      />
    </form>
</template>

<script lang="ts" setup>

import Button from "@/components/Button.vue";
import { ref, onMounted } from "vue";

const props = defineProps({
    message: {
        id: String,
        titleMessage: String, 
        message: String,
    }
})

const emits = defineEmits(['submit']);
const form = ref({ titleMessage: '', message: '' });

function handleSubmit () {
    emits("submit", form.value)
}

onMounted(() => {
    form.value.titleMessage = props.message.titleMessage
    form.value.message = props.message.message
})

</script>