const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {

    let filePath = '.' + req.url;
    if (req.url === '/') filePath = './index.html';

    const ext = path.extname(filePath);

    const mimeTypes = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'application/javascript'
    };

    if (req.url === '/dados') {
        const dados = {
            cpu: (Math.random() * 100).toFixed(1),
            ram: (Math.random() * 16).toFixed(1),
            temp: (30 + Math.random() * 60).toFixed(1)
        };

        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify(dados));
    }

    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(404);
            return res.end('Arquivo não encontrado');
        }

        res.writeHead(200, {
            'Content-Type': mimeTypes[ext] || 'text/plain'
        });

        res.end(content);
    });
});

server.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});