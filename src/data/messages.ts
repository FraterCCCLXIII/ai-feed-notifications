import type { Message } from "../components/types";

export const sampleMessages: Message[] = [
  // System & Session Management
  {
    id: '1',
    type: 'system',
    status: 'thinking',
    content: 'Analyzing your codebase...',
    timestamp: new Date(Date.now() - 60000 * 24),
  },
  {
    id: '2',
    type: 'system',
    status: 'researching',
    content: 'Searching for best practices on API rate limiting...',
    timestamp: new Date(Date.now() - 60000 * 23),
  },
  
  // Error States - LLM Errors
  {
    id: '3',
    type: 'error',
    status: 'error_llm_authentication',
    content: 'Authentication failed. Check your API key or login.',
    actions: [
      {
        command: 'ai-tool login --key YOUR_API_KEY',
        label: 'Re-authenticate',
      }
    ],
    timestamp: new Date(Date.now() - 60000 * 22),
  },
  {
    id: '4',
    type: 'error',
    status: 'error_llm_service_unavailable',
    content: 'Service temporarily down. Retry in 5 minutes.',
    actions: [
      {
        command: 'curl https://status.aiservice.com',
        label: 'Check status',
      }
    ],
    timestamp: new Date(Date.now() - 60000 * 21),
  },
  {
    id: '5',
    type: 'error',
    status: 'error_llm_internal_server_error',
    content: 'Internal error. Contact support with this ID: ERR_12345.',
    actions: [
      {
        command: 'ai-tool support --error-id ERR_12345',
        label: 'Contact Support',
      }
    ],
    timestamp: new Date(Date.now() - 60000 * 20),
  },
  {
    id: '6',
    type: 'error',
    status: 'error_llm_out_of_credits',
    content: 'Out of credits. Upgrade your plan.',
    actions: [
      {
        command: 'ai-tool billing --upgrade',
        label: 'Upgrade Plan',
      }
    ],
    timestamp: new Date(Date.now() - 60000 * 19),
  },
  {
    id: '7',
    type: 'error',
    status: 'error_llm_content_policy_violation',
    content: 'Request blocked due to policy restrictions.',
    actions: [
      {
        label: 'Review Guidelines',
      }
    ],
    timestamp: new Date(Date.now() - 60000 * 18),
  },
  
  // Runtime Error Messages
  {
    id: '8',
    type: 'error',
    status: 'error_runtime_disconnected',
    content: 'There was an error while connecting to the runtime. Please refresh the page.',
    actions: [
      {
        label: 'Refresh Page',
      }
    ],
    timestamp: new Date(Date.now() - 60000 * 17),
  },
  {
    id: '9',
    type: 'error',
    status: 'error_runtime_crashed',
    content: 'AgentRuntimeDisconnectedError: Runtime is temporarily unavailable. This may be due to a restart or network issue, please try again. Original error: Server error \'502 Bad Gateway\' for url \'https://sfrzpjdeisbwmmvu.prod-runtime.all-hands.dev/execute_action\' For more information check: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/502',
    actions: [
      {
        label: 'Retry',
      },
      {
        label: 'Check Status',
      }
    ],
    timestamp: new Date(Date.now() - 60000 * 16),
  },
  {
    id: '10',
    type: 'error',
    status: 'error_action_not_executed',
    content: 'The action has not been executed. This may have occurred because the user pressed the stop button, or because the runtime system crashed and restarted due to resource constraints. Any previously established system state, dependencies, or environment variables may have been lost.',
    actions: [
      {
        label: 'Retry Action',
      }
    ],
    timestamp: new Date(Date.now() - 60000 * 15),
  },
  
  // Code Generation & Editing
  {
    id: '11',
    type: 'code',
    content: 'This function has a security flaw. Fix it?',
    code: `def parse_user_input(input_str):
    # This is unsafe as it allows arbitrary code execution
    return eval(input_str)  # Unsafe!

# Suggested fix:
def parse_user_input_safe(input_str):
    import json
    try:
        # Use json.loads instead of eval for safe parsing
        return json.loads(input_str)
    except json.JSONDecodeError:
        return None`,
    actions: [
      {
        command: 'git apply security-fix.patch',
        label: 'Apply Fix',
      },
      {
        label: 'Ignore',
      }
    ],
    timestamp: new Date(Date.now() - 60000 * 14),
  },
  
  // Build & Execution
  {
    id: '12',
    type: 'build',
    content: 'Build failed: missing dependency `pandas`.',
    actions: [
      {
        command: 'pip install pandas && python build.py',
        label: 'Install and rebuild',
      }
    ],
    timestamp: new Date(Date.now() - 60000 * 13),
  },
  
  // Version Control (Git)
  {
    id: '13',
    type: 'git',
    content: 'Merge conflict in `src/app.js`. Resolve manually or use:',
    code: 'git checkout --theirs src/app.js',
    actions: [
      {
        label: 'Use command',
      },
      {
        label: 'Open file',
      }
    ],
    timestamp: new Date(Date.now() - 60000 * 12),
  },
  
  // Bug Detection & Diagnostics
  {
    id: '14',
    type: 'bug',
    status: 'researching',
    content: 'Checking for similar bugs in Stack Overflow...',
    timestamp: new Date(Date.now() - 60000 * 11),
  },
  {
    id: '15',
    type: 'bug',
    content: 'Bug matches [CVE-2023-1234]. Patch with:',
    code: 'npm update lodash --latest',
    actions: [
      {
        command: 'npm update lodash --latest',
        label: 'Apply Patch',
      }
    ],
    timestamp: new Date(Date.now() - 60000 * 10),
  },
  
  // Dependency & Environment
  {
    id: '16',
    type: 'dependency',
    content: 'Vulnerability found in `axios@0.21.1`. Upgrade?',
    actions: [
      {
        command: 'npm install axios@1.2.0',
        label: 'Upgrade',
      },
      {
        label: 'Skip',
      }
    ],
    timestamp: new Date(Date.now() - 60000 * 9),
  },
  
  // Testing & Validation
  {
    id: '17',
    type: 'test',
    content: 'Test `testLogin` fails due to expired mock token. Regenerate?',
    code: 'const token = generateMockToken({ expiresIn: \'24h\' });',
    actions: [
      {
        label: 'Regenerate Token',
      }
    ],
    timestamp: new Date(Date.now() - 60000 * 8),
  },
  
  // Documentation & Help
  {
    id: '18',
    type: 'docs',
    content: 'Missing docstring for `calculateTax()`. Add this?',
    code: 'def calculateTax(income: float) -> float:\n    """Computes tax based on income brackets."""',
    actions: [
      {
        label: 'Insert',
      },
      {
        label: 'Edit manually',
      }
    ],
    timestamp: new Date(Date.now() - 60000 * 7),
  },
  
  // Security & Compliance
  {
    id: '19',
    type: 'security',
    content: 'Hardcoded secret detected. Move to environment variables?',
    code: 'export API_KEY="your_key"',
    actions: [
      {
        label: 'Move to .env',
      }
    ],
    timestamp: new Date(Date.now() - 60000 * 6),
  },
  
  // Performance Optimization
  {
    id: '20',
    type: 'performance',
    content: 'Database query takes 2s. Add indexing?',
    code: 'CREATE INDEX idx_user_email ON users(email);',
    actions: [
      {
        label: 'Add Index',
      }
    ],
    timestamp: new Date(Date.now() - 60000 * 5),
  },
  
  // File Operations
  {
    id: '21',
    type: 'system',
    content: 'Reading file contents to understand the current state before making changes.',
    code: 'cat -n /workspace/ai-message-feed/src/index.css',
    timestamp: new Date(Date.now() - 60000 * 4),
  },
  {
    id: '22',
    type: 'system',
    content: 'Making changes to files based on requirements or to fix issues.',
    code: 'sed -i \'s/background-color: #f1f1f1/background-color: #f5f5f5/g\' /workspace/ai-message-feed/src/index.css',
    timestamp: new Date(Date.now() - 60000 * 3),
  },
  
  // Development Workflow
  {
    id: '23',
    type: 'build',
    content: 'Starting development server to preview changes in real-time.',
    code: 'cd /workspace/ai-message-feed && npm run dev -- --host 0.0.0.0 --port 12000',
    actions: [
      {
        label: 'Start Server',
      }
    ],
    timestamp: new Date(Date.now() - 60000 * 2),
  },
  {
    id: '24',
    type: 'build',
    content: 'Stopping server to make configuration changes.',
    code: 'kill -9 $(lsof -t -i:12000)',
    actions: [
      {
        label: 'Stop Server',
      }
    ],
    timestamp: new Date(Date.now() - 60000),
  },
  
  // Package Management
  {
    id: '25',
    type: 'dependency',
    content: 'Installing required packages to resolve missing dependencies.',
    code: 'cd /workspace/ai-message-feed && npm install @tailwindcss/forms',
    actions: [
      {
        label: 'Install Package',
      }
    ],
    timestamp: new Date(),
  },
];