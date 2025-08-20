// supabase.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// 🔑 Your Supabase credentials
const SUPABASE_URL = 'https://fpytvfhynleaivkvuedt.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZweXR2Zmh5bmxlYWl2a3Z1ZWR0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU2NzU1OTAsImV4cCI6MjA3MTI1MTU5MH0.Q7UHLIA_3_o7zCdV-IOthWOYGVVlINDXjp1uF4sdBRk'

// ✅ Create Supabase client
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
