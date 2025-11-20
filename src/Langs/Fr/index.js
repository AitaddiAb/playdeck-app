/**
 * French Language Translations
 *
 * Entry point for French translations.
 * Merges all translation modules (global, pages, auth).
 *
 * @module Lang/Fr
 */

import global from './global'
import pages from './pages'
import auth from './auth'

/**
 * Merged French translations
 * @type {Object}
 */
export default {
  global,
  pages,
  auth,
}
