const container = document.getElementById("table-div");

async function getTransactions() {
    const url = "/transactions";
    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Response status: ${res.status}`);
        }
        const json = await res.json();
        return json;
    } catch (err) {
        console.error(err.message);
        return false;
    }
}

async function getSummary() {
    const url = "/summary";
    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Response status: ${res.status}`);
        }
        const json = await res.json();
        return json;
    } catch (err) {
        console.error(err.message);
        return false;
    }
}

function formatUAH(amount) {
    return new Intl.NumberFormat("uk-UA", {
        style: "currency",
        currency: "UAH",
        minimumFractionDigits: 0,
    }).format(amount);
}

function showMessage(msg, container, selector, clear = true) {
    if (clear) container.innerHTML = "";
    const p = document.createElement("p");
    p.classList.add(selector);
    p.textContent = msg;
    container.appendChild(p);
}

async function renderSummary() {
    const { total, byCategory } = await getSummary();

    const container = document.querySelector(".summary-cards");

    const incCats = Object.entries(byCategory)
        .filter(([, sum]) => sum > 0)
        .map(([cat]) => cat);
    const incTotal = incCats.reduce((sum, cat) => sum + byCategory[cat], 0);

    const expCats = Object.entries(byCategory)
        .filter(([, sum]) => sum < 0)
        .map(([cat]) => cat);
    const expTotal = expCats.reduce((sum, cat) => sum + byCategory[cat], 0);

    const makeCard = ({ title, icon, amount, details, trend }) => `
        <div class="summary-card ${title.split(" ")[1].toLowerCase()}-card">
            <div class="card-header">
                <h3>${title}</h3>
                <span class="card-icon">${icon}</span>
            </div>
            <div class="${title.split(" ")[1].toLowerCase()}-amount">
                ${formatUAH(amount)}
            </div>
            ${
                trend
                    ? `
                <div class="${title.split(" ")[1].toLowerCase()}-trend
                ${trend >= 0 ? "positive" : "negative"}">
                <span class="trend-icon">${trend >= 0 ? "↗" : "↘"}</span>
                <span>${trend >= 0 ? "Positive balance" : "Negative balance"}</span>
            </div>
            `
                    : `
                <div class="${title.split(" ")[1].toLowerCase()}-details">
                    ${details.length ? details.join(", ") : ""}
                </div>
            `
            }
        </div>
    `;

    container.innerHTML = [
        makeCard({
            title: "Total Balance",
            icon: "💰",
            amount: total,
            trend: total,
            details: [],
        }),
        makeCard({
            title: "Total Income",
            icon: "📈",
            amount: incTotal,
            trend: null,
            details: incCats,
        }),
        makeCard({
            title: "Total Expense",
            icon: "📉",
            amount: expTotal,
            trend: null,
            details: expCats,
        }),
    ].join("");
}

renderSummary();

async function renderCategories() {
    const { byCategory } = await getSummary();

    const container = document.querySelector(".categories-grid");

    if (!byCategory) {
        return showMessage("Error loading data", container, "message-error-sm", true);
    }
    if (Object.entries(byCategory).length === 0) {
        return showMessage("No data yet", container, "message-info-sm", true);
    }

    const incSum = Object.values(byCategory)
        .filter((v) => v > 0)
        .reduce((a, v) => a + v, 0);
    const expSum = Object.values(byCategory)
        .filter((v) => v < 0)
        .reduce((a, v) => a + Math.abs(v), 0);

    const html = Object.entries(byCategory)
        .map(([cat, sum]) => {
            const abs = Math.abs(sum);
            const type = sum > 0 ? "income" : "expense";
            const pct = type === "income" ? (abs / incSum) * 100 : (abs / expSum) * 100;

            return `
            <div class="category-item">
                <div class="category-info">
                    <span class="category-name">${cat}</span>
                    <span class="category-amount">${formatUAH(sum)}</span>
                </div>
                <div class="category-bar">
                    <div class="bar-fill ${type}-bar" style="width:${pct.toFixed(1)}%">
                    </div>
                </div>
            </div>
        `;
        })
        .join("");
    container.innerHTML = html;
}

renderCategories();

function renderRow(tx) {
    const absAmount = Math.abs(tx.amount);
    const formattedAmount =
        (tx.type === "Expense" ? "-" : "+") + absAmount.toLocaleString("uk-UA") + "₴";

    const amountClass = tx.type === "Expense" ? "expense" : "income";
    const typeClass = tx.type === "Expense" ? "type-expense" : "type-income";

    return `
        <tr data-id=${JSON.stringify(tx.id)}>
            <td>${tx.date}</td>
            <td>${tx.category}</td>
            <td>${tx.description}</td>
            <td class="amount ${amountClass}">${formattedAmount}</td>
            <td><span class="type-badge ${typeClass}">${tx.type}</span></td>
            <td class="actions">
                <button class="btn btn-ghost edit-btn" title="Edit">
                    <svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="File / File_Edit">
                            <path id="Vector" d="M6 11.0002V6.2002C6 5.08009 6 4.51962 6.21799 4.0918C6.40973 3.71547 6.71547 3.40973 7.0918 3.21799C7.51962 3 8.08009 3 9.2002 3H13.6747C13.7973 3 13.9045 3 14 3.00087M19.9991 9C20 9.09561 20 9.20296 20 9.32568V17.8036C20 18.9215 20 19.4805 19.7822 19.9079C19.5905 20.2842 19.2839 20.5905 18.9076 20.7822C18.4802 21 17.921 21 16.8031 21L13 21M19.9991 9C19.9963 8.71451 19.9857 8.53376 19.9443 8.36133C19.8953 8.15726 19.8142 7.96214 19.7046 7.7832C19.5809 7.58136 19.4089 7.40889 19.063 7.06298L15.9375 3.9375C15.5918 3.59182 15.4186 3.41857 15.2168 3.29492C15.0379 3.18526 14.8429 3.10425 14.6388 3.05526C14.4663 3.01385 14.2856 3.00347 14 3.00087M19.9991 9H20.0002M19.9991 9H17.1969C16.079 9 15.5192 9 15.0918 8.78223C14.7155 8.59048 14.4097 8.28392 14.218 7.90759C14 7.47977 14 6.9201 14 5.8V3.00087M9 14L11 16M4 21V18.5L11.5 11L14 13.5L6.5 21H4Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </g>
                    </svg>
                </button>
                <button class="btn btn-ghost delete-btn" title="Delete">
                    <svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="Interface / Trash_Empty">
                            <path id="Vector" d="M6 6V17.8C6 18.9201 6 19.4798 6.21799 19.9076C6.40973 20.2839 6.71547 20.5905 7.0918 20.7822C7.5192 21 8.07899 21 9.19691 21H14.8031C15.921 21 16.48 21 16.9074 20.7822C17.2837 20.5905 17.5905 20.2839 17.7822 19.9076C18 19.4802 18 18.921 18 17.8031V6M6 6H8M6 6H4M8 6H16M8 6C8 5.06812 8 4.60241 8.15224 4.23486C8.35523 3.74481 8.74432 3.35523 9.23438 3.15224C9.60192 3 10.0681 3 11 3H13C13.9319 3 14.3978 3 14.7654 3.15224C15.2554 3.35523 15.6447 3.74481 15.8477 4.23486C15.9999 4.6024 16 5.06812 16 6M16 6H18M18 6H20" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </g>
                    </svg>
                </button>
            </td>
        </tr>
    `;
}

async function generateTable() {
    container.innerHTML = "";

    const data = await getTransactions();

    if (!data) {
        return showMessage("Data loading error", container, "message-error", true);
    }

    const rows = data.map(renderRow).join("");

    container.innerHTML = `
        <table>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Category</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Type</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                ${rows}
            </tbody>
        </table>
    `;

    if (data.length === 0) {
        showMessage("No transactions yet", container, "message-info-sm", false);
        return;
    }

    container.querySelectorAll(".edit-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            const id = btn.closest("tr").dataset.id;
            window.location.href = `edit.html?id=${encodeURIComponent(id)}`;
        });
    });

    container.querySelectorAll(".delete-btn").forEach((btn) => {
        btn.addEventListener("click", async () => {
            const id = btn.closest("tr").dataset.id;
            if (!confirm("Delete transactions?")) return;
            const res = await fetch(`/transactions/${encodeURIComponent(id)}`, {
                method: "DELETE",
            });
            console.log("fetching DELETE /transactions/" + encodeURIComponent(id));
            if (res.ok) generateTable();
            else alert("failed");
        });
    });
}

generateTable();
