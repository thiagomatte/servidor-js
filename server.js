const express = require('express');
const path = require('path');
const serveIndex = require('serve-index');
const fs = require('fs');

const app = express();
const port = 8080;
const pastaPublica = path.join(__dirname, 'public');

app.use(express.static(pastaPublica));

app.use('/files', serveIndex(pastaPublica, { 'icons': true }));

app.get('/files/*', (req, res) => {
    const filePath = path.join(pastaPublica, decodeURIComponent(req.path.replace('/files', '')));
    fs.stat(filePath, (err, stats) => {
        if (err || !stats.isFile()) {
            res.status(404).send('Arquivo não encontrado');
            return;
        }
        res.download(filePath);
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
    console.log(`Acesse os arquivos em http://localhost:${port}/files`);
});