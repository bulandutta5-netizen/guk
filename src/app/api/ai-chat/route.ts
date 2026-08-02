import { NextRequest, NextResponse } from 'next/server';

const systemContext = `You are a helpful real estate assistant for Demo Real Estate. Help users find properties, calculate EMIs, understand loan eligibility, book site visits, and answer real estate FAQs. Be concise, helpful, and professional.`;

const fallbackResponses = [
  {
    keywords: ['hello', 'hi', 'hey', 'namaste', 'good morning', 'good evening'],
    response: 'Hello! 👋 Welcome to Demo Real Estate. I am your personal property advisor. How can I assist you today? You can ask me about properties, home loans, EMI calculations, or book a site visit.',
  },
  {
    keywords: ['property', 'properties', 'home', 'house', 'apartment', 'flat', 'villa', 'find', 'buy', 'purchase'],
    response: '🏠 We have an amazing collection of properties across India! From luxury penthouses in BKC Mumbai to sprawling villas in Gurgaon and Hyderabad. Tell me your preferred city and budget and I will find the perfect match for you.',
  },
  {
    keywords: ['emi', 'loan', 'finance', 'calculator', 'monthly', 'instalment', 'interest'],
    response: '💰 Our EMI Calculator is available on the homepage! For a quick estimate: a ₹50 lakh loan at 8.5% for 20 years gives an EMI of approximately ₹43,391/month. Want me to calculate for your specific amount?',
  },
  {
    keywords: ['eligibility', 'eligible', 'qualify', 'income', 'salary'],
    response: '📋 Home loan eligibility is typically 60x your monthly salary. So if you earn ₹1,00,000/month you are eligible for a loan up to ₹60 lakhs. Our Affordability Calculator on the homepage gives a detailed breakdown.',
  },
  {
    keywords: ['book', 'visit', 'tour', 'site', 'schedule', 'appointment'],
    response: '📅 We would love to show you our properties! You can book a free site visit by clicking any property and using the "Book a Site Visit" button. Our agents are available 7 days a week, 9 AM – 7 PM.',
  },
  {
    keywords: ['price', 'cost', 'budget', 'expensive', 'cheap', 'rate', 'value'],
    response: '💎 Our properties range from ₹45 lakhs for premium apartments to ₹12 crore for luxury penthouses. We have something for every budget. What is your price range? I can suggest the best options.',
  },
  {
    keywords: ['location', 'where', 'area', 'city', 'mumbai', 'delhi', 'bangalore', 'hyderabad', 'pune', 'gurgaon', 'chennai'],
    response: '📍 Dream Homes has properties in Mumbai, Delhi NCR, Bangalore, Hyderabad, Pune, Gurgaon, and Chennai. Each city has unique offerings. Which city are you interested in?',
  },
  {
    keywords: ['rera', 'approved', 'legal', 'registered', 'safe'],
    response: '✅ All our properties are RERA approved and fully verified. We handle all legal documentation, title verification, and registration support. Your investment is completely safe with us.',
  },
  {
    keywords: ['contact', 'call', 'phone', 'agent', 'advisor', 'help'],
    response: '📞 You can reach our team at +91 98765 43210 or email info@dreamhomes.com. We are available Mon–Sat, 9 AM – 7 PM. You can also use the Contact page for a callback request.',
  },
  {
    keywords: ['thank', 'thanks', 'great', 'good', 'awesome', 'wonderful'],
    response: '😊 You are most welcome! It is our pleasure to help you find your dream home. Is there anything else I can assist you with today?',
  },
];

function getSmartFallback(message: string): string {
  const lower = message.toLowerCase();
  for (const fb of fallbackResponses) {
    if (fb.keywords.some((k) => lower.includes(k))) return fb.response;
  }
  return '🏠 Thank you for reaching out to Dream Homes! I can help you with property searches, EMI calculations, loan eligibility, and site visit bookings. Could you tell me more about what you are looking for?';
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, history } = body;

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    const isValidKey = apiKey && apiKey.length > 20 && !apiKey.includes('your_');

    // If no valid Gemini key, use smart keyword-based fallback
    if (!isValidKey) {
      return NextResponse.json({ response: getSmartFallback(message) });
    }

    // Use Gemini API
    try {
      const { GoogleGenerativeAI } = await import('@google/generative-ai');
      const genAI = new GoogleGenerativeAI(apiKey!);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

      const formattedHistory = (history || [])
        .filter((msg: any) => msg.role === 'user' || msg.role === 'assistant')
        .map((msg: any) => ({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.content }],
        }));

      const chat = model.startChat({
        history: [
          { role: 'user', parts: [{ text: `System: ${systemContext}` }] },
          { role: 'model', parts: [{ text: 'Understood. I am ready to assist as the Dream Homes Real Estate AI assistant.' }] },
          ...formattedHistory,
        ],
      });

      const result = await chat.sendMessage(message);
      const text = result.response.text();
      return NextResponse.json({ response: text });
    } catch (geminiError) {
      console.error('Gemini API error:', geminiError);
      // Fall back to smart responses if Gemini fails
      return NextResponse.json({ response: getSmartFallback(message) });
    }
  } catch (error) {
    console.error('AI Chat API error:', error);
    return NextResponse.json({
      response: '🏠 Thank you for your message! Our team will get back to you shortly. You can also reach us at +91 98765 43210.',
    });
  }
}
