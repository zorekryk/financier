const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));

const transactions = [
    {
        date: "2025-05-01",
        category: "Їжа",
        description: "Обід у кафе",
        amount: 220,
        type: "Витрата",
    },
    {
        date: "2025-05-02",
        category: "Зарплата",
        description: "Аванс",
        amount: 5000,
        type: "Дохід",
    },
    {
        date: "2025-05-03",
        category: "Транспорт",
        description: "Квиток на метро",
        amount: 30,
        type: "Витрата",
    },
    {
        date: "2025-05-04",
        category: "Розваги",
        description: "Кіно",
        amount: 150,
        type: "Витрата",
    },
    {
        date: "2025-05-05",
        category: "Фріланс",
        description: "Оплата за замовлення",
        amount: 2500,
        type: "Дохід",
    },
    {
        date: "2025-05-06",
        category: "Покупки",
        description: "Нові навушники",
        amount: 700,
        type: "Витрата",
    },
];

app.get("/transactions", (req, res) => {
    res.json(transactions);
});

app.post("/transactions", (req, res) => {
    const { date, category, description, amount, type } = req.body;
    if (!date || !category || !amount || !type) {
        return res.status(400).json({ error: "Missing required fields" });
    }
    transactions.push({ date, category, description, amount, type });
    res.status(201).json({ success: true });
});

app.get("/summary", (req, res) => {
    const summary = transactions.reduce(
        (acc, tx) => {
            acc.total += (tx.type === "Дохід" ? 1 : -1) * tx.amount;
            acc.byCategory[tx.category] =
                (acc.byCategory[tx.category] || 0) +
                (tx.type === "Дохід" ? tx.amount : -tx.amount);
            return acc;
        },
        { total: 0, byCategory: {} }
    );
    res.json(summary);
});

app.listen(3000, () => {
    console.log("http://localhost:3000/");
});
