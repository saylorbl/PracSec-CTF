const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./plunder.db');

app.use(express.json());
app.use(express.static(path.join(__dirname)));

const items = [
  {
    title: "Davy Jones' Treasure Map",
    description: "Ancient chart leading to a hidden cove of golden doubloons.",
    category: "Maps",
    price: "15 doubloons",
    rating: 5,
  },
  {
    title: "Barrel of Ember Rum",
    description: "Aged rum to keep your crew in fighting spirit after long raids.",
    category: "Supplies",
    price: "8 doubloons",
    rating: 4,
  },
  {
    title: "Cursed Cutlass Set",
    description: "Twin blades said to bring luck to any swashbuckler.",
    category: "Weapons",
    price: "28 doubloons",
    rating: 4,
  },
  {
    title: "Ghost Ship Ledger",
    description: "A ledger of lost voyages and secret escape routes.",
    category: "Lore",
    price: "18 doubloons",
    rating: 4,
  },
  {
    title: "Powder Keg Bundle",
    description: "Ready-to-use black powder and fuses for cannon attacks.",
    category: "Siege",
    price: "20 doubloons",
    rating: 3,
  },
  {
    title: "Navigator's Spyglass",
    description: "Brass spyglass to spot distant islands and rival ships.",
    category: "Gear",
    price: "24 doubloons",
    rating: 5,
  },
];

app.get("/api/search", (req, res) => {
    const query = req.query.q || '';
    // Added 'description' to the SELECT statement
    const sql = `SELECT name, price, description FROM products WHERE name LIKE '%${query}%'`;
    
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }
    });
});
app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;
  console.log("Harbor message received:", { name, email, message });
  res.json({ status: "success", message: "A crow's nest lookout has seen your note." });
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
