<template>
    <div class="w3-center w3-margin-top w3-row">
      <form ref="spvForm" class="margin-bottom" @submit.prevent="handleSubmit">
      <p class="w3-col s2 w3-right-align w3-margin-right">Add new contact : </p>
      <input 
        v-model="form.name" 
        class="w3-col s2 w3-input w3-large w3-margin-right" 
        type="text" 
        placeholder="name" 
      />
      <Select 
        :options="mentionsData" 
        value="id"
        text="mention"
        @selected="form.mention = $event"
        title="Sebutan"
        :inselect="form.mention"
        />

      <input 
        v-model="form.phone" 
        class="w3-col s2 w3-input w3-large w3-margin-right" 
        type="text" 
        placeholder="Phone" 
      />
  
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
        v-if="renderTable"
        :datanya="contactData"
        :heads="['Nama', 'Sebutan']"
        :keys="['name', 'mentionName']"
        option
        id="tableContact"
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
    import Button from "@/components/Button.vue";
    import Datatable from "@/components/Datatable.vue";
    import Select from "@/components/Select.vue";
    // import { addItem, updateItem, lists as stateItems, getItemById, removeItem, get20Item } from '@/composable/components/Baseitem'
    // import { baseItem, lists as stateItems } from "./Baseitem"
    import { ref } from "vue";
    import { Mention, mentionsData } from "./Mentions"
    import { Contact, contactData } from "./Contacts";
  
    const form = ref({ phone: 0, name: '', mention: '' });
    const idEdit = ref('')
    const renderTable = ref(true);

    const mentionOperations = new Mention();
    const contactOperations = new Contact();
  
    function cancel () {
      idEdit.value = '';
      form.value = { phone: 0, name: '', mention: '' };
    }
  
    async function handleSubmit() {
      const isNotOkeToSend = !form.value.name ||  !form.value.mention || !form.value.phone;
      
      if(isNotOkeToSend) { 
        alert('Form tidak boleh kosong') 
        return
      };
      
      if(idEdit.value) await  contactOperations.contactUpdate({ id: idEdit.value,  ...form.value });
      else await contactOperations.contactAppend({...form.value, id: ''});
      cancel()
      
    }
    
    async function edit (idContact: string) {

      if(!idContact) return;

      idEdit.value = idContact;
      const item = await contactOperations.contactGetById(idContact);
      if(!item) return;

      form.value = item;
  
    }
    
  </script>
  