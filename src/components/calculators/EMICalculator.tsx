'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';
import { calculateEMI, formatPrice } from '@/lib/utils';
import { useCurrency } from '@/context/CurrencyContext';
import { Calculator, IndianRupee, Percent, RefreshCw, Send, CheckCircle, Loader2, Mail, User, Phone } from 'lucide-react';
import toast from 'react-hot-toast';

interface EMICalculatorProps {
  defaultPrice?: number;
}

export default function EMICalculator({ defaultPrice }: EMICalculatorProps = {}) {
  const [propertyPrice, setPropertyPrice] = useState(defaultPrice ?? 5000000);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(8.5);
  const [loanTenure, setLoanTenure] = useState(20);

  // Lead Collection State
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { currency } = useCurrency();

  const downPaymentAmount = (propertyPrice * downPaymentPercent) / 100;
  const principalAmount = propertyPrice - downPaymentAmount;

  const { emi, totalInterest, totalAmount } = useMemo(() => {
    return calculateEMI(principalAmount, interestRate, loanTenure);
  }, [principalAmount, interestRate, loanTenure]);

  const pieData = [
    { name: 'Principal Amount', value: principalAmount },
    { name: 'Total Interest', value: totalInterest },
  ];
  const COLORS = ['#1C3B63', '#D4AF37'];

  const barData = useMemo(() => {
    const data = [];
    let balance = principalAmount;
    const monthlyRate = interestRate / 12 / 100;

    for (let year = 1; year <= Math.min(5, loanTenure); year++) {
      let yearInterest = 0;
      let yearPrincipal = 0;

      for (let month = 1; month <= 12; month++) {
        const interest = balance * monthlyRate;
        const principal = emi - interest;
        yearInterest += interest;
        yearPrincipal += principal;
        balance -= principal;
      }

      data.push({
        year: `Yr ${year}`,
        Principal: Math.round(yearPrincipal),
        Interest: Math.round(yearInterest),
      });
    }
    return data;
  }, [principalAmount, interestRate, loanTenure, emi]);

  const handleReset = () => {
    setPropertyPrice(defaultPrice ?? 5000000);
    setDownPaymentPercent(20);
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
      // Get location lookup
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
        'Property Price': formatPrice(propertyPrice, currency),
        'Down Payment': `${downPaymentPercent}% (${formatPrice(downPaymentAmount, currency)})`,
        'Interest Rate': `${interestRate}%`,
        'Loan Tenure': `${loanTenure} Years`,
        'Monthly EMI': formatPrice(emi, currency),
        'Total Interest': formatPrice(totalInterest, currency),
        'Total Payable': formatPrice(totalAmount, currency),
      };

      const res = await fetch('/api/send-calculator-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          calculatorType: 'Home Loan EMI Calculator Submission',
          userName: userName.trim(),
          userEmail: userEmail.trim(),
          userPhone: userPhone.trim(),
          userLocation,
          details: calculationDetails,
        }),
      });

      if (!res.ok) throw new Error('Failed to send email');

      setIsSubmitted(true);
      toast.success('EMI Lead submitted successfully! Sent to bulandutta5@gmail.com');
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
            <Calculator className="h-5 w-5 text-[#D4AF37]" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-heading font-extrabold text-white">Home Loan EMI Calculator</h2>
            <p className="text-xs text-white/60">Estimate your monthly home loan installments accurately</p>
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
        <div className="lg:col-span-6 space-y-6">
          {/* Property Price */}
          <div className="space-y-2 bg-[#071527]/60 p-4 rounded-xl border border-white/10">
            <div className="flex justify-between items-center flex-wrap gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#F3E5AB] flex items-center gap-1">
                <IndianRupee className="h-3.5 w-3.5 text-[#D4AF37]" /> Property Price
              </label>
              <div className="flex items-center bg-[#0F2540] px-3 py-1.5 rounded-lg border border-[#D4AF37]/30">
                <input
                  type="number"
                  value={propertyPrice}
                  onChange={(e) => setPropertyPrice(Math.max(0, Number(e.target.value)))}
                  className="w-32 text-right bg-transparent focus:outline-none font-bold text-white text-sm"
                />
              </div>
            </div>
            <input
              type="range"
              min="1000000"
              max="100000000"
              step="500000"
              value={propertyPrice}
              onChange={(e) => setPropertyPrice(Number(e.target.value))}
              className="w-full h-2 bg-[#1C3B63] rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
            />
            <div className="flex justify-between text-[11px] text-white/50 font-medium">
              <span>{formatPrice(1000000, currency)}</span>
              <span>{formatPrice(100000000, currency)}</span>
            </div>
          </div>

          {/* Down Payment */}
          <div className="space-y-2 bg-[#071527]/60 p-4 rounded-xl border border-white/10">
            <div className="flex justify-between items-center flex-wrap gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#F3E5AB] flex items-center gap-1">
                <Percent className="h-3.5 w-3.5 text-[#D4AF37]" /> Down Payment
              </label>
              <div className="flex items-center gap-2">
                <span className="text-xs text-white/70 font-semibold">{formatPrice(downPaymentAmount, currency)}</span>
                <div className="flex items-center bg-[#0F2540] px-2.5 py-1 rounded-lg border border-[#D4AF37]/30">
                  <input
                    type="number"
                    value={downPaymentPercent}
                    onChange={(e) => setDownPaymentPercent(Math.min(80, Math.max(0, Number(e.target.value))))}
                    className="w-10 text-right bg-transparent focus:outline-none font-bold text-white text-sm"
                  />
                  <span className="text-white/60 text-xs ml-0.5">%</span>
                </div>
              </div>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              step="1"
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
              className="w-full h-2 bg-[#1C3B63] rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
            />
            <div className="flex justify-between text-[11px] text-white/50 font-medium">
              <span>0%</span>
              <span>50%</span>
            </div>
          </div>

          {/* Interest Rate & Tenure Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Interest Rate */}
            <div className="space-y-2 bg-[#071527]/60 p-4 rounded-xl border border-white/10">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold uppercase tracking-wider text-[#F3E5AB]">Interest Rate</label>
                <div className="flex items-center bg-[#0F2540] px-2.5 py-1 rounded-lg border border-[#D4AF37]/30">
                  <input
                    type="number"
                    value={interestRate}
                    step="0.1"
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-12 text-right bg-transparent focus:outline-none font-bold text-white text-sm"
                  />
                  <span className="text-white/60 text-xs ml-0.5">%</span>
                </div>
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

            {/* Loan Tenure */}
            <div className="space-y-2 bg-[#071527]/60 p-4 rounded-xl border border-white/10">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold uppercase tracking-wider text-[#F3E5AB]">Loan Tenure</label>
                <div className="flex items-center bg-[#0F2540] px-2.5 py-1 rounded-lg border border-[#D4AF37]/30">
                  <input
                    type="number"
                    value={loanTenure}
                    onChange={(e) => setLoanTenure(Number(e.target.value))}
                    className="w-10 text-right bg-transparent focus:outline-none font-bold text-white text-sm"
                  />
                  <span className="text-white/60 text-xs ml-1">Yrs</span>
                </div>
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

        {/* Results Output & Direct Inline Lead Email Form Column */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
          {/* Monthly EMI Result Banner */}
          <div className="bg-gradient-to-br from-[#0F2540] to-[#071527] p-6 rounded-2xl border border-[#D4AF37]/30 text-center shadow-lg relative overflow-hidden">
            <div className="text-xs font-bold uppercase tracking-widest text-[#F3E5AB] mb-1">Estimated Monthly Installment</div>
            <motion.div
              key={emi}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-4xl md:text-5xl font-extrabold font-heading gold-gradient-text my-2"
            >
              {formatPrice(emi, currency)}
              <span className="text-xs text-white/50 font-normal ml-1">/ month</span>
            </motion.div>
            
            <div className="grid grid-cols-3 gap-3 border-t border-white/10 pt-4 mt-4 text-center">
              <div>
                <p className="text-[11px] text-white/60 mb-0.5">Loan Amount</p>
                <p className="font-bold text-sm text-white">{formatPrice(principalAmount, currency)}</p>
              </div>
              <div>
                <p className="text-[11px] text-white/60 mb-0.5">Total Interest</p>
                <p className="font-bold text-sm text-[#D4AF37]">{formatPrice(totalInterest, currency)}</p>
              </div>
              <div>
                <p className="text-[11px] text-white/60 mb-0.5">Total Payable</p>
                <p className="font-bold text-sm text-white">{formatPrice(totalAmount, currency)}</p>
              </div>
            </div>
          </div>

          {/* Visual Breakdown Charts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-[#071527]/50 p-4 rounded-xl border border-white/10">
            {/* Pie Chart */}
            <div className="h-44 flex flex-col items-center">
              <h4 className="text-xs font-bold text-[#F3E5AB] uppercase tracking-wider mb-1">Principal vs Interest</h4>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={42}
                    outerRadius={62}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatPrice(value as number, currency)} contentStyle={{ background: '#071527', borderColor: '#D4AF37', borderRadius: '8px', color: '#fff', fontSize: '12px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            {/* Bar Chart */}
            <div className="h-44 flex flex-col items-center">
              <h4 className="text-xs font-bold text-[#F3E5AB] uppercase tracking-wider mb-1">First 5 Years Split</h4>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="year" tick={{ fontSize: 10, fill: '#fff' }} tickLine={false} axisLine={false} />
                  <YAxis tickFormatter={(val) => `${(val / 100000).toFixed(0)}L`} tick={{ fontSize: 10, fill: '#fff' }} tickLine={false} axisLine={false} />
                  <Tooltip formatter={(value) => formatPrice(value as number, currency)} contentStyle={{ background: '#071527', borderColor: '#D4AF37', borderRadius: '8px', color: '#fff', fontSize: '12px' }} />
                  <Bar dataKey="Principal" stackId="a" fill="#1C3B63" />
                  <Bar dataKey="Interest" stackId="a" fill="#D4AF37" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Complete EMI Calculator Lead Form */}
          <div className="bg-[#071527] p-5 rounded-xl border border-[#D4AF37]/30 shadow-md">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#F3E5AB] mb-3 flex items-center gap-1.5">
              <Mail size={14} className="text-[#D4AF37]" /> Send EMI Calculation Report
            </h4>
            
            {isSubmitted ? (
              <div className="flex items-center gap-3 text-emerald-400 text-xs font-bold py-2 bg-emerald-500/10 p-3 rounded-lg border border-emerald-500/30">
                <CheckCircle size={18} className="flex-shrink-0" />
                <span>EMI calculation report submitted successfully!</span>
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
                      <Send size={13} /> Send My EMI Lead Report
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
