<template>
  <div class="tab-container" v-show="isActive">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { type Ref, inject, ref, onBeforeMount, watch } from 'vue'
type AddTabFunction = (tab: { title: string; hash: string }) => void

const addTab = inject<AddTabFunction>('addTab')
const activeTabHash = inject<Ref<string>>('activeTabHash')

const props = defineProps(['title'])

const hash = ref('')
const isActive = ref(false)

onBeforeMount(() => {
  hash.value = `#${props.title.toLowerCase().replace(/ /g, '-')}`

  addTab({
    title: props.title,
    hash: hash.value
  })
})

watch(activeTabHash, () => {
  isActive.value = activeTabHash.value === hash.value
})
</script>
<style lang="scss" scoped>
.tab-container {
  padding: 24px;
}
</style>
