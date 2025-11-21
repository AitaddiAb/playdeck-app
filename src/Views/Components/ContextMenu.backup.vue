<script setup>
/**
 * Custom Context Menu Component
 *
 * Provides a custom right-click context menu for the application.
 * Replaces the default browser context menu.
 *
 * @component ContextMenu
 */

import { ref, onMounted, onUnmounted } from 'vue'

defineProps({
  items: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['close'])

const show = ref(false)
const position = ref({ x: 0, y: 0 })
const menuRef = ref(null)

const handleContextMenu = (event) => {
  event.preventDefault()
  event.stopPropagation()

  // Calculate position, ensuring menu stays within viewport
  const x = Math.min(event.clientX, window.innerWidth - 200)
  const y = Math.min(event.clientY, window.innerHeight - 200)

  position.value = { x, y }
  show.value = true
}

const handleClick = (event) => {
  if (menuRef.value && !menuRef.value.contains(event.target)) {
    closeMenu()
  }
}

const handleItemClick = (item) => {
  if (item.action) {
    item.action()
  }
  closeMenu()
}

const closeMenu = () => {
  show.value = false
  emit('close')
}

const handleEscape = (e) => {
  if (e.key === 'Escape' && show.value) {
    closeMenu()
  }
}

onMounted(() => {
  document.addEventListener('contextmenu', handleContextMenu)
  document.addEventListener('click', handleClick)
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('contextmenu', handleContextMenu)
  document.removeEventListener('click', handleClick)
  document.removeEventListener('keydown', handleEscape)
})

defineExpose({
  close: closeMenu,
})
</script>

<template>
  <div
    v-if="show"
    ref="menuRef"
    class="context-menu"
    :style="{
      left: position.x + 'px',
      top: position.y + 'px',
    }"
  >
    <QList dense dark>
      <template v-for="(item, index) in items" :key="index">
        <QSeparator v-if="item.separator" />
        <QItem v-else clickable @click="handleItemClick(item)" class="context-menu-item">
          <!-- <QItemSection v-if="item.icon" avatar>
            <QIcon :name="item.icon" size="sm" />
          </QItemSection> -->
          <QItemSection>
            <QItemLabel>{{ item.label }}</QItemLabel>
            <QItemLabel v-if="item.caption" caption>{{ item.caption }}</QItemLabel>
          </QItemSection>
          <QItemSection v-if="item.shortcut" side>
            <QItemLabel caption class="text-grey-6">{{ item.shortcut }}</QItemLabel>
          </QItemSection>
        </QItem>
      </template>
    </QList>
  </div>
</template>

<style lang="sass" scoped>
.context-menu
  position: fixed
  z-index: 10000
  background-color: rgba(30, 30, 30, 0.95)
  backdrop-filter: blur(10px)
  border: 1px solid rgba(255, 255, 255, 0.1)
  border-radius: 8px
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5)
  min-width: 200px
  max-width: 300px
  padding: 4px
  user-select: none

.context-menu-item
  border-radius: 4px
  margin: 2px 0

  &:hover
    background-color: rgba(255, 255, 255, 0.1)
</style>
