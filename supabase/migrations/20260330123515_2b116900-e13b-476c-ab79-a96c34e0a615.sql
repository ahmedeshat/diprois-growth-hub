
-- Store trial signup leads
CREATE TABLE public.trial_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  selected_plan TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.trial_leads ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (public signup form)
CREATE POLICY "Anyone can submit a trial lead"
  ON public.trial_leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- No select/update/delete for public users
