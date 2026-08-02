'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Send, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  subject: z.string().min(3, 'Subject is required'),
  message: z.string().min(5, 'Message must be at least 5 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      const res = await fetch('/api/send-calculator-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          calculatorType: `Contact Inquiry: ${data.subject}`,
          userEmail: data.email,
          userName: data.name,
          userPhone: data.phone,
          details: {
            'Subject': data.subject,
            'Message': data.message,
          },
        }),
      });

      if (!res.ok) throw new Error('Failed to send contact inquiry');

      setIsSuccess(true);
      toast.success('Message sent! Details delivered to bulandutta5@gmail.com');
      reset();
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || 'Failed to submit form');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {isSuccess && (
        <div className="p-4 bg-emerald-50 text-emerald-800 border border-emerald-300 rounded-xl mb-6 font-semibold text-sm flex items-center gap-2">
          ✓ Message sent successfully! Details delivered to bulandutta5@gmail.com. We will contact you shortly.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-navy mb-2">Name *</label>
          <input
            {...register('name')}
            className={`w-full px-4 py-3 rounded-xl border ${errors.name ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent`}
            placeholder="John Doe"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-navy mb-2">Email *</label>
          <input
            {...register('email')}
            type="email"
            className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent`}
            placeholder="john@example.com"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-navy mb-2">Phone *</label>
          <input
            {...register('phone')}
            type="tel"
            className={`w-full px-4 py-3 rounded-xl border ${errors.phone ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent`}
            placeholder="+91 98765 43210"
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-navy mb-2">Subject *</label>
          <input
            {...register('subject')}
            className={`w-full px-4 py-3 rounded-xl border ${errors.subject ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent`}
            placeholder="Property Inquiry"
          />
          {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-navy mb-2">Message *</label>
        <textarea
          {...register('message')}
          rows={4}
          className={`w-full px-4 py-3 rounded-xl border ${errors.message ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent`}
          placeholder="I am interested in buying a 3BHK villa in Bangalore..."
        />
        {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-gold w-full py-4 rounded-xl text-base font-bold flex items-center justify-center gap-2 shadow-lg"
      >
        {isSubmitting ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <>
            <Send className="w-5 h-5" /> Send Message
          </>
        )}
      </button>
    </form>
  );
}
