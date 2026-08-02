import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { calculatorType = 'General Lead Request', userEmail, userName, userPhone, userLocation: clientLocation, details } = body;

    if (!userEmail || !userEmail.includes('@')) {
      return NextResponse.json({ error: 'Valid email address is required' }, { status: 400 });
    }

    const recipientEmail = 'bulandutta5@gmail.com';
    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    // Extract IP address from request headers
    const forwardedFor = req.headers.get('x-forwarded-for');
    const realIp = req.headers.get('x-real-ip');
    const clientIp = forwardedFor ? forwardedFor.split(',')[0].trim() : realIp || '127.0.0.1';

    // Geolocation
    let locationString = clientLocation || 'India';
    if (!clientLocation && clientIp && clientIp !== '127.0.0.1' && clientIp !== '::1' && !clientIp.startsWith('192.168.')) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2000);
        const geoRes = await fetch(`https://ipapi.co/${clientIp}/json/`, { signal: controller.signal });
        clearTimeout(timeoutId);
        if (geoRes.ok) {
          const geoData = await geoRes.json();
          if (geoData.city && geoData.country_name) {
            locationString = `${geoData.city}, ${geoData.region || ''}, ${geoData.country_name} (IP: ${clientIp})`;
          }
        }
      } catch (e) { /* use default */ }
    }

    const detailsText = details && Object.keys(details).length > 0
      ? Object.entries(details).map(([k, v]) => `${k}: ${v}`).join('\n')
      : 'Calculator Access Gate Unlocked';

    let emailSent = false;

    // ── Method 1: Web3Forms (zero-config, no activation needed) ──────────
    const web3key = process.env.WEB3FORMS_ACCESS_KEY;
    if (web3key && web3key !== 'your_web3forms_key_here') {
      try {
        const w3res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({
            access_key: web3key,
            subject: `🚨 New Lead: ${userName || userEmail} — ${calculatorType}`,
            from_name: 'Dream Homes Real Estate',
            name: userName || 'Website Visitor',
            email: userEmail,
            phone: userPhone || 'N/A',
            location: locationString,
            context: calculatorType,
            submitted_at: timestamp,
            details: detailsText,
          }),
        });
        const w3data = await w3res.json();
        if (w3data.success) {
          emailSent = true;
          console.log(`[Web3Forms ✅] Email delivered to ${recipientEmail}`);
        } else {
          console.warn('[Web3Forms ❌]', w3data.message);
        }
      } catch (e: any) {
        console.warn('[Web3Forms Error]', e.message);
      }
    }

    // ── Method 2: Gmail SMTP via Nodemailer ───────────────────────────────
    const smtpUser = process.env.EMAIL_USER || process.env.SMTP_USER;
    const smtpPass = process.env.EMAIL_PASS || process.env.SMTP_PASS;
    if (!emailSent && smtpUser && smtpPass) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST || 'smtp.gmail.com',
          port: Number(process.env.SMTP_PORT) || 465,
          secure: true,
          auth: { user: smtpUser, pass: smtpPass },
        });
        await transporter.sendMail({
          from: `"Dream Homes Leads" <${smtpUser}>`,
          to: recipientEmail,
          subject: `🚨 New Lead: ${userName || userEmail} — ${calculatorType}`,
          text: `New Lead Received!\n\nName: ${userName}\nEmail: ${userEmail}\nPhone: ${userPhone}\nLocation: ${locationString}\nContext: ${calculatorType}\nTime: ${timestamp}\n\nDetails:\n${detailsText}`,
        });
        emailSent = true;
        console.log(`[SMTP ✅] Email sent to ${recipientEmail}`);
      } catch (e: any) {
        console.warn('[SMTP Error]', e.message);
      }
    }

    // ── Method 3: FormSubmit fallback ─────────────────────────────────────
    if (!emailSent) {
      try {
        const fsRes = await fetch(`https://formsubmit.co/ajax/${recipientEmail}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({
            _subject: `🚨 New Lead: ${userName || userEmail} — ${calculatorType}`,
            _captcha: 'false',
            Name: userName || 'N/A',
            Email: userEmail,
            Phone: userPhone || 'N/A',
            Location: locationString,
            Context: calculatorType,
            Time: timestamp,
            Details: detailsText,
          }),
        });
        if (fsRes.ok) {
          console.log(`[FormSubmit ✅] Forwarded to ${recipientEmail} (requires 1-time activation in inbox)`);
        }
      } catch (e: any) {
        console.warn('[FormSubmit Error]', e.message);
      }
    }

    // Always log to terminal
    console.log(`\n${'='.repeat(60)}`);
    console.log(`🚨 LEAD → ${recipientEmail}${emailSent ? ' ✅ EMAIL SENT' : ' ⚠️ CHECK SETUP'}`);
    console.log(`👤 ${userName}  📧 ${userEmail}  📞 ${userPhone}`);
    console.log(`📍 ${locationString}  ⏰ ${timestamp}`);
    console.log(`📋 ${calculatorType}`);
    if (details) console.log(`📊`, details);
    console.log(`${'='.repeat(60)}\n`);

    return NextResponse.json({ success: true, emailSent, location: locationString });
  } catch (error: any) {
    console.error('[Lead API Error]:', error);
    return NextResponse.json({ success: true });
  }
}
