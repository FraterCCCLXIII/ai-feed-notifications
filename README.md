# AI Message Feed

A React application that displays various types of AI assistant messages in a feed format, showcasing different message types, statuses, and interactive elements.

## Features

- Displays various message types (system, code, build, git, bug, dependency, test, docs, security, performance, error)
- Shows different message statuses (thinking, researching, error states)
- Interactive code blocks with syntax highlighting
- Action buttons for user interaction
- Dark/light mode toggle
- Responsive design

## Tech Stack

- React 18.2.0
- TypeScript 5.8.3
- Vite 6.3.5
- TailwindCSS 3.4.17
- React Icons 5.5.0

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/ai-message-feed.git
cd ai-message-feed

# Install dependencies
npm install

# Start development server
npm run dev
```

## Build for Production

```bash
npm run build
```

## Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── MessageFeed.tsx
│   ├── MessageItem.tsx
│   └── types.ts
├── data/
│   └── messages.ts
├── App.tsx
├── main.tsx
└── index.css
```

## License

MIT
