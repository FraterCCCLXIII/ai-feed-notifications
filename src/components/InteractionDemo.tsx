import React, { useState } from 'react';
import { FiTerminal, FiEdit, FiEye, FiPlay, FiX, FiCheck, FiLoader } from 'react-icons/fi';

interface InteractionDemoProps {
  darkMode?: boolean;
}

export const InteractionDemo: React.FC<InteractionDemoProps> = ({ darkMode = false }) => {
  const [step, setStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState<string[]>([]);

  const steps = [
    {
      type: 'read',
      title: 'Reading index.css',
      command: 'cat index.css',
      output: `@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}`
    },
    {
      type: 'edit',
      title: 'Editing index.css',
      command: 'str_replace_editor index.css',
      output: 'File edited successfully'
    },
    {
      type: 'run',
      title: 'Starting development server',
      command: 'npm run dev -- --host 0.0.0.0 --port 12000',
      output: `> ai-message-feed@0.0.0 dev
> vite --host 0.0.0.0 --port 12000

  VITE v6.3.5  ready in 154 ms

  ➜  Local:   http://localhost:12000/
  ➜  Network: http://10.2.97.12:12000/
  ➜  press h + enter to show help`
    },
    {
      type: 'stop',
      title: 'Stopping server',
      command: 'C-c',
      output: '^C'
    },
    {
      type: 'read',
      title: 'Checking configuration',
      command: 'cat postcss.config.js',
      output: `export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}`
    },
    {
      type: 'edit',
      title: 'Fixing configuration',
      command: 'str_replace_editor postcss.config.js',
      output: 'File edited successfully'
    },
    {
      type: 'install',
      title: 'Installing dependencies',
      command: 'npm install @tailwindcss/postcss',
      output: `added 1 package, and audited 123 packages in 3s

found 0 vulnerabilities`
    },
    {
      type: 'build',
      title: 'Building for production',
      command: 'npm run build',
      output: `> ai-message-feed@0.0.0 build
> vite build

vite v6.3.5 building for production...
✓ 31 modules transformed.
dist/index.html                   0.46 kB │ gzip:  0.30 kB
dist/assets/index-4g9j2hKL.css   15.59 kB │ gzip:  2.79 kB
dist/assets/index-Bvj7_9lD.js    143.85 kB │ gzip: 46.89 kB
✓ built in 1.28s`
    }
  ];

  const currentStep = steps[step];

  const runStep = () => {
    setIsRunning(true);
    setOutput([]);
    
    // Simulate typing the command
    const commandChars = currentStep.command.split('');
    let typedCommand = '';
    
    const typeInterval = setInterval(() => {
      if (commandChars.length > 0) {
        typedCommand += commandChars.shift();
        setOutput([typedCommand]);
      } else {
        clearInterval(typeInterval);
        
        // After typing, show the output
        setTimeout(() => {
          setOutput([currentStep.command, currentStep.output]);
          setIsRunning(false);
        }, 500);
      }
    }, 50);
  };

  const nextStep = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
      setOutput([]);
    }
  };

  const prevStep = () => {
    if (step > 0) {
      setStep(step - 1);
      setOutput([]);
    }
  };

  const getIconForStep = (type: string) => {
    switch (type) {
      case 'read': return <FiEye />;
      case 'edit': return <FiEdit />;
      case 'run': return <FiPlay />;
      case 'stop': return <FiX />;
      case 'install': return <FiCheck />;
      case 'build': return <FiLoader />;
      default: return <FiTerminal />;
    }
  };

  return (
    <div className={`max-w-4xl mx-auto ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
      <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <h2 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          Interactive Demo: Development Workflow
        </h2>
        
        <div className="mb-6">
          <div className="flex items-center mb-2">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${darkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-600'} mr-3`}>
              {getIconForStep(currentStep.type)}
            </div>
            <h3 className="text-lg font-medium">{currentStep.title}</h3>
          </div>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
            Step {step + 1} of {steps.length}: {
              currentStep.type === 'read' ? 'Reading file contents' :
              currentStep.type === 'edit' ? 'Editing file' :
              currentStep.type === 'run' ? 'Running command' :
              currentStep.type === 'stop' ? 'Stopping process' :
              currentStep.type === 'install' ? 'Installing package' :
              'Building application'
            }
          </p>
        </div>
        
        <div className={`mb-6 rounded-lg overflow-hidden ${darkMode ? 'bg-gray-900' : 'bg-gray-100'} border ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}>
          <div className={`px-4 py-2 ${darkMode ? 'bg-gray-800' : 'bg-gray-200'} flex items-center`}>
            <div className="flex space-x-2 mr-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Terminal</span>
          </div>
          <div className="p-4 font-mono text-sm whitespace-pre-wrap h-64 overflow-y-auto">
            <div className={`flex items-center ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
              <span className="mr-2">$</span>
              {output.length > 0 ? (
                <span>{output[0]}</span>
              ) : (
                <span className="animate-pulse">_</span>
              )}
            </div>
            {output.length > 1 && (
              <div className={`mt-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {output[1]}
              </div>
            )}
          </div>
        </div>
        
        <div className="flex justify-between">
          <button
            onClick={prevStep}
            disabled={step === 0 || isRunning}
            className={`px-4 py-2 rounded-md ${
              step === 0 || isRunning
                ? `${darkMode ? 'bg-gray-700 text-gray-500' : 'bg-gray-200 text-gray-400'}`
                : `${darkMode ? 'bg-blue-800 text-blue-200 hover:bg-blue-700' : 'bg-blue-100 text-blue-700 hover:bg-blue-200'}`
            } transition-colors`}
          >
            Previous Step
          </button>
          
          <div className="flex gap-3">
            <button
              onClick={runStep}
              disabled={isRunning}
              className={`px-4 py-2 rounded-md flex items-center gap-2 ${
                isRunning
                  ? `${darkMode ? 'bg-gray-700 text-gray-500' : 'bg-gray-200 text-gray-400'}`
                  : `${darkMode ? 'bg-green-800 text-green-200 hover:bg-green-700' : 'bg-green-600 text-white hover:bg-green-700'}`
              } transition-colors`}
            >
              <FiPlay className="h-4 w-4" />
              <span>{isRunning ? 'Running...' : 'Run Command'}</span>
            </button>
            
            <button
              onClick={nextStep}
              disabled={step === steps.length - 1 || isRunning}
              className={`px-4 py-2 rounded-md ${
                step === steps.length - 1 || isRunning
                  ? `${darkMode ? 'bg-gray-700 text-gray-500' : 'bg-gray-200 text-gray-400'}`
                  : `${darkMode ? 'bg-blue-800 text-blue-200 hover:bg-blue-700' : 'bg-blue-100 text-blue-700 hover:bg-blue-200'}`
              } transition-colors`}
            >
              Next Step
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractionDemo;