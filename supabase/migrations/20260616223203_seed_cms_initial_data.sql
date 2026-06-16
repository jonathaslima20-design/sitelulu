-- Seed site_content
INSERT INTO site_content (key, value) VALUES
('hero_badge', 'BRANDING | COMUNICAÇÃO & MARKETING'),
('hero_title_1', 'Transforme sua marca'),
('hero_title_2', 'em uma autoridade'),
('hero_title_3', 'inquestionável.'),
('hero_paragraph', 'Consultoria estratégica que arquiteta posicionamento, narrativa e presença digital para marcas que recusam o lugar comum. Aceleramos a transição de fornecedor para referência.'),
('hero_cta_primary', 'Agendar Consultoria Estratégica'),
('hero_cta_secondary', 'Ver metodologia'),
('hero_social_rating', '4.9 / 5.0'),
('hero_social_text', 'Confiança de 200+ marcas em ascensão'),
('hero_founder_name', 'Luana Lima'),
('hero_founder_role', 'CEO · Estrategista de Marca'),
('header_brand_name', 'Luana Azevedo'),
('header_brand_suffix', 'Marketing'),
('header_cta', 'Agendar Consultoria'),
('marquee_items', 'POSICIONAMENTO,NARRATIVA,AUTORIDADE,PRESENÇA,DIFERENCIAÇÃO,EXPANSÃO'),
('social_proof_label', 'CLIENTES SELECIONADOS'),
('social_proof_title', 'Marcas que escolheram <span class="text-ink font-medium">deixar de competir por preço</span> e começaram a competir por autoridade.'),
('methodology_label', 'METODOLOGIA · 04 PILARES'),
('methodology_title', 'Um sistema operacional<br />para marcas que pretendem liderar.'),
('methodology_paragraph', 'Não vendemos campanhas avulsas. Construímos a infraestrutura estratégica que faz a sua marca ser percebida como a única escolha óbvia no seu segmento.'),
('founder_label', 'FUNDADORA · CEO'),
('founder_name', 'Luana Lima.'),
('founder_subtitle', 'Arquiteta de marcas que dominam.'),
('founder_bio_1', 'Há mais de uma década, Luana lidera estratégias de posicionamento que transformam empresas medianas em referências de mercado. Sua abordagem combina análise comportamental, arquitetura de narrativa e execução de presença digital com um padrão de exigência raro.'),
('founder_bio_2', 'À frente da Baratinhas Marketing, criou uma metodologia proprietária que já conduziu mais de 200 marcas — de pequenos negócios autorais a operações corporativas — para um patamar onde concorrer por preço deixa de ser necessário.'),
('founder_quote', 'Posicionamento não é o que você diz sobre a sua marca. É o que o mercado decide quando você não está na sala.'),
('founder_quote_author', '— LUANA LIMA'),
('founder_stats', '[{"number":"12+","label":"Anos de mercado"},{"number":"200+","label":"Marcas posicionadas"},{"number":"38","label":"Setores atendidos"}]'),
('metrics_label', 'RESULTADOS · MÉDIA DE 12 MESES'),
('metrics_title', 'Números que medem a transição de fornecedor a referência.'),
('plans_label', 'PLANOS DE CONSULTORIA'),
('plans_title', 'Três níveis de entrega.'),
('plans_subtitle', 'Um único padrão.'),
('testimonials_label', 'DEPOIMENTOS'),
('testimonials_title', 'A diferença é mensurável.'),
('testimonials_subtitle', 'A percepção, ainda mais.'),
('cta_label', 'PRÓXIMO PASSO'),
('cta_title', 'Reserve uma conversa estratégica.'),
('cta_paragraph', 'Avaliamos previamente cada solicitação. Apenas projetos com fit estratégico avançam para consultoria. Resposta em até 24 horas úteis.'),
('cta_button', 'Solicitar Avaliação'),
('cta_email', 'contato@baratinhas.com'),
('footer_brand', 'Baratinhas'),
('footer_suffix', 'Marketing'),
('footer_copyright', '© 2026 · POSICIONAMENTO ESTRATÉGICO'),
('footer_location', 'São Paulo · Brasil'),
('footer_instagram', ''),
('footer_whatsapp', ''),
('footer_linkedin', ''),
('sections_visibility', '{"hero":true,"marquee":true,"social_proof":true,"methodology":true,"founder":true,"metrics":true,"plans":true,"testimonials":true,"cta":true}'),
('img_hero', '/photo_2026-06-05_17-56-07.jpg'),
('img_founder', 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=800'),
('img_book', 'https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=800')
ON CONFLICT (key) DO NOTHING;

-- Seed plans
INSERT INTO plans (name, tagline, price, period, features, featured, sort_order) VALUES
('Individual', 'Para o profissional autoral.', 'A partir de R$ 4.800', '/ ciclo', '["Diagnóstico de marca pessoal","Posicionamento e arquitetura de narrativa","8 sessões 1:1 com Luana","Plano de presença digital de 90 dias"]', false, 1),
('Grupo', 'Imersão estratégica em pequena escala.', 'R$ 12.500', '/ ciclo', '["Mentoria em grupo seleto (até 12)","Frameworks proprietários completos","Workshops práticos quinzenais","Comunidade privada de fundadores","Auditoria individual de marca"]', true, 2),
('Corporate', 'Reestruturação para operações estabelecidas.', 'Sob consulta', '', '["Imersão executiva on-site","Reposicionamento corporativo completo","Squad dedicado por 6 a 12 meses","Governança de marca e brand book","Acompanhamento pós-implementação"]', false, 3);

-- Seed testimonials
INSERT INTO testimonials (quote, name, role, sort_order) VALUES
('Saímos do leilão de preço. Em 9 meses, nossa marca passou a ser a referência citada espontaneamente em fóruns do setor.', 'Marina Albuquerque', 'Fundadora · Atelier Norhd', 1),
('A Luana não vende marketing — ela vende clareza. Reescrevemos toda a narrativa da empresa em 6 sessões.', 'Rafael Mendoza', 'CEO · Vantage Group', 2),
('O processo é cirúrgico. Pela primeira vez, nosso posicionamento é defensável.', 'Helena Cardoso', 'CMO · Meridian', 3);

-- Seed brands
INSERT INTO brands (name, sort_order) VALUES
('LUMEN', 1), ('NORDH', 2), ('ATELIER', 3), ('KAIROS', 4),
('MERIDIAN', 5), ('OBSCURA', 6), ('VANTAGE', 7), ('ARGENT', 8);

-- Seed metrics
INSERT INTO metrics (number, description, sort_order) VALUES
('+ 312%', 'Crescimento médio em demanda inbound qualificada', 1),
('9.4×', 'Multiplicador de ticket médio pós reposicionamento', 2),
('68%', 'Redução de dependência de mídia paga', 3);

-- Seed methodology_pillars
INSERT INTO methodology_pillars (icon, title, description, tag, span, sort_order) VALUES
('Compass', 'Diagnóstico de Marca', 'Auditoria 360° de percepção, narrativa e arquitetura. Mapeamos o que sua marca diz versus o que o mercado entende.', '01', 'lg:col-span-2 lg:row-span-2', 1),
('Crosshair', 'Diferenciação de Mercado', 'Engenharia de posicionamento. Crafting de uma promessa única, defensável e ressonante.', '02', '', 2),
('Sparkles', 'Presença Digital Elite', 'Identidade verbal e visual em todos os pontos de contato. Cada touchpoint comunica nível.', '03', '', 3),
('Globe2', 'Expansão de Autoridade', 'Campanhas, mídia e conteúdo orquestrados para transformar reconhecimento em demanda qualificada e recorrente.', '04', 'lg:col-span-2', 4);
