import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, EffectCoverflow, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Gayatri Vasudeva Yadav",
      position: "Marketing Director",
      company: "Reliance Industries",
      content: "RansAds transformed our brand visibility completely! We saw a 300% increase in brand awareness within just 30 days. The mobile billboard concept is genius.",
      rating: 5,
      avatar: "GY"
    },
    {
      id: 2,
      name: "Kalyan Krishnamurthy",
      position: "CEO",
      company: "Flipkart",
      content: "The reach we achieved with truck advertising was incredible. Our retail chain saw foot traffic increase by 150% in targeted cities. Highly recommend!",
      rating: 5,
      avatar: "KM"
    },
    {
      id: 3,
      name: "Ishita Mehta",
      position: "Brand Manager",
      company: "Swiggy",
      content: "Working with RansAds was seamless. Their team handled everything from design to deployment. The real-time analytics helped us optimize our campaigns perfectly.",
      rating: 5,
      avatar: "IM"
    },
    {
      id: 4,
      name: "Vivek Srivatsa",
      position: "Marketing Head",
      company: "Tata Motors",
      content: "The ROI on our truck advertising campaign exceeded all expectations. We reached demographics that traditional advertising couldn't touch. Game-changer!",
      rating: 5,
      avatar: "VS"
    },
    {
      id: 5,
      name: "Anshul Khandelwal",
      position: "CMO",
      company: "Ola Cabs",
      content: "RansAds helped us launch our new collection with massive impact. The mobile billboards created buzz in every city they visited. Outstanding results!",
      rating: 5,
      avatar: "AK"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-sky-50 via-blue-50 to-sky-100 dark:from-black dark:via-blue-950 dark:to-sky-900">
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
          <p className="text-xl text-gray-600 dark:text-sky-300 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what brands are saying about 
            their success with RansAds mobile advertising campaigns.
          </p>
        </motion.div>

        <div className="relative max-w-7xl mx-auto">
          <Swiper
            key="testimonials-swiper"
            modules={[Navigation, Pagination, A11y, EffectCoverflow, Autoplay]}
            spaceBetween={24}
            slidesPerView={2}
            centeredSlides={true}
            navigation={{
              nextEl: '.testimonial-swiper-next',
              prevEl: '.testimonial-swiper-prev',
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
              0: { slidesPerView: 1, spaceBetween: 12 },
              640: { slidesPerView: 1, spaceBetween: 16 },
              900: { slidesPerView: 2, spaceBetween: 24 },
            }}
            style={{ padding: '0 1rem', minHeight: '420px' }}
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={testimonial.id}>
                <motion.div
                  className="bg-white dark:bg-card rounded-3xl p-6 md:p-10 shadow-2xl card-hover relative overflow-hidden mx-2 min-h-[340px] flex flex-col justify-between transition-transform duration-500"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  {/* Background Quote */}
                  <div className="absolute top-4 right-4 opacity-10">
                    <Quote className="w-10 h-10 md:w-12 md:h-12 text-sky-500" />
                  </div>
                  {/* Rating */}
                  <div className="flex items-center space-x-1 mb-3 md:mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 md:w-5 md:h-5 fill-sky-400 text-sky-400" />
                    ))}
                  </div>
                  {/* Content */}
                  <p className="text-gray-700 dark:text-sky-100 mb-4 md:mb-6 leading-relaxed italic text-base md:text-lg">
                    "{testimonial.content}"
                  </p>
                  {/* Author */}
                  <div className="flex items-center space-x-3 md:space-x-4 mt-2 md:mt-4">
                    <div className="w-10 h-10 md:w-14 md:h-14 bg-gradient-to-br from-sky-400 to-blue-400 rounded-full flex items-center justify-center text-white font-bold text-lg md:text-xl">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-bold text-gray-800 dark:text-sky-100 text-base md:text-lg">{testimonial.name}</div>
                      <div className="text-xs md:text-sm text-gray-600 dark:text-sky-300">{testimonial.position}</div>
                      <div className="text-xs md:text-sm font-medium gradient-text">{testimonial.company}</div>
                    </div>
                  </div>
                  {/* Decorative Element */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-sky-400 to-blue-400"></div>
                </motion.div>
              </SwiperSlide>
            ))}
            {/* Custom navigation buttons outside carousel */}
            <button type="button" aria-label="Previous" className="testimonial-swiper-prev absolute -left-8 top-1/2 -translate-y-1/2 z-10 cursor-pointer bg-white dark:bg-card border border-sky-200 dark:border-sky-800 rounded-full shadow-xl w-12 h-12 flex items-center justify-center hover:bg-sky-100 dark:hover:bg-sky-900 transition ring-2 ring-sky-200 dark:ring-sky-900">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left text-sky-600 dark:text-sky-200"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <button type="button" aria-label="Next" className="testimonial-swiper-next absolute -right-8 top-1/2 -translate-y-1/2 z-10 cursor-pointer bg-white dark:bg-card border border-sky-200 dark:border-sky-800 rounded-full shadow-xl w-12 h-12 flex items-center justify-center hover:bg-sky-100 dark:hover:bg-sky-900 transition ring-2 ring-sky-200 dark:ring-sky-900">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right text-sky-600 dark:text-sky-200"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </Swiper>
        </div>

        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="bg-white dark:bg-card rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 gradient-text">Join Our Success Stories</h3>
            <p className="text-gray-600 dark:text-sky-200 mb-6">
              Ready to see similar results for your brand? Let's create your success story together.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text mb-1">98%</div>
                <div className="text-sm text-gray-600 dark:text-sky-300">Client Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text mb-1">250%</div>
                <div className="text-sm text-gray-600 dark:text-sky-300">Avg. ROI Increase</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text mb-1">500+</div>
                <div className="text-sm text-gray-600 dark:text-sky-300">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text mb-1">24/7</div>
                <div className="text-sm text-gray-600 dark:text-sky-300">Campaign Support</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
