<template>
    <div class="w3-center w3-margin-top w3-row">
      <form ref="spvForm" class="margin-bottom" @submit.prevent="handleSubmit">
      <p class="w3-col s2 w3-right-align w3-margin-right">Add new item : </p>
      <input 
        v-model="mention" 
        class="w3-col s2 w3-input w3-large w3-margin-right" 
        type="text" 
        placeholder="Mention" 
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
        :datanya="mentionsData"
        :heads="['Sebutan']"
        :keys="['mention']"
        option
        id="tableMention"
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
    import { Mention, mentionsData } from "./Mentions";
    import { onMounted, ref } from "vue";
  
    const mentionOperation = new Mention();
    const mention = ref('');
    const idEdit = ref('')
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
  
      if(idEdit.value) await mentionOperation.mentionUpdate(idEdit.value,  mention.value);
      else await mentionOperation.mentionAppend(mention.value);

      cancel();
  
    }
    
    async function edit (idMention: string) {

      if(!idMention) return;
  
      idEdit.value = idMention;
      const data = await mentionOperation.mentionGetById(idMention);
      if(!data?.id) return;
      mention.value = data.mention;
  
    }
    
  </script>
  