# 🏦 Challenge: From Zero to Agents

## Objetivo

Construir uma **API bancária funcional** em Python (FastAPI) configurando arquivos
de **Agent Customization** do GitHub Copilot. O Copilot gera o código — você configura
as regras.

**Ao final, a aplicação deve:**
- Servir o CRUD de contas bancárias
- Executar transferências entre contas
- Exibir um relatório de segurança no frontend

---

## Restrições

| Regra | Detalhe |
|-------|---------|
| ⏱️ Tempo | **1 hora e 30 minutos** |
| 👥 Time | Até **5 pessoas** |
| 🤖 Ferramenta | **Apenas GitHub Copilot** (Chat, Agent mode, prompts) |
| 🚫 Código manual | Proibido escrever lógica de negócio manualmente |
| ✅ Edição manual | Permitido apenas em arquivos `.github/` (customization) |
| 📦 Frontend | Já está pronto — **não altere** |

---

## Entregáveis

Ao final do desafio, o avaliador verifica:

```bash
# 1. Backend rodando

# 2. Health check

# 3. CRUD de contas (criar + listar)

# 4. Transferência

# 5. Relatório de segurança

# 6. Frontend exibindo relatório
```

---

## Contratos de API

O frontend já está implementado e espera **exatamente** estes contratos JSON.
Se os contratos não forem seguidos, o frontend não funciona.

### `GET /health`
```

### `POST /api/accounts` — Criar conta
```
### `GET /api/accounts` — Listar contas

### `GET /api/accounts/{account_id}` — Buscar conta

### `PUT /api/accounts/{account_id}` — Atualizar conta

### `DELETE /api/accounts/{account_id}` — Excluir conta

### `POST /api/transfers` — Transferir
**Erros (400):** saldo insuficiente, conta inexistente, mesma conta

### `GET /api/transfers` — Listar transferências
**Response (200):** Array de Transfer

### `POST /api/reports/security` — Gerar relatório
### `GET /api/reports/security` — Ler último relatório

### `POST /api/reports/quality` — Gerar relatório de qualidade *(Bônus)*

### `GET /api/reports/quality` — Ler último relatório de qualidade *(Bônus)*

## O que vocês recebem

```
challenge-0toagents-btg/
├── .github/
│   ├── copilot-instructions.md            ← CORRIGIR (3 TODOs)
│   ├── agents/
│   │   └── security-reviewer.agent.md     ← CORRIGIR (tools erradas + TODOs)
│   ├── prompts/                           ← VAZIO — criar prompt aqui
│   ├── instructions/                      ← VAZIO — criar instructions aqui
│   └── skills/
│       └── SKILL.md                       ← CORRIGIR (3 TODOs)
├── backend/
│   ├── requirements.txt                   ✅ pronto
│   ├── routes/__init__.py                 ✅ pronto (vazio)
│   ├── services/__init__.py               ✅ pronto (vazio)
│   └── tests/__init__.py                  ✅ pronto (vazio)
├── frontend/                              ✅ PRONTO — não alterar
└── CHALLENGE.md                           📋 este arquivo
```

---

## Fases do Desafio

### Fase 1 — Fundação (30 min)

**Objetivo:** Configurar as regras do projeto para que o Copilot gere código correto.

**Validação:** Abra um `.py` em `backend/` → Copilot sugere com tabs, type hints, logging.

**Depois:** Use Agent mode para gerar `models.py` e `database.py` seguindo os contratos acima.

---

### Fase 2 — Geração (30 min)

**Objetivo:** Criar um prompt reutilizável e gerar o backend funcional.

**Validação:**
```bash
cd backend && pip install -r requirements.txt && uvicorn app:app --port 8000
# http://localhost:8000/docs → Swagger com todas as rotas
# http://localhost:8000/health → {"status": "healthy"}
# CRUD de contas + transferências funcionando
```

---

### Fase 3 — Segurança (30 min)

**Objetivo:** Usar o agent de segurança para gerar relatório visível no frontend.

**Validação:**
```bash
# Relatório de segurança
curl -X POST http://localhost:8000/api/reports/security
# JSON com score, findings, severidades

# Frontend
cd frontend && python -m http.server 3000
# http://localhost:3000 → Dashboard com contas e transferências
# http://localhost:3000/pages/security-report.html → Relatório visual
```
---

### ⭐ Bônus — Qualidade Total (+20 pts extras)

**Objetivo:** Criar o agent de qualidade, gerar relatório com cobertura ≥ 80% e exibir no frontend.

**Validação:**
```bash
# Testes passando com cobertura
cd backend && pytest --cov=. --cov-report=term -v
# Coverage ≥ 80%

# Relatório de qualidade via API
curl -X POST http://localhost:8000/api/reports/quality
# JSON com total_tests, coverage_percent, meets_threshold

# Frontend
# http://localhost:3000/pages/quality-report.html → Barra de progresso + cobertura por arquivo
```

---
## Referência — Formato dos Arquivos

### `.instructions.md`
```yaml
---
applyTo: "glob/pattern/**/*.py"
description: "Breve descrição"
---
# Regras em markdown...
```

### `.agent.md`
```yaml
---
name: nome-do-agent
description: "O que faz"
tools:
  - name: githubRepo
  - name: codebase
  - name: terminal
  - name: changes
---
# Persona e instruções...
```

### `.prompt.md`
```yaml
---
mode: agent
description: "O que faz"
tools:
  - name: codebase
  - name: terminal
---
# Template com {{variáveis}}...
```

### `SKILL.md`
```yaml
---
name: nome
description: "Quando ativa"
version: "1.0.0"
---
# Conhecimento de domínio...
```
