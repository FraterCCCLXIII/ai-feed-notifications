import type { Message } from "../components/types";

export const sampleMessages: Message[] = [
  {
    id: '1',
    type: 'system',
    status: 'thinking',
    content: 'Analyzing your codebase...',
    timestamp: new Date(Date.now() - 65000),
  },
  {
    id: '1a',
    type: 'system',
    status: 'in_progress',
    content: 'Scanning repository for security vulnerabilities...',
    timestamp: new Date(Date.now() - 62000),
  },
  {
    id: 'n1',
    type: 'notification',
    status: 'success',
    content: 'Successfully installed all dependencies',
    timestamp: new Date(Date.now() - 60000),
  },
  {
    id: 'n2',
    type: 'notification',
    status: 'failure',
    content: 'Failed to compile project: syntax error in src/App.tsx',
    timestamp: new Date(Date.now() - 58000),
  },
  {
    id: 'n3',
    type: 'notification',
    status: 'warning',
    content: 'Outdated dependency detected: react-icons@4.3.1',
    timestamp: new Date(Date.now() - 56000),
  },
  {
    id: 'n4',
    type: 'notification',
    status: 'in_progress',
    content: 'Building project... 45% complete',
    timestamp: new Date(Date.now() - 54000),
  },
  {
    id: 'n5',
    type: 'notification',
    status: 'completed',
    content: 'All tests passed successfully (15 tests, 42 assertions)',
    timestamp: new Date(Date.now() - 52000),
  },
  {
    id: '2',
    type: 'error',
    status: 'error_llm_authentication',
    content: 'Authentication failed. Check your API key or login.',
    actions: [
      {
        command: 'ai-tool login --key YOUR_API_KEY',
        label: 'Re-authenticate',
      }
    ],
    timestamp: new Date(Date.now() - 55000),
  },
  {
    id: '3',
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
    timestamp: new Date(Date.now() - 50000),
  },
  {
    id: '4',
    type: 'build',
    content: 'Build failed: missing dependency `pandas`.',
    actions: [
      {
        command: 'pip install pandas && python build.py',
        label: 'Install and rebuild',
      }
    ],
    timestamp: new Date(Date.now() - 45000),
  },
  {
    id: '5',
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
    timestamp: new Date(Date.now() - 40000),
  },
  {
    id: '6',
    type: 'bug',
    status: 'researching',
    content: 'Checking for similar bugs in Stack Overflow...',
    timestamp: new Date(Date.now() - 35000),
  },
  {
    id: '7',
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
    timestamp: new Date(Date.now() - 30000),
  },
  {
    id: '8',
    type: 'test',
    status: 'failed',
    content: 'Test `testLogin` fails due to expired mock token. Regenerate?',
    code: 'const token = generateMockToken({ expiresIn: \'24h\' });',
    timestamp: new Date(Date.now() - 25000),
  },
  {
    id: '9',
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
    timestamp: new Date(Date.now() - 20000),
  },
  {
    id: '10',
    type: 'security',
    content: 'Hardcoded secret detected. Move to environment variables?',
    code: 'export API_KEY="your_key"',
    timestamp: new Date(Date.now() - 15000),
  },
  {
    id: '10a',
    type: 'security',
    status: 'success',
    content: 'Secret moved to environment variables successfully.',
    code: 'export API_KEY=${process.env.API_KEY}',
    timestamp: new Date(Date.now() - 12000),
  },
  {
    id: '11',
    type: 'performance',
    content: 'Database query takes 2s. Add indexing?',
    code: 'CREATE INDEX idx_user_email ON users(email);',
    timestamp: new Date(Date.now() - 10000),
  },
  {
    id: '11a',
    type: 'performance',
    status: 'completed',
    content: 'Index created. Query execution time reduced to 150ms.',
    timestamp: new Date(Date.now() - 8000),
  },
  {
    id: '12',
    type: 'error',
    status: 'error_llm_service_unavailable',
    content: 'Service temporarily down. Retry in 5 minutes.',
    actions: [
      {
        command: 'curl https://status.aiservice.com',
        label: 'Check status',
      }
    ],
    timestamp: new Date(),
  },
];