

import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://iqtjzpskysvetlttpgra.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlxdGp6cHNreXN2ZXRsdHRwZ3JhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ5NDY1NjUsImV4cCI6MjA1MDUyMjU2NX0.NVTHoVn7uKUl7N0pWECDwb7M2Wv2vIQa56hL8QXorKM";
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default supabase;
