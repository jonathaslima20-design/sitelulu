/*
# Add section visibility and image fields

1. Changes to site_content
  - Add section visibility entries (sections_visibility key will store JSON of visible sections)
  - Add image URL entries for hero, founder, book photos

2. Create storage bucket for site assets

3. Notes
  - Section visibility stored as JSON in site_content with key 'sections_visibility'
  - Image URLs stored in site_content with keys: img_hero, img_founder, img_book
*/

-- Seed section visibility (all visible by default)
INSERT INTO site_content (key, value, section) VALUES
  ('sections_visibility', '{"hero":true,"marquee":true,"social_proof":true,"methodology":true,"founder":true,"metrics":true,"plans":true,"testimonials":true,"cta":true}', 'settings'),
  ('img_hero', '/photo_2026-06-05_17-56-07.jpg', 'images'),
  ('img_founder', 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=800', 'images'),
  ('img_book', 'https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=800', 'images')
ON CONFLICT (key) DO NOTHING;
