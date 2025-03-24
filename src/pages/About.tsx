import { motion } from 'framer-motion';
import { useState } from 'react';
import signature from './asset/signature.png';
const About = () => {
  const [isLetterExpanded, setIsLetterExpanded] = useState(false);

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-8">About FIRA</h1>
          <p className="text-xl text-metallic/80 mb-12">
            Pioneering the future of artificial intelligence through innovative conversation.
          </p>
        </motion.div>

        {/* Founder's Letter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold mb-8">A Letter from Our Founder</h2>
          <motion.div
            className={`relative p-8 rounded-xl backdrop-blur-lg ${
              isLetterExpanded 
                ? 'bg-slate-900/90' 
                : 'bg-slate-900/30 cursor-pointer'
            } transition-all duration-500`}
            onClick={() => !isLetterExpanded && setIsLetterExpanded(true)}
          >
            <div className={`${!isLetterExpanded && 'blur-sm'} transition-all duration-500`}>
              <p className="text-lg leading-relaxed mb-6">
                Dear AI Enthusiasts and Fellow Innovators,
              </p>
              <p className="text-lg leading-relaxed mb-6">
                When I founded FIRA, I had a singular vision: to create an AI that truly understands and evolves with humanity. Not just another language model, but a companion in our journey toward the future. Today, that vision is becoming reality.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                FIRA represents more than just technological advancement; it embodies our commitment to responsible AI development. We believe that artificial intelligence should enhance human potential, not replace it. Our team works tirelessly to ensure that every interaction with FIRA is meaningful, safe, and aligned with human values.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                As we continue to push the boundaries of what's possible, we remain grounded in our core mission: to make AI accessible, understandable, and beneficial for everyone. The future we're building isn't just about smarter machines; it's about empowering people to achieve more than they ever thought possible.
              </p>
              <p className="text-lg leading-relaxed mb-8">
                Thank you for being part of this extraordinary journey.
              </p>
              <div className="flex items-center space-x-4">
                <img 
                  src={signature} 
                  alt="Founder's Signature" 
                  className="h-12"
                />
                <div>
                  <p className="font-bold">Tahmeed Thoky</p>
                  <p className="text-metallic/80">Founder & CEO, FIRA</p>
                </div>
              </div>
            </div>
            {!isLetterExpanded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-xl font-semibold text-metallic/80">Click to read the full letter</p>
              </div>
            )}
          </motion.div>
        </motion.div>

        {/* Company Description */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="grid md:grid-cols-2 gap-12"
        >
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-metallic/80 leading-relaxed">
              At FIRA, we're dedicated to developing artificial intelligence that enhances human potential. Our mission is to create AI systems that are not only powerful and efficient but also ethical, transparent, and aligned with human values. We believe that AI should be a force for positive change in the world.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
            <p className="text-lg text-metallic/80 leading-relaxed">
              We envision a future where AI and humans work together seamlessly, where technology amplifies human creativity and problem-solving abilities. FIRA is committed to making this future a reality through continuous innovation, ethical development, and a deep understanding of both human needs and technological possibilities.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;