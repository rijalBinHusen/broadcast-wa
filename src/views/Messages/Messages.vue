<template>
  <Button 
    primary 
    class="w3-right w3-margin-top w3-large" 
    value="New message"
    @click="newMessageForm" 
    type="button"
  />
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

    <Button 
      primary 
      value="Broadcast" 
      :datanya="slotProp.prop.id" 
      type="button" 
      @click="broadcastMessage" 
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

    <MessageCreate
      v-if="modalForm == 'newMessage'"
      :message="form"
      @submit="handlCreateMessage"
    >

    </MessageCreate>
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
    import MessageCreate from "./MessageCreate.vue"
  
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
      modalForm.value = "";
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

      if(modalForm.value) return;
      launchModal("newMessage", "Update message")
    }

    async function editContacts (idMessage: string) {
      await edit(idMessage)
      launchModal('editContacts', 'Update contact message');
    }

    function handleUpdateContacts(contacts: string[]) {
      form.value.contacts = contacts.filter((contact => contact != ''));
      handleSubmit();
    }

    function handlCreateMessage(message: { message: string, titleMessage: string }) {
      form.value = { ...form.value, ...message }
      handleSubmit();
    }

    function newMessageForm () {
      launchModal('newMessage', 'Create new message');
    }

    function launchModal(modalFormToSet: string, modalTitleToSet: string) {
      modalForm.value = modalFormToSet;
      modalTitle.value = modalTitleToSet;
      isModalActive.value = true;
    }

    async function broadcastMessage(idMessage: string) {
      if(!idMessage) return;
      const data = await messageOperation.messageGetById(idMessage);
      if(!data) return;
      
      for(let datum of data.contacts) {

        let messageToSend = await messageOperation.messageReplacePlaceholder(data.message, datum)

        if(!messageToSend.contact.phone) continue;
        const confirmMessage = `Kirim pesan ini ke ${messageToSend.contact.name}`;
        const confirm = window.confirm(confirmMessage);

        if(!confirm) continue;
        const confirmLink = `https://wa.me/${messageToSend.contact.phone}?text=${encodeURI(messageToSend.message)}`;
        window.open(confirmLink, '_blank');
        // console.log(confirmLink)
      }
    }
    
  </script>
  