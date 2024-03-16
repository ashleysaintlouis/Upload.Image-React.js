const express = require('express');
const multer = require ('multer');
const {Pool} = require('pg');

const app = express();
const port = 3001;

app.listen(port,() => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

const pool = new Pool(
    {
        user: 'postgres',
        host: 'localhost',
        database: 'archive',
        password: '15021989',
        port: 5432,
    }
);

const storage = multer.memoryStorage();
const upload = multer({storage: storage});

app.post('/upload', upload.single('imagem'), async(req,res) => {
    try{
        const result = await pool.query('INSERT INTO imagens(dados) VALUES ($1) RETURNING id', 
        [req.file.buffer]);
        res.json({id:result.rows[0].id});
    }
    catch(error){ 
        console.error(error);
        res.status[500].json({error: 'ERRO ao fazer o Upload da imagem'});
    }
});

app.get('/list')

