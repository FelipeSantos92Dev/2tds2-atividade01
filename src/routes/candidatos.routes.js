import { Router } from "express";

const candidatosRoutes = Router();

// Array com candidatos pré-cadastrados
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
  {
    id: Math.floor(Math.random() * 1000000),
    nome: "Doutor Zé da Silva",
    partido: "PT",
    idade: 55,
    segundo: false,
    propostas: [
      "Mais investimentos em saúde",
      "Redução da jornada de trabalho",
      "Reforma agrária",
    ],
  },
  {
    id: Math.floor(Math.random() * 1000000),
    nome: "Maria das Dores",
    partido: "PSDB",
    idade: 38,
    segundo: true,
    propostas: [
      "Mais investimentos em segurança",
      "Redução da maioridade penal",
      "Reforma tributária",
    ],
  },
  {
    id: Math.floor(Math.random() * 1000000),
    nome: "João do Povo",
    partido: "MDB",
    idade: 47,
    segundo: false,
    propostas: [
      "Mais investimentos em infraestrutura",
      "Redução da desigualdade social",
      "Reforma política",
    ],
  },
  {
    id: Math.floor(Math.random() * 1000000),
    nome: "Dona Maria",
    partido: "PSOL",
    idade: 63,
    segundo: true,
    propostas: [
      "Mais investimentos em cultura",
      "Redução do desmatamento",
      "Reforma urbana",
    ],
  },
];

// Rota para listar todos os candidatos
candidatosRoutes.get("/", (req, res) => {
  return res.status(200).json(candidatos);
});

// Rota para cadastrar um novo candidato
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

  // Criação de um novo candidato
  const novoCandidato = {
    id: Math.floor(Math.random() * 1000000),
    nome,
    partido,
    idade,
    segundo,
    propostas,
  };

  // Adiciona o novo candidato ao array de candidatos
  candidatos.push(novoCandidato);

  return res.status(201).json({
    message: "Candidato cadastrado com sucesso!",
    novoCandidato,
  });
});

// Rota para buscar um candidato pelo id
candidatosRoutes.get("/:id", (req, res) => {
  const { id } = req.params;

  // Busca um candidato pelo id no array de candidatos
  const candidato = candidatos.find((politico) => politico.id == id);

  // Verifica se o candidato foi encontrado
  if (!candidato) {
    return res
      .status(404)
      .json({ message: `Candidato com id ${id} não encontrado!` });
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
