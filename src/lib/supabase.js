import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://aygzqagvyqahuoglmibq.supabase.co'
// The Supabase recommendation is to use row-level security with user authentication
// This generic key is safe to expose in a browser as long as we have properly configured RLS
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF5Z3pxYWd2eXFhaHVvZ2xtaWJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY4Mjg0NDEsImV4cCI6MjA0MjQwNDQ0MX0.Cbrx-NvUSmgM-s-ptw6j808abPDVxHWZ6iFCPyMZdRs'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
