import React from 'react';
import { Truck, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (sectionId) => {
    if (location.pathname === '/' && document.getElementById(sectionId)) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/', { state: { scrollTo: sectionId } });
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-blue-700 rounded-lg flex items-center justify-center">
                <Truck className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold gradient-text">RansAds</span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Transforming brands into mobile billboards. We connect advertisers with truck owners 
              to create high-impact, cost-effective marketing campaigns that reach millions.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-blue-900 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                <Facebook className="w-5 h-5 text-white" />
              </div>
              <div className="w-10 h-10 bg-blue-900 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                <Twitter className="w-5 h-5 text-white" />
              </div>
              <div className="w-10 h-10 bg-blue-900 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                <Instagram className="w-5 h-5 text-white" />
              </div>
              <div className="w-10 h-10 bg-blue-900 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                <Linkedin className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <span className="text-lg font-bold mb-6 block">Quick Links</span>
            <div className="space-y-3">
              <button 
                onClick={() => handleNavClick('how-it-works')}
                className="block text-gray-400 hover:text-blue-500 transition-colors"
              >
                How It Works
              </button>
              <button 
                onClick={() => handleNavClick('gallery')}
                className="block text-gray-400 hover:text-blue-500 transition-colors"
              >
                Fleet Gallery
              </button>
              <button 
                onClick={() => handleNavClick('pricing')}
                className="block text-gray-400 hover:text-blue-500 transition-colors"
              >
                Pricing Plans
              </button>
              <button 
                onClick={() => handleNavClick('contact')}
                className="block text-gray-400 hover:text-blue-500 transition-colors"
              >
                Start Campaign
              </button>
              <Link 
                to="/fleet"
                className="block text-gray-400 hover:text-blue-500 transition-colors"
              >
                Join Our Fleet
              </Link>
            </div>
          </div>

          {/* Services */}
          <div>
            <span className="text-lg font-bold mb-6 block">Services</span>
            <div className="space-y-3">
              <Link to="/services/local-campaigns" className="block text-gray-400 hover:text-blue-500 transition-colors">Local Campaigns</Link>
              <Link to="/services/regional-advertising" className="block text-gray-400 hover:text-blue-500 transition-colors">Regional Advertising</Link>
              <Link to="/services/national-coverage" className="block text-gray-400 hover:text-blue-500 transition-colors">National Coverage</Link>
              <Link to="/services/custom-solutions" className="block text-gray-400 hover:text-blue-500 transition-colors">Custom Solutions</Link>
              <Link to="/services/analytics-reporting" className="block text-gray-400 hover:text-blue-500 transition-colors">Analytics & Reporting</Link>
              <Link to="/services/fleet-management" className="block text-gray-400 hover:text-blue-500 transition-colors">Fleet Management</Link>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <span className="text-lg font-bold mb-6 block">Contact Info</span>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="block text-gray-400">+1 (555) 123-RANS</span>
                  <span className="block text-gray-400">+1 (555) 123-7267</span>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="block text-gray-400">hello@ransads.com</span>
                  <span className="block text-gray-400">sales@ransads.com</span>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="block text-gray-400">123 Marketing Street</span>
                  <span className="block text-gray-400">Los Angeles, CA 90210</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2025 RansAds. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <span className="text-gray-400 hover:text-orange-400 transition-colors cursor-pointer">
                Privacy Policy
              </span>
              <span className="text-gray-400 hover:text-orange-400 transition-colors cursor-pointer">
                Terms of Service
              </span>
              <span className="text-gray-400 hover:text-orange-400 transition-colors cursor-pointer">
                Cookie Policy
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
