<template>
  <div v-if="active" style="display: block;" class="w3-modal">
    <div class="w3-modal-content w3-animate-zoom w3-round-large">
      <header v-if="!!title" class="w3-container w3-teal w3-round-large">
          <!-- v-if="modal.mode !== 'loading'" -->
        <span
          class="w3-xlarge w3-button w3-display-topright w3-teal w3-round-large w3-hover-none"
          @click="$emit('close')"
        >
          &times;
        </span>
        <h2 class="w3-center"> {{ title }} </h2>
      </header>
      <div
        class="w3-container margin-top w3-padding"
      >
        <slot style="min-height: 400px"> </slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { watch } from "vue"

const props = defineProps({
    title: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      required: true,
    },
    isConfirmDialog: {
      type: Boolean,
      required: true,
    }
  })

  const emits = defineEmits(['close'])

  function handleKeyDown (e: KeyboardEvent) {
    if(e.key == "Escape") emits("close");
  }

  
  watch(() => props.active, (newActive) => {
    if(props.active && !props.isConfirmDialog) {
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("keydown", handleKeyDown);
    }
  })
</script>
