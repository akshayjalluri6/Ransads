import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Send, Phone, Mail, MapPin, Clock } from 'lucide-react';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const ContactForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    budget: '',
    message: '',
    campaignType: 'local'
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
      await addDoc(collection(db, 'campaign_submissions'), {
        ...formData,
        timestamp: Timestamp.now()
      });
      toast({
        title: "Campaign Inquiry Submitted!",
        description: "Our team will contact you within 24 hours to discuss your advertising goals.",
      });
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        budget: '',
        message: '',
        campaignType: 'local'
      });
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-sky-50 to-blue-50 dark:from-sky-950 dark:to-blue-950">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Start Your <span className="gradient-text">Campaign</span> Today
          </h2>
          <p className="text-xl text-gray-600 dark:text-sky-200 max-w-3xl mx-auto">
            Ready to transform your brand visibility? Get in touch with our team 
            and let's create a mobile advertising campaign that drives results.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Contact Form */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="shadow-xl bg-white dark:bg-card">
              <CardHeader>
                <CardTitle className="text-2xl gradient-text">Campaign Inquiry Form</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-sky-100 mb-2">
                        Full Name *
                      </label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Ajay Kumar"
                        required
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-sky-100 mb-2">
                        Email Address *
                      </label>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="ajaykumar@company.com"
                        required
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-sky-100 mb-2">
                        Company Name *
                      </label>
                      <Input
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder="Your Company"
                        required
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-sky-100 mb-2">
                        Phone Number
                      </label>
                      <Input
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+91 (9876543210)"
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-sky-100 mb-2">
                        Campaign Type
                      </label>
                      <select
                        name="campaignType"
                        value={formData.campaignType}
                        onChange={handleInputChange}
                        className="w-full h-10 px-3 py-2 border border-input bg-background rounded-md text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        <option value="local">Local Campaign</option>
                        <option value="regional">Regional Campaign</option>
                        <option value="national">National Campaign</option>
                        <option value="custom">Custom Solution</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-sky-100 mb-2">
                        Monthly Budget Range
                      </label>
                      <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleInputChange}
                        className="w-full h-10 px-3 py-2 border border-input bg-background rounded-md text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        <option value="">Select Budget Range</option>
                        <option value="under-5k">Under $5,000</option>
                        <option value="5k-10k">$5,000 - $10,000</option>
                        <option value="10k-25k">$10,000 - $25,000</option>
                        <option value="25k-50k">$25,000 - $50,000</option>
                        <option value="50k-plus">$50,000+</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-sky-100 mb-2">
                      Campaign Goals & Message *
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us about your brand, target audience, campaign goals, and any specific requirements..."
                      required
                      className="w-full min-h-[120px]"
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
                        <span>Submitting...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Send className="w-5 h-5" />
                        <span>Start My Campaign</span>
                      </div>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Info */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="shadow-xl bg-white dark:bg-card">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-6 gradient-text">Get In Touch</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-sky-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">Phone</div>
                      <div className="text-gray-600 dark:text-sky-200">8008088866</div>
                      <div className="text-gray-600 dark:text-sky-200">7780128530</div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-sky-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">Email</div>
                      <div className="text-gray-600 dark:text-sky-200">ransads9091@gmail.com</div>
                      <div className="text-gray-600 dark:text-sky-200">dineshnagaram5@gmail.com</div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-sky-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">Office</div>
                      <div className="text-gray-600 dark:text-sky-200">Head Office : Rans Rainbow Building, Hyderabad, Telangana</div>
                      <div className="text-gray-600 dark:text-sky-200">Sales : Rans Transports, Bangalore</div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-sky-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">Business Hours</div>
                      <div className="text-gray-600 dark:text-sky-200">Mon - Fri: 9AM - 6PM PST</div>
                      <div className="text-gray-600 dark:text-sky-200">Sat: 10AM - 4PM PST</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-xl bg-gradient-to-br from-sky-400 to-blue-400 text-white">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Quick Response Guarantee</h3>
                <p className="mb-4">
                  We respond to all campaign inquiries within 24 hours. Need faster? 
                  Call us directly for immediate assistance.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span>Free campaign consultation</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span>Custom route planning</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span>No setup fees</span>
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

export default ContactForm;
