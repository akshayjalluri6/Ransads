import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Target, Truck, BarChart3 } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: MessageSquare,
      title: "Share Your Vision",
      description: "Tell us about your brand, target audience, and campaign goals. Our team will craft the perfect strategy for maximum impact.",
      color: "bg-sky-500"
    },
    {
      icon: Target,
      title: "Design & Target",
      description: "We create stunning ad designs and select optimal routes based on your target demographics and geographic preferences.",
      color: "bg-blue-500"
    },
    {
      icon: Truck,
      title: "Deploy & Drive",
      description: "Your ads hit the road on our premium truck fleet, reaching millions of potential customers across cities and highways.",
      color: "bg-sky-600"
    },
    {
      icon: BarChart3,
      title: "Track & Optimize",
      description: "Monitor real-time performance with detailed analytics including impressions, reach, and engagement metrics.",
      color: "bg-blue-700"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            How <span className="gradient-text">RansAds</span> Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From concept to campaign, we make truck advertising simple and effective. 
            Here's how we transform your brand into a mobile marketing powerhouse.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg card-hover text-center relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-sky-100 to-blue-100 rounded-full -translate-y-10 translate-x-10 opacity-50"></div>
                
                {/* Step Number */}
                <div className="absolute top-4 left-4 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-bold text-gray-600">
                  {index + 1}
                </div>

                {/* Icon */}
                <div className={`w-16 h-16 ${step.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                  <step.icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-xl font-bold mb-4 text-gray-800">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-orange-300 to-yellow-300 transform -translate-y-1/2 z-10"></div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 gradient-text">Ready to Get Started?</h3>
            <p className="text-gray-600 mb-6">
              Join hundreds of brands who have already transformed their marketing with mobile truck advertising.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>No Setup Fees</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Real-time Tracking</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Flexible Campaigns</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
