# Financier

## Table of contents

1. [Project Overview](#project-overview)
2. [Technologies Used](#technologies-used)
3. [Usage](#usage)
4. [Features](#features)
5. [License](#license)

---

## Project Overview

Financier is a minimal web application for tracking income and expenses. It provides a simple dashboard that shows:

-   A table of all transactions (date, categorty, description, amount, type).
-   A summary of total income, total expenses, and net balance.
-   A breakdown of expenses by category.

> **DISCLAIMER:**

     This is a small educational project. It is not meant for real-world financial monitoring.

## Technologies Used

-   **Backend:**

    -   [Node.js](https://nodejs.org/)
    -   [Express](https://expressjs.com/)
    -   [UUID](https://www.npmjs.com/package/uuid) (for generating unique transaction IDs)
    -   [escape-html](https://www.npmjs.com/package/escape-html) (basic output sanitization)

-   **Frontend:**

    -   Plain HTML/CSS/JavaScript (no frontend frameword)

-   **Dev Tools:**
    -   [nodemon](https://github.com/remy/nodemon) (for automatic server restarts during development)

## Usage

1. **Dashboard (Home Page)**
    - Lists all transactions in a table.
    - Displays total Income, total Expenses, and Net Balance at the top.
    - Shows a "Distribution by category" section that breaks down expenses by category.
    - "Add transaction" button redirects to the add form.
    - Each transaction row has "Edit" and "Delete" controls.
2. **Add Transaction**
    - Navigate to /add.html (via “Add Transaction” link).
    - Fill in Date, Category, Description, Amount, and Type (Income or Expense).
    - Click “Save.” The new transaction is pushed into the server’s in‐memory list and you’re redirected to the dashboard.
3. **Edit Transaction**
    - Click the “Edit” icon next to any transaction.
    - The form at /edit.html?id=<transaction_id> pre‐populates fields with existing values.
    - Modify any field and click “Update.” Changes are sent via a PUT request, and you return to the dashboard.
4. **Delete Transaction**
    - Click the “Trash” icon next to a transaction.
    - A DELETE request is issued to /transactions/<id>.
    - The transaction is removed from the in‐memory list and the dashboard refreshes.

## Features

-   **CRUD** Operations for Transactions:
    -   Create new income/expense entries.
    -   Read and display all transactions in a paginated table (currently no pagination due to small data set).
    -   Update existing transactions (date, category, description, amount, type).
    -   Delete transactions permanently (until next server restart).
-   **Summary View:**
    -   Automatically calculates and displays Total Income, Total Expenses, and Net Balance using /summary endpoint.
    -   Net Balance = Total Income − Total Expenses.
-   **Category Breakdown:**
    -   Renders expense categories as cards, each showing that category’s total expense.
    -   Color‐coded cards generated dynamically (card colors are hard‐coded in the JS, but easily adjustable).
-   **Input Sanitization:**
    -   Uses escape-html to escape any HTML in description fields (rudimentary protection against XSS).

## License

This project is provided “as is” for educational purposes. No warranty is implied. Feel free to fork, modify, and adapt, but do not use it for production without addressing the above limitations.
