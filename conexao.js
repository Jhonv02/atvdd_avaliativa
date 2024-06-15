import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qhjjnpvtvmlqdhfgukzm.supabase.co'; 
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFoampucHZ0dm1scWRoZmd1a3ptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg0MDA4MzMsImV4cCI6MjAzMzk3NjgzM30.AxiApHRy1jBx66O6RdrBLyD9UG0cmPc4Qg7YbTrj5_U'; 

export const supabase = createClient(supabaseUrl, supabaseKey);
