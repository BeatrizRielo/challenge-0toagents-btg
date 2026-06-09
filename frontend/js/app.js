const API = "http://localhost:8000";

document.querySelectorAll(".nav-link[data-section]").forEach((link) => {
	link.addEventListener("click", (e) => {
		e.preventDefault();
		document.querySelectorAll(".nav-link").forEach((l) => l.classList.remove("active"));
		link.classList.add("active");
		document.querySelectorAll(".section").forEach((s) => s.classList.remove("active"));
		document.getElementById(`section-${link.dataset.section}`).classList.add("active");
		if (link.dataset.section === "transfers") loadTransferSelects();
	});
});

function toast(msg, type = "success") {
	const el = document.getElementById("toast");
	el.textContent = msg;
	el.className = `toast show ${type}`;
	setTimeout(() => el.classList.remove("show"), 3000);
}

async function checkHealth() {
	const el = document.getElementById("health-status");
	try {
		const res = await fetch(`${API}/health`);
		const data = await res.json();
		el.textContent = `✅ ${data.status} — v${data.version}`;
		el.className = "health-status ok";
	} catch {
		el.textContent = "❌ API offline";
		el.className = "health-status err";
	}
}

async function loadAccounts() {
	try {
		const res = await fetch(`${API}/api/accounts`);
		const accounts = await res.json();
		const labels = { checking: "Corrente", savings: "Poupança", investment: "Investimento" };
		document.querySelector("#accounts-table tbody").innerHTML = accounts.map((a) =>
			`<tr><td><code>${a.id}</code></td><td>${a.holder_name}</td><td>${a.document}</td>
			<td>${labels[a.account_type] || a.account_type}</td><td>R$ ${a.balance.toFixed(2)}</td>
			<td><button class="btn btn-danger" onclick="deleteAccount('${a.id}')">Excluir</button></td></tr>`
		).join("");
	} catch { toast("Erro ao carregar contas", "error"); }
}

document.getElementById("account-form").addEventListener("submit", async (e) => {
	e.preventDefault();
	try {
		const res = await fetch(`${API}/api/accounts`, {
			method: "POST", headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				holder_name: document.getElementById("holder_name").value,
				document: document.getElementById("document").value,
				account_type: document.getElementById("account_type").value,
				initial_balance: parseFloat(document.getElementById("initial_balance").value) || 0,
			}),
		});
		if (!res.ok) throw new Error((await res.json()).detail);
		toast("Conta criada!"); e.target.reset(); loadAccounts();
	} catch (err) { toast(err.message, "error"); }
});

async function deleteAccount(id) {
	if (!confirm(`Excluir conta ${id}?`)) return;
	try {
		const res = await fetch(`${API}/api/accounts/${id}`, { method: "DELETE" });
		if (!res.ok) throw new Error((await res.json()).detail);
		toast("Conta excluída"); loadAccounts();
	} catch (err) { toast(err.message, "error"); }
}

async function loadTransferSelects() {
	try {
		const res = await fetch(`${API}/api/accounts`);
		const accounts = await res.json();
		const opts = accounts.map((a) => `<option value="${a.id}">${a.holder_name} (${a.id})</option>`).join("");
		document.getElementById("from_account").innerHTML = `<option value="">Origem...</option>${opts}`;
		document.getElementById("to_account").innerHTML = `<option value="">Destino...</option>${opts}`;
	} catch {}
	loadTransfers();
}

async function loadTransfers() {
	try {
		const res = await fetch(`${API}/api/transfers`);
		const transfers = await res.json();
		document.querySelector("#transfers-table tbody").innerHTML = transfers.map((t) =>
			`<tr><td><code>${t.id}</code></td><td><code>${t.from_account_id}</code></td>
			<td><code>${t.to_account_id}</code></td><td>R$ ${t.amount.toFixed(2)}</td>
			<td>${t.description || "—"}</td><td><span class="badge badge-success">${t.status}</span></td>
			<td>${new Date(t.created_at).toLocaleString("pt-BR")}</td></tr>`
		).join("");
	} catch {}
}

document.getElementById("transfer-form").addEventListener("submit", async (e) => {
	e.preventDefault();
	try {
		const res = await fetch(`${API}/api/transfers`, {
			method: "POST", headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				from_account_id: document.getElementById("from_account").value,
				to_account_id: document.getElementById("to_account").value,
				amount: parseFloat(document.getElementById("transfer_amount").value),
				description: document.getElementById("transfer_desc").value,
			}),
		});
		if (!res.ok) throw new Error((await res.json()).detail);
		toast("Transferência realizada!"); e.target.reset(); loadTransferSelects(); loadAccounts();
	} catch (err) { toast(err.message, "error"); }
});

checkHealth(); loadAccounts(); setInterval(checkHealth, 30000);
