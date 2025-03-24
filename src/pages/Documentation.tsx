import { motion } from 'framer-motion';
import { Book, Code, Terminal, Zap } from 'lucide-react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';

const Documentation = () => {
  const location = useLocation();
  
  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-8">Documentation</h1>
          <p className="text-xl text-metallic/80 mb-12">
            Everything you need to know about integrating and using FIRA AI.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-6 rounded-lg transition-colors ${
                  location.pathname === section.link
                    ? 'bg-slate-800/70 ring-2 ring-metallic'
                    : 'bg-slate-900/50 hover:bg-slate-900/70'
                }`}
              >
                <Link to={section.link} className="block">
                  <section.icon className="h-8 w-8 mb-4 text-metallic" />
                  <h2 className="text-2xl font-bold mb-2">{section.title}</h2>
                  <p className="text-metallic/80 mb-4">{section.description}</p>
                  <span className="text-metallic hover:text-white transition-colors">
                    Learn more →
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <Routes>
          <Route path="getting-started" element={<GettingStarted />} />
          <Route path="api-reference" element={<ApiReference />} />
          <Route path="cli-tools" element={<CliTools />} />
          <Route path="best-practices" element={<BestPractices />} />
        </Routes>
      </div>
    </div>
  );
};

const sections = [
  {
    icon: Book,
    title: "Getting Started",
    description: "Quick start guide and basic concepts to get you up and running with FIRA AI.",
    link: "/documentation/getting-started"
  },
  {
    icon: Code,
    title: "API Reference",
    description: "Complete API documentation with examples and use cases.",
    link: "/documentation/api-reference"
  },
  {
    icon: Terminal,
    title: "CLI Tools",
    description: "Command-line tools and utilities for managing your FIRA AI integration.",
    link: "/documentation/cli-tools"
  },
  {
    icon: Zap,
    title: "Best Practices",
    description: "Guidelines and recommendations for optimal use of FIRA AI.",
    link: "/documentation/best-practices"
  }
];

const GettingStarted = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="mt-16 p-8 bg-slate-900/50 rounded-lg"
  >
    <h2 className="text-3xl font-bold mb-6">Getting Started with FIRA AI</h2>
    
    <div className="space-y-8">
      <section>
        <h3 className="text-xl font-semibold mb-4">Installation</h3>
        <div className="bg-slate-800 p-4 rounded-md">
          <code className="text-metallic">npm install @fira/sdk</code>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-4">Basic Setup</h3>
        <div className="bg-slate-800 p-4 rounded-md">
          <pre className="text-metallic">
            {`import { FiraAI } from '@fira/sdk';

const fira = new FiraAI({
  apiKey: 'your-api-key',
  model: 'fira-1',
});`}
          </pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-4">Quick Example</h3>
        <div className="bg-slate-800 p-4 rounded-md">
          <pre className="text-metallic">
            {`const response = await fira.chat.complete({
  messages: [
    { role: 'user', content: 'Tell me about quantum computing.' }
  ]
});

console.log(response.content);`}
          </pre>
        </div>
      </section>
    </div>
  </motion.div>
);

const ApiReference = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="mt-16 p-8 bg-slate-900/50 rounded-lg"
  >
    <h2 className="text-3xl font-bold mb-6">API Reference</h2>
    
    <div className="space-y-8">
      <section>
        <h3 className="text-xl font-semibold mb-4">Authentication</h3>
        <p className="text-metallic/80 mb-4">
          All API requests require authentication using your API key in the Authorization header.
        </p>
        <div className="bg-slate-800 p-4 rounded-md">
          <code className="text-metallic">
            Authorization: Bearer your-api-key
          </code>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-4">Endpoints</h3>
        <div className="space-y-4">
          <div className="p-4 border border-slate-800 rounded-lg">
            <h4 className="font-semibold mb-2">POST /v1/chat/completions</h4>
            <p className="text-metallic/80">Generate chat completions from the model.</p>
          </div>
          <div className="p-4 border border-slate-800 rounded-lg">
            <h4 className="font-semibold mb-2">POST /v1/embeddings</h4>
            <p className="text-metallic/80">Generate embeddings for given text.</p>
          </div>
        </div>
      </section>
    </div>
  </motion.div>
);

const CliTools = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="mt-16 p-8 bg-slate-900/50 rounded-lg"
  >
    <h2 className="text-3xl font-bold mb-6">CLI Tools</h2>
    
    <div className="space-y-8">
      <section>
        <h3 className="text-xl font-semibold mb-4">Installation</h3>
        <div className="bg-slate-800 p-4 rounded-md">
          <code className="text-metallic">npm install -g @fira/cli</code>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-4">Available Commands</h3>
        <div className="space-y-4">
          <div className="p-4 border border-slate-800 rounded-lg">
            <code className="text-metallic block mb-2">fira init</code>
            <p className="text-metallic/80">Initialize a new FIRA AI project</p>
          </div>
          <div className="p-4 border border-slate-800 rounded-lg">
            <code className="text-metallic block mb-2">fira deploy</code>
            <p className="text-metallic/80">Deploy your FIRA AI application</p>
          </div>
        </div>
      </section>
    </div>
  </motion.div>
);

const BestPractices = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="mt-16 p-8 bg-slate-900/50 rounded-lg"
  >
    <h2 className="text-3xl font-bold mb-6">Best Practices</h2>
    
    <div className="space-y-8">
      <section>
        <h3 className="text-xl font-semibold mb-4">Performance Optimization</h3>
        <ul className="space-y-4">
          <li className="flex items-start space-x-2">
            <span className="text-metallic">•</span>
            <p className="text-metallic/80">Use streaming responses for real-time interactions</p>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-metallic">•</span>
            <p className="text-metallic/80">Implement proper error handling and retry mechanisms</p>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-metallic">•</span>
            <p className="text-metallic/80">Cache responses when appropriate</p>
          </li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-4">Security Guidelines</h3>
        <ul className="space-y-4">
          <li className="flex items-start space-x-2">
            <span className="text-metallic">•</span>
            <p className="text-metallic/80">Never expose your API key in client-side code</p>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-metallic">•</span>
            <p className="text-metallic/80">Implement rate limiting and request validation</p>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-metallic">•</span>
            <p className="text-metallic/80">Regular security audits and updates</p>
          </li>
        </ul>
      </section>
    </div>
  </motion.div>
);

export default Documentation;