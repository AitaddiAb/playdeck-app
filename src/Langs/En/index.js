/**
 * English Language Translations
 *
 * Entry point for English translations.
 * Merges all translation modules (global, pages, auth).
 *
 * @module Lang/En
 */

import global from './global'
import pages from './pages'
import auth from './auth'

/**
 * Merged English translations
 * @type {Object}
 */
export default {
  global,
  pages,
  auth,
}
