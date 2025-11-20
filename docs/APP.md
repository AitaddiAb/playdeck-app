# App Documentation

## Table of Contents

- [Stores (App/)](#stores-app)
- [Layouts](#layouts)
  - [App.vue](#appvue)
- [Routes](#routes)
  - [Router.js](#routerjs)
  - [AppRoutes.js](#approutesjs)
- [Scripts](#scripts)
  - [App.js](#appjs)
  - [Platform.js](#platformjs)
  - [Quasar.js](#quasarjs)
  - [Language.js](#languagejs)
  - [Store.js](#storejs)
- [Styles](#styles)
  - [App.sass](#appsass)
  - [Quasar.sass](#quasarsass)
  - [Reset.sass](#resetsass)
  - [Helper.sass](#helpersass)
  - [Addons.sass](#addonssass)

---

## Stores (App/)

Currently, no stores are implemented. The Pinia instance is initialized and ready for use.

**Location**: `src/App/Store.js`

**Status**: Pinia instance created, stores can be added to `src/Stores/` directory.

---

## Layouts

### App.vue

**Location**: `src/Views/Layouts/App.vue`

**Description**: Root application layout component. Handles global styles, navigation, and router view.

**Features**:

- Global Quasar styles import
- Application-specific styles
- Navigation header with route links
- Router view for page content

**Components**:

- `RouterLink`: Navigation links
- `RouterView`: Page content area

---

## Routes

### Router.js

**Location**: `src/App/Router.js`

**Description**: Main router configuration with HTML5 history mode and catch-all redirect.

**Routes**:

- `/` → Redirects to Dashboard
- `/settings` → Settings page
- `/:pathMatch(.*)*` → Catch-all redirect to `/`

**Features**:

- HTML5 history mode (`createWebHistory`)
- Centralized route definitions from `AppRoutes.js`
- Automatic 404 handling (redirects to home)

---

### AppRoutes.js

**Location**: `src/Routes/AppRoutes.js`

**Description**: Centralized application routes configuration with lazy-loaded components.

**Routes**:

- `/` → DashboardPage (name: 'Dashboard')
- `/settings` → SettingsPage (name: 'Settings')

**Features**:

- Lazy-loaded components for code splitting
- Route names for programmatic navigation
- Dynamic imports using `@/` alias

---

## Scripts

### App.js

**Location**: `src/App/App.js`

**Description**: Application entry point. Initializes Vue app and registers all plugins.

**Plugins Registered**:

- **Store**: Pinia state management
- **Router**: Vue Router for navigation
- **Quasar**: UI framework with plugins
- **Platform**: Platform detection (Tauri/browser)
- **Language**: Translation system ($t function)

**Entry Point**: Referenced in `index.html` as `/src/App/App.js`

---

### Platform.js

**Location**: `src/App/Platform.js`

**Description**: Platform detection plugin. Detects Tauri desktop app or browser environment.

**Features**:

- Detects if running in Tauri desktop app
- Gets OS type when in Tauri (windows, macos, linux, etc.)
- Falls back to 'browser' when not in Tauri
- Provides error handling for platform detection failures

**Usage**:

```javascript
// In components
this.$a.Platform // 'browser' | 'windows' | 'macos' | 'linux' | 'android' | 'ios' | 'unknown'
```

**Note**: Platform detection is asynchronous. The value is initialized as 'browser' and updated when Tauri API resolves.

---

### Quasar.js

**Location**: `src/App/Quasar.js`

**Description**: Quasar UI framework configuration and plugin registration.

**Plugins Enabled**:

- **Notify**: Toast notifications for user feedback
- **Loading**: Loading overlay/spinner for async operations
- **LoadingBar**: Progress bar at top of page for navigation/loading states

**Configuration**:

- Plugins are registered globally
- Icon set can be configured by importing and setting in Quasar config

---

### Language.js

**Location**: `src/App/Language.js`

**Description**: Internationalization (i18n) translation system. Provides `$t()` function for translations.

**Features**:

- Supports nested keys with dot notation
- Placeholder replacement (`:placeholderName` format)
- Automatic language detection from `document.documentElement.lang`
- Fallback to Arabic if language not found
- Console warnings for missing translations

**Supported Languages**:

- Arabic (ar)
- English (en)
- French (fr)

**Usage**:

```javascript
// In templates
{
  {
    $t('global.save')
  }
}

// In script
this.$t('pages.dashboard.title', { name: 'John' })
```

**See**: [TRANSLATION.md](./TRANSLATION.md) for detailed documentation.

---

### Store.js

**Location**: `src/App/Store.js`

**Description**: Pinia store initialization. Creates the Pinia instance for state management.

**Status**:

- Pinia instance created and ready
- Stores can be added to `src/Stores/` directory
- Store instances can be imported and used throughout the app

**Future Stores**:

- AppStore: App-level state (UI, theme, sidebar)
- GameStore: Game library management
- SettingsStore: Application settings

---

## Styles

### App.sass

**Location**: `src/Styles/App.sass`

**Description**: Main stylesheet entry point. Imports all style modules.

**Imports**:

- Quasar.sass (theme variables)
- Reset.sass (CSS resets)
- Addons.sass (utility classes)
- Helper.sass (debug helpers)

**Usage**: Imported in `src/Views/Layouts/App.vue`

---

### Quasar.sass

**Location**: `src/Styles/Quasar.sass`

**Description**: Quasar theme variables and color definitions.

**Colors Defined**:

- **Primary**: `#1976D2` (Blue)
- **Secondary**: `#26A69A` (Teal)
- **Accent**: `#9C27B0` (Purple)
- **Dark**: `#1D1D1D` (Dark gray)
- **Dark Page**: `#001013` (Very dark blue)
- **Light Page**: `#ffffff` (White)
- **Positive**: `#21BA45` (Green)
- **Negative**: `#C10015` (Red)
- **Info**: `#31CCEC` (Cyan)
- **Warning**: `#F2C037` (Yellow)

**Usage**: Imported by Quasar Vite plugin for theme configuration.

---

### Reset.sass

**Location**: `src/Styles/Reset.sass`

**Description**: CSS resets and normalization.

**Resets Applied**:

- Removes default padding and margin from all elements
- Sets `box-sizing: border-box` globally
- Disables text selection (`user-select: none`)

**Note**: Imported by App.sass and Quasar.sass.

---

### Helper.sass

**Location**: `src/Styles/Helper.sass`

**Description**: Helper classes for visual debugging during development.

**Debug Classes**:

- `.o-r`: Red dashed border outline
- `.o-g`: Green dashed border outline
- `.o-b`: Blue dashed border outline
- `.o-w`: White dashed border outline

**Usage**: Add class to element to see its boundaries during development.

**Example**:

```vue
<div class="o-r">This element has a red outline</div>
```

---

### Addons.sass

**Location**: `src/Styles/Addons.sass`

**Description**: Utility classes for border-radius, transparency, and opacity.

**Generated Classes**:

**Border Radius**:

- `.rounded-none`, `.rounded-xs`, `.rounded-sm`, `.rounded-md`, `.rounded-lg`, `.rounded-xl`
- `.rounded-*-f`: Same as above with `!important`

**Transparency**:

- `.bg-transparent-5`, `.bg-transparent-10`, `.bg-transparent-20`, etc. (up to 90)
- Adapts to dark/light theme automatically

**Opacity**:

- `.opacity-5`, `.opacity-10`, `.opacity-20`, etc. (up to 90)

**Base Size**: `1rem` (used for all calculations)

**Size Values**:

- `none`: 0
- `xs`: 0.25rem
- `sm`: 0.5rem
- `md`: 1rem
- `lg`: 1.5rem
- `xl`: 2rem

**Percent Values**: 5, 10, 20, 30, 40, 50, 60, 70, 80, 90

**Usage**:

```vue
<div class="rounded-md bg-transparent-20 opacity-80">
  Rounded, semi-transparent background with reduced opacity
</div>
```
