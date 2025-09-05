const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    //Verifica se o token foi enviado
    if (!authHeader) return res.status(401).json({ message: 'Token não fornecido' });

    //Verifica se o token é válido
    const tokenparts= authHeader.split(' ');
    if (tokenparts.length !== 2) {
    return res.status(401).json({ error: 'Erro no formato do token.' });
    }
    const [scheme, token] = tokenparts;
    if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({ error: 'Token mal formatado.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ message: 'Token inválido' });
    //Se o token for válido, prossegue para a próxima middleware ou rota
    req.userId = decoded.id;
    return next();
    });
};