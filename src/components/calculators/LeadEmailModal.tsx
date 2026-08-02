'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Mail, User, Phone, CheckCircle, Loader2, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

interface LeadEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  calculatorType: 'Home Loan EMI Calculator' | 'Home Affordability Calculator';
  calculationDetails: Record<string, string>;
}

export default function LeadEmailModal({
  isOpen,
  onClose,
  calculatorType,
  calculationDetails,
}: LeadEmailModalProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/send-calculator-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          calculatorType,
          userEmail: email,
          userName: name,
          userPhone: phone,
          details: calculationDetails,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to send calculation report');
      }

      setIsSubmitted(true);
      toast.success('Report submitted successfully! Details sent to bulandutta5@gmail.com');
      setTimeout(() => {
        setIsSubmitted(false);
        onClose();
        setEmail('');
        setName('');
        setPhone('');
      }, 2500);
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#071527]/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="glass-dark border border-[#D4AF37]/40 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative overflow-hidden text-white"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/60 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <X size={20} />
          </button>

          {isSubmitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center mx-auto text-emerald-400">
                <CheckCircle size={36} />
              </div>
              <h3 className="text-2xl font-extrabold font-heading text-white">Report Sent!</h3>
              <p className="text-sm text-white/80">
                Your calculation details have been recorded and sent to <span className="text-[#D4AF37] font-bold">bulandutta5@gmail.com</span>.
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#F3E5AB] mb-2">
                <Sparkles size={14} className="text-[#D4AF37]" />
                EMAIL REPORT & LEAD ADVISORY
              </div>
              <h3 className="text-2xl font-extrabold font-heading text-white mb-2">
                Get Detailed Calculation Report
              </h3>
              <p className="text-xs text-white/70 mb-6 leading-relaxed">
                Enter your email address to receive your custom {calculatorType} summary. A copy will be sent to our property advisor at <strong className="text-[#D4AF37]">bulandutta5@gmail.com</strong>.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-1 flex items-center gap-1.5">
                    <Mail size={13} className="text-[#D4AF37]" /> Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="your.name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-1 flex items-center gap-1.5">
                    <User size={13} className="text-[#D4AF37]" /> Full Name (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-1 flex items-center gap-1.5">
                    <Phone size={13} className="text-[#D4AF37]" /> Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="input-field"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-gold w-full py-3.5 mt-4 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <>
                      <Send size={16} /> Send Report to Advisor
                    </>
                  )}
                </button>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
