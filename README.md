# AI Message Feed

A React application that displays various types of AI assistant messages in a feed format, showcasing different message types, statuses, and interactive elements. It also includes a taxonomy of interaction patterns and an interactive demo.

## Features

- Displays various message types (system, code, build, git, bug, dependency, test, docs, security, performance, error)
- Shows different message statuses (thinking, researching, error states)
- Interactive code blocks with syntax highlighting
- Action buttons for user interaction
- Dark/light mode toggle
- Responsive design
- Taxonomy of AI interaction patterns
- Interactive terminal demo
- Tab navigation between views

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
│   ├── MessageFeed.tsx      # Main message feed component
│   ├── MessageItem.tsx      # Individual message component
│   ├── InteractionPatterns.tsx # Taxonomy of interaction patterns
│   ├── InteractionDemo.tsx  # Interactive terminal demo
│   └── types.ts             # TypeScript type definitions
├── data/
│   ├── messages.ts          # Sample message data
│   └── interaction-patterns.ts # Taxonomy data
├── App.tsx                  # Main application component
├── main.tsx                 # Application entry point
└── index.css                # Global styles
```

## Interaction Patterns

The application includes a comprehensive taxonomy of AI interaction patterns, categorized by:

- File Operations
- Development Workflow
- Package Management
- Configuration
- Deployment
- Testing
- Problem Solving
- Troubleshooting
- UI Testing

Each pattern includes:
- Title
- Description
- Example usage

## Interactive Demo

The application features an interactive terminal demo that simulates common development workflows:

- Reading and editing files
- Starting and stopping development servers
- Installing dependencies
- Building applications
- Fixing configuration issues

## License

MIT
