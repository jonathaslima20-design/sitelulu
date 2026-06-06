-- Page views tracking table
CREATE TABLE IF NOT EXISTS page_views (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id text,
  referrer text,
  device text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anon_insert_page_views" ON page_views FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "auth_select_page_views" ON page_views FOR SELECT TO authenticated USING (true);
CREATE POLICY "auth_delete_page_views" ON page_views FOR DELETE TO authenticated USING (true);
