<template>
  <div class="tab">
    <ul class="tab-list">
      <li
        class="tab-item"
        :class="{
          'tab-item--inactive': tab.hash !== activeTabHash,
          'tab-item--active': tab.hash === activeTabHash
        }"
        v-for="tab in tabs"
        :key="tab.title"
        @click="activeTabHash = tab.hash"
      >
        {{ tab.title }}
      </li>
    </ul>
    <slot />
  </div>
</template>

<script setup>
import { ref, provide } from 'vue'

const activeTabHash = ref('')
const tabs = ref([])

provide('addTab', (tab) => {
  const count = tabs.value.push(tab)

  if (count === 1) {
    activeTabHash.value = tab.hash
  }
})
provide('activeTabHash', activeTabHash)
</script>

<style lang="scss" scoped>
.tab {
  /* border: 4px solid black; */
  border-radius: 0.25rem;
}

.tab-list {
  padding: 0;
  display: flex;
  gap: 2px;
  flex-wrap: nowrap;
  justify-content: space-between;
}

.tab-item {
  width: 100%;
  font-weight: 900;
  text-align: center;
  padding-top: 1rem;
  padding-bottom: 1rem;
  cursor: pointer;
  border-bottom-width: 4px;
  list-style: none;
  border-radius: 6px;
  color: white;
  transition: background-color 0.5s ease;
}

.tab-item--inactive {
  background-color: #a5c8ff;
}

.tab-item--active {
  background-color: #307dfb;
}
</style>
