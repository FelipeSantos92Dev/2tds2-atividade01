import { Router } from "express";

import candidatosRoutes from "./candidatos.routes.js";

const routes = Router();

routes.get("/", (req, res) => {
  return res.status(200).json({ message: "Vai Corinthians!" });
});

routes.use("/candidatos", candidatosRoutes);

export default routes;
