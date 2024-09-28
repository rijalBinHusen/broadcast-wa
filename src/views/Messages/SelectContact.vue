<template>
    <form @submit.prevent="handleSubmit">
        <span v-for="contact in contactData">
            <Checkbox 
                :checkbox-name="contact.name" 
                :label="contact.name" 
                :value="contact.name"
                :is-checked="contactsSelected.includes(contact.id)"
                @check="updateContactsSelected(contact.id)"
            />
        </span>
        <Button 
            primary 
            class="w3-large" 
            value="Update contact" 
            type="button"
        />
    </form>
</template>

<script lang="ts" setup>
import Checkbox from "@/components/Checkbox.vue";
import Button from "@/components/Button.vue";
import { ref, onMounted, type PropType } from "vue"
import { type contact } from "../Contacts";

const props = defineProps({
    contactData: {
        type: Array as PropType<contact[]>,
        required: true
    },
    contactsSelected: {
        type: Array as PropType<string[]>,
        required: true

    }
})

const contactsSelected = ref(<string[]>[]);
const emits = defineEmits(['updateContacts']);

function handleSubmit() { emits("updateContacts", contactsSelected.value) }

function updateContactsSelected(contactId: string) {
    if (contactsSelected.value.includes(contactId)) contactsSelected.value = contactsSelected.value.filter(id => id !== contactId);
    else contactsSelected.value.push(contactId);
}

onMounted(() => contactsSelected.value = [ ...props.contactsSelected])

</script>