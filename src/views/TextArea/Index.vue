<template>
  <div style="width: 250px; margin: 10px">
    <Textarea
      id="app-search"
      icon="text"
      :value="textAreaValue"
      label="label"
      placeholder="placeholder"
      @update:value="updateTextAreaValue"
    />
  </div>
  <!-- <textarea></textarea> -->
</template>
<script setup lang="ts">
import Textarea from '@/components/ui/Textarea/Textarea.vue'
import { ref } from 'vue'
const textAreaValue = ref('')
const updateTextAreaValue = (value: string) => {
  textAreaValue.value = value
}
</script>
