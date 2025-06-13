import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Check, Star, Zap, Crown } from 'lucide-react';

const Pricing = () => {
  const plans = [
    {
      name: "Basic",
      icon: Zap,
      price: "$2,999",
      period: "/month",
      description: "Perfect for small businesses and local campaigns",
      features: [
        "5 trucks in your fleet",
        "Local city coverage",
        "Basic analytics dashboard",
        "Standard ad design support",
        "Email support",
        "30-day campaign minimum"
      ],
      color: "from-gray-400 to-gray-600",
      popular: false
    },
    {
      name: "Standard",
      icon: Star,
      price: "$5,999",
      period: "/month",
      description: "Ideal for growing brands and regional reach",
      features: [
        "15 trucks in your fleet",
        "Multi-city coverage",
        "Advanced analytics & reporting",
        "Premium ad design support",
        "Priority phone & email support",
        "Real-time GPS tracking",
        "Custom route planning",
        "A/B testing capabilities"
      ],
      color: "from-orange-400 to-yellow-400",
      popular: true
    },
    {
      name: "Premium",
      icon: Crown,
      price: "$12,999",
      period: "/month",
      description: "For enterprise brands seeking maximum impact",
      features: [
        "50+ trucks in your fleet",
        "National highway coverage",
        "Enterprise analytics suite",
        "Dedicated design team",
        "24/7 dedicated account manager",
        "Advanced GPS & demographic targeting",
        "Custom campaign optimization",
        "Multi-format ad support",
        "Priority route selection",
        "Quarterly strategy reviews"
      ],
      color: "from-purple-400 to-pink-400",
      popular: false
    }
  ];

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="pricing" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Choose Your <span className="gradient-text">Campaign</span> Size
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Flexible pricing plans designed to fit every budget and campaign goal. 
            Start small or go big - we've got the perfect solution for your brand.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              className={`relative bg-white dark:bg-card rounded-3xl shadow-xl overflow-hidden ${
                plan.popular ? 'ring-4 ring-orange-400 scale-105' : ''
              }`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 w-max">
                  <div className="bg-gradient-to-r from-orange-400 to-yellow-400 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg border-2 border-white/80">
                    Most Popular
                  </div>
                </div>
              )}

              {/* Header */}
              <div className={`bg-gradient-to-r ${plan.color} p-8 text-white text-center mt-8`}>
                <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-2xl flex items-center justify-center">
                  <plan.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-white/90 mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-lg ml-1">{plan.period}</span>
                </div>
              </div>

              {/* Features */}
              <div className="p-8">
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-3">
                      <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-green-600" />
                      </div>
                      <span className="text-gray-700 dark:text-sky-100">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className={`w-full py-3 text-lg font-bold rounded-xl ${
                    plan.popular 
                      ? 'hero-gradient text-white hover:opacity-90' 
                      : 'bg-gray-100 dark:bg-sky-900 text-gray-800 dark:text-sky-100 hover:bg-gray-200 dark:hover:bg-sky-800'
                  }`}
                  onClick={scrollToContact}
                >
                  Get Started
                </Button>
              </div>
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
          <div className="bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-sky-950 dark:to-blue-950 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 gradient-text">Need a Custom Solution?</h3>
            <p className="text-gray-600 mb-6">
              Have specific requirements or need a larger fleet? We create custom packages 
              tailored to your unique campaign needs and budget.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="text-center">
                <div className="text-lg font-bold text-gray-800 dark:text-sky-100 mb-1">Custom Fleet Size</div>
                <div className="text-sm text-gray-600 dark:text-sky-300">From 1 to 1000+ trucks</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-gray-800 mb-1">Flexible Billing</div>
                <div className="text-sm text-gray-600">Monthly, quarterly, or annual</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-gray-800 mb-1">Enterprise Support</div>
                <div className="text-sm text-gray-600">Dedicated account management</div>
              </div>
            </div>
            <Button 
              className="hero-gradient text-white hover:opacity-90 px-8 py-3 rounded-xl font-bold"
              onClick={scrollToContact}
            >
              Contact Sales Team
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
