/**
 * Translation Module
 *
 * Provides internationalization (i18n) support for the application.
 * Supports nested keys with dot notation and placeholder replacement.
 *
 * @module Lang
 */

import ar from '@/Langs/Ar'
import en from '@/Langs/En'
import fr from '@/Langs/Fr'

/**
 * Available languages
 * @type {Object<string, Object>}
 */
const languages = { ar, en, fr }

/**
 * Get current language code from document element
 * @returns {string} Language code (ar, en, fr)
 */
const getCurrentLang = () => {
  const lang = document.documentElement.lang?.substring(0, 2) || 'ar'
  return languages[lang] ? lang : 'ar'
}

/**
 * Get nested value from object using dot notation
 * @param {Object} obj - Object to traverse
 * @param {string} path - Dot-separated path (e.g., 'global.save')
 * @returns {string|undefined} Value at path or undefined
 */
const getNestedValue = (obj, path) => {
  return path.split('.').reduce((current, key) => current?.[key], obj)
}

/**
 * Replace placeholders in translation string
 * Placeholder format: :placeholderName
 * @param {string} text - Translation string with placeholders
 * @param {Object} replacements - Object with placeholder values
 * @returns {string} String with replaced placeholders
 */
const replacePlaceholders = (text, replacements = {}) => {
  if (!replacements || typeof replacements !== 'object') return text

  return text.replace(/:(\w+)/g, (match, key) => {
    return replacements[key] !== undefined ? replacements[key] : match
  })
}

/**
 * Translation function
 * Translates a key to the current language with optional placeholder replacement
 *
 * @param {string} key - Translation key with dot notation (e.g., 'global.save', 'pages.users')
 * @param {Object} [replacements] - Optional object with placeholder values (e.g., { replaceme: '100' })
 * @returns {string} Translated string or the key if translation not found
 *
 * @example
 * // Simple translation
 * $t('global.save') // Returns: "Save" (or translated equivalent)
 *
 * @example
 * // Nested key translation
 * $t('pages.dashboard.title') // Returns: "Dashboard"
 *
 * @example
 * // Translation with placeholder
 * $t('pages.welcome', { name: 'John' }) // Returns: "Welcome John" (if translation is "Welcome :name")
 *
 * @example
 * // Multiple placeholders
 * $t('messages.items', { count: 5, total: 10 }) // Returns: "5 of 10 items"
 */
const $t = (key, replacements) => {
  const lang = getCurrentLang()
  const translations = languages[lang]

  if (!translations) {
    console.warn(`[Lang] Language '${lang}' not found, falling back to 'ar'`)
    return key
  }

  const translation = getNestedValue(translations, key)

  if (!translation) {
    console.warn(`[Lang] Translation key '${key}' not found for language '${lang}'`)
    return key
  }

  return replacePlaceholders(translation, replacements)
}

/**
 * Vue plugin for translation system
 * Registers $t as a global property available in all components
 */
const langPlugin = {
  /**
   * Install plugin
   * @param {Object} app - Vue app instance
   */
  install(app) {
    app.config.globalProperties.$t = $t
  },
}

export { $t }
export default langPlugin
