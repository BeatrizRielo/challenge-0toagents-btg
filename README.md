# 🏦 Hack Bank Challenge — From Zero to Agents

Este repositório contém um desafio prático para construir uma API bancária com **FastAPI** usando **GitHub Copilot Agent Customization** como principal mecanismo de geração de código.

## 🎯 Objetivo do desafio

Construir uma aplicação bancária funcional, com backend em Python, capaz de:

- Gerenciar contas bancárias (CRUD)
- Executar transferências entre contas
- Gerar relatório de segurança
- Exibir resultados no frontend já fornecido

> Regra principal: a lógica de negócio deve ser gerada via Copilot com base nas customizações em `.github/`.

## 📁 Estrutura do projeto

```text
challenge-0toagents-btg/
├── .github/
│   ├── copilot-instructions.md
│   ├── agents/
│   │   └── security-reviewer.agent.md
│   ├── instructions/
│   ├── prompts/
│   └── skills/
│       └── SKILL.md
├── backend/
│   ├── requirements.txt
│   ├── reports/
│   ├── routes/
│   ├── services/
│   └── tests/
├── frontend/
│   ├── index.html
│   ├── css/
│   ├── js/
│   └── pages/
├── CHALLENGE.md
├── HINTS.md
└── challenge.html
```

## 🧠 Como os arquivos de Agent Customization ajudam a construir a aplicação

A pasta `.github/` é o coração do desafio. Ela define o comportamento do Copilot para gerar o backend corretamente.

### 1) `.github/copilot-instructions.md`
Define regras globais do projeto:

- padrão de código Python (tabs, tipagem, docstrings)
- padrões de API REST e status codes
- diretrizes de segurança, testes e logs

**Impacto:** aumenta a consistência das sugestões e reduz retrabalho/refatoração.

### 2) `.github/instructions/*.instructions.md`
Instruções específicas por escopo (via `applyTo`), por exemplo para `backend/**/*.py`.

**Uso recomendado:** criar um arquivo como `python-backend.instructions.md` com regras detalhadas para backend (validação, tratamento de erro, logging, segurança).

**Impacto:** garante que o Copilot adapte a geração de código ao contexto certo do projeto.

### 3) `.github/prompts/*.prompt.md`
Prompts reutilizáveis com variáveis (ex.: `{{entity_name}}`) para gerar partes repetitivas, como CRUD.

**Uso recomendado:** criar um prompt de geração de CRUD que peça:

- models
- service
- routes
- testes
- registro no `app.py`

**Impacto:** acelera a implementação mantendo padrão entre recursos.

### 4) `.github/agents/*.agent.md`
Define agentes especializados (persona + escopo + ferramentas).

- `security-reviewer.agent.md`: agente para revisão de segurança e geração de relatório
- Pode-se criar `quality-reviewer`/`quality-guardian` para testes e cobertura

**Impacto:** permite automatizar etapas de validação (segurança e qualidade) de forma repetível.

### 5) `.github/skills/SKILL.md`
Centraliza conhecimento de domínio bancário:

- regras de transferência
- validação de CPF
- requisitos LGPD

**Impacto:** orienta o Copilot a gerar código aderente às regras de negócio do desafio.

## 🛠️ Fluxo recomendado para atingir o objetivo final

1. **Corrigir as bases**
   - Completar TODOs em `copilot-instructions.md`
   - Completar TODOs em `skills/SKILL.md`
   - Criar `instructions` para `backend/**/*.py`

2. **Padronizar geração**
   - Criar prompt reutilizável de CRUD em `.github/prompts/`
   - Ajustar `security-reviewer.agent.md` com ferramentas válidas e formato de saída

3. **Gerar backend com Agent Mode**
   - Pedir geração do `app.py`, modelos, serviços, rotas e testes conforme contratos de `CHALLENGE.md`

4. **Validar entregáveis**
   - Subir backend e conferir `/docs` e `/health`
   - Testar CRUD de contas e transferências
   - Gerar relatório de segurança e validar exibição no frontend

## ✅ Critério de sucesso

Você conclui o desafio quando:

- API responde os contratos esperados
- Fluxo de contas + transferências funciona
- Relatório de segurança é gerado e exibido no frontend
- As customizações em `.github/` guiaram a construção de ponta a ponta

## 📚 Referências rápidas

- `CHALLENGE.md`: escopo, contratos e pontuação
- `HINTS.md`: dicas de desbloqueio (com penalidade no desafio)
- `frontend/pages/security-report.html`: validação visual do relatório de segurança

