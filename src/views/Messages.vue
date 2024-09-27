<template>
    <div class="w3-center w3-margin-top">
      <form ref="spvForm" class="margin-bottom" @submit.prevent="handleSubmit">
      <p class="w3-col s2 w3-right-align w3-margin-right">Add new messages : </p>
      <input 
        v-model="form.titleMessage" 
        class="w3-col s2 w3-input w3-large w3-margin-right" 
        type="text" 
        placeholder="Title" 
      />

      <textarea v-model="form.message" name="message" id="message" cols="30" rows="10">

      </textarea>
  
      <Button 
        primary 
        class="w3-left w3-large w3-margin-left" 
        :value="idEdit ? 'Update' : 'Add'" 
        type="button"
      />
      <Button 
        v-if="idEdit"
        danger 
        class="w3-left w3-large" 
        value="Cancel" 
        type="button" 
        @click="cancel" 
      />
      </form>
    </div>
      <Datatable
        :datanya="messageData"
        :heads="['Title', 'Message']"
        :keys="['titleMessage', 'message']"
        option
        id="tableBaseFile"
        v-slot:default="slotProp"
      >
        <Button 
          primary 
          value="Edit" 
          :datanya="slotProp.prop.id" 
          type="button" 
          @click="edit($event)" 
          />
      </Datatable>
  </template>
  
  <script setup lang="ts">
    import Button from "@/components/Button.vue"
    import Datatable from "@/components/Datatable.vue"
    import { ref } from "vue";
    import { Message, messageData } from "./messages"
  
    const form = ref({ titleMessage: '', message: '', id: '', contacs: ['']});
    const idEdit = ref('')
    const messageOperation = new Message();
  
    function cancel () {
      idEdit.value = '';
      form.value = { titleMessage: '', message: '', id: '', contacs: [''] }
    }
  
    async function handleSubmit() {
      const isNotOkeToSend = !form.value.titleMessage || !form.value.message;
      console.log(isNotOkeToSend, form.value)
      if(isNotOkeToSend) { 
        alert('Form tidak boleh kosong') 
        return
      };
      const dataToSend = JSON.parse(JSON.stringify(form.value));
  
      if(idEdit.value) messageOperation.messageUpdate(dataToSend)
      else messageOperation.messageAppend(dataToSend)
      
      cancel()
  
    }
    
    async function edit (messageId: string) {
  
      idEdit.value = messageId;
      const data = await messageOperation.messageGetById(messageId)
      if(!data) return;
      form.value = data;
  
    }
    
  </script>
  