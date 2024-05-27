import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://eawvvluvpmystrhzcqmc.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVhd3Z2bHV2cG15c3RyaHpjcW1jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY4MTE5MzAsImV4cCI6MjAzMjM4NzkzMH0.VCNo7_yivwV9S9KyQjtCuSshIwPr7QMW3dJsgm4ciGw"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})