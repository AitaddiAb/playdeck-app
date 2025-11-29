# Playdeck

A modern, cross-platform game launcher built with Vue 3, Quasar, and Tauri.

## 🚀 Features

- **Cross-platform**: Desktop application for Windows, MacOS, and Linux
- **Modern Stack**: Built with Vue 3, Quasar UI, and Tauri
- **Fast & Lightweight**: Native performance with web technologies
- **Beautiful UI**: Modern, responsive interface with Quasar components
- **Game Management**: Discover, organize, and launch games from your library
- **Metadata Integration**: Fetch game metadata from Steam API
- **Customizable**: Adjustable card sizes and exclusion patterns
- **Context Menus**: Right-click support for quick actions
- **Image Management**: Automatic image downloading and caching

## ⬇️ Download & Install

Playdeck is available for **Windows**, **MacOS**, and **Linux**. Download the latest release from the [GitHub Releases](https://github.com/aitaddiab/playdeck-app/releases) page.

### Installation Notes

#### Windows

You may see a warning about potentially dangerous software while downloading and installing. This is because the application is not code-signed yet. **Don't worry, it's safe to use.** You can safely proceed with the installation by clicking "More info" and then "Run anyway" when prompted.

#### MacOS

If the application won't open and the system says it's damaged, this is because the application is not code-signed yet. To allow it to run, open Terminal and run the following command:

```bash
sudo xattr -dr com.apple.quarantine /Applications/Playdeck.app
```

This command removes the quarantine attribute that MacOS applies to unsigned applications, allowing Playdeck to run normally.

## 🚧 Planned Features & Improvements

**Progress Overview:**

- **High Priority**: 15 / 69 completed (21%)
- **Medium Priority**: 1 / 42 completed (2%)
- **Long-term**: 0 / 5 completed (0%)

A comprehensive list of planned features, current work, and detailed progress tracking is available in [TODO.md](./TODO.md).

## 🛠️ Development

### 📋 Prerequisites

- Node.js `^20.19.0` or `>=22.12.0`
- pnpm (recommended) or npm/yarn
- Rust (for Tauri builds)

### ⬇️ Clone Project

```bash
git clone https://github.com/aitaddiab/playdeck-app.git
cd playdeck-app
pnpm install
```

### 📝 Available Scripts

- `pnpm tauri:serve` - Run Tauri app in development mode
- `pnpm tauri:build:mac` - Build Tauri app for MacOS
- `pnpm tauri:build:win` - Build Tauri app for Windows
- `pnpm tauri:debug:mac` - Build debug version for MacOS
- `pnpm tauri:debug:win` - Build debug version for Windows
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier

### 📚 Documentation

**Contributor documentation** is available in the `docs/` directory. See [docs/README.md](./docs/README.md) for the complete documentation index.

The documentation includes:

- Application architecture and structure
- Component library and patterns
- Translation system (i18n)
- Page-specific documentation
- Project structure

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

---

Made with ❤️ by [Abdrahim](https://abdrahim.dev/)
