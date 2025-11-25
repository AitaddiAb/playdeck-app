# AppFooter Component

**Location**: `src/Views/Components/App/AppFooter.vue`

**Description**: Bottom footer component for the application. Currently commented out in the main layout, ready for use.

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Overview](#overview)
- [Features](#features)
- [Status](#status)
- [Usage](#usage)
- [Related Documentation](#related-documentation)

## Overview

The AppFooter component provides a footer area for the application. It is currently created but not used in the main layout.

## Features

- Desktop-only rendering
- Ready for footer content
- Quasar `QFooter` component wrapper

## Status

Component created but not currently used in the layout. To enable it:

1. Uncomment the import in `src/Views/Layouts/LayoutApp.vue`
2. Uncomment the component in the template

## Usage

To use the footer, uncomment it in the main layout:

```vue
<script setup>
// import AppFooter from '@/Views/Components/App/AppFooter.vue'
</script>

<template>
  <QLayout>
    <!-- ... -->
    <!-- <AppFooter /> -->
  </QLayout>
</template>
```

## Related Documentation

- [Views README](../README.md) - Views overview
- [Layouts](../README.md#layouts) - Layout documentation

