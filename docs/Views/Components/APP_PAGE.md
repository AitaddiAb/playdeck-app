# AppPage Component

**Location**: `src/Views/Components/App/AppPage.vue`

**Description**: Main page container component that wraps the router view. Provides the content area for all application pages.

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Overview](#overview)
- [Features](#features)
- [Usage](#usage)
- [Related Documentation](#related-documentation)

## Overview

The AppPage component wraps the Quasar `QPageContainer` and Vue Router's `router-view`. It provides a consistent container for all page content.

## Features

- Wraps `QPageContainer` and `router-view`
- Provides consistent page layout
- Ready for page-specific styles

## Usage

The component is automatically used in the main layout:

```vue
<AppPage />
```

All page components are rendered inside this container via the router view.

## Related Documentation

- [Router](../../App/ROUTER.md) - Router configuration
- [Views README](../README.md) - Views overview

