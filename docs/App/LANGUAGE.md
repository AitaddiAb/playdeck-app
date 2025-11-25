# Translation System

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Usage](#usage)
- [Key Format](#key-format)
- [Placeholder Replacement](#placeholder-replacement)
- [Language Detection](#language-detection)
- [Adding New Translations](#adding-new-translations)
- [Best Practices](#best-practices)

## Overview

The translation system provides internationalization (i18n) support for the Playdeck application. It supports three languages: Arabic (ar), English (en), and French (fr).

The system uses a modular approach where translations are organized by category (global, pages, auth) and stored in separate files per language.

## Architecture

### File Structure

```
src/Langs/
├── index.js              # Main translation module (Language.js)
├── Ar/                   # Arabic translations
│   ├── index.js         # Entry point (merges all modules)
│   ├── global.js        # Common UI translations
│   ├── pages.js         # Page-specific translations
│   └── auth.js          # Authentication translations
├── En/                   # English translations
│   ├── index.js
│   ├── global.js
│   ├── pages.js
│   └── auth.js
└── Fr/                   # French translations
    ├── index.js
    ├── global.js
    ├── pages.js
    └── auth.js
```

### Translation Function

The `$t()` function is available globally in all Vue components and provides:

- **Nested key support**: Access translations using dot notation (e.g., `global.save`)
- **Placeholder replacement**: Replace placeholders in translation strings
- **Automatic language detection**: Uses `document.documentElement.lang` to determine current language
- **Fallback handling**: Returns the key if translation is not found

## Usage

### Basic Usage

In Vue templates:

```vue
<template>
  <q-btn :label="$t('global.save')" />
  <q-btn :label="$t('global.cancel')" />
</template>
```

In Vue script (Composition API):

```javascript
import { getCurrentInstance } from 'vue'

export default {
  setup() {
    const { proxy } = getCurrentInstance()
    const saveLabel = proxy.$t('global.save')
  },
}
```

In Vue script (Options API):

```javascript
export default {
  methods: {
    handleSave() {
      const label = this.$t('global.save')
    },
  },
}
```

### Direct Import

You can also import the `$t` function directly:

```javascript
import { $t } from '@/App/Language'

const label = $t('global.save')
```

## Key Format

Translation keys use dot notation to organize translations hierarchically:

- `global.save` - Global/common translations
- `pages.dashboard.title` - Page-specific translations
- `auth.login` - Authentication translations

### Key Organization

- **global**: Common UI elements (buttons, labels, messages)
- **pages**: Page-specific content (titles, descriptions)
- **auth**: Authentication-related text

## Placeholder Replacement

The translation system supports placeholder replacement using the `:placeholderName` format.

### Example

**Translation file** (`src/Langs/En/global.js`):

```javascript
export default {
  price: 'Price: :amount Dh',
}
```

**Usage**:

```javascript
$t('global.price', { amount: '100' })
// Returns: "Price: 100 Dh"
```

### Placeholder Format

- Placeholders start with `:` followed by the placeholder name
- Placeholder names must be valid JavaScript identifiers
- Replacement values are provided as an object in the second parameter

### Multiple Placeholders

```javascript
// Translation: "Welcome :name, you have :count items"
$t('messages.welcome', { name: 'John', count: 5 })
// Returns: "Welcome John, you have 5 items"
```

## Language Detection

The translation system automatically detects the current language from `document.documentElement.lang`:

1. Reads `document.documentElement.lang` attribute
2. Extracts the first two characters (language code)
3. Falls back to `'ar'` if language is not supported

### Setting Language

To change the application language, set the `lang` attribute on the HTML element:

```javascript
document.documentElement.lang = 'en' // Switch to English
document.documentElement.lang = 'ar' // Switch to Arabic
document.documentElement.lang = 'fr' // Switch to French
```

## Adding New Translations

### 1. Add Translation to Language Files

Add the translation to all three language files:

**`src/Langs/En/global.js`**:

```javascript
export default {
  // ... existing translations
  newKey: 'New Translation',
}
```

**`src/Langs/Ar/global.js`**:

```javascript
export default {
  // ... existing translations
  newKey: 'ترجمة جديدة',
}
```

**`src/Langs/Fr/global.js`**:

```javascript
export default {
  // ... existing translations
  newKey: 'Nouvelle traduction',
}
```

### 2. Use the Translation

```vue
<template>
  <div>{{ $t('global.newKey') }}</div>
</template>
```

## Best Practices

### 1. Use Descriptive Keys

✅ **Good**:

```javascript
$t('pages.dashboard.title')
$t('auth.loginSuccess')
```

❌ **Bad**:

```javascript
$t('text1')
$t('msg')
```

### 2. Organize by Category

Group related translations together:

- `global.*` - Common UI elements
- `pages.*` - Page-specific content
- `auth.*` - Authentication

### 3. Use Placeholders for Dynamic Content

✅ **Good**:

```javascript
$t('global.price', { amount: price })
```

❌ **Bad**:

```javascript
$t('global.price') + ' ' + price + ' Dh'
```

### 4. Keep Translations Consistent

Use the same key structure across all languages:

- If `En/global.js` has `global.save`, ensure `Ar/global.js` and `Fr/global.js` also have it

### 5. Document Complex Translations

Add comments in translation files for context:

```javascript
export default {
  global: {
    // Used in confirmation dialogs
    confirm: 'Confirm',
  },
}
```

## Examples

### Example 1: Simple Translation

```vue
<template>
  <q-btn :label="$t('global.save')" />
</template>
```

### Example 2: Translation with Placeholder

```vue
<template>
  <div>{{ $t('global.price', { amount: '100' }) }}</div>
</template>
```

### Example 3: Nested Keys

```vue
<template>
  <h1>{{ $t('pages.dashboard.title') }}</h1>
  <p>{{ $t('pages.dashboard.description') }}</p>
</template>
```

### Example 4: In Script Section

```javascript
import { $t } from '@/App/Language'

export default {
  methods: {
    showMessage() {
      this.$q.notify({
        message: $t('global.success'),
      })
    },
  },
}
```

## Troubleshooting

### Translation Not Found

If a translation key is not found, the system will:

1. Log a warning to the console: `[Lang] Translation key 'key' not found for language 'lang'`
2. Return the key itself as a fallback

**Solution**: Ensure the key exists in all language files.

### Placeholder Not Replaced

If placeholders are not being replaced:

1. Check placeholder format (must start with `:`)
2. Verify replacement object keys match placeholder names
3. Ensure replacement values are provided

### Language Not Detected

If language detection fails:

1. Check `document.documentElement.lang` is set
2. Verify language code is one of: `ar`, `en`, `fr`
3. System will fall back to `ar` if language is not supported

### Console Warnings

The system logs warnings for:

- Missing language: `[Lang] Language 'lang' not found, falling back to 'ar'`
- Missing translation key: `[Lang] Translation key 'key' not found for language 'lang'`

These warnings help identify missing translations during development.
