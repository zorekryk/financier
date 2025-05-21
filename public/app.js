const tblDiv = document.getElementById("tblDiv");

async function getData() {
    const url = "/transactions";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        console.log(json);
        return json;
    } catch (error) {
        console.error(error.message);
        return false;
    }
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

    const tbl = document.createElement("table");

    const tblHead = document.createElement("thead");

    const row = document.createElement("tr");
    ["Дата", "Категорія", "Опис", "Сума", "Тип"].forEach((field) => {
        const cell = document.createElement("th");
        cell.textContent = field;
        row.appendChild(cell);
    });

    tblHead.appendChild(row);
    tbl.appendChild(tblHead);

    const tblBody = document.createElement("tbody");

    data.forEach((transaction) => {
        const row = document.createElement("tr");

        ["date", "category", "description", "amount", "type"].forEach(
            (field) => {
                const cell = document.createElement("td");
                cell.textContent = transaction[field];
                row.appendChild(cell);
            }
        );
        tblBody.appendChild(row);
    });

    tbl.appendChild(tblBody);

    tblDiv.appendChild(tbl);

    tbl.setAttribute("border", "1");
}

generateTable();
