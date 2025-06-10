
import React from 'react';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';
import FleetGallery from '@/components/FleetGallery';
import Testimonials from '@/components/Testimonials';
import Pricing from '@/components/Pricing';
import ContactForm from '@/components/ContactForm';
import FleetOnboarding from '@/components/FleetOnboarding';
import Footer from '@/components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <HowItWorks />
      <FleetGallery />
      <Testimonials />
      <Pricing />
      <ContactForm />
      <FleetOnboarding />
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
