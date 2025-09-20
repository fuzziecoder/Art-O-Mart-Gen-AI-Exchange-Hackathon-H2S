-- Add missing address-related columns to user_profiles table
ALTER TABLE public.user_profiles 
ADD COLUMN IF NOT EXISTS address TEXT,
ADD COLUMN IF NOT EXISTS city TEXT,
ADD COLUMN IF NOT EXISTS state TEXT,
ADD COLUMN IF NOT EXISTS country TEXT DEFAULT 'India',
ADD COLUMN IF NOT EXISTS preferences JSONB DEFAULT '{"newsletter": true, "notifications": true, "marketing": false}';

-- Create index for better performance on location searches
CREATE INDEX IF NOT EXISTS idx_user_profiles_city ON public.user_profiles(city);
CREATE INDEX IF NOT EXISTS idx_user_profiles_state ON public.user_profiles(state);

-- Update existing records to have default preferences if they don't exist
UPDATE public.user_profiles 
SET preferences = '{"newsletter": true, "notifications": true, "marketing": false}'::jsonb
WHERE preferences IS NULL;
