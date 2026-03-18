-- SQL Schema for Web Star Studio AI Portfolio Scanner

-- Table to store scraped constraints and AI analysis
CREATE TABLE public.portfolio_projects (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    url TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    description TEXT,
    segment TEXT,
    country TEXT,
    technologies TEXT[],
    color_palette TEXT[],
    challenge TEXT,
    solution TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.portfolio_projects ENABLE ROW LEVEL SECURITY;

-- Allow read access for everyone (for public portfolio display)
CREATE POLICY "Allow public read access" ON public.portfolio_projects
    FOR SELECT USING (true);

-- Allow insert/update only for authenticated admin users
CREATE POLICY "Allow admin insert" ON public.portfolio_projects
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow admin update" ON public.portfolio_projects
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow admin delete" ON public.portfolio_projects
    FOR DELETE USING (auth.role() = 'authenticated');
