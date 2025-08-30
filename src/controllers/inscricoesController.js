const {Inscricao, Evento} = require('../models');
class InscricaoController {
    async store(req, res) {
        try {
            const { id: evento_id} = req.params;// pegar id da url de evento
            const { nome, email, curso } = req.body;
            //validaçao
            if (!nome || !email) {
                return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
            }

            //verifica se o evento existe
            const evento = await Evento.findOne({
                where: {
                    id: evento_id,
                    status: 'active'
                }
            });
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
            return res.status(201).json({
                message: 'Inscrição realizada com sucesso!',
                inscricao: novaInscricao
            });
        } catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError') {
                return res.status(409).json({ error: 'Este email já está inscrito neste evento.'});
            }
            console.error('Erro ao criar inscrição:', error);
            return res.status(500).json({ error: 'Erro interno do servidor.' });
        }
    }
}
module.exports = new InscricaoController();