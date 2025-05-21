const express = require("express");
const { v4: uuidv4 } = require("uuid");
const app = express();

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

const transactions = [
    {
        id: uuidv4(),
        date: "2025-05-01",
        category: "Їжа",
        description: "Обід у кафе",
        amount: 220,
        type: "Expense",
    },
    {
        id: uuidv4(),
        date: "2025-05-02",
        category: "Зарплата",
        description: "Аванс",
        amount: 5000,
        type: "Income",
    },
    {
        id: uuidv4(),
        date: "2025-05-03",
        category: "Транспорт",
        description: "Квиток на метро",
        amount: 30,
        type: "Expense",
    },
    {
        id: uuidv4(),
        date: "2025-05-04",
        category: "Розваги",
        description: "Кіно",
        amount: 150,
        type: "Expense",
    },
    {
        id: uuidv4(),
        date: "2025-05-05",
        category: "Фріланс",
        description: "Оплата за замовлення",
        amount: 2500,
        type: "Income",
    },
    {
        id: uuidv4(),
        date: "2025-05-06",
        category: "Покупки",
        description: "Нові навушники",
        amount: 700,
        type: "Expense",
    },
];

app.get("/transactions", (req, res) => {
    res.json(transactions);
});

app.post("/transactions", (req, res) => {
    console.log("body:", req.body);
    const { date, category, description, amount, type } = req.body;
    if (!date || !category || !amount || !type) {
        return res.status(400).json({ error: "Missing required fields" });
    }
    const transaction = {
        id: uuidv4(),
        date,
        category,
        description,
        amount,
        type,
    };
    transactions.push(transaction);
    res.redirect("/");
});

app.delete("/transactions/:id", (req, res) => {
    const id = req.params.id;
    const idx = transactions.findIndex((tx) => tx.id === id);
    if (idx === -1) {
        return res.status(404).json({ error: "Not found" });
    }
    transactions.splice(idx, 1);
    // Ніяких редиректів — чистий JSON
    res.json({ success: true });
});

app.get("/summary", (req, res) => {
    const summary = transactions.reduce(
        (acc, tx) => {
            acc.total += (tx.type === "Income" ? 1 : -1) * tx.amount;
            acc.byCategory[tx.category] =
                (acc.byCategory[tx.category] || 0) +
                (tx.type === "Income" ? tx.amount : -tx.amount);
            return acc;
        },
        { total: 0, byCategory: {} }
    );
    res.json(summary);
});

app.listen(3000, () => {
    console.log("http://localhost:3000/");
});
