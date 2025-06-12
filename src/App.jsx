import React, { lazy, Suspense } from 'react';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';
import FleetGallery from '@/components/FleetGallery';
import Testimonials from '@/components/Testimonials';
import Pricing from '@/components/Pricing';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';
import { Routes, Route } from 'react-router-dom';

const LocalCampaigns = lazy(() => import('@/pages/services/LocalCampaigns'));
const RegionalAdvertising = lazy(() => import('@/pages/services/RegionalAdvertising'));
const NationalCoverage = lazy(() => import('@/pages/services/NationalCoverage'));
const CustomSolutions = lazy(() => import('@/pages/services/CustomSolutions'));
const AnalyticsReporting = lazy(() => import('@/pages/services/AnalyticsReporting'));
const FleetManagement = lazy(() => import('@/pages/services/FleetManagement'));
const FleetOnboarding = lazy(() => import('@/components/FleetOnboarding'));
const AdminAuth = lazy(() => import('@/components/AdminAuth'));

function App() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-2xl">Loading...</div>}>
      <Routes>
        <Route path="/" element={
          <div className="min-h-screen bg-white dark:bg-background">
            <Header />
            <Hero />
            <HowItWorks />
            <FleetGallery />
            <Testimonials />
            <Pricing />
            <ContactForm />
            <Footer />
            <Toaster />
          </div>
        } />
        <Route path="/services/local-campaigns" element={<LocalCampaigns />} />
        <Route path="/services/regional-advertising" element={<RegionalAdvertising />} />
        <Route path="/services/national-coverage" element={<NationalCoverage />} />
        <Route path="/services/custom-solutions" element={<CustomSolutions />} />
        <Route path="/services/analytics-reporting" element={<AnalyticsReporting />} />
        <Route path="/services/fleet-management" element={<FleetManagement />} />
        <Route path="/fleet" element={<><Header /><FleetOnboarding /><Footer /></>} />
        <Route path="/admin" element={<AdminAuth />} />
        <Route path="*" element={<div className="min-h-screen flex flex-col items-center justify-center text-2xl">404 - Page Not Found</div>} />
      </Routes>
    </Suspense>
  );
}

export default App;
