'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import EMICalculator from '@/components/calculators/EMICalculator';
import AffordabilityCalculator from '@/components/calculators/AffordabilityCalculator';
import { Calculator, Target, Sparkles, Lock, Unlock, User, Mail, Phone, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function FinancialToolsSection() {
  const [activeTab, setActiveTab] = useState<'emi' | 'affordability'>('emi');
  const [isUnlocked, setIsUnlocked] = useState(false);
  
  // Gate Form Fields
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Gate always shows fresh — no localStorage caching, every visitor must submit details

  const handleUnlockSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userName.trim()) { toast.error('Please enter your full name'); return; }
    if (!userEmail || !userEmail.includes('@')) { toast.error('Please enter a valid email address'); return; }
    if (!userPhone || userPhone.trim().length < 10) { toast.error('Please enter a valid 10-digit mobile number'); return; }

    setIsSubmitting(true);
    try {
      // Geo-location (2s timeout)
      let userLocation = 'India';
      try {
        const ctrl = new AbortController();
        setTimeout(() => ctrl.abort(), 2000);
        const geoRes = await fetch('https://ipapi.co/json/', { signal: ctrl.signal });
        if (geoRes.ok) {
          const geo = await geoRes.json();
          if (geo.city && geo.country_name) {
            userLocation = `${geo.city}, ${geo.region || ''}, ${geo.country_name} (IP: ${geo.ip})`;
          }
        }
      } catch (_) {}

      // ✅ Direct browser → FormSubmit AJAX (sends email to bulandutta5@gmail.com)
      // NOTE: First time only, check bulandutta5@gmail.com inbox for FormSubmit activation email & click confirm.
      await fetch('https://formsubmit.co/ajax/bulandutta5@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          _subject: `🏠 New Lead: ${userName.trim()} unlocked Calculator`,
          _captcha: 'false',
          _template: 'table',
          'Full Name': userName.trim(),
          'Email Address': userEmail.trim(),
          'Mobile Number': userPhone.trim(),
          'Lead Location': userLocation,
          'Action': 'Unlocked EMI & Affordability Calculators',
          'Submitted At': new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
        }),
      });

      setIsUnlocked(true);
      toast.success('✅ Access Granted! Calculators Unlocked.');
    } catch (err: any) {
      console.error(err);
      setIsUnlocked(true);
      toast.success('✅ Access Granted!');
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <section className="bg-[#0F2540] py-24 border-t border-[#D4AF37]/15 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#D4AF37]/5 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="section-label justify-center mb-3">
            <Sparkles size={16} className="text-[#D4AF37]" />
            SMART INVESTMENT PLANNER
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold font-heading text-white mt-2 mb-4">
            Financial <span className="gold-gradient-text">Calculators</span>
          </h2>
          <div className="gold-divider mx-auto mt-4 mb-4" />
          <p className="text-white/70 max-w-2xl mx-auto text-lg font-light">
            Plan your property purchase with precision. Estimate monthly EMIs or calculate your total home purchasing budget.
          </p>
        </div>

        {/* Gate Check: If locked, show Lead Gate Form Card */}
        {!isUnlocked ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-xl mx-auto glass-dark rounded-3xl p-8 sm:p-10 border border-[#D4AF37]/40 shadow-2xl relative overflow-hidden"
          >
            <div className="text-center mb-8">
              <div className="w-14 h-14 rounded-2xl bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center mx-auto mb-4 text-[#D4AF37]">
                <Lock size={28} />
              </div>
              <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-white mb-2">
                Unlock Financial Calculators
              </h3>
              <p className="text-xs sm:text-sm text-white/70">
                Please enter your contact details to access our precision EMI & Home Affordability Calculators.
              </p>
            </div>

            <form onSubmit={handleUnlockSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#F3E5AB] mb-1.5 flex items-center gap-1.5">
                  <User size={14} className="text-[#D4AF37]" /> Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Bikranta Dutta"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="input-field w-full bg-[#071527] border border-white/20 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#F3E5AB] mb-1.5 flex items-center gap-1.5">
                  <Mail size={14} className="text-[#D4AF37]" /> Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="bulandutta5@gmail.com"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="input-field w-full bg-[#071527] border border-white/20 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              {/* Mobile Number */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#F3E5AB] mb-1.5 flex items-center gap-1.5">
                  <Phone size={14} className="text-[#D4AF37]" /> Mobile Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={userPhone}
                  onChange={(e) => setUserPhone(e.target.value)}
                  className="input-field w-full bg-[#071527] border border-white/20 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              {/* Submit / Unlock Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-gold w-full py-4 text-sm font-bold flex items-center justify-center gap-2 mt-6 shadow-lg"
              >
                {isSubmitting ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <>
                    <Unlock size={18} /> Unlock Calculators & Submit Details <ArrowRight size={16} />
                  </>
                )}
              </button>

              <div className="text-center pt-3">
                <span className="text-[11px] text-white/50 flex items-center justify-center gap-1">
                  <CheckCircle2 size={12} className="text-[#D4AF37]" /> Instant Access • Zero Spam • 100% Confidential
                </span>
              </div>
            </form>
          </motion.div>
        ) : (
          /* UNLOCKED CALCULATORS UI */
          <div>
            {/* Tab Switcher Buttons & Reset Gate Button */}
            <div className="flex justify-between items-center mb-10 flex-wrap gap-4">
              <div className="glass-dark p-1.5 rounded-2xl border border-[#D4AF37]/30 inline-flex gap-2 max-w-md w-full">
                <button
                  onClick={() => setActiveTab('emi')}
                  className={`flex-1 py-3 px-5 rounded-xl font-bold text-xs md:text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
                    activeTab === 'emi'
                      ? 'bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-[#071527] shadow-lg scale-[1.02]'
                      : 'text-white/80 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Calculator size={18} />
                  <span>EMI Calculator</span>
                </button>
                <button
                  onClick={() => setActiveTab('affordability')}
                  className={`flex-1 py-3 px-5 rounded-xl font-bold text-xs md:text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
                    activeTab === 'affordability'
                      ? 'bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-[#071527] shadow-lg scale-[1.02]'
                      : 'text-white/80 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Target size={18} />
                  <span>Affordability Calculator</span>
                </button>
              </div>

              {/* Status Pill */}
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 text-emerald-300 text-xs font-semibold">
                <CheckCircle2 size={14} className="text-emerald-400" />
                <span>Calculators Unlocked</span>
              </div>
            </div>

            {/* Active Calculator Panel */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35 }}
              >
                {activeTab === 'emi' ? <EMICalculator /> : <AffordabilityCalculator />}
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
}
