const { Parser } = require('json2csv');

function exportToCSV(res, fileName, fields, data) {
    //cria o conversor de json para csv
    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(data);
    //configura o cabeçalho da resposta para download
    res.header('Content-Type', 'text/csv');
    res.attachment(fileName); // nome do arquivo
    return res.send(csv); // envia o arquivo 
}
module.exports = exportToCSV;