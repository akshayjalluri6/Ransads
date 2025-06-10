
import React from 'react';
import { motion } from 'framer-motion';
import { Eye, MapPin, Clock } from 'lucide-react';

const FleetGallery = () => {
  const trucks = [
    {
      id: 1,
      brand: "TechCorp",
      location: "Highway 101, California",
      impressions: "50K",
      duration: "30 days"
    },
    {
      id: 2,
      brand: "FoodieDelight",
      location: "Downtown Chicago",
      impressions: "75K",
      duration: "45 days"
    },
    {
      id: 3,
      brand: "FitLife Gym",
      location: "Interstate 95, Florida",
      impressions: "60K",
      duration: "60 days"
    },
    {
      id: 4,
      brand: "EcoClean",
      location: "Route 66, Arizona",
      impressions: "40K",
      duration: "30 days"
    },
    {
      id: 5,
      brand: "StyleHub",
      location: "Manhattan, New York",
      impressions: "90K",
      duration: "90 days"
    },
    {
      id: 6,
      brand: "AutoMax",
      location: "I-10, Texas",
      impressions: "65K",
      duration: "45 days"
    }
  ];

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Our <span className="gradient-text">Fleet</span> in Action
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how brands are making their mark on the road. Our premium truck fleet 
            delivers your message with maximum impact and visibility.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trucks.map((truck, index) => (
            <motion.div
              key={truck.id}
              className="group relative overflow-hidden rounded-2xl shadow-lg card-hover"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                <img  
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  alt={`${truck.brand} advertising campaign on truck`}
                 src="https://images.unsplash.com/photo-1602397619989-5c91486230c1" />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-xl font-bold mb-2">{truck.brand}</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm">
                      <MapPin className="w-4 h-4" />
                      <span>{truck.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Eye className="w-4 h-4" />
                      <span>{truck.impressions} impressions</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Clock className="w-4 h-4" />
                      <span>{truck.duration} campaign</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Info */}
              <div className="p-6 bg-white">
                <h3 className="text-lg font-bold text-gray-800 mb-2">{truck.brand}</h3>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span className="flex items-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>{truck.impressions}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{truck.duration}</span>
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 gradient-text">Your Brand Could Be Next</h3>
            <p className="text-gray-600 mb-6">
              Join the mobile advertising revolution and see your brand travel the highways, 
              reaching millions of potential customers every day.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text mb-2">500+</div>
                <div className="text-gray-600">Active Trucks</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text mb-2">50+</div>
                <div className="text-gray-600">Cities Covered</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text mb-2">1M+</div>
                <div className="text-gray-600">Daily Views</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FleetGallery;
