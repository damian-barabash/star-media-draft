-- 2026-10-16 · talent photos: stills from their own videos (public/photos/talent-*.webp).
-- Przebudzenie Joanny and Majeczka stay without a photo until the client sends one.
update talents set image_url = v.url
from (values
  ('katarzyna-zdanowicz', '/photos/talent-zdanowicz.webp'),
  ('aria-martelle', '/photos/talent-aria.webp'),
  ('rozmowy-na-plotnie', '/photos/talent-rozmowy.webp'),
  ('pan-lektor', '/photos/talent-pan-lektor.webp')
) as v(slug, url)
where talents.slug = v.slug;
