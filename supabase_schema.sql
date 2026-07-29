-- Create the phones table
CREATE TABLE IF NOT EXISTS public.phones (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    brand TEXT NOT NULL,
    image TEXT NOT NULL,
    processor TEXT NOT NULL,
    display TEXT NOT NULL,
    ram TEXT NOT NULL,
    storage TEXT NOT NULL,
    battery TEXT NOT NULL,
    camera TEXT NOT NULL,
    cashify_price INTEGER NOT NULL,
    original_price INTEGER NOT NULL,
    condition TEXT NOT NULL,
    cashify_assurance BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- We create a unique constraint so we can "UPSERT" (update if exists, insert if new)
    -- based on the phone name, condition, and storage.
    UNIQUE(name, condition, storage)
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.phones ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows ANYONE to read the phones (for your Next.js app)
CREATE POLICY "Allow public read access" 
ON public.phones FOR SELECT 
USING (true);

-- Create a policy that allows only authenticated Service Roles (our scraper) to insert/update
CREATE POLICY "Allow service role write access" 
ON public.phones FOR ALL 
USING (auth.jwt() ->> 'role' = 'service_role');
