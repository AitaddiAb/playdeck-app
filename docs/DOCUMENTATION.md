# Playdeck App Documentation

Welcome to the Playdeck application documentation. This documentation provides comprehensive information about the application architecture, components, pages, and features.

## Table of Contents

### Core Documentation

- **[App Documentation](./APP.md)** - Application architecture, stores, layouts, routes, scripts, and styles
- **[Components Documentation](./COMPONENTS.md)** - Reusable components and component patterns
- **[Translation System](./TRANSLATION.md)** - Internationalization (i18n) system and usage

### Pages

- **[Dashboard Page](./pages/PAGE_DASHBOARD.md)** - Main dashboard/home page
- **[Settings Page](./pages/PAGE_SETTINGS.md)** - Application settings page

---

## Quick Links

### Getting Started

- [Application Entry Point](./APP.md#appjs) - How the app initializes
- [Router Configuration](./APP.md#routerjs) - Route setup and navigation
- [Translation System](./TRANSLATION.md#overview) - How to use translations

### Architecture

- [Stores (State Management)](./APP.md#stores-app) - Pinia stores
- [Layouts](./APP.md#layouts) - Application layouts
- [Routes](./APP.md#routes) - Route configuration
- [Scripts](./APP.md#scripts) - Core application scripts
- [Styles](./APP.md#styles) - Styling system

### Development

- [Components](./COMPONENTS.md) - Component library
- [Pages](./pages/) - Page documentation
- [Translation Guide](./TRANSLATION.md) - Adding and using translations

---

## Documentation Structure

```
docs/
├── DOCUMENTATION.md       # This file - main navigation
├── APP.md                 # Application architecture
├── COMPONENTS.md          # Components documentation
├── TRANSLATION.md         # Translation system
└── pages/                 # Page-specific documentation
    ├── PAGE_DASHBOARD.md  # Dashboard page
    └── PAGE_SETTINGS.md   # Settings page
```

---

## Contributing

When adding new documentation:

1. **Pages**: Add page documentation to `docs/pages/` following the naming convention `PAGE_<PAGE_NAME>.md`
2. **Components**: Update `docs/COMPONENTS.md` with new component documentation
3. **App Changes**: Update relevant sections in `docs/APP.md`
4. **Translations**: Update `docs/TRANSLATION.md` if translation system changes

---

## Need Help?

- Check the specific documentation file for detailed information
- Review code examples in each documentation file
- Check the [Translation System](./TRANSLATION.md#troubleshooting) for common issues
