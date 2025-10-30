# Overwatch Roster Generator

A web app for building, customizing, and exporting Overwatch team rosters. Drag and drop heroes into player slots, manage hero pools, and export your roster as an image for sharing.

## Features
- **Roster Table:** Assign heroes to players by role using drag-and-drop.
- **Hero Pool:** Select from all available Overwatch heroes, with portraits and custom fonts.
- **Settings Panel:** Customize team name, date, and other options.
- **Export:** Download your roster as a shareable image.
- **Responsive UI:** Built with Vue 3, TailwindCSS, and Pinia for state management.

## Demo
![App Screenshot](public/demo_screenshot.png)

## Getting Started

### Prerequisites
- Node.js v20.19.0 or >=22.12.0
- npm

### Installation
```sh
npm install
```

### Development
```sh
npm run dev
```

### Build for Production
```sh
npm run build
```

### Run Unit Tests
```sh
npm run test:unit
```

### Lint
```sh
npm run lint
```

## Project Structure
- `src/components/` — Vue components (RosterTable, HeroPool, ExportCanvas, SettingsPanel)
- `src/assets/` — Fonts, hero portraits, icons
- `src/composables/` — Logic for heroes and roster management
- `src/types/` — TypeScript types

## Credits
- Hero portraits and Overwatch assets © Blizzard Entertainment (used under fair use for fan projects)
- Fonts: EuroStyle, Geom (see `src/assets/fonts/`)

## Contributing
Pull requests and suggestions welcome! Please open an issue for major changes.

## License
This project is licensed under the GNU General Public License v3.0. See [LICENSE](LICENSE) for details.

## Acknowledgements
- Built with [Vue 3](https://vuejs.org/), [Vite](https://vitejs.dev/), [TailwindCSS](https://tailwindcss.com/), [Pinia](https://pinia.vuejs.org/)
- Inspired by Overwatch and its community

---

*For IDE and browser setup, see below:*

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd) 
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).
