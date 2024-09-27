// src/lib/chatbot.js
import { supabase } from './supabase'

export const createChatbotBackground = async (agent, chatbotName, urlToCrawl, sourceText) => {
  try {
    const { data, error: fnError } = await supabase.functions.invoke('createChatbot', {
      body: { 
        chatbotName, 
        urlToScrape: urlToCrawl || undefined,
        sourceText: sourceText || undefined
      },
    })

    if (fnError) throw fnError

    const newStatus = data.success ? 'OK' : 'FAILED'
    const { data: updatedAgent, error: updateError } = await supabase
      .from('agents')
      .update({ 
        status: newStatus,
        chatbot_id: data.chatbotId
      })
      .eq('id', agent.id)
      .select()
      .single()

    if (updateError) throw updateError

    return updatedAgent
  } catch (error) {
    console.error('Error in background process:', error)
    const { data: failedAgent, error: failUpdateError } = await supabase
      .from('agents')
      .update({ status: 'FAILED' })
      .eq('id', agent.id)
      .select()
      .single()

    if (!failUpdateError) {
      return failedAgent
    }
    throw error
  }
}