import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, TrendingUp, Users, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-pattern pt-24 md:pt-0">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img  
          className="w-full h-full object-cover opacity-20" 
          alt="Highway with trucks carrying advertising banners"
         src="https://images.unsplash.com/photo-1537516392097-1b2a028ddec3" />
        <div className="absolute inset-0 hero-gradient opacity-80"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 animate-float">
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
          <TrendingUp className="w-8 h-8 text-white" />
        </div>
      </div>
      <div className="absolute top-40 right-20 animate-float" style={{ animationDelay: '2s' }}>
        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
          <Users className="w-6 h-6 text-white" />
        </div>
      </div>
      <div className="absolute bottom-40 left-20 animate-float" style={{ animationDelay: '4s' }}>
        <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
          <MapPin className="w-7 h-7 text-white" />
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-7xl font-black text-white mb-4 md:mb-6 text-shadow leading-tight md:leading-tight">
            Transform Your Brand Into
            <span className="block gradient-text">Mobile Billboards</span>
          </h1>
          
          <motion.p 
            className="text-base xs:text-lg md:text-2xl text-white/90 mb-6 md:mb-8 max-w-md md:max-w-3xl mx-auto leading-snug md:leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="hidden md:inline">Reach millions of potential customers with high-impact truck advertising. Your message travels the highways, cities, and everywhere your audience goes.</span>
            <span className="inline md:hidden">Advertise on trucks. Reach more people, everywhere they go.</span>
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Button 
              size="lg" 
              className="bg-white text-sky-600 hover:bg-sky-50 text-lg px-8 py-4 rounded-full font-bold shadow-2xl"
              onClick={() => scrollToSection('contact')}
            >
              Start Your Campaign
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-sky-600 text-lg px-8 py-4 rounded-full font-bold"
              onClick={() => scrollToSection('how-it-works')}
            >
              <Play className="mr-2 w-5 h-5" />
              See How It Works
            </Button>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="glass-effect rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-white mb-2">1M+</div>
              <div className="text-white/80">Daily Impressions</div>
            </div>
            <div className="glass-effect rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-white mb-2">500+</div>
              <div className="text-white/80">Active Trucks</div>
            </div>
            <div className="glass-effect rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-white mb-2">50+</div>
              <div className="text-white/80">Cities Covered</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
