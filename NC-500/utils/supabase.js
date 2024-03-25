import {createClient} from '@supabase/supabase-js';
import {AsyncStorage} from '@react-native-async-storage/async-storage';



const supabaseUrl = 'https://rgltfubanvqtyqpjjzub.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJnbHRmdWJhbnZxdHlxcGpqenViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTEwMzM2OTMsImV4cCI6MjAyNjYwOTY5M30.ASI8j9MqenZSd6XHRJwP3Oq8034mXODtkGtweH56ark'
const supabase = createClient(supabaseUrl, supabaseKey, {

  auth: {
    storage: AsyncStorage,
  },
  
  }
);

export default supabase