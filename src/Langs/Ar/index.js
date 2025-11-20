/**
 * Arabic Language Translations
 *
 * Entry point for Arabic translations.
 * Merges all translation modules (global, pages, auth).
 *
 * @module Lang/Ar
 */

import global from './global'
import pages from './pages'
import auth from './auth'

/**
 * Merged Arabic translations
 * @type {Object}
 */
export default {
  global,
  pages,
  auth,
}
