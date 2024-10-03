import { Router } from "express";

const candidatosRoutes = Router();

let candidatos = [
  {
    id: Math.floor(Math.random() * 1000000),
    nome: "Capitã Lucimara Fake",
    partido: "PSD",
    idade: 42,
    segundo: true, // Concorrente ao segundo mandato
    propostas: [
      "Aumento do salário mínimo",
      "Redução de impostos",
      "Mais investimentos em educação",
    ],
  },
];

candidatosRoutes.get("/", (req, res) => {
  return res.status(200).json(candidatos);
});

candidatosRoutes.post("/", (req, res) => {
  const { nome, partido, idade, segundo, propostas } = req.body;

  // Validação dos campos nome e partido
  if (!nome || !partido) {
    return res.status(400).send({
      message: "O nome ou o partido não foi preenchido, criança aleatória!",
    });
  }

  // Validação de idade
  if (idade < 18) {
    return res.status(400).send({
      message:
        "O candidato não possui idade suficiente para participar deste debate!",
    });
  }

  const novoCandidato = {
    id: Math.floor(Math.random() * 1000000),
    nome,
    partido,
    idade,
    segundo,
    propostas,
  };

  candidatos.push(novoCandidato);

  return res.status(201).json({
    message: "Candidato cadastrado com sucesso!",
    novoCandidato,
  });
});

candidatosRoutes.get("/:id", (req, res) => {
  const { id } = req.params;

  const candidato = candidatos.find((politico) => politico.id == id);

  if (!candidato) {
    return res.status(404).json({ message: "Candidato não encontrado!" });
  }

  return res.status(200).json(candidato);
});

candidatosRoutes.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  const candidato = candidatos.find((candidato) => candidato.id === Number(id));

  if (!candidato) {
    return res.status(404).json({ message: "candidato not found!" });
  }

  if (!name || !email) {
    return res.status(400).json({ message: "Name and email are required!" });
  }

  candidato.name = name;
  candidato.email = email;

  return res.status(200).json(candidato);
});

candidatosRoutes.delete("/:id", (req, res) => {
  const { id } = req.params;

  const candidato = candidatos.find((candidato) => candidato.id === Number(id));

  if (!candidato) {
    return res.status(404).json({ message: "candidato not found!" });
  }

  candidatos = candidatos.filter((candidato) => candidato.id !== Number(id));

  return res.status(200).json({ message: "candidato deleted successfully!" });
});

export default candidatosRoutes;
