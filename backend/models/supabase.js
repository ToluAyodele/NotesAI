const { createClient } = require('@supabase/supabase-js');
require('dotenv').config(); // Ensure this is at the top

// Load environment variables

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL and Key are required.');
}

// Create and export the Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
