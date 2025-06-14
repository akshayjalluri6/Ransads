import React from 'react';
import { motion } from 'framer-motion';
import { Eye, MapPin, Clock } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, EffectCoverflow, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const FleetGallery = () => {
  const trucks = [
    {
      id: 1,
      brand: "Reliance",
      location: "Mumbai, Maharashtra",
      impressions: "50K",
      duration: "30 days"
    },
    {
      id: 2,
      brand: "Flipkart",
      location: "Bengaluru, Karnataka",
      impressions: "75K",
      duration: "45 days"
    },
    {
      id: 3,
      brand: "Swiggy",
      location: "Hyderabad, Telangana",
      impressions: "60K",
      duration: "60 days"
    },
    {
      id: 4,
      brand: "Tata Motors",
      location: "Pune, Maharashtra",
      impressions: "40K",
      duration: "30 days"
    },
    {
      id: 5,
      brand: "Ola Cabs",
      location: "Delhi NCR",
      impressions: "90K",
      duration: "90 days"
    },
    {
      id: 6,
      brand: "Zomato",
      location: "Gurgaon, Haryana",
      impressions: "65K",
      duration: "45 days"
    }
  ];

  return (
    <section id="gallery" className="py-20 bg-background">
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
          <p className="text-xl text-gray-600 dark:text-sky-300 max-w-3xl mx-auto">
            See how brands are making their mark on the road. Our premium truck fleet 
            delivers your message with maximum impact and visibility.
          </p>
        </motion.div>

        <div className="relative max-w-7xl mx-auto">
          <Swiper
            modules={[Navigation, Pagination, A11y, EffectCoverflow, Autoplay]}
            spaceBetween={32}
            slidesPerView={2}
            centeredSlides={true}
            navigation={{
              nextEl: '.fleet-swiper-next',
              prevEl: '.fleet-swiper-prev',
            }}
            pagination={{ clickable: true }}
            loop
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            effect="coverflow"
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 120,
              modifier: 2.5,
              scale: 0.92,
              slideShadows: false,
            }}
            breakpoints={{
              0: { slidesPerView: 1, spaceBetween: 16 },
              640: { slidesPerView: 1, spaceBetween: 20 },
              900: { slidesPerView: 2, spaceBetween: 32 },
            }}
            style={{ padding: '0 1.5rem', minHeight: '420px' }}
          >
            {trucks.map((truck, index) => (
              <SwiperSlide key={truck.id}>
                <motion.div
                  className="group relative overflow-visible rounded-3xl shadow-2xl card-hover mx-4 min-h-[340px] flex flex-col justify-between transition-transform duration-500 bg-transparent"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="aspect-[16/9] relative overflow-hidden rounded-t-3xl">
                    <img  
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                      alt={`${truck.brand} advertising campaign on truck`}
                      src="https://images.unsplash.com/photo-1602397619989-5c91486230c1" />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    {/* Content Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-lg font-bold mb-1">{truck.brand}</h3>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2 text-xs">
                          <MapPin className="w-4 h-4" />
                          <span>{truck.location}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-xs">
                          <Eye className="w-4 h-4" />
                          <span>{truck.impressions} impressions</span>
                        </div>
                        <div className="flex items-center space-x-2 text-xs">
                          <Clock className="w-4 h-4" />
                          <span>{truck.duration} campaign</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Card Info */}
                  <div className="p-4 bg-white dark:bg-card rounded-b-3xl">
                    <h3 className="text-base font-bold text-gray-800 dark:text-sky-100 mb-1">{truck.brand}</h3>
                    <div className="flex items-center justify-between text-xs text-gray-600 dark:text-sky-300">
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
              </SwiperSlide>
            ))}
            {/* Custom navigation buttons outside carousel */}
            <button type="button" aria-label="Previous" className="fleet-swiper-prev absolute -left-8 top-1/2 -translate-y-1/2 z-10 cursor-pointer bg-white dark:bg-card border border-sky-200 dark:border-sky-800 rounded-full shadow-xl w-12 h-12 flex items-center justify-center hover:bg-sky-100 dark:hover:bg-sky-900 transition ring-2 ring-sky-200 dark:ring-sky-900">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left text-sky-600 dark:text-sky-200"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <button type="button" aria-label="Next" className="fleet-swiper-next absolute -right-8 top-1/2 -translate-y-1/2 z-10 cursor-pointer bg-white dark:bg-card border border-sky-200 dark:border-sky-800 rounded-full shadow-xl w-12 h-12 flex items-center justify-center hover:bg-sky-100 dark:hover:bg-sky-900 transition ring-2 ring-sky-200 dark:ring-sky-900">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right text-sky-600 dark:text-sky-200"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </Swiper>
        </div>

        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-sky-50 to-blue-50 dark:from-sky-950 dark:to-blue-950 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 gradient-text">Your Brand Could Be Next</h3>
            <p className="text-gray-600 dark:text-sky-300 mb-6">
              Join the mobile advertising revolution and see your brand travel the highways, 
              reaching millions of potential customers every day.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text mb-2">500+</div>
                <div className="text-gray-600 dark:text-sky-300">Active Trucks</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text mb-2">50+</div>
                <div className="text-gray-600 dark:text-sky-300">Cities Covered</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text mb-2">1M+</div>
                <div className="text-gray-600 dark:text-sky-300">Daily Views</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FleetGallery;
