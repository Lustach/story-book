<script setup lang="ts">
import { ref } from 'vue'
import Button from '@/components/ui/Button/Button.vue'
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
</template>
<style lang="scss" scoped>
.view__container {
  display: flex;
  div {
    padding: 0 20px;
  }
}
</style>
