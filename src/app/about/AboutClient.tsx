'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Target, Shield, Zap, CheckCircle, Phone, Mail } from 'lucide-react';

const team = [
  { name: 'Sarah Jenkins', designation: 'Principal Broker', phone: '+1 234 567 8900', email: 'sarah@dreamhomes.com', sales: 450, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah' },
  { name: 'Michael Chen', designation: 'Luxury Specialist', phone: '+1 234 567 8901', email: 'michael@dreamhomes.com', sales: 320, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael' },
  { name: 'Jessica Rossi', designation: 'Investment Advisor', phone: '+1 234 567 8902', email: 'jessica@dreamhomes.com', sales: 280, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica' },
];

const values = [
  { icon: <Shield className="w-8 h-8 text-gold" />, title: 'Integrity', desc: 'We conduct our business with the highest ethical standards.' },
  { icon: <Target className="w-8 h-8 text-gold" />, title: 'Excellence', desc: 'We strive for excellence in every transaction and client interaction.' },
  { icon: <Zap className="w-8 h-8 text-gold" />, title: 'Innovation', desc: 'Embracing modern technology to deliver superior results.' },
];

export default function AboutClient() {
  return (
    <>
      {/* Our Story */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl"
          >
            <Image src="/images/hero-4.png" alt="Our Story" fill className="object-cover" />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-sm font-bold text-gold uppercase tracking-wider mb-2">Our Story</h2>
            <h3 className="text-3xl md:text-4xl font-heading font-bold text-navy mb-6">Building Dreams Since 2008</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Founded on the principles of trust and transparency, Dream Homes has been helping families find their perfect properties for over 15 years. Our mission is to simplify real estate transactions while providing exceptional value and service.
            </p>
            <div className="flex gap-8">
              <div>
                <p className="text-4xl font-bold text-navy mb-1">15+</p>
                <p className="text-sm text-gray-500 font-medium">Years Experience</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-navy mb-1">1200+</p>
                <p className="text-sm text-gray-500 font-medium">Happy Clients</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-heading font-bold text-navy mb-4">Our Core Values</h2>
            <div className="w-24 h-1 bg-gold mx-auto gold-divider"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((val, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-off-white p-8 rounded-2xl border border-navy/5 hover:shadow-xl transition-shadow text-center"
              >
                <div className="w-16 h-16 bg-navy/5 rounded-full flex items-center justify-center mx-auto mb-6">
                  {val.icon}
                </div>
                <h3 className="text-xl font-bold text-navy mb-3">{val.title}</h3>
                <p className="text-gray-600">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="py-20 px-4 bg-off-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-heading font-bold text-navy mb-4">Meet Our Experts</h2>
            <div className="w-24 h-1 bg-gold mx-auto gold-divider"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg border border-navy/5 group"
              >
                <div className="h-64 bg-navy/5 relative flex items-center justify-center p-6">
                  <Image src={member.avatar} alt={member.name} width={150} height={150} className="drop-shadow-xl" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-navy">{member.name}</h3>
                  <p className="text-gold font-medium mb-4">{member.designation}</p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-gray-600 text-sm">
                      <Phone className="w-4 h-4 mr-3 text-navy-mid" />
                      {member.phone}
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <Mail className="w-4 h-4 mr-3 text-navy-mid" />
                      {member.email}
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-navy/10 flex justify-between items-center">
                    <span className="text-sm text-gray-500">Properties Sold</span>
                    <span className="font-bold text-navy">{member.sales}+</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-navy mb-4">Why Choose Us</h2>
            <div className="w-24 h-1 bg-gold mx-auto gold-divider mb-8"></div>
          </div>
          
          <div className="space-y-4">
            {[
              'Exclusive access to premium off-market properties',
              'Dedicated real estate advisors for personalized service',
              'Comprehensive market analysis and investment guidance',
              'Seamless end-to-end transaction management'
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex items-center bg-off-white p-4 rounded-xl border border-navy/5"
              >
                <CheckCircle className="w-6 h-6 text-gold mr-4 flex-shrink-0" />
                <span className="text-navy font-medium">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
