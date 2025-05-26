const tblDiv = document.getElementById("tblDiv");

async function getData() {
    const url = "/transactions";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error.message);
        return false;
    }
}

function renderRow(t) {
    return `
        <tr data-id=${JSON.stringify(t.id)}>
            <td>${t.date}</td>
            <td>${t.category}</td>
            <td>${t.description}</td>
            <td>${t.amount}</td>
            <td>${t.type}</td>
            <td>
                <button class="edit-btn">Edit</button>
            </td>
            <td>
                <button class="delete-btn">Delete</button>
            </td>
        </tr>
    `;
}

async function generateTable() {
    tblDiv.innerHTML = "";

    const data = await getData();

    if (!data) {
        const p = document.createElement("p");
        p.textContent = "Помилка завантаження данних.";
        tblDiv.appendChild(p);
        return;
    }

    const rows = data.map(renderRow).join("");

    tblDiv.innerHTML = `
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

    tblDiv.querySelectorAll(".edit-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            const id = btn.closest("tr").dataset.id;
            window.location.href = `edit.html?id=${encodeURIComponent(id)}`;
        });
    });

    tblDiv.querySelectorAll(".delete-btn").forEach((btn) => {
        btn.addEventListener("click", async () => {
            const id = btn.closest("tr").dataset.id;
            if (!confirm("Delete transactions?")) return;
            const res = await fetch(`/transactions/${encodeURIComponent(id)}`, {
                method: "DELETE",
            });
            console.log(
                "fetching DELETE /transactions/" + encodeURIComponent(id)
            );
            if (res.ok) generateTable();
            else alert("failed");
        });
    });
}

generateTable();
