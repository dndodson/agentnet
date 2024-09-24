// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts"

// Fetch the Chatbase API key from environment variables
const CHATBASE_API_KEY = Deno.env.get('CHATBASE_API_KEY')

// Define CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { chatbotName, sourceText } = await req.json()

    if (!chatbotName || !sourceText) {
      return new Response(JSON.stringify({ error: 'chatbotName and sourceText are required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const response = await fetch('https://www.chatbase.co/api/v1/create-chatbot', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${CHATBASE_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        chatbotName: chatbotName,
        sourceText: sourceText
      })
    });
    
    const data = await response.json();

    if (!response.ok) {
      // let text = await response.text();
      throw new Error(`Failed to create chatbot: ${response.statusText}, ${response.status}, ${JSON.stringify(data)}`)
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
