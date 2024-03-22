import {createClient} from '@supabase/supabase-js';



const supabaseUrl = 'https://rgltfubanvqtyqpjjzub.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJnbHRmdWJhbnZxdHlxcGpqenViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTEwMzM2OTMsImV4cCI6MjAyNjYwOTY5M30.ASI8j9MqenZSd6XHRJwP3Oq8034mXODtkGtweH56ark'
const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

export default supabase