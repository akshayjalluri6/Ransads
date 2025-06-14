import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Truck, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to section if state or hash is present
  useEffect(() => {
    if (location.state && location.state.scrollTo) {
      setTimeout(() => {
        const el = document.getElementById(location.state.scrollTo);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else if (location.hash) {
      setTimeout(() => {
        const el = document.getElementById(location.hash.replace('#', ''));
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [location]);

  const handleNavClick = (sectionId) => {
    if (location.pathname === '/' && document.getElementById(sectionId)) {
      scrollToSection(sectionId);
    } else {
      navigate('/', { state: { scrollTo: sectionId } });
    }
    setIsMenuOpen(false);
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((d) => !d);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 glass-effect transition-all duration-700 ${scrolled ? 'navbar-pill' : ''}`}
      style={{
        left: scrolled ? '50%' : '0',
        right: scrolled ? 'auto' : '0',
        transform: scrolled
          ? 'translate(-50%, 32px) scale(0.96)'
          : 'translate(0, 0) scale(1)',
        boxShadow: scrolled
          ? '0 16px 48px 0 rgba(30,41,59,0.18), 0 2px 8px 0 rgba(56,189,248,0.10)'
          : undefined,
        transition: 'transform 0.7s cubic-bezier(0.4,0,0.2,1), left 0.7s cubic-bezier(0.4,0,0.2,1), box-shadow 0.7s cubic-bezier(0.4,0,0.2,1)',
      }}
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.div 
            className="flex items-center space-x-2 cursor-pointer select-none"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => { navigate('/'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          >
            <div className="w-10 h-10 hero-gradient dark:bg-orange-500 rounded-lg flex items-center justify-center transition-colors duration-300">
              <Truck className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold gradient-text dark:gradient-text-orange ml-1 transition-colors duration-300">RansAds</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10 lg:space-x-14 xl:space-x-16 ml-8">
            <button 
              onClick={() => handleNavClick('how-it-works')}
              className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-sky-400 transition-colors font-medium"
            >
              How It Works
            </button>
            <button 
              onClick={() => handleNavClick('gallery')}
              className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-sky-400 transition-colors font-medium"
            >
              Gallery
            </button>
            <button 
              onClick={() => handleNavClick('pricing')}
              className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-sky-400 transition-colors font-medium"
            >
              Pricing
            </button>
            <button 
              onClick={() => handleNavClick('contact')}
              className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-sky-400 transition-colors font-medium"
            >
              Contact
            </button>
            <Button 
              onClick={() => navigate('/fleet')}
              className="hero-gradient text-white hover:opacity-90 whitespace-nowrap px-6 py-2 text-base font-bold rounded-full shadow-lg transition-all duration-300 min-w-[140px] max-w-full"
              style={{ minWidth: '140px', fontSize: '1rem', padding: '0.5rem 1.5rem' }}
            >
              Join Our Fleet
            </Button>
            <button
              onClick={toggleDarkMode}
              className="ml-4 p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-blue-700" />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 pb-4"
            >
              <div className="flex flex-col space-y-4">
                <button 
                  onClick={() => handleNavClick('how-it-works')}
                  className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-sky-400 transition-colors font-medium text-left"
                >
                  How It Works
                </button>
                <button 
                  onClick={() => handleNavClick('gallery')}
                  className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-sky-400 transition-colors font-medium text-left"
                >
                  Gallery
                </button>
                <button 
                  onClick={() => handleNavClick('pricing')}
                  className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-sky-400 transition-colors font-medium text-left"
                >
                  Pricing
                </button>
                <button 
                  onClick={() => handleNavClick('contact')}
                  className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-sky-400 transition-colors font-medium text-left"
                >
                  Contact
                </button>
                <Button 
                  onClick={() => { setIsMenuOpen(false); navigate('/fleet'); }}
                  className="hero-gradient text-white hover:opacity-90 w-fit"
                >
                  Join Our Fleet
                </Button>
                <button
                  onClick={toggleDarkMode}
                  className="mt-2 p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors self-start"
                  aria-label="Toggle dark mode"
                >
                  {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-blue-700" />}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Header;
