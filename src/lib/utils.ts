import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { Currency } from '@/types/property';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(amount: number, currency: Currency = 'INR'): string {
  if (currency === 'INR') {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)} Cr`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(2)} L`;
    } else {
      return `₹${amount.toLocaleString('en-IN')}`;
    }
  } else {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(2)}M`;
    } else if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(0)}K`;
    } else {
      return `$${amount.toLocaleString('en-US')}`;
    }
  }
}

export function formatArea(area: number): string {
  return `${area.toLocaleString('en-IN')} sq.ft`;
}

export function calculateEMI(principal: number, annualRate: number, tenureYears: number): { emi: number; totalInterest: number; totalAmount: number } {
  const monthlyRate = annualRate / 100 / 12;
  const tenureMonths = tenureYears * 12;
  let emi: number;
  if (monthlyRate === 0) {
    emi = principal / tenureMonths;
  } else {
    emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
      (Math.pow(1 + monthlyRate, tenureMonths) - 1);
  }
  emi = Math.round(emi);
  const totalAmount = Math.round(emi * tenureMonths);
  const totalInterest = totalAmount - principal;
  return { emi, totalInterest, totalAmount };
}

export function calculateAffordability(
  monthlyIncome: number,
  existingEMI: number,
  downPayment: number,
  annualRate: number,
  years: number
): { maxBudget: number; monthlyEMI: number; eligibilityPercent: number } {
  const maxEMI = monthlyIncome * 0.45 - existingEMI;
  const monthlyRate = annualRate / 100 / 12;
  const months = years * 12;
  let maxLoan = 0;
  if (monthlyRate === 0) {
    maxLoan = maxEMI * months;
  } else {
    maxLoan = maxEMI * (Math.pow(1 + monthlyRate, months) - 1) /
      (monthlyRate * Math.pow(1 + monthlyRate, months));
  }
  const maxBudget = Math.max(0, Math.round(maxLoan + downPayment));
  const monthlyEMI = Math.round(maxEMI);
  const eligibilityPercent = Math.min(100, Math.round((maxEMI / (monthlyIncome * 0.45)) * 100));
  return { maxBudget, monthlyEMI, eligibilityPercent };
}

export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength) + '…';
}

export function slugify(text: string): string {
  return text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
}
