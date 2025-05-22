/**
 * Taxonomy of AI Assistant Interaction Patterns
 * 
 * This file documents various interaction patterns between users and AI assistants,
 * categorized by scenario type and including examples of each.
 */

export interface InteractionPattern {
  id: string;
  category: string;
  title: string;
  description: string;
  example: string;
}

export const interactionPatterns: InteractionPattern[] = [
  // File Exploration Patterns
  {
    id: 'file-read',
    category: 'File Operations',
    title: 'File Reading',
    description: 'Reading file contents to understand the current state before making changes.',
    example: 'Read index.css'
  },
  {
    id: 'file-edit',
    category: 'File Operations',
    title: 'File Editing',
    description: 'Making changes to files based on requirements or to fix issues.',
    example: 'Edited index.css'
  },
  
  // Development Server Patterns
  {
    id: 'server-start',
    category: 'Development Workflow',
    title: 'Starting Development Server',
    description: 'Launching a development server to preview changes in real-time.',
    example: 'Ran cd /workspace/ai-message-feed && npm run dev -- --host 0.0.0.0 --port 12000'
  },
  {
    id: 'server-stop',
    category: 'Development Workflow',
    title: 'Stopping Server',
    description: 'Terminating a running server process to make configuration changes.',
    example: 'Ran C-c'
  },
  
  // Dependency Management Patterns
  {
    id: 'dependency-install',
    category: 'Package Management',
    title: 'Installing Dependencies',
    description: 'Adding required packages to resolve missing dependencies.',
    example: 'Ran cd /workspace/ai-message-feed && npm install @tailwindcss/postcss'
  },
  {
    id: 'config-check',
    category: 'Configuration',
    title: 'Checking Configuration',
    description: 'Examining configuration files to identify issues.',
    example: 'Read postcss.config.js'
  },
  {
    id: 'config-fix',
    category: 'Configuration',
    title: 'Fixing Configuration',
    description: 'Updating configuration files to resolve issues.',
    example: 'Edited postcss.config.js'
  },
  
  // Build and Deployment Patterns
  {
    id: 'build-app',
    category: 'Deployment',
    title: 'Building for Production',
    description: 'Creating optimized production builds for deployment.',
    example: 'Ran cd /workspace/ai-message-feed && npm run build'
  },
  {
    id: 'serve-static',
    category: 'Deployment',
    title: 'Serving Static Files',
    description: 'Hosting built files using a static file server.',
    example: 'Ran cd /workspace/ai-message-feed && npx serve -s dist -l 12000'
  },
  
  // User Interaction Patterns
  {
    id: 'browser-check',
    category: 'Testing',
    title: 'Browser Verification',
    description: 'Checking application appearance and functionality in a browser.',
    example: 'Browsing completed'
  },
  {
    id: 'feature-test',
    category: 'Testing',
    title: 'Feature Testing',
    description: 'Testing specific features to ensure they work as expected.',
    example: 'Let\'s try clicking the dark mode toggle button to see if it works:'
  },
  
  // Alternative Approach Patterns
  {
    id: 'approach-change',
    category: 'Problem Solving',
    title: 'Changing Approach',
    description: 'Pivoting to a different solution strategy when the current one isn\'t working.',
    example: 'Let\'s create a new approach by using a CDN version of Tailwind CSS:'
  },
  
  // Troubleshooting Patterns
  {
    id: 'error-diagnosis',
    category: 'Troubleshooting',
    title: 'Error Diagnosis',
    description: 'Identifying the root cause of errors or issues.',
    example: 'It seems there\'s an issue with Tailwind CSS. Let\'s check the postcss.config.js file:'
  },
  {
    id: 'solution-attempt',
    category: 'Troubleshooting',
    title: 'Solution Attempt',
    description: 'Trying potential solutions to resolve identified issues.',
    example: 'Let\'s fix the postcss.config.js file:'
  },
  
  // User Interface Testing Patterns
  {
    id: 'ui-scroll',
    category: 'UI Testing',
    title: 'Content Scrolling',
    description: 'Scrolling through content to verify all elements are displayed correctly.',
    example: 'Let\'s scroll down to see more messages:'
  },
  {
    id: 'theme-toggle',
    category: 'UI Testing',
    title: 'Theme Switching',
    description: 'Testing theme changes to ensure proper styling in different modes.',
    example: 'Let\'s try toggling the dark mode to see how it looks in light mode:'
  }
];

/**
 * Categorized patterns for easier reference
 */
export const patternsByCategory = interactionPatterns.reduce((acc, pattern) => {
  if (!acc[pattern.category]) {
    acc[pattern.category] = [];
  }
  acc[pattern.category].push(pattern);
  return acc;
}, {} as Record<string, InteractionPattern[]>);