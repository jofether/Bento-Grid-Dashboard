# Bento Grid Dashboard

A modern dashboard interface built with React and Tailwind CSS using CSS Grid to create a puzzle-like "Bento Box" layout. This project tests complex spatial design with grid spans to create a responsive, visually appealing dashboard without unintentional gaps.

## Features

- **Responsive Grid Layout**: Uses CSS Grid with `col-span` and `row-span` classes to create a bento box-style interface
- **Interactive Elements**: Includes profile cards, revenue stats, live visitor counters, alerts, and progress indicators
- **Modern Design**: Dark theme with neutral colors, orange accents, and smooth animations
- **Accessibility**: Semantic HTML and ARIA-friendly component structure

## Project Structure

```
├── src/
│   ├── App.jsx          # Main dashboard component
│   ├── main.jsx         # React entry point
│   ├── index.css        # Tailwind CSS imports and global styles
├── package.json         # Project dependencies
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # Tailwind CSS configuration
└── index.html           # HTML entry point
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

Create an optimized production build:

```bash
npm run build
```

### Preview

Preview the production build locally:

```bash
npm run preview
```

## Component Breakdown

- **Item 1**: Profile card (1x1)
- **Item 2**: Total Revenue stats with chart (2 cols span)
- **Item 3**: Live Visitors counter (2 rows span)
- **Item 4**: Server Alert notification (1x1)
- **Item 5**: Dark Mode toggle (1x1)
- **Item 6**: Progress bar widget (2 cols span)

## Future Enhancements

The code includes a comment noting a future bug: changing `md:col-span-2` to `md:col-span-1` in the revenue card will break the puzzle layout, demonstrating how critical grid spans are to maintaining the bento box design.

## Technologies Used

- **React 18**: UI library
- **Vite**: Fast build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **PostCSS & Autoprefixer**: CSS processing

## License

MIT
