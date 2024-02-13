<script setup lang="ts">
import { ref } from 'vue'
import Button from '@/components/ui/Button/Button.vue'
import Toggle from '@/components/ui/Toggle/Toggle.vue'
const toggleModel = ref(false)
const isToggleLoading = ref(false)
</script>
<template>
  <div class="view__container">
    <div>
      <h2>Ripple</h2>
      <Button label="label" v-ripple="{ value: 120, color: 'rgb(30, 230, 186)' }" />
    </div>
    <div>
      <h2>Disabled</h2>
      <Button label="label" disabled />
    </div>
    <div>
      <h2>No Decorations</h2>
      <Button label="label" noDecorations />
    </div>
    <div>
      <h2>Primary</h2>
      <Button label="label" primary />
    </div>
    <div>
      <h2>Slot</h2>
      <Button primary>slot</Button>
    </div>
  </div>
  <div class="hr"></div>
  <div class="view__container">
    <div>
      <h2>Toggle</h2>
      <Toggle v-model="toggleModel" :disabled="isToggleLoading" />
    </div>
    <div>
      <h2>Disabled</h2>
      <Toggle :disabled="true" />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.view__container {
  display: flex;
  div {
    padding: 0 20px;
  }
}
</style>
