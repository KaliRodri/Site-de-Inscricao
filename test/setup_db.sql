-- Limpa as tabelas para começar do zero
DELETE FROM inscricoes;
DELETE FROM eventos;
-- TRUNCATE TABLE caso quira apagar todos os dados e resetar IDs
-- Cria um evento ATIVO para testes de sucesso
INSERT INTO eventos (titulo, descricao, link_slug, closing_date, status, createdAt, updatedAt) 
VALUES ('Workshop de Docker', 'Aprendendo a usar containers.', 'workshop-docker', '2025-12-01', 'ativo', NOW(), NOW());
-- Cria um evento INATIVO para testes de falha
INSERT INTO eventos (titulo, descricao, link_slug, closing_date, status, createdAt, updatedAt) 
VALUES ('Evento de Planejamento', 'Evento interno.', 'planejamento-2026', '2026-01-15', 'rascunho', NOW(), NOW());
-- Insere uma inscrição de teste no evento 1
INSERT INTO inscricoes (evento_id, nome, email, curso, status, createdAt, updatedAt) 
VALUES (1, 'Joana Darc', 'joana.darc@email.com', 'História', 'pendente', NOW(), NOW());
-- Consulta para verificar os eventos
SELECT * FROM eventos;
-- Consulta para verificar as inscrições
SELECT * FROM inscricoes;