-- Storage policy: allow authenticated users to upload, public to read
CREATE POLICY "auth_upload_site_media" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'site-media');
CREATE POLICY "public_read_site_media" ON storage.objects FOR SELECT TO public USING (bucket_id = 'site-media');
CREATE POLICY "auth_delete_site_media" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'site-media');
