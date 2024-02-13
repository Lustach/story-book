<template>
  <label class="toggle">
    <input type="checkbox" v-model="toggle" :disabled="disabled" />
    <div class="slider round" :class="{ disabled: disabled }"></div>
  </label>
</template>
<script setup lang="ts">
import { defineModel } from 'vue'
const toggle = defineModel<boolean>({ default: false })
const props = defineProps<{
  disabled?: boolean
}>()
</script>
<style lang="scss" scoped>
.toggle {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.toggle input {
  display: none;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #c8c8c8;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: '';
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: #767679;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #6dd1b0;
}

input:focus + .slider {
  box-shadow: 0 0 1px #6dd1b0;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
  background-color: #00885b;
}

.slider.round {
  border-radius: 34px;
}
.slider.disabled {
  cursor: not-allowed;
  filter: brightness(1.1);
  &:before {
    filter: brightness(1.3);
  }
}
.slider.round:before {
  border-radius: 50%;
}
</style>
