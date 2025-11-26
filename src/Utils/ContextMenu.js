/**
 * Reusable Context Menu Utility
 *
 * Creates a Tauri native context menu for a specific element.
 * The context menu will only appear when right-clicking on the specified element.
 *
 * @module ContextMenu
 *
 * @description
 * **Note on Tauri callback warnings during HMR:**
 * You may see warnings like "Couldn't find callback id" during development when the page reloads.
 * This happens because:
 * 1. MenuItem.new() and Menu.new() create async callbacks in Rust
 * 2. When the page reloads (HMR), the JavaScript context resets
 * 3. Rust tries to call back to JavaScript, but the callback IDs no longer exist
 *
 * These warnings are:
 * - Harmless (don't affect functionality)
 * - Development-only (won't appear in production)
 * - Expected behavior with Tauri + HMR
 *
 * We cannot prevent them from JavaScript because Rust callbacks cannot be cancelled.
 *
 * @example
 * ```javascript
 * import { ContextMenu } from '@/Utils/ContextMenu'
 * import { isDesktop } from '@/App/Platform'
 *
 * if (isDesktop) {
 *   // Add multiple items at once (supports any CSS selector)
 *   await ContextMenu.add('#myElement', [
 *     { label: 'Option 1', action: () => console.log('Option 1 clicked') },
 *     { label: 'Option 2', action: () => console.log('Option 2 clicked') }
 *   ])
 *
 *   // Class selector
 *   await ContextMenu.add('.my-class', { label: 'Option', action: () => console.log('Clicked') })
 *
 *   // Tag selector
 *   await ContextMenu.add('button', { label: 'Option', action: () => console.log('Clicked') })
 *
 *   // Complex selector
 *   await ContextMenu.add('#app .menus', { label: 'Option', action: () => console.log('Clicked') })
 *
 *   // Or add items one by one
 *   await ContextMenu.add('#myElement', { label: 'Option 1', action: () => console.log('Option 1') })
 *   await ContextMenu.add('#myElement', { label: 'Option 2', action: () => console.log('Option 2') })
 * }
 * ```
 */

import { isDesktop } from '@/App/Platform'
import { Menu, MenuItem, PredefinedMenuItem, Submenu } from '@tauri-apps/api/menu'

// Store created menus and their items
const menuCache = new Map()

// Track if global context menu disable is set up
let globalDisableSetup = false

// Global handler to disable context menu everywhere except registered elements
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
 * Add menu items to a context menu for a specific element
 * @param {string} selector - CSS selector (e.g., "#id", ".class", "tag", "#app .menus")
 * @param {Object|Array} items - Single menu item object or array of menu items
 * @param {string} items[].label - Menu item label
 * @param {Function} items[].action - Menu item action callback
 * @returns {Promise<void>} Promise that resolves when the menu item(s) are added
 */
const add = async (selector, items) => {
  if (!isDesktop) {
    console.warn('ContextMenu.add: Desktop platform is required')
    return
  }

  const normalizedSelector = selector.trim()

  // Normalize items to array
  const itemsArray = Array.isArray(items) ? items : [items]

  try {
    // Get or create menu cache entry (use selector as key)
    let menuData = menuCache.get(normalizedSelector)

    if (!menuData) {
      // Get element directly (should exist when called from onMounted)
      const element = document.querySelector(normalizedSelector)
      if (!element) {
        throw new Error(`Element with selector "${normalizedSelector}" not found`)
      }

      // Create empty menu initially
      const tauriMenu = await Menu.new({ items: [] })

      // Store in cache first so handler can reference it
      menuData = {
        menu: tauriMenu,
        handler: null,
        element: element,
        items: [],
      }
      menuCache.set(normalizedSelector, menuData)

      // Create context menu handler for this element
      const handleContextMenu = async (event) => {
        const target = event.target

        if (element && (target === element || element.contains(target))) {
          event.preventDefault()
          event.stopPropagation()

          try {
            const currentMenuData = menuCache.get(normalizedSelector)
            if (currentMenuData?.menu) {
              await currentMenuData.menu.popup()
            }
          } catch (error) {
            console.error(`Failed to show context menu for ${normalizedSelector}:`, error)
          }
        }
      }

      // Store handler reference
      menuData.handler = handleContextMenu

      // Add event listener for this specific element (capture phase to run before global handler)
      document.addEventListener('contextmenu', handleContextMenu, true)

      // Setup global context menu disable if not already done
      if (!globalDisableSetup) {
        document.addEventListener('contextmenu', globalContextMenuHandler, true)
        globalDisableSetup = true
      }
    }

    /**
     * Recursively create menu items (handles submenus)
     * @param {Array} items - Array of menu item definitions
     * @returns {Promise<Array>} Array of created menu items
     */
    const createMenuItems = async (items) => {
      return await Promise.all(
        items.map(async (item) => {
          // Check if this is a PredefinedMenuItem (e.g., separator)
          if (item.type === 'PredefinedMenuItem' && item.options) {
            return await PredefinedMenuItem.new(item.options)
          }

          // Check if this is a Submenu
          if (item.type === 'Submenu' && item.text && item.items) {
            // Check if submenu has items, if not add "Empty" item
            if (item.items.length < 1) {
              return await Submenu.new({
                text: item.text,
                items: [
                  await MenuItem.new({
                    id: 'empty',
                    text: 'Nothing there',
                    enabled: false,
                    action: () => {},
                  }),
                ],
              })
            }

            // Recursively create submenu items
            const submenuItems = await createMenuItems(item.items)

            return await Submenu.new({
              text: item.text,
              items: submenuItems,
            })
          }

          // Regular menu item
          return await MenuItem.new({
            id: item.id || item.label.toLowerCase().replace(/\s+/g, '-'),
            text: item.label,
            action: item.action,
          })
        }),
      )
    }

    // Create new menu items
    const newMenuItems = await createMenuItems(itemsArray)

    // Add new items to existing items
    menuData.items.push(...newMenuItems)

    // Recreate menu with all items
    menuData.menu = await Menu.new({
      items: menuData.items,
    })
  } catch (error) {
    console.error(`Failed to add context menu item(s) for selector "${selector}":`, error)
    throw error
  }
}

/**
 * Context Menu API
 */
export const ContextMenu = {
  add,
}
