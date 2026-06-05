/*
# Create CMS tables for Admin Panel

1. New Tables
  - `site_content` - Key-value store for all page text/content
    - `key` (text, primary key) - unique content identifier
    - `value` (text) - the content value
    - `section` (text) - which page section this belongs to
    - `updated_at` (timestamptz)
  
  - `site_theme` - Global theme settings (colors, fonts, effects)
    - `id` (uuid, primary key)
    - `colors` (jsonb) - color palette configuration
    - `fonts` (jsonb) - font family settings
    - `effects` (jsonb) - toggle for visual effects
    - `updated_at` (timestamptz)
  
  - `plans` - Consulting plans
    - `id` (uuid, primary key)
    - `name` (text)
    - `tagline` (text)
    - `price` (text)
    - `period` (text)
    - `features` (jsonb) - array of feature strings
    - `featured` (boolean)
    - `sort_order` (integer)
  
  - `testimonials` - Client testimonials
    - `id` (uuid, primary key)
    - `quote` (text)
    - `name` (text)
    - `role` (text)
    - `sort_order` (integer)
  
  - `brands` - Social proof brand names
    - `id` (uuid, primary key)
    - `name` (text)
    - `sort_order` (integer)
  
  - `metrics` - Statistics/numbers displayed on page
    - `id` (uuid, primary key)
    - `number` (text)
    - `description` (text)
    - `sort_order` (integer)
  
  - `methodology_pillars` - Methodology section cards
    - `id` (uuid, primary key)
    - `icon` (text) - Lucide icon name
    - `title` (text)
    - `description` (text)
    - `tag` (text)
    - `span` (text) - CSS grid span class
    - `sort_order` (integer)
  
  - `media_assets` - Uploaded images
    - `id` (uuid, primary key)
    - `url` (text)
    - `section` (text)
    - `label` (text)
    - `created_at` (timestamptz)

2. Security
  - RLS enabled on all tables
  - anon + authenticated can SELECT (public landing page reads)
  - Only authenticated can INSERT/UPDATE/DELETE (admin operations)
*/

-- site_content
CREATE TABLE IF NOT EXISTS site_content (
  key text PRIMARY KEY,
  value text NOT NULL DEFAULT '',
  section text NOT NULL DEFAULT '',
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_site_content" ON site_content;
CREATE POLICY "anon_select_site_content" ON site_content FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "auth_insert_site_content" ON site_content;
CREATE POLICY "auth_insert_site_content" ON site_content FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_update_site_content" ON site_content;
CREATE POLICY "auth_update_site_content" ON site_content FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_site_content" ON site_content;
CREATE POLICY "auth_delete_site_content" ON site_content FOR DELETE
  TO authenticated USING (true);

-- site_theme
CREATE TABLE IF NOT EXISTS site_theme (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  colors jsonb NOT NULL DEFAULT '{}',
  fonts jsonb NOT NULL DEFAULT '{}',
  effects jsonb NOT NULL DEFAULT '{}',
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE site_theme ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_site_theme" ON site_theme;
CREATE POLICY "anon_select_site_theme" ON site_theme FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "auth_insert_site_theme" ON site_theme;
CREATE POLICY "auth_insert_site_theme" ON site_theme FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_update_site_theme" ON site_theme;
CREATE POLICY "auth_update_site_theme" ON site_theme FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_site_theme" ON site_theme;
CREATE POLICY "auth_delete_site_theme" ON site_theme FOR DELETE
  TO authenticated USING (true);

-- plans
CREATE TABLE IF NOT EXISTS plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT '',
  tagline text NOT NULL DEFAULT '',
  price text NOT NULL DEFAULT '',
  period text NOT NULL DEFAULT '',
  features jsonb NOT NULL DEFAULT '[]',
  featured boolean NOT NULL DEFAULT false,
  sort_order integer NOT NULL DEFAULT 0
);

ALTER TABLE plans ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_plans" ON plans;
CREATE POLICY "anon_select_plans" ON plans FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "auth_insert_plans" ON plans;
CREATE POLICY "auth_insert_plans" ON plans FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_update_plans" ON plans;
CREATE POLICY "auth_update_plans" ON plans FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_plans" ON plans;
CREATE POLICY "auth_delete_plans" ON plans FOR DELETE
  TO authenticated USING (true);

-- testimonials
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  quote text NOT NULL DEFAULT '',
  name text NOT NULL DEFAULT '',
  role text NOT NULL DEFAULT '',
  sort_order integer NOT NULL DEFAULT 0
);

ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_testimonials" ON testimonials;
CREATE POLICY "anon_select_testimonials" ON testimonials FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "auth_insert_testimonials" ON testimonials;
CREATE POLICY "auth_insert_testimonials" ON testimonials FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_update_testimonials" ON testimonials;
CREATE POLICY "auth_update_testimonials" ON testimonials FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_testimonials" ON testimonials;
CREATE POLICY "auth_delete_testimonials" ON testimonials FOR DELETE
  TO authenticated USING (true);

-- brands
CREATE TABLE IF NOT EXISTS brands (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT '',
  sort_order integer NOT NULL DEFAULT 0
);

ALTER TABLE brands ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_brands" ON brands;
CREATE POLICY "anon_select_brands" ON brands FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "auth_insert_brands" ON brands;
CREATE POLICY "auth_insert_brands" ON brands FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_update_brands" ON brands;
CREATE POLICY "auth_update_brands" ON brands FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_brands" ON brands;
CREATE POLICY "auth_delete_brands" ON brands FOR DELETE
  TO authenticated USING (true);

-- metrics
CREATE TABLE IF NOT EXISTS metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  number text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  sort_order integer NOT NULL DEFAULT 0
);

ALTER TABLE metrics ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_metrics" ON metrics;
CREATE POLICY "anon_select_metrics" ON metrics FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "auth_insert_metrics" ON metrics;
CREATE POLICY "auth_insert_metrics" ON metrics FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_update_metrics" ON metrics;
CREATE POLICY "auth_update_metrics" ON metrics FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_metrics" ON metrics;
CREATE POLICY "auth_delete_metrics" ON metrics FOR DELETE
  TO authenticated USING (true);

-- methodology_pillars
CREATE TABLE IF NOT EXISTS methodology_pillars (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  icon text NOT NULL DEFAULT 'Compass',
  title text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  tag text NOT NULL DEFAULT '',
  span text NOT NULL DEFAULT '',
  sort_order integer NOT NULL DEFAULT 0
);

ALTER TABLE methodology_pillars ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_methodology_pillars" ON methodology_pillars;
CREATE POLICY "anon_select_methodology_pillars" ON methodology_pillars FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "auth_insert_methodology_pillars" ON methodology_pillars;
CREATE POLICY "auth_insert_methodology_pillars" ON methodology_pillars FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_update_methodology_pillars" ON methodology_pillars;
CREATE POLICY "auth_update_methodology_pillars" ON methodology_pillars FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_methodology_pillars" ON methodology_pillars;
CREATE POLICY "auth_delete_methodology_pillars" ON methodology_pillars FOR DELETE
  TO authenticated USING (true);

-- media_assets
CREATE TABLE IF NOT EXISTS media_assets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  url text NOT NULL DEFAULT '',
  section text NOT NULL DEFAULT '',
  label text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE media_assets ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_media_assets" ON media_assets;
CREATE POLICY "anon_select_media_assets" ON media_assets FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "auth_insert_media_assets" ON media_assets;
CREATE POLICY "auth_insert_media_assets" ON media_assets FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_update_media_assets" ON media_assets;
CREATE POLICY "auth_update_media_assets" ON media_assets FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_media_assets" ON media_assets;
CREATE POLICY "auth_delete_media_assets" ON media_assets FOR DELETE
  TO authenticated USING (true);
