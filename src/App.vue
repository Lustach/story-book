<script setup lang="ts">
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import Input from '@/components/ui/Input/Input.vue'
import Button from '@/components/ui/Button/Button.vue'
import Card from '@/components/ui/Card/Card.vue'
const setCustomPath = (e: string) => {
  console.log(e)
}
const customFirst = ref('')
</script>

<template>
  <header>
    <!-- <img alt="Vue logo" class="logo" src="./src/assets/logo.svg" width="125" height="125" /> -->
    <!-- <img src="@/assets/logo.svg" />fa -->
    <Input
      v-model="customFirst"
      class="input-mini"
      id="input"
      type="text"
      spellcheck="false"
      @blur="setCustomPath"
      label="label123"
      placeholder="placeholder"
      :with-copy="true"
    />
    <Button loading label="fasd"></Button>
    <Card title="title" subheader="Subheader" media-href="../src/assets/fund_default_logo.png" />
  </header>

  <RouterView />
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
</style>
