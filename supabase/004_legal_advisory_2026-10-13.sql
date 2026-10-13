-- Service 15: Legal & Business Advisory
-- new enquiry type in the contact form + optional sub-topic (shown only for that type)

alter table public.contact_requests drop constraint if exists contact_requests_service_check;
alter table public.contact_requests add constraint contact_requests_service_check check (service in (
  'management','influencer-marketing','strategia-creative','social-media',
  'video-production','photo-production','events','pr-media','web-digital',
  'ai-automation','branding-design','legal-business-advisory','inne'));

alter table public.contact_requests add column if not exists legal_topic text;
alter table public.contact_requests drop constraint if exists contact_requests_legal_topic_check;
alter table public.contact_requests add constraint contact_requests_legal_topic_check check (
  legal_topic is null or legal_topic in (
    'umowa-negocjacje','prawa-autorskie-wizerunek','kampania-reklama','ecommerce-technologia-ai',
    'spolka-inwestycja','compliance','spor-pilna-sprawa','inne'));
