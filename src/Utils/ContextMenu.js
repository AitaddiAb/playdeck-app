/**
 * Context Menu Utility
 *
 * Creates Tauri native context menus for specific elements.
 * Follows Tauri documentation: https://tauri.app/learn/window-menu/
 *
 * @module ContextMenu
 */

import { isDesktop } from '@/App/Platform'
import { Menu, MenuItem, PredefinedMenuItem, Submenu } from '@tauri-apps/api/menu'

const menuCache = new Map()
let globalDisableSetup = false

const globalContextMenuHandler = (event) => {
  const isRegisteredElement = Array.from(menuCache.values()).some(
    ({ element }) => element && (event.target === element || element.contains(event.target)),
  )

  if (!isRegisteredElement) {
    event.preventDefault()
    event.stopPropagation()
  }
}

/**
 * Create menu items from item definitions
 * @param {Array} items - Array of menu item definitions
 * @returns {Promise<Array>} Array of created menu items
 */
const createMenuItems = async (items) => {
  return await Promise.all(
    items.map(async (item) => {
      // Separator
      if (item.type === 'Separator') {
        return await PredefinedMenuItem.new({ text: 'separator-text', item: 'Separator' })
      }

      // Submenu
      if (item.type === 'Submenu') {
        const emptyItem = { id: 'empty', text: 'Nothing there', enabled: false, action: () => {} }
        const submenuItems = await createMenuItems(item.items && item.items.length > 0 ? item.items : [emptyItem])

        return await Submenu.new({ text: item.text, items: submenuItems })
      }

      // Regular menu item
      return await MenuItem.new({
        id: item.id,
        text: item.label,
        action: item.action || (() => {}),
        enabled: item.enabled !== undefined ? item.enabled : true,
      })
    }),
  )
}

/**
 * Create or replace context menu for a selector
 * @param {string} selector - CSS selector
 * @param {Array} items - Array of menu item definitions
 * @returns {Promise<void>}
 */
const create = async (selector, items) => {
  if (!isDesktop) return

  const normalizedSelector = selector.trim()
  const element = document.querySelector(normalizedSelector)
  if (!element) {
    throw new Error(`Element with selector "${normalizedSelector}" not found`)
  }

  // Create menu items
  const menuItems = await createMenuItems(items)

  // Create menu
  const menu = await Menu.new({ items: menuItems })

  // Create context menu handler
  const handleContextMenu = async (event) => {
    if (element && (event.target === element || element.contains(event.target))) {
      event.preventDefault()
      event.stopPropagation()
      try {
        await menu.popup()
      } catch (error) {
        console.error(`Failed to show context menu for ${normalizedSelector}:`, error)
      }
    }
  }

  // Store in cache
  menuCache.set(normalizedSelector, {
    menu,
    element,
    handler: handleContextMenu,
  })

  // Add event listener
  document.addEventListener('contextmenu', handleContextMenu, true)

  // Setup global disable if not already done
  if (!globalDisableSetup) {
    document.addEventListener('contextmenu', globalContextMenuHandler, true)
    globalDisableSetup = true
  }
}

/**
 * Update existing menu items by ID
 * @param {string} selector - CSS selector
 * @param {Array} items - Array of menu item definitions with IDs to update
 * @returns {Promise<void>}
 */
const update = async (selector, items) => {
  if (!isDesktop) return

  const normalizedSelector = selector.trim()
  const menuData = menuCache.get(normalizedSelector)
  if (!menuData || !menuData.menu) {
    throw new Error(`Menu not found for selector "${normalizedSelector}". Call create() first.`)
  }

  const menu = menuData.menu

  // Update each item by ID
  for (const item of items) {
    if (!item.id) continue

    try {
      const menuItem = await menu.get(item.id)
      if (!menuItem) continue

      if (item.label !== undefined) {
        await menuItem.setText(item.label)
      }
      if (item.enabled !== undefined) {
        await menuItem.setEnabled(item.enabled)
      }
    } catch (error) {
      console.error(`Failed to update menu item ${item.id}:`, error)
    }
  }
}

export const ContextMenu = {
  create,
  update,
}
