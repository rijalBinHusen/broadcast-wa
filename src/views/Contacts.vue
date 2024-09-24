<template>
    <div class="w3-center w3-margin-top w3-row">
      <form ref="spvForm" class="margin-bottom" @submit.prevent="handleSubmit">
      <p class="w3-col s2 w3-right-align w3-margin-right">Add new contact : </p>
      <input 
        v-model="phone" 
        class="w3-col s2 w3-input w3-large w3-margin-right" 
        type="text" 
        placeholder="Phone" 
      />
      <input 
        v-model="name" 
        class="w3-col s2 w3-input w3-large w3-margin-right" 
        type="text" 
        placeholder="name" 
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
        :datanya="data"
        :heads="['Nama']"
        :keys="['name']"
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
    // import { addItem, updateItem, lists as stateItems, getItemById, removeItem, get20Item } from '@/composable/components/Baseitem'
    // import { baseItem, lists as stateItems } from "./Baseitem"
    import { onMounted, ref } from "vue";
  
    const form = ref({ phone: 0, name: '' });
    const idEdit = ref('')
    const data = ref([]);
    const renderTable = ref(true);
  
    function cancel () {
      idEdit.value = '';
      form.value = { phone: 0, name: '' };
    }
  
    async function handleSubmit() {
      const isOkeToSend = phone.value !== '';
      
      if(!isOkeToSend) { 
        alert('Form tidak boleh kosong') 
        return
      };
  
      if(idEdit.value) {
        alert("Function not implemented yet")
        // await updateItem(editId.value, kode.value, name.value);
        
    } else {
        
        alert("Function not implemented yet")
        // await addItem(kode.value, name.value);
        
    }
  
    }
    
    async function edit (phone: string) {
        alert("Function not implemented yet")
  
    //   editId.value = phone;
    //   const item = await getItemById(idItem);
    //   kode.value = item?.kode;
    //   name.value = item?.name;
  
    } 
  
    // onMounted(async () => {
    //   await getAllItems();
    //   cancel();
    //   renewList();
    // })
    
  </script>
  