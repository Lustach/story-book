<template>
  <Select
    v-model="selectModel"
    icon="lang"
    :options="selectOptions"
    value-key="key"
    data-qa="select"
    style="width: 250px; margin: 10px; height: 50px"
  />
</template>
<script setup lang="ts">
import Select from '@/components/ui/Select/Select.vue'
import { ref } from 'vue'
const selectModel = ref('')
const selectOptions = ref([{ key: 'Key', value: 'value' }])
</script>
