const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname)));

const items = [
  {
    title: "Beginner Web Challenge Pack",
    description: "Five easy web tasks with hints, walkthroughs, and scores.",
    category: "Web",
    difficulty: "Easy",
    price: "$12",
  },
  {
    title: "Crypto Puzzle Kit",
    description: "A set of crypto challenges spanning CTF classics like XOR and RSA.",
    category: "Crypto",
    difficulty: "Medium",
    price: "$18",
  },
  {
    title: "Binary Exploitation Bundle",
    description: "Ready-to-use reverse engineering challenges with debug guidance.",
    category: "Binary",
    difficulty: "Hard",
    price: "$24",
  },
  {
    title: "OSINT Starter Pack",
    description: "Tools and guided tasks for reconnaissance practice and scoring.",
    category: "OSINT",
    difficulty: "Easy",
    price: "$10",
  },
  {
    title: "Forensics Mystery Set",
    description: "Investigate disk images, network captures, and hidden payloads.",
    category: "Forensics",
    difficulty: "Medium",
    price: "$16",
  },
  {
    title: "Red Team Toolkit",
    description: "A premium bundle with exploit templates, payload ideas, and tools.",
    category: "Tools",
    difficulty: "Hard",
    price: "$30",
  },
];

app.get("/api/items", (req, res) => {
  res.json(items);
});

app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;
  console.log("Contact request received:", { name, email, message });
  res.json({ status: "success", message: "Thanks! We received your message." });
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
