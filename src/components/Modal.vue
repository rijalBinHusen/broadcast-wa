<template>
  <div v-if="active" style="display: block;" class="w3-modal">
    <div class="w3-modal-content w3-animate-zoom w3-round-large">
      <header v-if="!!title" class="w3-container w3-teal w3-round-large">
          <!-- v-if="modal.mode !== 'loading'" -->
        <span
          class="w3-xlarge w3-button w3-display-topright w3-teal w3-round-large w3-hover-none"
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
import { onMounted, onUnmounted } from "vue"

const props = defineProps({
    title: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      required: true,
    }
  })

  const emits = defineEmits(['close'])
  
  onMounted(() => {
    window.addEventListener("keydown", (e) => {
      if(e.keyCode == 27) {
          emits("close")
        }
    })
  })

  onUnmounted(() => window.removeEventListener("keydown"))
</script>
