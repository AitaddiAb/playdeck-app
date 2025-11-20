# Playdeck

A modern, cross-platform game launcher built with Vue 3, Quasar, and Tauri.

## 🚀 Features

- **Cross-platform**: Desktop application for Windows and macOS
- **Modern Stack**: Built with Vue 3, Quasar UI, and Tauri
- **Fast & Lightweight**: Native performance with web technologies
- **Beautiful UI**: Modern, responsive interface with Quasar components

## 📋 Prerequisites

- Node.js `^20.19.0` or `>=22.12.0`
- pnpm (recommended) or npm/yarn
- Rust (for Tauri builds)

## 🛠️ Installation

```bash
git clone https://github.com/aitaddiab/playdeck-app.git
cd playdeck-app
pnpm install
```

## 🏃 Development

```bash
# Run in Development Mode
# Tauri desktop app (with hot reload)
pnpm tauri:serve

# Build for Production
# Build Tauri desktop app
pnpm tauri:build:mac    # macOS
pnpm tauri:build:win    # Windows

## Debug Builds
pnpm tauri:debug:mac    # macOS debug build
pnpm tauri:debug:win    # Windows debug build
```

## 📚 Documentation

**Contributor documentation** is available in the `docs/` directory. See [DOCUMENTATION.md](./docs/DOCUMENTATION.md) for the complete documentation index.

The documentation includes:

- Application architecture and structure
- Component library and patterns
- Translation system (i18n)
- Page-specific documentation

## 📝 Available Scripts

- `pnpm tauri:serve` - Run Tauri app in development mode
- `pnpm tauri:build:mac` - Build Tauri app for macOS
- `pnpm tauri:build:win` - Build Tauri app for Windows
- `pnpm tauri:debug:mac` - Build debug version for macOS
- `pnpm tauri:debug:win` - Build debug version for Windows
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier

## 🏗️ Project Structure

```
src/
├── App/              # Core application setup and plugins
├── Assets/           # Static assets (images, fonts, etc.)
├── Langs/            # Translation files (i18n)
├── Routes/           # Route definitions
├── Stores/           # State management (Pinia)
├── Styles/           # Styling files (SASS)
└── Views/            # Components, layouts, pages
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Abderrahim Ait Addi**

- Portfolio: [abdrahim.dev](https://abdrahim.dev/)
- GitHub: [@aitaddiab](https://github.com/aitaddiab)

## 🙏 Acknowledgments

This project was developed with [Cursor AI Agents](https://cursor.sh/), an AI-powered code editor that enhances development productivity.
