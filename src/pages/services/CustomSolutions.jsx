import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Settings, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CustomSolutions() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-100 to-white dark:from-black dark:via-blue-950 dark:to-sky-900 flex flex-col items-center justify-start py-16 px-4">
      <div className="max-w-3xl w-full text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 hero-gradient rounded-2xl flex items-center justify-center shadow-lg">
            <Settings className="w-8 h-8 text-white" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold gradient-text mb-4">Custom Solutions</h1>
        <p className="text-lg md:text-xl text-gray-700 dark:text-sky-100 mb-6">Get a campaign tailored to your unique brand, audience, and goals. We build solutions for every need.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full mb-12">
        <Card className="glass-effect p-8 flex flex-col items-center text-center">
          <CheckCircle className="w-8 h-8 text-sky-500 mb-2" />
          <h3 className="text-xl font-bold mb-2">Tailored Strategy</h3>
          <p className="text-gray-600 dark:text-sky-100">We design campaigns around your specific objectives and KPIs.</p>
        </Card>
        <Card className="glass-effect p-8 flex flex-col items-center text-center">
          <CheckCircle className="w-8 h-8 text-sky-500 mb-2" />
          <h3 className="text-xl font-bold mb-2">Creative Freedom</h3>
          <p className="text-gray-600 dark:text-sky-100">Custom ad designs, formats, and routes for maximum impact.</p>
        </Card>
        <Card className="glass-effect p-8 flex flex-col items-center text-center">
          <CheckCircle className="w-8 h-8 text-sky-500 mb-2" />
          <h3 className="text-xl font-bold mb-2">Flexible Budgets</h3>
          <p className="text-gray-600 dark:text-sky-100">We work with your budget to deliver the best possible results.</p>
        </Card>
        <Card className="glass-effect p-8 flex flex-col items-center text-center">
          <CheckCircle className="w-8 h-8 text-sky-500 mb-2" />
          <h3 className="text-xl font-bold mb-2">Dedicated Support</h3>
          <p className="text-gray-600 dark:text-sky-100">Our team is with you every step, from planning to reporting.</p>
        </Card>
      </div>
      <Button className="hero-gradient text-white text-lg px-8 py-4 rounded-full font-bold shadow-2xl" onClick={() => navigate('/')}>Back to Home</Button>
    </div>
  );
} 