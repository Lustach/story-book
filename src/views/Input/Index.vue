<script setup lang="ts">
import { ref } from 'vue'
import Input from '@/components/ui/Input/Input.vue'
import Radio from '@/components/ui/Radio/Radio.vue'
const defaultRef = ref('')
</script>
<template>
  <div class="view__container">
    <div class="input_wrap">
      <h2>Default</h2>
      <Input
        v-model="defaultRef"
        class="input-mini"
        id="input"
        spellcheck="false"
        label="label123"
        placeholder="placeholder"
        tooltipText="tooltipText"
      />
    </div>
    <div class="input_wrap">
      <h2>Password</h2>
      <Input
        v-model="defaultRef"
        class="input-mini"
        id="input1"
        spellcheck="false"
        label="label123"
        placeholder="placeholder"
        tooltipText="tooltipText"
        type="password"
      />
    </div>
    <div class="input_wrap">
      <h2>Copy</h2>
      <Input
        v-model="defaultRef"
        class="input-mini"
        id="input2"
        spellcheck="false"
        label="label123"
        placeholder="placeholder"
        tooltipText="tooltipText"
        withCopy
      />
    </div>
    <div class="input_wrap">
      <h2>Error</h2>
      <Input
        v-model="defaultRef"
        class="input-mini"
        id="input3"
        spellcheck="false"
        label="label123"
        placeholder="placeholder"
        error="error text"
        showErrorText
      />
    </div>
    <div class="input_wrap">
      <h2>Autofocus</h2>
      <Input
        v-model="defaultRef"
        class="input-mini"
        id="input4"
        spellcheck="false"
        label="label123"
        placeholder="placeholder"
        tooltipText="tooltipText"
        autofocus
      />
    </div>
    <div class="input_wrap">
      <h2>Clearable & icon</h2>
      <Input
        v-model="defaultRef"
        class="input-mini"
        id="input5"
        spellcheck="false"
        label="label123"
        placeholder="placeholder"
        tooltipText="tooltipText"
        clearable
        icon="mail"
      />
    </div>
    <Radio value="true" />
  </div>
</template>
<style lang="scss" scoped>
.input_wrap {
  max-width: fit-content;
  height: fit-content;
  .input {
    width: 250px;
    margin: 10px;
  }
}
.view__container {
  display: flex;
  flex-wrap: wrap;
}
</style>
