'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Calendar, Clock, Loader2, Send, CheckCircle2 } from 'lucide-react';

const bookingSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  propertyInterest: z.string(),
  preferredDate: z.string().min(1, 'Please select a date'),
  preferredTime: z.string().min(1, 'Please select a time'),
  message: z.string().optional(),
});

export type BookingFormData = z.infer<typeof bookingSchema>;

interface BookingFormProps {
  propertyName: string;
}

export default function BookingForm({ propertyName }: BookingFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      propertyInterest: propertyName,
    }
  });

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/send-calculator-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          calculatorType: `Site Visit Request: ${propertyName}`,
          userEmail: data.email,
          userName: data.name,
          userPhone: data.phone,
          details: {
            'Property Interested': data.propertyInterest,
            'Preferred Date': data.preferredDate,
            'Preferred Time': data.preferredTime,
            'User Note': data.message || 'None',
          },
        }),
      });

      if (!res.ok) throw new Error('Failed to book site visit');

      setIsSubmitted(true);
      toast.success('Site visit booked! Details sent to bulandutta5@gmail.com');
      reset();
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error: any) {
      console.error('Error booking site visit:', error);
      toast.error('Failed to book site visit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden"
    >
      <div className="bg-navy p-6 text-white text-center">
        <h3 className="text-xl font-heading font-semibold text-gold">Book a Site Visit</h3>
        <p className="text-sm text-gray-300 mt-1">Schedule a tour of {propertyName}</p>
      </div>

      {isSubmitted ? (
        <div className="p-8 text-center space-y-3">
          <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
          <h4 className="text-lg font-bold text-navy">Site Visit Booked!</h4>
          <p className="text-xs text-gray-600">Your details have been sent to our advisor at <strong className="text-gold">bulandutta5@gmail.com</strong>.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-navy-mid mb-1">Name *</label>
            <input
              {...register('name')}
              className={`w-full px-4 py-2.5 rounded-lg border ${errors.name ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-gold text-sm`}
              placeholder="Your full name"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-navy-mid mb-1">Email *</label>
            <input
              {...register('email')}
              type="email"
              className={`w-full px-4 py-2.5 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-gold text-sm`}
              placeholder="your.email@example.com"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-navy-mid mb-1">Phone *</label>
            <input
              {...register('phone')}
              type="tel"
              className={`w-full px-4 py-2.5 rounded-lg border ${errors.phone ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-gold text-sm`}
              placeholder="+91 98765 43210"
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-navy-mid mb-1 flex items-center gap-1">
                <Calendar size={12} className="text-gold" /> Preferred Date *
              </label>
              <input
                {...register('preferredDate')}
                type="date"
                className={`w-full px-3 py-2 rounded-lg border ${errors.preferredDate ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-gold text-xs`}
              />
              {errors.preferredDate && <p className="text-red-500 text-[10px] mt-0.5">{errors.preferredDate.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-medium text-navy-mid mb-1 flex items-center gap-1">
                <Clock size={12} className="text-gold" /> Preferred Time *
              </label>
              <select
                {...register('preferredTime')}
                className={`w-full px-3 py-2 rounded-lg border ${errors.preferredTime ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-gold text-xs`}
              >
                <option value="">Select Time</option>
                <option value="09:00 AM - 11:00 AM">09:00 AM - 11:00 AM</option>
                <option value="11:00 AM - 01:00 PM">11:00 AM - 01:00 PM</option>
                <option value="02:00 PM - 04:00 PM">02:00 PM - 04:00 PM</option>
                <option value="04:00 PM - 06:00 PM">04:00 PM - 06:00 PM</option>
              </select>
              {errors.preferredTime && <p className="text-red-500 text-[10px] mt-0.5">{errors.preferredTime.message}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-navy-mid mb-1">Notes / Special Request</label>
            <textarea
              {...register('message')}
              rows={3}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gold text-sm"
              placeholder="Any specific requirements..."
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-gold w-full py-3 rounded-lg text-sm font-bold flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <Send className="w-4 h-4" /> Confirm Site Visit Request
              </>
            )}
          </button>
        </form>
      )}
    </motion.div>
  );
}
