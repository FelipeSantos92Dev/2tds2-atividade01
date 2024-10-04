# Cadastro de Candidatos Para Debate Político

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
