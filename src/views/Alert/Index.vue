<template>
  <div>
    <Alert
      type="warning"
      title="Some title"
      v-model="modelWarning"
      position="top-left"
      tooltipText="Tooltip text"
    />
    <Alert
      type="success"
      title="Some title"
      v-model="modelSuccess"
      position="top-right"
      tooltipText="Tooltip text"
    />
    <Alert
      type="info"
      title="Some title"
      v-model="modelInfo"
      position="bottom-right"
      tooltipText="Tooltip text"
    />
    <Alert
      type="danger"
      title="Some title"
      v-model="modelDanger"
      position="bottom-left"
      tooltipText="Tooltip text"
    />
    <button @click="setModel">fadsf</button>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import Alert from '@/components/ui/Alert/Alert.vue'
const modelWarning = ref()
const modelSuccess = ref()
const modelInfo = ref()
const modelDanger = ref()

const setModel = () => {
  if (!model.value) model.value = true
}
</script>
