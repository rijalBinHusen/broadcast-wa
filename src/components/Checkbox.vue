<template>
    <input 
        :name="checkboxName" 
        :id="label" 
        class="w3-check" 
        type="checkbox" @click="check"
        :checked="isChecked"
    >
    <label :for="label" class="w3-margin-left"> {{ label }}</label>
    <p></p>
</template>

<script lang="ts" setup>
    const  props = defineProps({
        label: {
            type: String,
            required: true,
        },
        value: {
            required: true,
        },
        checkboxName: {
            type: String,
            required: true
        },
        isChecked: Boolean
    });

    const emits = defineEmits(["check"]);
    function check() { emits("check", props.value)}
</script>