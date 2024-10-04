# Cadastro de Candidatos Para Debate Político

## **Situação Problema:**

### **Contexto:**

Você foi contratado para desenvolver o sistema de cadastro de candidatos para um debate político. O sistema deverá permitir que os candidatos sejam cadastrados com informações como nome, partido, idade, concorrente ao segundo mandato e um breve resumo das suas propostas. Além disso, o sistema deverá permitir que os candidatos sejam listados, atualizados e excluídos. O foco será em garantir que o sistema tenha rotas bem definidas, utilize métodos HTTP adequados, e retorne os códigos de status HTTP corretos.

### **Requisitos do Sistema:**

O sistema deve atender aos seguintes requisitos:

1. **Cadastrar Candidatos:**
   - Os candidatos deverão ser cadastrados com as seguintes informações: nome, partido, idade, concorrente ao segundo mandato e propostas (resumo curto).
   - Validação: Nome e partido são obrigatórios. Idade mínima de 18 anos.
2. **Listar Candidatos:**
   - Deve ser possível listar todos os candidatos já cadastrados no sistema.
3. **Buscar Candidato Específico:**
   - Deve ser possível buscar um candidato específico pelo seu ID.
4. **Atualizar Candidato:**
   - O sistema deve permitir atualizar as informações de um candidato específico, exceto o ID.
   - Validação: Mesmas regras de cadastro, como idade mínima de 18 anos.
5. **Excluir Candidato:**
   - Deve ser possível excluir um candidato específico do sistema, buscando-o pelo ID.

## **Passos para Desenvolvimento:**

### **Inicialização do Projeto:**

1. **Crie um Projeto Node.js:**
   - Inicie um projeto Node.js com o comando `npm init`.
2. **Crie o arquivo** `.gitignore` **com o seguinte conteúdo:**
   ```
   node_modules
   .env
   ```
3. **Vincule o Projeto a um Repositório no GitHub:**

4. **Instale as dependências** `express`, `nodemon` **e** `dotenv` **com o comando:**
   ```
   npm install express nodemon dotenv
   ```
5. **Crie o arquivo** `.env` **com a seguinte variável de ambiente:**
   ```
   PORT=4000
   ```
6. **Crie a Estrutura de Pastas do Projeto:**
   ```
   projeto
   ├── node_modules
   ├── src
   │   ├── routes
   │   │   └── index.routes.js
   │   └── server.js
   ├── .env
   ├── .gitignore
   ├── package-lock.json
   ├── README.md
   └── package.json
   ```
7. **Atualize o arquivo** `package.json` **com o seguinte script:**
   ```json
   "type": "module",
   "scripts": {
     "dev": "nodemon src/server.js"
   }
   ```
8. **Crie o Servidor Express no arquivo** `server.js`:

   ```javascript
   import express from "express";
   import { config } from "dotenv";

   config();

   const serverPort = process.env.PORT || 3000;

   const app = express();
   app.use(express.json());

   app.listen(serverPort, () => {
     console.log(`⚡ Server started on http://localhost:${serverPort}`);
   });
   ```

9. **Faça o Teste do Servidor:**
   ```
   npm run dev
   ```

### **Desenvolvimento das Rotas:**

1. **Crie o Arquivo de Rotas** `index.routes.js` **na pasta** `routes`:

   ```javascript
   import { Router } from "express";

   const routes = Router();

   // Rota raiz para teste
   routes.get("/", (req, res) => {
     return res.status(200).json({ message: "Vai Corinthians!" });
   });

   export default routes;
   ```

2. **Atualize o Arquivo** `server.js` **para utilizar as rotas:**

   ```javascript
   import express from "express";
   import { config } from "dotenv";

   import routes from "./routes/index.routes.js";

   config();

   const serverPort = process.env.PORT || 3000;

   const app = express();
   app.use(express.json());
   app.use(routes);

   app.listen(serverPort, () => {
     console.log(`⚡ Server started on http://localhost:${serverPort}`);
   });
   ```

3. **Crie o arquivo** `candidatos.routes.js` **na pasta** `routes` **com as rotas para candidatos:**

   ```javascript
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

   // Rota para atualizar um candidato pelo id
   candidatosRoutes.put("/:id", (req, res) => {
     const { id } = req.params;
     const { nome, partido, idade, segundo, propostas } = req.body;

     // Busca um candidato pelo id no array de candidatos
     const candidato = candidatos.find((politico) => politico.id == id);

     // Verifica se o candidato foi encontrado
     if (!candidato) {
       return res
         .status(404)
         .json({ message: `Candidato com id ${id} não encontrado!` });
     }

     // Validação dos campos nome e partido
     if (!nome || !partido) {
       return res.status(400).send({
         message: "O nome ou o partido não foi preenchido, criança aleatória!",
       });
     }

     candidato.nome = nome;
     candidato.partido = partido;
     candidato.idade = idade;
     candidato.segundo = segundo;
     candidato.propostas = propostas;

     return res.status(200).json({
       message: "Candidato atualizado com sucesso!",
       candidato,
     });
   });

   candidatosRoutes.delete("/:id", (req, res) => {
     const { id } = req.params;

     // Busca um candidato pelo id no array de candidatos
     const candidato = candidatos.find((politico) => politico.id == id);

     // Verifica se o candidato foi encontrado
     if (!candidato) {
       return res
         .status(404)
         .json({ message: `Candidato com id ${id} não encontrado!` });
     }

     // Remove o candidato do array de candidatos
     candidatos = candidatos.filter((candidato) => candidato.id != id);

     return res.status(200).json({
       message: "Candidato removido com sucesso!",
       candidato,
     });
   });

   export default candidatosRoutes;
   ```

4. **Atualize o arquivo** `index.routes.js` **para utilizar as rotas de candidatos:**

   ```javascript
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
   ```
