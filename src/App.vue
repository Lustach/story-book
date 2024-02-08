<script setup lang="ts">
import { useColorMode } from '@vueuse/core'
import info from '@/assets/icons/ui/info.svg'
import Tooltip from '@/components/ui/Tooltip/Tooltip.vue'
import { ref, defineModel, watchEffect } from 'vue'
import { RouterView } from 'vue-router'
import Header from '@/components/ui/Header/Header.vue'
import RoundArrowButton from '@/components/ui/RoundArrowButton/RoundArrowButton.vue'
import Verification from '@/components/ui/Verification/Verification.vue'
import Sidebar from '@/components/ui/Sidebar/Sidebar.vue'
const modelValue = defineModel<string>('')
watchEffect(() => {
  console.log(modelValue.value)
})
const mode = useColorMode()
</script>

<template>
  <Header />
  <main class="main">
    {{ mode }}
    <RouterView />
    <Sidebar />
    <template v-if="false">
      <RoundArrowButton />
      <Tooltip :text="'Просто текст для демо'">
        <info />
      </Tooltip>
      <Verification />
    </template>
  </main>
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
  margin: 10px 10px 10px 250px;
}
</style>
