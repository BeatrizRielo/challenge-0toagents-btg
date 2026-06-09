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
cd backend && uvicorn app:app --port 8000
# http://localhost:8000/docs  → Swagger

# 2. Health check
curl http://localhost:8000/health

# 3. CRUD de contas (criar + listar)
curl -X POST http://localhost:8000/api/accounts -H "Content-Type: application/json" \
  -d '{"holder_name":"Ana Costa","document":"12345678901","account_type":"checking","initial_balance":1000}'
curl http://localhost:8000/api/accounts

# 4. Transferência
curl -X POST http://localhost:8000/api/transfers -H "Content-Type: application/json" \
  -d '{"from_account_id":"ACC-000001","to_account_id":"ACC-000002","amount":100}'

# 5. Relatório de segurança
curl -X POST http://localhost:8000/api/reports/security
curl http://localhost:8000/api/reports/security

# 6. Frontend exibindo relatório
cd frontend && python -m http.server 3000
# http://localhost:3000/pages/security-report.html → mostra score e findings
```

---

## Contratos de API

O frontend já está implementado e espera **exatamente** estes contratos JSON.
Se os contratos não forem seguidos, o frontend não funciona.

### `GET /health`
```json
{
  "status": "healthy",
  "service": "hack-bank-api",
  "version": "1.0.0",
  "timestamp": "2026-06-09T10:00:00.000000"
}
```

### `POST /api/accounts` — Criar conta
**Request:**
```json
{
  "holder_name": "Maria Silva",
  "document": "12345678901",
  "account_type": "checking",
  "initial_balance": 1000.0
}
```
**Response (201):**
```json
{
  "id": "ACC-000001",
  "holder_name": "Maria Silva",
  "document": "12345678901",
  "account_type": "checking",
  "balance": 1000.0,
  "is_active": true,
  "created_at": "2026-06-09T10:00:00.000000",
  "updated_at": "2026-06-09T10:00:00.000000"
}
```

### `GET /api/accounts` — Listar contas
**Response (200):** Array de Account (mesmo schema acima)

### `GET /api/accounts/{account_id}` — Buscar conta
**Response (200):** Account | **404** `{"detail": "Account not found"}`

### `PUT /api/accounts/{account_id}` — Atualizar conta
**Request:**
```json
{
  "holder_name": "Maria Santos",
  "account_type": "savings"
}
```
**Response (200):** Account atualizado | **404**

### `DELETE /api/accounts/{account_id}` — Excluir conta
**Response (204)** | **400** se tiver saldo | **404**

### `POST /api/transfers` — Transferir
**Request:**
```json
{
  "from_account_id": "ACC-000001",
  "to_account_id": "ACC-000002",
  "amount": 500.0,
  "description": "Pagamento"
}
```
**Response (201):**
```json
{
  "id": "TRF-000001",
  "from_account_id": "ACC-000001",
  "to_account_id": "ACC-000002",
  "amount": 500.0,
  "description": "Pagamento",
  "status": "completed",
  "created_at": "2026-06-09T10:00:00.000000"
}
```
**Erros (400):** saldo insuficiente, conta inexistente, mesma conta

### `GET /api/transfers` — Listar transferências
**Response (200):** Array de Transfer

### `POST /api/reports/security` — Gerar relatório
**Response (200):**
```json
{
  "generated_at": "2026-06-09T10:00:00.000000",
  "total_findings": 3,
  "critical": 0,
  "high": 1,
  "medium": 1,
  "low": 1,
  "findings": [
    {
      "severity": "HIGH",
      "category": "Secrets Management",
      "description": "Potential hardcoded secret detected",
      "location": "app.py",
      "recommendation": "Use environment variables"
    }
  ],
  "score": 78.0
}
```
**Score:** `100 - (CRITICAL×25 + HIGH×15 + MEDIUM×5 + LOW×2)`

### `GET /api/reports/security` — Ler último relatório
**Response (200):** Mesmo schema do POST

### `POST /api/reports/quality` — Gerar relatório de qualidade *(Bônus)*
**Response (200):**
```json
{
  "generated_at": "2026-06-09T10:00:00.000000",
  "total_tests": 28,
  "passed": 28,
  "failed": 0,
  "coverage_percent": 92.5,
  "meets_threshold": true,
  "threshold": 80.0,
  "files_analyzed": [
    {
      "file": "services/account_service.py",
      "statements": 47,
      "covered": 47,
      "missing": 0,
      "coverage": 100.0
    }
  ]
}
```

### `GET /api/reports/quality` — Ler último relatório de qualidade *(Bônus)*
**Response (200):** Mesmo schema do POST

---

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

| # | Tipo | Arquivo | O que fazer |
|---|------|---------|-------------|
| 1 | CORRIGIR | `.github/copilot-instructions.md` | Completar 3 seções com TODO |
| 2 | CORRIGIR | `.github/skills/SKILL.md` | Completar regras bancárias |
| 3 | CRIAR | `.github/instructions/python-backend.instructions.md` | Regras para `backend/**/*.py` |

**Validação:** Abra um `.py` em `backend/` → Copilot sugere com tabs, type hints, logging.

**Depois:** Use Agent mode para gerar `models.py` e `database.py` seguindo os contratos acima.

---

### Fase 2 — Geração (30 min)

**Objetivo:** Criar um prompt reutilizável e gerar o backend funcional.

| # | Tipo | Arquivo | O que fazer |
|---|------|---------|-------------|
| 4 | CRIAR | `.github/prompts/create-crud.prompt.md` | Prompt com `{{entity_name}}` |
| 5 | CORRIGIR | `.github/agents/security-reviewer.agent.md` | Corrigir tools e completar |

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

| # | Tipo | Arquivo | O que fazer |
|---|------|---------|-------------|
| 6 | CRIAR | `.github/agents/quality-reviewer.agent.md` | Agent que roda testes + coverage |

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

| # | Tipo | Arquivo | O que fazer |
|---|------|---------|-------------|
| B1 | CRIAR | `.github/agents/quality-guardian.agent.md` | Agent QA que roda testes + verifica coverage |
| B2 | CRIAR | `.github/prompts/quality-report.prompt.md` | Prompt para executar testes e gerar relatório |
| B3 | GERAR | `services/report_service.py` + `routes/reports.py` | Endpoint `/api/reports/quality` com coverage |

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

## Pontuação

| # | Entregável | Pts | Como avaliar |
|---|------------|-----|--------------|
| 1 | `copilot-instructions.md` sem TODOs | 10 | Arquivo completo, regras de seg/test/log |
| 2 | `SKILL.md` sem TODOs | 10 | Regras de transferência, CPF, LGPD |
| 3 | `python-backend.instructions.md` criado | 10 | `applyTo: backend/**/*.py`, regras coerentes |
| 4 | `create-crud.prompt.md` criado | 15 | mode agent, tools, `{{entity_name}}`, gera CRUD |
| 5 | `security-reviewer.agent.md` corrigido | 10 | Tools corretas, output format, scoring |
| 6 | `quality-reviewer.agent.md` criado | 10 | Roda testes, verifica coverage |
| 7 | Backend roda + Swagger + Health | 10 | `uvicorn` sobe, `/docs` abre, `/health` responde |
| 8 | CRUD contas + transferências | 15 | Contratos JSON respeitados, erros tratados |
| 9 | Relatório de segurança no frontend | 10 | Score + findings visíveis na página |
| | **TOTAL** | **100** | |
| | | | |
| ⭐ | **BÔNUS** | | |
| B1 | `quality-guardian.agent.md` criado | 5 | Agent com persona QA, roda pytest, threshold 80% |
| B2 | `quality-report.prompt.md` criado | 5 | mode agent, roda testes, gera JSON |
| B3 | Testes passando ≥ 80% coverage | 5 | `pytest --cov` mostra ≥ 80% |
| B4 | Relatório de qualidade no frontend | 5 | Barra de progresso + cobertura por arquivo |
| | **TOTAL COM BÔNUS** | **120** | |

### Classificação

| Pontos | Título |
|--------|--------|
| 110–120 | 💎 **Copilot Legend** *(bônus completo)* |
| 90–109 | 🏆 **Copilot Master** |
| 70–89 | 🥈 **Copilot Expert** |
| 50–69 | 🥉 **Copilot Practitioner** |
| < 50 | 📚 **Copilot Learner** |

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
