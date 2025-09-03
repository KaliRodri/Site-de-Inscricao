const {Inscricao, Evento} = require('../models');
const exportToCSV = require('../utils/exportCSV');
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
                    status: 'ativo'
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
    async index(req, res) {
        try {
            const { id: evento_id } = req.params; // pegar id da url de evento
            //buscar todos os inscritos no evento id fornecido
            const inscricoes = await Inscricao.findAll({
                where: { evento_id },
                attributes: ['id', 'nome', 'email', 'curso', 'status', 'createdAt']
            });
        return res.status(200).json(inscricoes);
        } catch (error) {
            console.error('Erro ao buscar inscrições:', error);
            return res.status(500).json({ error: 'Erro interno do servidor.' });
        }
    }
    async exportCsv(req, res) {
        try {
            const { id: evento_id } = req.params; // pegar id da url de evento
            const inscricoes = await Inscricao.findAll({
                where: { evento_id },
                attributes: ['id', 'nome', 'email', 'curso', 'status', 'createdAt'],
                raw: true
            });
            if (inscricoes.length === 0) {
                return res.status(404).json({ error: 'Nenhuma inscrição encontrada para este evento.' });
            }
            //define as colunas do csv
            const fields = ['id', 'nome', 'email', 'curso', 'status', 'createdAt'];
            const fileName = `inscricoes_evento_${evento_id}.csv`;
            return exportToCSV(res, fileName, fields, inscricoes);
        } catch (error) {
            console.error('Erro ao exportar inscrições para CSV:', error);
            return res.status(500).json({ error: 'Erro interno do servidor.' });
        }
    }
}

module.exports = new InscricaoController();