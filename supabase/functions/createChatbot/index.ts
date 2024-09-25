// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { DOMParser } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts"

// Fetch the Chatbase API key from environment variables
const CHATBASE_API_KEY = Deno.env.get('CHATBASE_API_KEY')

// Define CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

async function crawlUrl(initialUrl: string, maxDepth: number = 5): Promise<string[]> {
  const baseUrl = new URL(initialUrl);
  const uniqueUrls = new Set<string>();
  const urlsToVisit: [string, number][] = [[initialUrl, 0]];

  while (urlsToVisit.length > 0) {
    const [url, depth] = urlsToVisit.pop()!;
    if (depth > maxDepth) continue;

    if (uniqueUrls.has(url)) continue;
    uniqueUrls.add(url);

    try {
      const response = await fetch(url);
      const html = await response.text();
      const doc = new DOMParser().parseFromString(html, "text/html");
      if (!doc) continue;

      const links = doc.querySelectorAll("a");
      links.forEach((link) => {
        const href = link.getAttribute("href");
        if (href) {
          try {
            const fullUrl = new URL(href, url);
            if (fullUrl.hostname === baseUrl.hostname && !uniqueUrls.has(fullUrl.href)) {
              urlsToVisit.push([fullUrl.href, depth + 1]);
            }
          } catch (error) {
            console.error(`Error processing URL ${href}:`, error);
          }
        }
      });
    } catch (error) {
      console.error(`Error fetching ${url}:`, error);
    }
  }

  return Array.from(uniqueUrls);
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { chatbotName, sourceText, urlToScrape } = await req.json()

    if (!(chatbotName && (sourceText || urlToScrape))) {
      return new Response(JSON.stringify({ error: 'chatbotName and either sourceText or urlToScrape are required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    let allUrls: string[] = [];
    if (urlToScrape) {
      allUrls = await crawlUrl(urlToScrape);
    }

    const response = await fetch('https://www.chatbase.co/api/v1/create-chatbot', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${CHATBASE_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        chatbotName: chatbotName,
        sourceText: sourceText,
        urlsToScrape: allUrls.length > 0 ? allUrls : undefined
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return new Response(JSON.stringify({ error: `Failed to create chatbot: ${response.statusText}`, details: data }), {
        status: response.status,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error in createChatbot function:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Run `supabase functions serve`
  3. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/createChatbot' \
    --header 'Authorization: Bearer ' \
    --header 'Content-Type: application/json' \
    --data '{"chatbotName":"testBot","sourceText":"Source text......"}'

*/
