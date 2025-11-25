# Playdeck App Documentation

Welcome to the Playdeck application documentation. This documentation provides comprehensive information about the application architecture, components, pages, and features.

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Core Documentation](#core-documentation)
- [Quick Links](#quick-links)
  - [Getting Started](#getting-started)
  - [Architecture](#architecture)
  - [Development](#development)
- [Documentation Structure](#documentation-structure)
- [Contributing](#contributing)
- [Need Help?](#need-help)

### Core Documentation

- **[App](./App/README.md)** - Application core setup, plugins, and configuration
- **[Utils](./Utils/README.md)** - Utility functions and helpers
- **[Views](./Views/README.md)** - Components, layouts, and pages
- **[Routes](./Routes/README.md)** - Route configuration
- **[Styles](./Styles/README.md)** - Styling system

---

## Quick Links

### Getting Started

- [Application Entry Point](./App/APP.md) - How the app initializes
- [Router Configuration](./App/ROUTER.md) - Route setup and navigation
- [Translation System](./App/LANGUAGE.md) - How to use translations

### Architecture

- [Platform Detection](./App/PLATFORM.md) - Tauri/browser detection
- [Quasar Configuration](./App/QUASAR.md) - UI framework setup
- [Store Management](./App/STORE.md) - Pinia stores
- [Window Control](./Utils/WINDOW_CONTROL.md) - Tauri window utilities
- [Context Menu](./Utils/CONTEXT_MENU.md) - Native context menus

### Development

- [Components](./Views/Components/) - Component library
- [Pages](./Views/Pages/) - Page documentation
- [Translation Guide](./App/LANGUAGE.md) - Adding and using translations

---

## Documentation Structure

```
docs/
├── README.md              # This file - main navigation
├── App/                   # Application core documentation
│   ├── README.md          # App directory overview
│   ├── APP.md             # App.js entry point
│   ├── ROUTER.md          # Router.js configuration
│   ├── STORE.md           # Store.js Pinia setup
│   ├── PLATFORM.md        # Platform.js detection
│   ├── QUASAR.md          # Quasar.js UI framework
│   └── LANGUAGE.md        # Language.js i18n system
├── Utils/                 # Utility functions
│   ├── README.md          # Utils overview
│   ├── WINDOW_CONTROL.md  # WindowControl.js
│   └── CONTEXT_MENU.md    # ContextMenu.js
├── Views/                 # Views documentation
│   ├── README.md          # Views overview
│   ├── Components/        # Individual component docs
│   │   ├── APP_HEADER.md
│   │   ├── APP_SIDEBAR.md
│   │   ├── APP_PAGE.md
│   │   └── APP_FOOTER.md
│   ├── Layouts/           # Layout documentation
│   │   └── LAYOUT_APP.md
│   └── Pages/              # Page documentation
│       ├── PAGE_DASHBOARD.md
│       └── PAGE_SETTINGS.md
├── Routes/                 # Routes documentation
│   └── README.md          # Routes overview
└── Styles/                # Styles documentation
    └── README.md          # Styles overview
```

---

## Contributing

When adding new documentation:

1. **App Changes**: Add documentation to `docs/App/` following the file naming convention
2. **Utils**: Add utility documentation to `docs/Utils/`
3. **Components**: Add component documentation to `docs/Views/Components/` following the naming convention `COMPONENT_NAME.md`
4. **Layouts**: Add layout documentation to `docs/Views/Layouts/` following the naming convention `LAYOUT_NAME.md`
5. **Pages**: Add page documentation to `docs/Views/Pages/` following the naming convention `PAGE_NAME.md`
6. **Translations**: Update `docs/App/LANGUAGE.md` if translation system changes

---

## Need Help?

- Check the specific documentation file for detailed information
- Review code examples in each documentation file
- Check the [Translation System](./App/LANGUAGE.md#troubleshooting) for common issues

