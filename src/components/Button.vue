<template>
    <button v-if="type === 'button'" :class="className" :style="style" @click="trigger">
      <slot></slot>
      {{ value }}
    </button>
  
    <a v-if="type === 'link'" :href="href" :class="className" @click="trigger">
      <slot></slot>
      {{ value }}
    </a>
  </template>
  
  <script lang="ts" setup>
  import { computed } from 'vue';

  /**
  <Button primary value="Periode" type="button" @trig="addPeriod" />
   */

   const props = defineProps({
      style: Object,
      datanya: String ,
      danger: Boolean,
      primary: Boolean,
      secondary: Boolean,
      value: String,
      type: {
        type: String,
        required: true,
      },
      class: String,
      href: String,
      icon: String,
      small: Boolean,
      noborder: Boolean,
      nomargin: Boolean
    });

    const className = computed(() => {
      let classList = ['w3-border'];
        if (props.type == "button") classList.push("w3-button");
        if (!props.nomargin) classList.push(" w3-margin-right")
        if (!props.noborder) classList.push("w3-round")
        if (props.small) classList.push("w3-small");
        if (props.primary) classList.push("w3-teal");
        if (props.secondary) classList.push("w3-aqua");
        if (props.danger) classList.push("w3-pink");
        if (props.class) classList.push(props.class);
  
        return classList.join(" ");
    })

    const emits = defineEmits(['click'])

    function trigger() {
      emits("click", props.datanya);
    }
  </script>