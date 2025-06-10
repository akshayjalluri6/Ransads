
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Truck, DollarSign, Shield, Users, Upload, CheckCircle } from 'lucide-react';

const FleetOnboarding = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    ownerName: '',
    email: '',
    phone: '',
    company: '',
    truckCount: '',
    truckType: '',
    routes: '',
    experience: '',
    availability: '',
    documents: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store in localStorage for now
      const existingApplications = JSON.parse(localStorage.getItem('ransads_fleet_applications') || '[]');
      const newApplication = {
        ...formData,
        id: Date.now(),
        timestamp: new Date().toISOString(),
        status: 'pending'
      };
      existingApplications.push(newApplication);
      localStorage.setItem('ransads_fleet_applications', JSON.stringify(existingApplications));

      toast({
        title: "Application Submitted Successfully!",
        description: "Our fleet team will review your application and contact you within 48 hours.",
      });

      // Reset form
      setFormData({
        ownerName: '',
        email: '',
        phone: '',
        company: '',
        truckCount: '',
        truckType: '',
        routes: '',
        experience: '',
        availability: '',
        documents: ''
      });
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Please try again or contact our fleet team directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefits = [
    {
      icon: DollarSign,
      title: "Earn Extra Revenue",
      description: "Generate passive income while you drive your regular routes"
    },
    {
      icon: Shield,
      title: "Full Insurance Coverage",
      description: "We provide comprehensive coverage for all advertising materials"
    },
    {
      icon: Users,
      title: "Dedicated Support",
      description: "24/7 support team to help with any questions or issues"
    }
  ];

  return (
    <section id="fleet-onboarding" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Join Our <span className="gradient-text">Fleet</span> Network
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Turn your truck into a mobile billboard and earn extra revenue. 
            Join hundreds of truck owners who are already monetizing their routes.
          </p>
        </motion.div>

        {/* Benefits Section */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <benefit.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Application Form */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl gradient-text flex items-center space-x-2">
                  <Truck className="w-6 h-6" />
                  <span>Fleet Partner Application</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Owner Name *
                      </label>
                      <Input
                        name="ownerName"
                        value={formData.ownerName}
                        onChange={handleInputChange}
                        placeholder="John Smith"
                        required
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@trucking.com"
                        required
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <Input
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+1 (555) 123-4567"
                        required
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company Name
                      </label>
                      <Input
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder="Smith Trucking LLC"
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Number of Trucks *
                      </label>
                      <select
                        name="truckCount"
                        value={formData.truckCount}
                        onChange={handleInputChange}
                        required
                        className="w-full h-10 px-3 py-2 border border-input bg-background rounded-md text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        <option value="">Select truck count</option>
                        <option value="1">1 truck</option>
                        <option value="2-5">2-5 trucks</option>
                        <option value="6-10">6-10 trucks</option>
                        <option value="11-25">11-25 trucks</option>
                        <option value="25+">25+ trucks</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Truck Type *
                      </label>
                      <select
                        name="truckType"
                        value={formData.truckType}
                        onChange={handleInputChange}
                        required
                        className="w-full h-10 px-3 py-2 border border-input bg-background rounded-md text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        <option value="">Select truck type</option>
                        <option value="semi-trailer">Semi-trailer</option>
                        <option value="box-truck">Box truck</option>
                        <option value="flatbed">Flatbed</option>
                        <option value="tanker">Tanker</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Primary Routes *
                    </label>
                    <Textarea
                      name="routes"
                      value={formData.routes}
                      onChange={handleInputChange}
                      placeholder="Describe your regular routes (e.g., I-95 from Miami to New York, local deliveries in Los Angeles area, etc.)"
                      required
                      className="w-full min-h-[80px]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Trucking Experience
                    </label>
                    <select
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      className="w-full h-10 px-3 py-2 border border-input bg-background rounded-md text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <option value="">Select experience level</option>
                      <option value="less-than-1">Less than 1 year</option>
                      <option value="1-3">1-3 years</option>
                      <option value="3-5">3-5 years</option>
                      <option value="5-10">5-10 years</option>
                      <option value="10+">10+ years</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Weekly Availability
                    </label>
                    <select
                      name="availability"
                      value={formData.availability}
                      onChange={handleInputChange}
                      className="w-full h-10 px-3 py-2 border border-input bg-background rounded-md text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <option value="">Select availability</option>
                      <option value="1-2-days">1-2 days per week</option>
                      <option value="3-4-days">3-4 days per week</option>
                      <option value="5-6-days">5-6 days per week</option>
                      <option value="7-days">7 days per week</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Additional Information
                    </label>
                    <Textarea
                      name="documents"
                      value={formData.documents}
                      onChange={handleInputChange}
                      placeholder="Tell us about your fleet, any special certifications, or additional information that would help us evaluate your application..."
                      className="w-full min-h-[100px]"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full hero-gradient text-white hover:opacity-90 py-3 text-lg font-bold rounded-xl"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Submitting Application...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-5 h-5" />
                        <span>Submit Application</span>
                      </div>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Requirements & Info */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="shadow-xl">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 gradient-text">Requirements</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Valid commercial driver's license</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Clean driving record (3+ years)</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Commercial insurance coverage</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Truck in good condition</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Regular routes (minimum 500 miles/week)</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-xl bg-gradient-to-br from-green-500 to-emerald-500 text-white">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Earning Potential</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Local routes:</span>
                    <span className="font-bold">$500-800/month</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Regional routes:</span>
                    <span className="font-bold">$800-1,500/month</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>National routes:</span>
                    <span className="font-bold">$1,500-3,000/month</span>
                  </div>
                  <div className="border-t border-white/20 pt-3 mt-3">
                    <p className="text-sm opacity-90">
                      Earnings depend on route coverage, truck size, and campaign duration.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-xl">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 gradient-text">Next Steps</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold text-orange-600">1</div>
                    <span className="text-gray-700">Submit your application</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold text-orange-600">2</div>
                    <span className="text-gray-700">Background & vehicle verification</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold text-orange-600">3</div>
                    <span className="text-gray-700">Contract signing & onboarding</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold text-orange-600">4</div>
                    <span className="text-gray-700">Start earning with your first campaign</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FleetOnboarding;
