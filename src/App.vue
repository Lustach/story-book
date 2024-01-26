<script setup lang="ts">
import info from '@/assets/icons/ui/info.svg'
import Tooltip from '@/components/ui/Tooltip/Tooltip.vue'
import { ref, defineModel, watchEffect } from 'vue'
import { RouterView } from 'vue-router'
import Header from '@/components/ui/Header/Header.vue'
import Input from '@/components/ui/Input/Input.vue'
import Button from '@/components/ui/Button/Button.vue'
import Card from '@/components/ui/Card/Card.vue'
import RoundArrowButton from '@/components/ui/RoundArrowButton/RoundArrowButton.vue'
import Select from './components/ui/Select/Select.vue'
import Textarea from '@/components/ui/Textarea/Textarea.vue'
import Verification from '@/components/ui/Verification/Verification.vue'
import Checkbox from '@/components/ui/Checkbox/Checkbox.vue'
const setCustomPath = (e: string) => {
  console.log(e)
}
const customFirst = ref('')
const selectModel = ref('')
const selectOptions = ref([{ key: 'Key', value: 'value' }])
const textAreaValue = ref('')
const updateTextAreaValue = (value: string) => {
  textAreaValue.value = value
}
const proxyValue = defineModel()
const modelValue = defineModel<string>('')
watchEffect(() => {
  console.log(modelValue.value)
})
</script>

<template>
  <Header />
  <!-- <img alt="Vue logo" class="logo" src="./src/assets/logo.svg" width="125" height="125" /> -->
  <!-- <img src="@/assets/logo.svg" />fa -->
  <main class="main">
    <Input
      v-model="customFirst"
      class="input-mini"
      id="input"
      spellcheck="false"
      @blur="setCustomPath"
      label="label123"
      placeholder="placeholder"
      style="width: 250px; margin: 10px"
      show-set-max
      max="1234"
      tooltipText="tooltipText"
      withCopy
      type="password"
    />
    <Button loading label="fasd"></Button>
    <Card title="title" subheader="Subheader" media-href="../src/assets/fund_default_logo.png" />
    <Select
      v-model="selectModel"
      icon="lang"
      :options="selectOptions"
      value-key="key"
      data-qa="select"
      style="width: 250px; margin: 10px; height: 50px"
    />
    <RoundArrowButton />
    <RouterView />
    <Tooltip :text="'Просто текст для демо'">
      <info />
    </Tooltip>
    <Textarea
      style="width: 250px; margin: 10px"
      id="app-search"
      icon="text"
      :value="textAreaValue"
      label="label"
      placeholder="placeholder"
      @update:value="updateTextAreaValue"
    />
  </main>
  <Button label="label" v-ripple="{ value: 120, color: '#000' }">Ripple</Button>
  <Verification />
  <input type="text" v-model="modelValue" />
  {{ modelValue }}
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
.main {
  margin: 10px;
}
</style>
