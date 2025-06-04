import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import routes from "./routes/rotas";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json()); // Adicione isso para parsear JSON

const PORT = process.env.PORT || 3001; // Valor padrão

app.use("/", routes); // Prefixo /api para todas as rotas

app.listen(PORT, function () {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});