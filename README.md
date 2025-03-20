# Jaiki React Template

A modern, minimal React + Tailwind starter template with essential features for quick project setup.

## Features

- ⚡️ **React 19** - Latest React version
- 🎨 **Tailwind CSS 4** - Utility-first CSS framework
- 📱 **Responsive Design** - Mobile-first approach
- 🧩 **Component Structure** - Well-organized component hierarchy
- 🌐 **i18n Support** - Internationalization with react-i18next
- 🧭 **React Router** - Client-side routing
- 🔍 **ESLint** - Code quality linting
- 🔄 **Vite** - Fast development and building
- 🔌 **Hot Module Replacement** - Fast refresh during development

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/jaiki-react-template.git my-project
   cd my-project
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
jaiki-react-template/
├── public/             # Static assets
├── src/
│   ├── assets/         # Images, fonts, etc.
│   ├── components/     # Reusable components
│   │   ├── ui/         # Base UI components
│   │   ├── layout/     # Layout components
│   │   └── features/   # Feature-specific components
│   ├── context/        # React context providers
│   ├── hooks/          # Custom hooks
│   ├── locales/        # i18n translation files
│   │   ├── en/
│   │   ├── it/
│   │   ├── fr/
│   │   └── es/
│   ├── pages/          # Page components
│   ├── services/       # API services
│   ├── styles/         # Global styles
│   ├── utils/          # Utility functions
│   ├── App.jsx         # Main app component
│   ├── i18n.js         # i18n configuration
│   ├── index.css       # Entry CSS file
│   └── main.jsx        # Entry point
├── .env.example        # Example environment variables
├── .eslintrc.js        # ESLint configuration
├── .gitignore          # Git ignore file
├── package.json        # Dependencies and scripts
├── postcss.config.js   # PostCSS configuration
├── tailwind.config.js  # Tailwind CSS configuration
└── vite.config.js      # Vite configuration
```

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run clean:gitkeep` - Remove .gitkeep files

## Customization

### Styling

This template uses Tailwind CSS. You can customize the theme in `tailwind.config.js`.

### Internationalization

Add new languages by:
1. Create a new folder in `src/locales/` with the language code
2. Add translation files in the new folder
3. Import the translation files in `src/i18n.js`

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)
- [react-i18next](https://react.i18next.com/)