# 💡 Hints — Abra apenas se travar

> ⚠️ Cada hint consultado desconta **2 pontos** do score final.
> Tente resolver sozinho antes de abrir.

---

## Fase 1

<details>
<summary>Hint 1.1 — O que colocar nas regras de segurança do copilot-instructions?</summary>

Pense em 5 coisas que um dev nunca deve fazer em código bancário:
- Hardcode de senhas/tokens
- Usar `eval()` ou `exec()`
- Concatenar strings em queries SQL
- Desabilitar SSL
- Aceitar input sem validação

</details>

<details>
<summary>Hint 1.2 — Como preencher o SKILL.md?</summary>

Para transferências:
- Mínimo: R$ 0.01, Máximo: R$ 50.000
- Limite diário: R$ 100.000
- Entre contas próprias: sem limite

Para CPF: 11 dígitos, mod-11, rejeitar todos iguais.

Para LGPD: mascarar CPF como `***.***.***-XX` em logs.

</details>

<details>
<summary>Hint 1.3 — Estrutura do python-backend.instructions.md</summary>

```yaml
---
applyTo: "backend/**/*.py"
description: "Python backend standards"
---
```

Seções sugeridas: Code Style, Logging, Error Handling, Security, Testing.
O `applyTo` é obrigatório — sem ele, não ativa.

</details>

---

## Fase 2

<details>
<summary>Hint 2.1 — Estrutura do create-crud.prompt.md</summary>

```yaml
---
mode: agent
description: "Generate CRUD for a banking entity"
tools:
  - name: codebase
  - name: terminal
---
Create a complete CRUD for: {{entity_name}}
```

Liste o que deve gerar: models, database, service, routes, tests, registro no app.py.

</details>

<details>
<summary>Hint 2.2 — O que está errado no security-reviewer.agent.md</summary>

1. Tools `fetch` e `browser` não existem → use `githubRepo`, `codebase`, `terminal`
2. Falta output format com severity/file/issue/impact/fix
3. Falta fórmula: `Score = 100 - (CRIT×25 + HIGH×15 + MED×5 + LOW×2)`
4. Falta path do relatório: `backend/reports/security-report.json`

</details>

<details>
<summary>Hint 2.3 — Prompt sugerido para gerar o app.py</summary>

Use Agent mode no Chat:
```
Crie o backend completo para a Hack Bank API seguindo os contratos
definidos no CHALLENGE.md. Inclua: app.py com FastAPI, CORS, logging,
rotas de accounts, transfers, reports e health.
Use os padrões definidos nas instructions do projeto.
```

</details>

---

## Fase 3

<details>
<summary>Hint 3.1 — Estrutura do quality-reviewer.agent.md</summary>

```yaml
---
name: quality-reviewer
description: "QA agent that runs tests and checks coverage"
tools:
  - name: codebase
  - name: terminal
---
```

Defina: persona QA, comando `pytest --cov`, threshold 80%, output em JSON.

</details>

<details>
<summary>Hint 3.2 — O frontend espera o campo "score" no relatório de segurança</summary>

O `SecurityReport` precisa de:
- `score` (float) — calculado pela fórmula
- `findings` (array) — cada um com: severity, category, description, location, recommendation
- `critical`, `high`, `medium`, `low` (int) — contagens por severidade

Sem esses campos, a página `security-report.html` não renderiza.

</details>

---

## Bônus

<details>
<summary>Hint B1 — Estrutura do quality-guardian.agent.md</summary>

```yaml
---
name: quality-guardian
description: "QA agent that runs tests and checks coverage"
tools:
  - name: codebase
  - name: terminal
---
```

Defina: persona QA, comando `pytest --cov`, threshold 80%, output em JSON.
O report deve ir para `backend/reports/quality-report.json`.

</details>

<details>
<summary>Hint B2 — Contrato do /api/reports/quality</summary>

O frontend `quality-report.html` espera:
- `coverage_percent` (float) — porcentagem total
- `meets_threshold` (bool) — se ≥ 80%
- `threshold` (float) — 80.0
- `total_tests`, `passed`, `failed` (int)
- `files_analyzed` (array) — cada um com: file, statements, covered, missing, coverage

Sem `meets_threshold`, a barra de progresso não muda de cor.

</details>

<details>
<summary>Hint B3 — Prompt sugerido para gerar o quality-report.prompt.md</summary>

O prompt deve:
1. Rodar `pytest --cov=. --cov-report=json:reports/coverage.json --cov-report=term -v`
2. Parsear o JSON de coverage
3. Gerar `quality-report.json` no formato que o frontend espera
4. Imprimir tabela resumo com total/passed/failed/coverage/status

</details>
