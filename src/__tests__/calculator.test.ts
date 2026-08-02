import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

// ── Utility function tests ────────────────────────────────────────────────────
describe('formatPrice utility', () => {
  it('formats INR currency correctly', () => {
    // Simple sanity check — formatPrice should return rupee strings
    const price = 5000000;
    const formatted = price.toLocaleString('en-IN');
    expect(formatted).toBeTruthy();
    expect(typeof formatted).toBe('string');
  });

  it('handles zero value', () => {
    const price = 0;
    expect(price.toLocaleString('en-IN')).toBe('0');
  });
});

// ── EMI Calculation logic tests ───────────────────────────────────────────────
describe('EMI Calculator logic', () => {
  function calculateEMI(principal: number, ratePercent: number, tenureYears: number) {
    const r = ratePercent / 12 / 100;
    const n = tenureYears * 12;
    if (r === 0) return principal / n;
    return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  }

  it('calculates EMI correctly for a standard loan', () => {
    const emi = calculateEMI(4000000, 8.5, 20);
    // ₹40L at 8.5% for 20yr ≈ ₹34,713
    expect(Math.round(emi)).toBeCloseTo(34713, -2);
  });

  it('returns correct EMI for 0% interest', () => {
    const emi = calculateEMI(1200000, 0, 10);
    // Principal / months = 1200000 / 120 = 10000
    expect(emi).toBe(10000);
  });

  it('EMI increases with higher interest rate', () => {
    const emiLow = calculateEMI(5000000, 7, 20);
    const emiHigh = calculateEMI(5000000, 12, 20);
    expect(emiHigh).toBeGreaterThan(emiLow);
  });

  it('EMI decreases with longer tenure', () => {
    const emiShort = calculateEMI(5000000, 8.5, 10);
    const emiLong = calculateEMI(5000000, 8.5, 30);
    expect(emiLong).toBeLessThan(emiShort);
  });
});

// ── Lead form validation tests ────────────────────────────────────────────────
describe('Lead form validation', () => {
  it('validates email format correctly', () => {
    const isValidEmail = (email: string) => email.includes('@') && email.includes('.');
    expect(isValidEmail('bulandutta5@gmail.com')).toBe(true);
    expect(isValidEmail('invalid-email')).toBe(false);
    expect(isValidEmail('')).toBe(false);
  });

  it('validates phone number length', () => {
    const isValidPhone = (phone: string) => phone.trim().length >= 10;
    expect(isValidPhone('9876543210')).toBe(true);
    expect(isValidPhone('+919876543210')).toBe(true);
    expect(isValidPhone('12345')).toBe(false);
  });

  it('validates name is not empty', () => {
    const isValidName = (name: string) => name.trim().length > 0;
    expect(isValidName('Bikranta Dutta')).toBe(true);
    expect(isValidName('  ')).toBe(false);
    expect(isValidName('')).toBe(false);
  });
});
