'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { calculateAffordability, formatPrice } from '@/lib/utils';
import { useCurrency } from '@/context/CurrencyContext';
import { Target, Wallet, TrendingUp, CheckCircle, RefreshCw, Mail, Send, Loader2, User, Phone } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AffordabilityCalculator() {
  const [monthlyIncome, setMonthlyIncome] = useState(150000);
  const [existingEMI, setExistingEMI] = useState(25000);
  const [downPayment, setDownPayment] = useState(1000000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [loanTenure, setLoanTenure] = useState(20);

  // Lead Collection State
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { currency } = useCurrency();

  const { maxBudget: maxPropertyBudget, monthlyEMI: maxAffordableEMI, eligibilityPercent: eligibilityPercentage } = useMemo(() => {
    return calculateAffordability(
      monthlyIncome,
      existingEMI,
      downPayment,
      interestRate,
      loanTenure
    );
  }, [monthlyIncome, existingEMI, downPayment, interestRate, loanTenure]);

  let statusColor = 'text-red-400';
  let strokeColor = '#ef4444';
  if (eligibilityPercentage >= 75) {
    statusColor = 'text-emerald-400';
    strokeColor = '#10b981';
  } else if (eligibilityPercentage >= 50) {
    statusColor = 'text-amber-400';
    strokeColor = '#f59e0b';
  }

  // Exact SVG geometry: radius 38, center 48, viewBox 96x96
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (eligibilityPercentage / 100) * circumference;

  const handleReset = () => {
    setMonthlyIncome(150000);
    setExistingEMI(25000);
    setDownPayment(1000000);
    setInterestRate(8.5);
    setLoanTenure(20);
    setUserName('');
    setUserEmail('');
    setUserPhone('');
    setIsSubmitted(false);
  };

  const handleSendLeadEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim()) {
      toast.error('Please enter your full name');
      return;
    }
    if (!userEmail || !userEmail.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }
    if (!userPhone || userPhone.trim().length < 10) {
      toast.error('Please enter a valid mobile number');
      return;
    }

    setIsSubmitting(true);
    try {
      let userLocation = 'Kolkata, West Bengal, India';
      try {
        const geoRes = await fetch('https://ipapi.co/json/');
        if (geoRes.ok) {
          const geo = await geoRes.json();
          if (geo.city && geo.country_name) {
            userLocation = `${geo.city}, ${geo.region || ''}, ${geo.country_name} (IP: ${geo.ip})`;
          }
        }
      } catch (geoErr) {
        console.log('Using default geolocation');
      }

      const calculationDetails = {
        'Net Monthly Income': formatPrice(monthlyIncome, currency),
        'Existing Monthly EMIs': formatPrice(existingEMI, currency),
        'Available Down Payment': formatPrice(downPayment, currency),
        'Interest Rate': `${interestRate}%`,
        'Loan Tenure': `${loanTenure} Years`,
        'Maximum Property Budget': formatPrice(maxPropertyBudget, currency),
        'Max Affordable EMI': formatPrice(maxAffordableEMI, currency),
        'Loan Eligibility': `${Math.round(eligibilityPercentage)}% (${eligibilityPercentage >= 75 ? 'High Approval' : eligibilityPercentage >= 50 ? 'Moderate Approval' : 'Low Approval'})`,
      };

      const res = await fetch('/api/send-calculator-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          calculatorType: 'Home Affordability Calculator Submission',
          userName: userName.trim(),
          userEmail: userEmail.trim(),
          userPhone: userPhone.trim(),
          userLocation,
          details: calculationDetails,
        }),
      });

      if (!res.ok) throw new Error('Failed to send email');

      setIsSubmitted(true);
      toast.success('Affordability lead submitted successfully! Sent to bulandutta5@gmail.com');
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || 'Error submitting lead. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="glass-dark rounded-2xl shadow-2xl overflow-hidden border border-[#D4AF37]/30 max-w-5xl mx-auto w-full">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#071527] to-[#0F2540] p-6 text-white flex items-center justify-between border-b border-[#D4AF37]/20 flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center">
            <Target className="h-5 w-5 text-[#D4AF37]" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-heading font-extrabold text-white">Home Affordability Calculator</h2>
            <p className="text-xs text-white/60">Calculate maximum property purchase power & loan approval chances</p>
          </div>
        </div>
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/20 text-xs font-semibold text-white/80 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all"
        >
          <RefreshCw size={13} /> Reset
        </button>
      </div>

      {/* Main Grid */}
      <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls Column */}
        <div className="lg:col-span-6 space-y-5">
          {/* Monthly Income */}
          <div className="space-y-2 bg-[#071527]/60 p-4 rounded-xl border border-white/10">
            <div className="flex justify-between items-center flex-wrap gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#F3E5AB] flex items-center gap-1">
                <Wallet className="h-3.5 w-3.5 text-[#D4AF37]" /> Net Monthly Income
              </label>
              <div className="flex items-center bg-[#0F2540] px-3 py-1.5 rounded-lg border border-[#D4AF37]/30">
                <input
                  type="number"
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(Math.max(0, Number(e.target.value)))}
                  className="w-32 text-right bg-transparent focus:outline-none font-bold text-white text-sm"
                />
              </div>
            </div>
            <input
              type="range"
              min="30000"
              max="1000000"
              step="5000"
              value={monthlyIncome}
              onChange={(e) => setMonthlyIncome(Number(e.target.value))}
              className="w-full h-2 bg-[#1C3B63] rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
            />
          </div>

          {/* Existing EMI */}
          <div className="space-y-2 bg-[#071527]/60 p-4 rounded-xl border border-white/10">
            <div className="flex justify-between items-center flex-wrap gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#F3E5AB] flex items-center gap-1">
                <TrendingUp className="h-3.5 w-3.5 text-[#D4AF37]" /> Existing Monthly EMIs
              </label>
              <div className="flex items-center bg-[#0F2540] px-3 py-1.5 rounded-lg border border-[#D4AF37]/30">
                <input
                  type="number"
                  value={existingEMI}
                  onChange={(e) => setExistingEMI(Math.max(0, Number(e.target.value)))}
                  className="w-28 text-right bg-transparent focus:outline-none font-bold text-white text-sm"
                />
              </div>
            </div>
            <input
              type="range"
              min="0"
              max={monthlyIncome}
              step="1000"
              value={existingEMI}
              onChange={(e) => setExistingEMI(Number(e.target.value))}
              className="w-full h-2 bg-[#1C3B63] rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
            />
          </div>

          {/* Down Payment */}
          <div className="space-y-2 bg-[#071527]/60 p-4 rounded-xl border border-white/10">
            <div className="flex justify-between items-center flex-wrap gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#F3E5AB] flex items-center gap-1">
                <Wallet className="h-3.5 w-3.5 text-[#D4AF37]" /> Available Down Payment
              </label>
              <div className="flex items-center bg-[#0F2540] px-3 py-1.5 rounded-lg border border-[#D4AF37]/30">
                <input
                  type="number"
                  value={downPayment}
                  onChange={(e) => setDownPayment(Math.max(0, Number(e.target.value)))}
                  className="w-32 text-right bg-transparent focus:outline-none font-bold text-white text-sm"
                />
              </div>
            </div>
            <input
              type="range"
              min="100000"
              max="50000000"
              step="100000"
              value={downPayment}
              onChange={(e) => setDownPayment(Number(e.target.value))}
              className="w-full h-2 bg-[#1C3B63] rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
            />
          </div>

          {/* Interest Rate & Tenure */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2 bg-[#071527]/60 p-3.5 rounded-xl border border-white/10">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-[#F3E5AB]">Interest Rate</label>
                <span className="font-bold text-[#D4AF37] text-sm">{interestRate}%</span>
              </div>
              <input
                type="range"
                min="5"
                max="18"
                step="0.25"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full h-2 bg-[#1C3B63] rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
              />
            </div>

            <div className="space-y-2 bg-[#071527]/60 p-3.5 rounded-xl border border-white/10">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-[#F3E5AB]">Tenure (Yrs)</label>
                <span className="font-bold text-[#D4AF37] text-sm">{loanTenure} Yrs</span>
              </div>
              <input
                type="range"
                min="5"
                max="30"
                step="1"
                value={loanTenure}
                onChange={(e) => setLoanTenure(Number(e.target.value))}
                className="w-full h-2 bg-[#1C3B63] rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
              />
            </div>
          </div>
        </div>

        {/* Outputs Column & Direct Inline Lead Email Form */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
          {/* Max Budget Result Box */}
          <div className="bg-gradient-to-br from-[#0F2540] to-[#071527] p-6 rounded-2xl border border-[#D4AF37]/30 text-center shadow-lg relative overflow-hidden">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#F3E5AB] mb-1">Maximum Property Budget</h3>
            <motion.div
              key={`budget-${maxPropertyBudget}`}
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-4xl md:text-5xl font-extrabold font-heading gold-gradient-text my-2"
            >
              {formatPrice(maxPropertyBudget, currency)}
            </motion.div>

            <div className="flex items-center justify-around mt-6 pt-5 border-t border-white/10 flex-wrap gap-6">
              <div className="text-center">
                <p className="text-xs text-white/60 mb-0.5">Max Affordable EMI</p>
                <p className="text-lg font-extrabold text-white">{formatPrice(maxAffordableEMI, currency)}</p>
              </div>

              {/* Progress Ring with Fixed ViewBox Math */}
              <div className="flex items-center gap-3">
                <div className="relative w-24 h-24 flex items-center justify-center flex-shrink-0">
                  <svg viewBox="0 0 96 96" className="transform -rotate-90 w-24 h-24">
                    <circle
                      cx="48"
                      cy="48"
                      r={radius}
                      stroke="rgba(255,255,255,0.12)"
                      strokeWidth="6"
                      fill="transparent"
                    />
                    <motion.circle
                      cx="48"
                      cy="48"
                      r={radius}
                      stroke={strokeColor}
                      strokeWidth="6"
                      fill="transparent"
                      strokeDasharray={circumference}
                      initial={{ strokeDashoffset: circumference }}
                      animate={{ strokeDashoffset }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className={`text-base font-extrabold ${statusColor}`}>
                      {Math.round(eligibilityPercentage)}%
                    </span>
                  </div>
                </div>
                <div className="text-left">
                  <div className="text-xs text-white/60 font-medium">Loan Eligibility</div>
                  <div className={`text-xs font-extrabold ${statusColor} px-2.5 py-1 rounded bg-[#071527] border border-white/10 mt-1 inline-block whitespace-nowrap shadow-sm`}>
                    {eligibilityPercentage >= 75 ? 'High Approval' : eligibilityPercentage >= 50 ? 'Moderate Approval' : 'Low Approval'}
                  </div>
                </div>
              </div>
            </div>

            {/* Approval Advice Banner */}
            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-white/90 bg-[#071527]/80 py-2.5 px-4 rounded-xl border border-[#D4AF37]/20">
              <CheckCircle className={`h-4 w-4 ${statusColor} flex-shrink-0`} />
              <span>
                {eligibilityPercentage >= 75 
                  ? "Excellent eligibility! Banks are likely to approve this loan smoothly." 
                  : eligibilityPercentage >= 50 
                  ? "Good eligibility. Lowering existing EMIs will boost loan limit."
                  : "High debt ratio. Increase down payment or extend tenure to qualify."}
              </span>
            </div>
          </div>

          {/* Integrated Direct Lead Email Form */}
          <div className="bg-[#071527] p-5 rounded-xl border border-[#D4AF37]/30 shadow-md">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#F3E5AB] mb-3 flex items-center gap-1.5">
              <Mail size={14} className="text-[#D4AF37]" /> Send Affordability Calculation Report
            </h4>

            {isSubmitted ? (
              <div className="flex items-center gap-3 text-emerald-400 text-xs font-bold py-2 bg-emerald-500/10 p-3 rounded-lg border border-emerald-500/30">
                <CheckCircle size={18} className="flex-shrink-0" />
                <span>Affordability calculation report submitted successfully!</span>
              </div>
            ) : (
              <form onSubmit={handleSendLeadEmail} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <div className="relative">
                    <User size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#D4AF37]" />
                    <input
                      type="text"
                      required
                      placeholder="Full Name *"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full bg-[#0F2540] border border-white/20 rounded-lg pl-8 pr-3 py-2 text-xs text-white placeholder-white/50 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div className="relative">
                    <Mail size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#D4AF37]" />
                    <input
                      type="email"
                      required
                      placeholder="Email Address *"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      className="w-full bg-[#0F2540] border border-white/20 rounded-lg pl-8 pr-3 py-2 text-xs text-white placeholder-white/50 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div className="relative">
                    <Phone size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#D4AF37]" />
                    <input
                      type="tel"
                      required
                      placeholder="Mobile Number *"
                      value={userPhone}
                      onChange={(e) => setUserPhone(e.target.value)}
                      className="w-full bg-[#0F2540] border border-white/20 rounded-lg pl-8 pr-3 py-2 text-xs text-white placeholder-white/50 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-gold w-full py-2.5 px-4 text-xs font-bold flex items-center justify-center gap-2 shadow-md"
                >
                  {isSubmitting ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <>
                      <Send size={13} /> Send My Affordability Lead Report
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
