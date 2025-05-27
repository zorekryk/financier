const express = require("express");
const { v4: uuidv4 } = require("uuid");
const escapeHtml = require("escape-html");

const app = express();

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

const transactions = [
    {
        id: uuidv4(),
        date: "2025-01-05",
        category: "Salary",
        description: "Monthly salary",
        amount: 3500,
        type: "Income",
    },
    {
        id: uuidv4(),
        date: "2025-01-06",
        category: "Food",
        description: "Groceries at supermarket",
        amount: 180,
        type: "Expense",
    },
    {
        id: uuidv4(),
        date: "2025-01-07",
        category: "Transport",
        description: "Monthly metro pass",
        amount: 50,
        type: "Expense",
    },
    {
        id: uuidv4(),
        date: "2025-01-10",
        category: "Entertainment",
        description: "Movie tickets",
        amount: 45,
        type: "Expense",
    },
    {
        id: uuidv4(),
        date: "2025-01-15",
        category: "Utilities",
        description: "Electricity bill",
        amount: 120,
        type: "Expense",
    },
    {
        id: uuidv4(),
        date: "2025-01-20",
        category: "Food",
        description: "Dinner at restaurant",
        amount: 300,
        type: "Expense",
    },
    {
        id: uuidv4(),
        date: "2025-01-22",
        category: "Health",
        description: "Pharmacy purchase",
        amount: 60,
        type: "Expense",
    },
    {
        id: uuidv4(),
        date: "2025-02-01",
        category: "Salary",
        description: "Monthly salary",
        amount: 3500,
        type: "Income",
    },
    {
        id: uuidv4(),
        date: "2025-02-03",
        category: "Food",
        description: "Coffee and snacks",
        amount: 25,
        type: "Expense",
    },
    {
        id: uuidv4(),
        date: "2025-02-05",
        category: "Transport",
        description: "Taxi ride",
        amount: 40,
        type: "Expense",
    },
    {
        id: uuidv4(),
        date: "2025-02-08",
        category: "Shopping",
        description: "New headphones",
        amount: 150,
        type: "Expense",
    },
    {
        id: uuidv4(),
        date: "2025-02-12",
        category: "Utilities",
        description: "Water bill",
        amount: 30,
        type: "Expense",
    },
    {
        id: uuidv4(),
        date: "2025-02-14",
        category: "Gift",
        description: "Valentine’s gift",
        amount: 80,
        type: "Expense",
    },
    {
        id: uuidv4(),
        date: "2025-02-18",
        category: "Health",
        description: "Gym membership",
        amount: 60,
        type: "Expense",
    },
    {
        id: uuidv4(),
        date: "2025-03-01",
        category: "Salary",
        description: "Monthly salary",
        amount: 3500,
        type: "Income",
    },
    {
        id: uuidv4(),
        date: "2025-03-04",
        category: "Food",
        description: "Lunch with client",
        amount: 200,
        type: "Expense",
    },
    {
        id: uuidv4(),
        date: "2025-03-07",
        category: "Transport",
        description: "Bus tickets",
        amount: 15,
        type: "Expense",
    },
    {
        id: uuidv4(),
        date: "2025-03-10",
        category: "Entertainment",
        description: "Concert ticket",
        amount: 120,
        type: "Expense",
    },
    {
        id: uuidv4(),
        date: "2025-03-15",
        category: "Rent",
        description: "Monthly apartment rent",
        amount: 1200,
        type: "Expense",
    },
    {
        id: uuidv4(),
        date: "2025-03-20",
        category: "Food",
        description: "Weekend brunch",
        amount: 90,
        type: "Expense",
    },
    {
        id: uuidv4(),
        date: "2025-04-01",
        category: "Salary",
        description: "Monthly salary",
        amount: 3500,
        type: "Income",
    },
    {
        id: uuidv4(),
        date: "2025-04-05",
        category: "Utilities",
        description: "Internet bill",
        amount: 45,
        type: "Expense",
    },
    {
        id: uuidv4(),
        date: "2025-04-08",
        category: "Shopping",
        description: "Clothes purchase",
        amount: 220,
        type: "Expense",
    },
    {
        id: uuidv4(),
        date: "2025-04-12",
        category: "Health",
        description: "Doctor visit",
        amount: 100,
        type: "Expense",
    },
    {
        id: uuidv4(),
        date: "2025-04-18",
        category: "Transport",
        description: "Ride-sharing",
        amount: 35,
        type: "Expense",
    },
    {
        id: uuidv4(),
        date: "2025-05-01",
        category: "Salary",
        description: "Monthly salary",
        amount: 3500,
        type: "Income",
    },
    {
        id: uuidv4(),
        date: "2025-05-03",
        category: "Food",
        description: "Lunch in a cafe",
        amount: 220,
        type: "Expense",
    },
    {
        id: uuidv4(),
        date: "2025-05-06",
        category: "Entertainment",
        description: "Museum tickets",
        amount: 18,
        type: "Expense",
    },
    {
        id: uuidv4(),
        date: "2025-05-10",
        category: "Gift",
        description: "Birthday present",
        amount: 75,
        type: "Expense",
    },
    {
        id: uuidv4(),
        date: "2025-05-12",
        category: "Utilities",
        description: "Gas bill",
        amount: 55,
        type: "Expense",
    },
    {
        id: uuidv4(),
        date: "2025-05-15",
        category: "Transport",
        description: "Train ticket",
        amount: 60,
        type: "Expense",
    },
];

app.get("/transactions", (req, res) => {
    const sorted = [...transactions].sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
    });
    res.json(sorted);
});

app.post("/transactions", (req, res) => {
    const { date, category, description, amount, type } = req.body;

    if (!date || !category || !amount || !type) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    const id = uuidv4();
    const transaction = {
        id,
        date: escapeHtml(date),
        category: escapeHtml(category),
        description: escapeHtml(description),
        amount: escapeHtml(amount),
        type: escapeHtml(type),
    };

    transactions.push(transaction);

    res.status(201).location(`/transactions/${id}`).json({ success: true, id });
});

app.put("/transactions/:id", (req, res) => {
    const id = req.params.id;
    const idx = transactions.findIndex((tx) => tx.id === id);

    if (idx === -1) {
        return res.status(400).json({ error: "Not found" });
    }

    const { date, category, description, amount, type } = req.body;
    if (!date || !category || !amount || !type) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    transactions[idx] = {
        id,
        date,
        category,
        description,
        amount: Number(amount),
        type,
    };

    res.status(204).end();
});

app.get("/transactions/:id", (req, res) => {
    const id = req.params.id;
    const tx = transactions.find((tx) => tx.id === id);
    if (!tx) return res.status(404).json({ error: "Not founssd" });
    res.json(tx);
});

app.delete("/transactions/:id", (req, res) => {
    const id = req.params.id;

    const idx = transactions.findIndex((tx) => tx.id === id);

    if (idx === -1) {
        return res.status(404).json({ error: "Not founds" });
    }

    transactions.splice(idx, 1);
    res.status(204).end();
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

app.use((req, res, next) => {
    res.status(404).json({ error: "Not Found" });
});

app.use((err, req, res, next) => {
    console.log(err.stack);

    res.status(500).json({
        error: "Internal Server Error",
        message: err.message,
    });
});

app.listen(3000, () => {
    console.log("http://localhost:3000/");
});
