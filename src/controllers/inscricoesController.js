const {Inscricao, Evento} = require('../models');
class InscricaoController {
    async store(req, res) {
        try {
            const { evento_id, nome, email, curso } = req.body;
            //validaçao
            if (!evento_id || !nome || !email || !curso) {
                return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
            }

            //verifica se o evento existe
            const evento = await Evento.findByPk(evento_id);
            if (!evento) {
                return res.status(404).json({ error: 'Evento não encontrado.' });
            }
            // Criar a inscrição no banco de dados
            const novaInscricao = await Inscricao.create({
                evento_id,
                nome,
                email,
                curso,
            });
            //retorna a inscrição criada
            return res.status(201).json(novaInscricao);
        } catch (error) {
            if (error.name === 'SequelizeValidationError') {
                return res.status(409).json({ error: 'Este email já está inscrito neste evento.'});
            }
            console.error('Erro ao criar inscrição:', error);
            return res.status(500).json({ error: 'Erro interno do servidor.' });
        }
    }
}
module.exports = new InscricaoController();