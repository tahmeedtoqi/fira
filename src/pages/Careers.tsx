import { motion } from 'framer-motion';

const Careers = () => {
  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-8">Careers at FIRA</h1>
          <p className="text-xl text-metallic/80 mb-12">
            Join us in shaping the future of AI interaction.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Careers;