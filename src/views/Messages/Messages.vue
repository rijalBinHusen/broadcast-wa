<template>
    <div class="w3-margin-top">
      <form ref="spvForm" class="margin-bottom" @submit.prevent="handleSubmit">
      <p class="w3-row">New message title : </p>
      
      <input 
      v-model="form.titleMessage"
      class="w3-mobile w3-input w3-large w3-margin-bottom" 
      type="text" 
      placeholder="Title" 
      />
      
      <p class="w3-row">New message text : </p>
      <textarea class="w3-mobile" placeholder="Text message" v-model="form.message" style="width:100vw" name="message" id="message" cols="90" rows="10">
        
      </textarea>
  
      <Button 
        primary 
        class="w3-large" 
        :value="idEdit ? 'Update' : 'Add'" 
        type="button"
      />
      <Button 
        v-if="idEdit"
        danger 
        class="w3-large" 
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

        <Button 
          primary 
          value="Contacts" 
          :datanya="slotProp.prop.id" 
          type="button" 
          @click="editContacts" 
          />
      </Datatable>

      <Modal 
        :title="modalTitle" 
        :active="isModalActive" 
        @close="cancel"
      >
        <SelectContact 
          v-if="modalForm == 'editContacts'"
          :contactData="contactData"
          :contacts-selected="form.contacts"
          @updateContacts="handleUpdateContacts"
        >
        </SelectContact>
      </Modal>
  </template>
  
  <script setup lang="ts">
    import Button from "@/components/Button.vue";
    import Datatable from "@/components/Datatable.vue";
    import { ref } from "vue";
    import { Message, messageData } from "./messages";
    import Modal from "@/components/Modal.vue";
    import SelectContact from "./SelectContact.vue";
    import { Contact, contactData } from "../Contacts";
  
    const isModalActive = ref(false);
    const modalForm = ref('');  
    const modalTitle = ref('')
    const form = ref({ titleMessage: '', message: '', id: '', contacts: ['']});
    const idEdit = ref('');
    const messageOperation = new Message();
    const contactOperation = new Contact();
    
    function cancel () {
      idEdit.value = '';
      form.value = { titleMessage: '', message: '', id: '', contacts: [''] };
      isModalActive.value = false;
    }
  
    async function handleSubmit() {
      const isNotOkeToSend = !form.value.titleMessage || !form.value.message;
      
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

    async function editContacts (idMessage: string) {
      await edit(idMessage)
      
      isModalActive.value = true;
      modalForm.value = 'editContacts'
      modalTitle.value = 'Update contact message'
    }

    function handleUpdateContacts(contacts: string[]) {
      form.value.contacts = contacts.filter((contact => contact != ''));
      handleSubmit();
    }
    
  </script>
  