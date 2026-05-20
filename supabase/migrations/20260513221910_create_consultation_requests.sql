/*
  # Create consultation requests table

  1. New Tables
    - `consultation_requests`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text)
      - `company` (text)
      - `plan` (text) - which consulting plan they're interested in
      - `message` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS
    - Allow anyone (anon and authenticated) to INSERT consultation requests (lead form)
    - No SELECT/UPDATE/DELETE policies for public - admins access via service role
*/

CREATE TABLE IF NOT EXISTS consultation_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT '',
  email text NOT NULL DEFAULT '',
  company text NOT NULL DEFAULT '',
  plan text NOT NULL DEFAULT '',
  message text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE consultation_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a consultation request"
  ON consultation_requests
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
