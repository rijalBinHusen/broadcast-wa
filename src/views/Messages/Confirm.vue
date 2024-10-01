<template>
      <div class="w3-padding-48 w3-center">
          <h4>
                {{ 
                    message || 'Apakah anda yakin akan menghapusnya' 
                }}
            </h4>
          <div class="w3-section">
            <Button
                primary
                value="Yes" 
                type="button"
                @click="$emit('confirm',  true)"

            />
            
            <Button
                danger
                value="No" 
                type="button"
                @click="$emit('confirm',   false)"

            />
          </div>
      </div>
</template>

<script lang="ts" setup>
    import { watch } from 'vue';
    import Button from "@/components/Button.vue"

    const emits = defineEmits(['confirm']);
    const props = defineProps({
        active: {
            type: Boolean,
            required: true
        },
        message: {
            type: String,
        }
    })

    function handleKeyDown (e: KeyboardEvent) {
        // if enter, klick the true button
        if(e.key == "Enter") emits("confirm", true)
    }

    watch(() => props.active, (newActive) => {
        if(props.active) {
        document.addEventListener("keydown", handleKeyDown);
        } else {
        document.removeEventListener("keydown", handleKeyDown);
        }
    })
    
</script>