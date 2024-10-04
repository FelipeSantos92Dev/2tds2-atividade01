import { Router } from "express";

// Lista de importação das rotas do projeto
import candidatosRoutes from "./candidatos.routes.js";

const routes = Router();

// Rota raiz para teste
routes.get("/", (req, res) => {
  return res.status(200).json({ message: "Vai Corinthians!" });
});

// Lista de uso das rotas do projeto
routes.use("/candidatos", candidatosRoutes);

export default routes;
