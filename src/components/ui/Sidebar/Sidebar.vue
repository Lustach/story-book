<template>
  <div class="menu" :class="{ 'small-menu': smallMenu }">
    <MenuItem
      v-for="(item, index) in menuTree"
      :key="index"
      :data="item.children"
      :label="item.label"
      :icon="item.icon"
      :depth="0"
      :smallMenu="smallMenu"
    />
    <i @click="smallMenu = !smallMenu" class="material-icons">menu</i>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue'
import type { DataChild } from './types'

import MenuItem from './SidebarItem.vue'
const smallMenu = ref(false)
const menuTree: Ref<DataChild[]> = ref([
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
    label: 'Dashboard',
    icon: 'dashboard',
    children: [
      {
        label: 'level 2.1'
      },
      {
        label: 'level 2.2'
      },
      {
        label: 'level 2.3'
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
.menu {
  position: fixed;
  height: 100vh;
  width: 240px;
  left: 0;
  top: 0;
  border-right: 1px solid #ececec;
  transition: all 0.3s ease;
  overflow: auto;
  i {
    position: fixed;
    left: 250px;
    font-size: 20px;
    top: 15px;
    user-select: none;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  &.small-menu {
    overflow: inherit;
    width: 60px;
    padding-top: 50px;
    i {
      left: 20px;
    }
  }
}
</style>
