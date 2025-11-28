# TODO - PlayDeck Game Launcher

Future features and improvements for the PlayDeck game launcher.

## 📊 Progress Tracking

### High Priority Progress

**Completed**: 15 / 69 (21%)
**Remaining**: 54 items

### Medium Priority Progress

**Completed**: 1 / 42 (2%)
**Remaining**: 41 items

### Long-term Progress

**Completed**: 0 / 5 (0%)
**Remaining**: 5 items

## 🔨 Currently working on:

- Multi-language Support: Expand i18n support (currently configured for Arabic, English, and French, but not yet used in the code)

## 📅 Next planned features:

- _Add next planned items here_

---

## 🎮 Game Management

### High Priority

| 📋  | Description                                                                                                                                                                                  |
| --- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ✅  | **Automatic Game Detection**: Automatically scan and detect games in a given folder with configurable file extensions and exclusions _(Implemented in GamesStore with ReadDir and FindFile)_ |
| ☑️  | **Manual Game Addition**: Add option to manually add games individually (for games that are not in the same folder)                                                                          |
| ☑️  | **Game Installation State**: Track and display whether games are installed or not                                                                                                            |
| ☑️  | **Manual Installation Marking**: Allow users to manually mark games as installed or uninstalled                                                                                              |
| ☑️  | **Game Search**: Allow users to search for games (within library or external search)                                                                                                         |
| ☑️  | **Support Multiple Game Directories**: Allow users to add multiple game folders and scan all of them                                                                                         |
| ☑️  | **Metadata Path Configuration**: Change games metadata path to PlayDeck appdata (default) or allow user-configurable folder                                                                  |
| ☑️  | **Metadata Validation**: Validate metadata.json before adding game to library                                                                                                                |
| ☑️  | **New Game Detection Option**: Add user option to detect new games in configured game directories                                                                                            |
| ☑️  | **Game Collections/Playlists**: Create custom collections to organize games (e.g., "Favorites", "Recently Played", "Action Games")                                                           |
| ☑️  | **Game Launch History**: Track and display recently played games with play time                                                                                                              |
| ☑️  | **Play Time Tracking**: Record and display total play time for each game                                                                                                                     |
| ☑️  | **Game Favorites**: Mark games as favorites for quick access                                                                                                                                 |
| ☑️  | **Game Hiding**: Hide games from the library without deleting metadata                                                                                                                       |
| ☑️  | **Bulk Operations**: Select multiple games for batch operations (delete, move, tag, etc.)                                                                                                    |

### Medium Priority

| 📋  | Description                                                                                                                                        |
| --- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| ☑️  | **Game Sorting Options**: Sort by name, date added, last played, play time, release date _(Currently only hardcoded alphabetical sorting by name)_ |
| ☑️  | **Game Filtering**: Filter by platform, genre, tags, developer, publisher                                                                          |
| ☑️  | **Game Notes**: Add personal notes/ratings to games                                                                                                |
| ☑️  | **Game Completion Status**: Mark games as completed, in progress, or not started                                                                   |
| ☑️  | **Custom Game Categories**: Create and assign custom categories/tags to games                                                                      |

## 📊 Metadata & Information

### High Priority

| 📋  | Description                                                                                                                                                                                          |
| --- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ✅  | **Steam Metadata Integration**: Fetch detailed game metadata from Steam API (name, description, release date, platforms, developers, publishers, genres, images) _(SteamPluginMetadata implemented)_ |
| ✅  | **Steam Search**: Search for games on Steam Store by name _(SteamPluginSearch implemented)_                                                                                                          |
| ✅  | **Metadata Storage**: Save and load game metadata as JSON files in game directories _(metadata.json storage implemented)_                                                                            |
| ☑️  | **Steam Tags Support**: Implement alternative API or method to fetch game tags from Steam                                                                                                            |
| ☑️  | **Steam Icon Support**: Implement alternative API or method to fetch game icons from Steam                                                                                                           |
| ☑️  | **Multiple Metadata Sources**: Support fetching metadata from IGDB, RAWG, or other sources                                                                                                           |
| ☑️  | **Metadata Caching**: Cache metadata locally to reduce API calls                                                                                                                                     |
| ☑️  | **Metadata Refresh**: Manual refresh option for individual games or bulk refresh                                                                                                                     |

### Medium Priority

| 📋  | Description                                                                                                           |
| --- | --------------------------------------------------------------------------------------------------------------------- |
| ☑️  | **Game Ratings**: Display and fetch ratings from multiple sources (Steam, Metacritic, etc.)                           |
| ✅  | **Release Date Information**: Better handling and display of release dates _(Basic release date support implemented)_ |
| ☑️  | **System Requirements**: Display minimum and recommended system requirements                                          |
| ☑️  | **Game Achievements**: Track and display game achievements (if available)                                             |
| ☑️  | **DLC Management**: Show and manage downloadable content for games                                                    |

## 🎨 User Interface & Experience

### High Priority

| 📋  | Description                                                                                                                                      |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| ✅  | **Context Menus**: Native right-click context menus for game cards and UI elements _(Tauri context menu implementation)_                         |
| ✅  | **Window Controls**: Minimize, maximize, fullscreen, and close window controls _(WindowControl utility implemented)_                             |
| ✅  | **Settings Management**: Configurable games folder path, file extensions, exclusion patterns, and card sizes _(SettingsStore with localStorage)_ |
| ☑️  | **First Run Configuration Prompt**: Show welcome screen and prompt users to configure games folder on first launch                               |
| ☑️  | **Keyboard Navigation Support**: Full keyboard navigation for game cards and UI elements (arrow keys, Enter, Escape, etc.)                       |
| ☑️  | **Keyboard Shortcuts**: Add keyboard shortcuts for common actions (Ctrl+S to save, Ctrl+F to search, etc.)                                       |
| ☑️  | **Better Fullscreen UI**: Improved UI layout and controls when app is in fullscreen mode                                                         |
| ☑️  | **Dark/Light Theme Toggle**: Add theme switcher (currently only dark mode)                                                                       |
| ☑️  | **Grid/List View Toggle**: Switch between grid and list view for game library                                                                    |
| ✅  | **Customizable Card Sizes**: More granular control over card dimensions _(Card width slider implemented in settings)_                            |
| ☑️  | **Game Cover Art Fallback**: Better fallback images when cover art is missing                                                                    |
| ☑️  | **Loading States**: Better loading indicators during game discovery and metadata fetching                                                        |
| ☑️  | **Error Messages**: User-friendly error messages with actionable suggestions                                                                     |

### Medium Priority

| 📋  | Description                                                            |
| --- | ---------------------------------------------------------------------- |
| ☑️  | **Drag and Drop**: Reorder games or collections via drag and drop      |
| ☑️  | **Game Details View**: Full-screen game details view with all metadata |
| ☑️  | **Image Gallery**: View all game images (screenshots, artwork, etc.)   |
| ☑️  | **Smooth Animations**: Add transitions and animations for better UX    |
| ☑️  | **Responsive Layout**: Better support for different window sizes       |

## 🎨 Branding & Assets

### High Priority

| 📋  | Description                                                                      |
| --- | -------------------------------------------------------------------------------- |
| ☑️  | **PlayDeck Icon and Logo**: Design and implement custom PlayDeck icon and logo   |
| ☑️  | **macOS DMG Background**: Create custom background image for macOS DMG installer |

## 🔧 Functionality & Features

### High Priority

| 📋  | Description                                                                                                                                      |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| ☑️  | **Support Emulators**: Add support for emulator configurations and ROM management                                                                |
| ☑️  | **Gamepad/Game Controller Navigation**: Support gamepad input for navigating the UI and launching games                                          |
| ☑️  | **Game Installation Detection**: Auto-detect games from Steam, Epic Games, GOG, etc.                                                             |
| ✅  | **Multiple Launch Options**: Configure multiple launch options per game (different executables, mods, etc.) _(actions.others array implemented)_ |
| ☑️  | **Launch Arguments**: Support custom launch arguments for games                                                                                  |
| ☑️  | **Game Uninstaller**: Track and launch uninstallers for games                                                                                    |
| ☑️  | **Game Updates**: Check for game updates and notify users                                                                                        |
| ☑️  | **Cloud Save Sync**: Support for cloud save synchronization (if applicable)                                                                      |

### Medium Priority

| 📋  | Description                                                                              |
| --- | ---------------------------------------------------------------------------------------- |
| ☑️  | **Game Mods Management**: Manage and launch games with mods                              |
| ☑️  | **Game Shortcuts**: Create desktop shortcuts for games                                   |
| ☑️  | **Game Backup**: Backup game saves and configurations                                    |
| ☑️  | **Game Statistics Dashboard**: Display library statistics (total games, play time, etc.) |
| ☑️  | **Export/Import Library**: Export game library data for backup or sharing                |
| ☑️  | **Game Recommendations**: Suggest games based on library and preferences                 |

## 🌐 Platform & Integration

### High Priority

| 📋  | Description                                                                                                                                   |
| --- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| ✅  | **Windows Support**: Desktop application for Windows with Tauri _(x86_64-pc-windows-gnu build target implemented)_                            |
| ✅  | **macOS Support**: Desktop application for macOS with Tauri _(x86_64-apple-darwin build target implemented)_                                  |
| ✅  | **Platform Detection**: Detect current platform (Windows, macOS, Linux, browser) with platform-specific utilities _(Platform.js implemented)_ |
| ☑️  | **Code Signing**: Sign PlayDeck executable after build for secure distribution (Windows and macOS)                                            |
| ☑️  | **Linux Support**: Add Linux build target and test compatibility                                                                              |
| ☑️  | **Auto-updater**: Implement automatic application updates                                                                                     |
| ☑️  | **Steam Integration**: Direct integration with Steam library (if API available)                                                               |
| ☑️  | **Epic Games Integration**: Support for Epic Games Store library                                                                              |
| ☑️  | **GOG Integration**: Support for GOG library                                                                                                  |

### Medium Priority

| 📋  | Description                                                               |
| --- | ------------------------------------------------------------------------- |
| ☑️  | **Xbox Game Pass Integration**: Support for Xbox Game Pass games          |
| ☑️  | **Battle.net Integration**: Support for Battle.net games                  |
| ☑️  | **Origin/EA App Integration**: Support for EA games                       |
| ☑️  | **Ubisoft Connect Integration**: Support for Ubisoft games                |
| ☑️  | **Custom Game Sources**: Allow users to add custom game sources/launchers |

## ⚡ Performance & Optimization

### High Priority

| 📋  | Description                                                                                                                                                                  |
| --- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ✅  | **Image Downloading**: Download images from URLs and save them locally with deterministic hash-based filenames _(SaveImage function with magic bytes detection implemented)_ |
| ✅  | **Image Optimization**: Optimize and compress downloaded images _(Image downloading and caching implemented)_                                                                |
| ✅  | **Caching Strategy**: Implement smart caching for images and metadata _(Image caching with deterministic filenames implemented)_                                             |
| ☑️  | **Optimized Game Loading**: Only load games with cached metadata.json to improve performance                                                                                 |
| ☑️  | **Lazy Loading**: Implement lazy loading for game cards to improve performance                                                                                               |
| ☑️  | **Database**: Consider using a local database (SQLite) for better performance with large libraries                                                                           |
| ☑️  | **Background Processing**: Move heavy operations to background threads                                                                                                       |

### Medium Priority

| 📋  | Description                                                              |
| --- | ------------------------------------------------------------------------ |
| ☑️  | **Virtual Scrolling**: Use virtual scrolling for large game libraries    |
| ☑️  | **Debounced Search**: Implement debouncing for search operations         |
| ☑️  | **Batch API Calls**: Batch multiple API requests to reduce rate limiting |
| ☑️  | **Memory Management**: Optimize memory usage for large image collections |

## 🔒 Security & Privacy

### High Priority

| 📋  | Description                                                              |
| --- | ------------------------------------------------------------------------ |
| ☑️  | **Settings Encryption**: Encrypt sensitive settings if needed            |
| ☑️  | **Privacy Settings**: Add privacy controls for data collection           |
| ☑️  | **Secure Storage**: Use secure storage for API keys (if added in future) |

### Medium Priority

| 📋  | Description                                                             |
| --- | ----------------------------------------------------------------------- |
| ☑️  | **User Permissions**: Granular permission system for file system access |
| ☑️  | **Data Export/Import Security**: Secure handling of exported data       |

## 📱 Additional Features

### Medium Priority

| 📋  | Description                                                                   |
| --- | ----------------------------------------------------------------------------- |
| ☑️  | **Game Screenshots**: Capture and manage game screenshots                     |
| ☑️  | **Game Videos**: Support for game trailers and videos                         |
| ☑️  | **Social Features**: Share game library or achievements (optional)            |
| ☑️  | **Game Reviews**: Display and manage user reviews                             |
| ☑️  | **Wishlist**: Maintain a wishlist of games to track                           |
| ☑️  | **Price Tracking**: Track game prices and notify on sales (if APIs available) |

## 🐛 Bug Fixes & Improvements

### Ongoing

| 📋  | Description                                   |
| --- | --------------------------------------------- |
| ☑️  | Monitor and fix any reported bugs             |
| ☑️  | Improve error handling across the application |
| ☑️  | Add comprehensive logging for debugging       |
| ☑️  | Performance profiling and optimization        |
| ☑️  | Code refactoring and cleanup                  |

## 📚 Documentation & Testing

### High Priority

| 📋  | Description                                                |
| --- | ---------------------------------------------------------- |
| ☑️  | **User Documentation**: Create user guide/documentation    |
| ☑️  | **Unit Tests**: Add unit tests for critical functions      |
| ☑️  | **Integration Tests**: Add integration tests for workflows |
| ☑️  | **E2E Tests**: Add end-to-end tests for main features      |

### Medium Priority

| 📋  | Description                                                      |
| --- | ---------------------------------------------------------------- |
| ☑️  | **API Documentation**: Document all API endpoints and usage      |
| ☑️  | **Contributing Guide**: Create CONTRIBUTING.md with guidelines   |
| ☑️  | **Changelog**: Maintain a CHANGELOG.md file                      |
| ☑️  | **Screenshots/Demos**: Add screenshots and demo videos to README |

## 🚀 Future Considerations

### Long-term

| 📋  | Description                                                                                      |
| --- | ------------------------------------------------------------------------------------------------ |
| ☑️  | **Multi-language Support**: Expand i18n support (currently supports Arabic, English, and French) |
| ☑️  | **Plugin System**: Allow third-party plugins/extensions                                          |
| ☑️  | **Cloud Sync**: Sync library and settings across devices                                         |
| ☑️  | **Mobile Companion App**: Companion app for mobile devices                                       |
| ☑️  | **Game Streaming**: Support for game streaming services                                          |

---

## Notes

- Priorities are suggestions and can be adjusted based on user feedback
- Some features may depend on external API availability
- Consider user feedback and feature requests when prioritizing
- Regular review and update of this TODO list is recommended
