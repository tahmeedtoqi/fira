import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Sparkles, Code, MessageSquare, Lock, Zap } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

const Home = () => {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.endsWith('@gmail.com')) {
      toast.error('Please enter a valid Gmail address');
      return;
    }

    setIsSubmitting(true);
    const toastId = toast.loading('Submitting...');

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Successfully joined the waitlist! Check your email for confirmation.', {
          id: toastId,
          duration: 5000,
        });
        setIsWaitlistOpen(false);
        setEmail('');
      } else {
        throw new Error(data.message || 'Failed to join waitlist');
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to join waitlist. Please try again.', {
        id: toastId,
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-coal via-slate-900 to-coal">
          {/* Animated Grid */}
          <div className="absolute inset-0 opacity-20">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="absolute bg-metallic/10"
                style={{
                  width: '2px',
                  height: '100%',
                  left: `${i * 5}%`,
                  animation: `gridLine ${2 + i % 3}s ease-in-out infinite`,
                }}
              />
            ))}
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4"
        >
          <motion.div
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mb-8"
          >
            <Brain className="h-20 w-20 mx-auto text-metallic" />
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-metallic via-white to-metallic bg-clip-text text-transparent animate-gradient">
            Meet FIRA
          </h1>
          
          <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-8 text-metallic/80">
            The next generation AI assistant that understands, learns, and evolves with you
          </p>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsWaitlistOpen(true)}
            className="px-8 py-4 bg-metallic text-coal font-bold rounded-full hover:bg-white transition-colors"
          >
            Join Waitlist
          </motion.button>
        </motion.div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden z-0">
          <div className="absolute w-full h-full">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute bg-slate-800/20 rounded-full"
                style={{
                  width: Math.random() * 300 + 50 + 'px',
                  height: Math.random() * 300 + 50 + 'px',
                  left: Math.random() * 100 + '%',
                  top: Math.random() * 100 + '%',
                  animation: `float ${Math.random() * 10 + 5}s ease-in-out infinite`,
                  animationDelay: `-${Math.random() * 5}s`
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-center mb-16"
          >
            Redefining AI Interaction
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="p-6 rounded-2xl bg-slate-900/50 backdrop-blur-lg hover:bg-slate-900/70 transition-all duration-300"
              >
                <feature.icon className="h-10 w-10 mb-4 text-metallic" />
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-metallic/80">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Animated particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-metallic/20 rounded-full"
              animate={{
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 - 50],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
              }}
            />
          ))}
        </div>
      </section>

      {/* Waitlist Modal */}
      <AnimatePresence>
        {isWaitlistOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) setIsWaitlistOpen(false);
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-900 p-8 rounded-2xl max-w-md w-full"
            >
              <h3 className="text-2xl font-bold mb-4">Join the Waitlist</h3>
              <form onSubmit={handleWaitlistSubmit}>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-metallic/80 mb-2">
                    Gmail Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="your.name@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-slate-800 text-white border border-slate-700 focus:border-metallic focus:ring-1 focus:ring-metallic outline-none transition-colors"
                    required
                    pattern="[a-z0-9._%+-]+@gmail\.com$"
                  />
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setIsWaitlistOpen(false)}
                    className="px-4 py-2 text-metallic hover:text-white transition-colors"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-metallic text-coal font-bold rounded-lg hover:bg-white transition-colors disabled:opacity-50 flex items-center"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-coal" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      'Join Waitlist'
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const features = [
  {
    icon: Brain,
    title: "Advanced Intelligence",
    description: "Powered by cutting-edge neural networks and machine learning algorithms for human-like understanding"
  },
  {
    icon: MessageSquare,
    title: "Natural Interaction",
    description: "Communicate naturally with context-aware responses and emotional intelligence"
  },
  {
    icon: Sparkles,
    title: "Continuous Learning",
    description: "Evolves and improves through every interaction, becoming more personalized over time"
  },
  {
    icon: Lock,
    title: "Enterprise Security",
    description: "Bank-grade encryption and privacy controls to keep your data safe and secure"
  },
  {
    icon: Code,
    title: "Developer Friendly",
    description: "Robust API and documentation for seamless integration into your applications"
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Optimized performance with sub-second response times for real-time interactions"
  }
];

export default Home;