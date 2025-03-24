import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Models = () => {
  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-8">FIRA Models</h1>
          <p className="text-xl text-metallic/80 mb-12">
            Explore our state-of-the-art AI models and their capabilities.
          </p>

          {/* Models Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {models.map((model, index) => (
              <motion.div
                key={model.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-lg bg-slate-900/50"
              >
                <h2 className="text-2xl font-bold mb-2">{model.name}</h2>
                <p className="text-metallic/80 mb-4">{model.description}</p>
                <div className="space-y-2">
                  {model.specs.map((spec) => (
                    <div key={spec.label} className="flex justify-between">
                      <span className="text-metallic/60">{spec.label}</span>
                      <span className="font-semibold">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Benchmark Graph */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Performance Benchmarks</h2>
            <div className="h-[400px] bg-slate-900/50 p-6 rounded-lg">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={benchmarkData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="name" stroke="#C0C0C0" />
                  <YAxis stroke="#C0C0C0" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1E293B',
                      border: 'none',
                      borderRadius: '0.5rem',
                      color: '#C0C0C0'
                    }}
                  />
                  <Bar dataKey="score" fill="#C0C0C0" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const models = [
  {
    name: "FIRA-1",
    description: "Our flagship general-purpose AI model, optimized for natural conversation and problem-solving.",
    specs: [
      { label: "Parameters", value: "175B" },
      { label: "Context Length", value: "8K tokens" },
      { label: "Training Data", value: "1.2T tokens" }
    ]
  },
  {
    name: "FIRA-S",
    description: "Specialized model for scientific and technical discussions with enhanced reasoning capabilities.",
    specs: [
      { label: "Parameters", value: "125B" },
      { label: "Context Length", value: "6K tokens" },
      { label: "Training Data", value: "800B tokens" }
    ]
  }
];

const benchmarkData = [
  { name: "Natural Language Understanding", score: 95 },
  { name: "Logical Reasoning", score: 88 },
  { name: "Code Generation", score: 92 },
  { name: "Mathematical Problem Solving", score: 85 },
  { name: "Creative Writing", score: 90 }
];

export default Models;