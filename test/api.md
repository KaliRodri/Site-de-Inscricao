# Documentação da API - Módulo de Inscrições
Esta documentação descreve os endpoints disponíveis para gerenciar as inscrições em eventos.
## Autenticação
As rotas marcadas como protegidas requerem um Token de Autenticação JWT. O token deve ser enviado no cabeçalho (header) da requisição da seguinte forma:

`Authorization: Bearer <seu_token_jwt>`

## EndPoints
Método	Rota	Descrição	Auth?	Corpo (Body)	Resposta Sucesso (201)
POST    /eventos/:id/inscricoes	Cria uma nova inscrição.	Não	{ "nome", "email", "curso" }	{ "message", "inscricao": {...} }
GET	    /eventos/:id/inscricoes	Lista os inscritos do evento.	Sim	N/A	[ { "id", "nome", "email", ... } ]
GET	    /eventos/:id/inscricoes/export	Exporta inscritos para CSV.	Sim	N/A	Arquivo .csv para download.