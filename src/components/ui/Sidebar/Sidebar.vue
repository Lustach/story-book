<template>
  <div class="sidebar" :class="{ 'small-sidebar': isSmall }">
    <SidebarItem
      v-for="(item, index) in sidebarTree"
      :key="index"
      :data="item?.children"
      :label="item.label"
      :icon="item?.icon"
      :path="item?.path"
      :depth="0"
      :isSmall="isSmall"
    />
    <i @click="isSmall = !isSmall" class="material-icons">menu</i>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue'
import type { DataChild } from './types'

import SidebarItem from './SidebarItem.vue'
const isSmall = ref(false)
const sidebarTree: Ref<DataChild[]> = ref([
  {
    label: 'Home',
    icon: 'home',
    children: [
      {
        label: 'level 1.1',
        children: [
          {
            label: 'level 1.1.1',
            children: [
              {
                label: 'level 1.1.1.1'
              }
            ]
          }
        ]
      },
      {
        label: 'level 1.2'
      }
    ]
  },
  {
    label: 'Input',
    icon: 'dashboard',
    children: [
      {
        label: 'Default input',
        path: '/input_default'
      },
      {
        label: 'level 2.2',
        path: '/test'
      },
      {
        label: 'level 2.3',
        path: '/about'
      }
    ]
  },
  {
    label: 'Settings',
    icon: 'settings'
  }
])
</script>

<style lang="scss" scoped>
.sidebar {
  margin-top: 63px; // header height
  position: fixed;
  height: 100vh;
  width: 240px;
  left: 0;
  top: 0;
  border-right: 1px solid #ececec;
  transition: all 0.3s ease;
  overflow: auto;
  i {
    position: relative;
    position: fixed;
    left: 220px;
    font-size: 20px;
    top: 70px;
    user-select: none;
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover {
      background: #fff6f6;
    }
    padding: 10px;
    border-radius: 50%;
  }
  &.small-sidebar {
    overflow: inherit;
    width: 60px;
    padding-top: 50px;
    i {
      left: 10px;
    }
  }
}
</style>
