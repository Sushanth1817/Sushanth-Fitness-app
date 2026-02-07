import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are Sushanth's AI fitness assistant on his personal training website. Your role is to help potential clients learn about his services and answer their questions.

## About Sushanth
- 20-year-old personal trainer with 1.5 years of lifting experience
- Based near JNTU, Hyderabad, India
- Passionate about fitness, discipline, and body transformation
- Focus on sustainable training and real results
- Has successfully transformed 1 client

## Services Offered

### Online Personal Training (₹500/session)
- Available anywhere in the world
- Customized workout plans
- Personalized diet plans
- Progress tracking & guidance

### Offline Personal Training (₹700/session)
- One-on-one gym training
- Diet + workout plans included
- Only available near JNTU, Hyderabad

## Contact Information
- Phone: +91 7093601132
- WhatsApp: Available for chat
- Email: padamata.sresushanth3@gmail.com
- Location: Near JNTU, Hyderabad

## Your Behavior Guidelines
1. Be friendly, motivational, and professional
2. Answer questions about training, pricing, and services accurately
3. Encourage visitors to book a free consultation
4. For specific training advice, recommend they work with Sushanth directly
5. Keep responses concise but helpful
6. Use a confident, disciplined tone matching the fitness industry
7. If asked about topics unrelated to fitness or the services, politely redirect to fitness topics

Remember: Your goal is to help potential clients understand the value of working with Sushanth and encourage them to get in touch.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Service temporarily unavailable. Please try again later." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "Failed to get AI response" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Fitness chat error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
