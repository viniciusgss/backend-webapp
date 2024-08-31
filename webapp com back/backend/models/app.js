const express = require("express");
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');  // Importa o middleware cors
// Rotas aqui dps amooooooo
const tarefaRoute = require('./routes/tarefa');

dotenv.config();

const app = express();

//app.use(cors());  // Ativa o CORS para todas as rotas

// Caso fosse limitar o acesso do CORS
const corsOptions = {
     origin: 'http://127.0.0.1:3001',
     optionsSuccessStatus: 200
 };
 app.use(cors(corsOptions));

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI);

// Rotas
app.use('/api/tarefa', tarefaRoute);
//app.use('/api/carros', carrosRoute);
//app.use('/api/alunos', alunosRoute);

// Porta
const port = process.env.PORT || 3000;

// Iniciar servidor
//app.listen(port, () => console.log(`Server running on port ${port}`));
app
    .listen(port, "localhost", function () {
        console.log(`Server is running on port ${port}.`);
    })
    .on("error", (err) => {
        if (err.code === "EADDRINUSE") {
            console.log("Error: address already in use");
        } else {
            console.log(err);
        }
    });