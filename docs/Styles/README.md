# Styles Directory Documentation

The `src/Styles/` directory contains all SASS stylesheets for the application.

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Overview](#overview)
- [Structure](#structure)
- [Files](#files)
  - [App.sass](#appsass)
  - [Quasar.sass](#quasarsass)
  - [Reset.sass](#resetsass)
  - [Helper.sass](#helpersass)
  - [Addons.sass](#addonssass)
- [Related Documentation](#related-documentation)

## Overview

Styles are organized into modular files that are imported by the main `App.sass` file. The styling system uses SASS with Quasar theme variables.

## Structure

```
src/Styles/
├── App.sass          # Main stylesheet entry point
├── Quasar.sass       # Quasar theme variables
├── Reset.sass        # CSS resets
├── Helper.sass       # Debug helper classes
└── Addons.sass       # Utility classes
```

## Files

### App.sass

**Location**: `src/Styles/App.sass`

Main stylesheet entry point. Imports all style modules.

**Imports**:
- Quasar.sass (theme variables)
- Reset.sass (CSS resets)
- Addons.sass (utility classes)
- Helper.sass (debug helpers)

**Usage**: Imported in `src/Views/Layouts/LayoutApp.vue`

### Quasar.sass

**Location**: `src/Styles/Quasar.sass`

Quasar theme variables and color definitions.

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

### Reset.sass

**Location**: `src/Styles/Reset.sass`

CSS resets and normalization.

**Resets Applied**:
- Removes default padding and margin from all elements
- Sets `box-sizing: border-box` globally
- Disables text selection (`user-select: none`)

**Note**: Imported by App.sass and Quasar.sass.

### Helper.sass

**Location**: `src/Styles/Helper.sass`

Helper classes for visual debugging during development.

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

### Addons.sass

**Location**: `src/Styles/Addons.sass`

Utility classes for border-radius, transparency, and opacity.

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

---

## Related Documentation

- [Quasar Configuration](../App/QUASAR.md) - UI framework setup

