<template>
    <div class="w3-center w3-margin-top">
      <form ref="spvForm" class="margin-bottom" @submit.prevent="handleSubmit">
      <p class="w3-col s2 w3-right-align w3-margin-right">Add new link : </p>

      <Select 
        :options="[
            {id:1, isi: 'satu'}, 
            {id:2, isi: 'DUA'}, 
            {id:3, isi: 'TIGA'},
        ]" 
        value="id"
        text="isi"
        @selected=""
        title="Periode"
        />
        <!-- :inselect="" -->

      <textarea v-model="form.link" name="message" id="message" cols="30" rows="10">

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
        v-if="renderTable"
        :datanya="data"
        :heads="['Title', 'Message']"
        :keys="['title', 'message']"
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
    import Select from "@/components/Select.vue"
    import { onMounted, ref } from "vue";
    // import { addItem, updateItem, lists as stateItems, getItemById, removeItem, get20Item } from '@/composable/components/Baseitem'
    // import { baseItem, lists as stateItems } from "./Baseitem"
  
    const selectData = ref([
        {id: '', title:'Badminton'}
    ])
    const form = ref({ idMessage: '', link: ''});
    const idEdit = ref('')
    const data = ref([]);
    const renderTable = ref(true);
  
    function cancel () {
      idEdit.value = '';
      mention.value = '';
    }
  
    async function handleSubmit() {
      const isOkeToSend = mention.value !== '';
      
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
    
    async function edit (idMention: string) {
        alert("Function not implemented yet")
  
    //   editId.value = idMention;
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
  