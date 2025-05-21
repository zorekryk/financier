const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));

const transactions = [];

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
app.listen(3000, () => {
    console.log("http://localhost:3000/");
});
