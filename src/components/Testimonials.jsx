
import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      position: "Marketing Director",
      company: "TechCorp Solutions",
      content: "RansAds transformed our brand visibility completely! We saw a 300% increase in brand awareness within just 30 days. The mobile billboard concept is genius.",
      rating: 5,
      avatar: "SJ"
    },
    {
      id: 2,
      name: "Michael Chen",
      position: "CEO",
      company: "FoodieDelight",
      content: "The reach we achieved with truck advertising was incredible. Our restaurant chain saw foot traffic increase by 150% in targeted cities. Highly recommend!",
      rating: 5,
      avatar: "MC"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      position: "Brand Manager",
      company: "FitLife Gym",
      content: "Working with RansAds was seamless. Their team handled everything from design to deployment. The real-time analytics helped us optimize our campaigns perfectly.",
      rating: 5,
      avatar: "ER"
    },
    {
      id: 4,
      name: "David Thompson",
      position: "Marketing Head",
      company: "EcoClean Products",
      content: "The ROI on our truck advertising campaign exceeded all expectations. We reached demographics that traditional advertising couldn't touch. Game-changer!",
      rating: 5,
      avatar: "DT"
    },
    {
      id: 5,
      name: "Lisa Park",
      position: "CMO",
      company: "StyleHub Fashion",
      content: "RansAds helped us launch our new collection with massive impact. The mobile billboards created buzz in every city they visited. Outstanding results!",
      rating: 5,
      avatar: "LP"
    },
    {
      id: 6,
      name: "Robert Wilson",
      position: "Owner",
      company: "AutoMax Dealership",
      content: "The geographic targeting was spot-on. We saw immediate increases in showroom visits and test drives. The investment paid for itself within weeks.",
      rating: 5,
      avatar: "RW"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            What Our <span className="gradient-text">Clients</span> Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what brands are saying about 
            their success with RansAds mobile advertising campaigns.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="bg-white rounded-2xl p-8 shadow-lg card-hover relative overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {/* Background Quote */}
              <div className="absolute top-4 right-4 opacity-10">
                <Quote className="w-12 h-12 text-orange-500" />
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-700 mb-6 leading-relaxed italic">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-full flex items-center justify-center text-white font-bold">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-bold text-gray-800">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.position}</div>
                  <div className="text-sm font-medium gradient-text">{testimonial.company}</div>
                </div>
              </div>

              {/* Decorative Element */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-yellow-400"></div>
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
            <h3 className="text-2xl font-bold mb-4 gradient-text">Join Our Success Stories</h3>
            <p className="text-gray-600 mb-6">
              Ready to see similar results for your brand? Let's create your success story together.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text mb-1">98%</div>
                <div className="text-sm text-gray-600">Client Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text mb-1">250%</div>
                <div className="text-sm text-gray-600">Avg. ROI Increase</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text mb-1">500+</div>
                <div className="text-sm text-gray-600">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text mb-1">24/7</div>
                <div className="text-sm text-gray-600">Campaign Support</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
