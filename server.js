const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

const API_TOKEN = process.env.LANGFLOW_API_TOKEN;

// Middleware
app.use(bodyParser.json());
app.use(express.static("public")); // Serve frontend files from "public" folder

// Chat endpoint
app.post("/api/chat", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const response = await fetch("https://langflow-endpoint.example.com/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_TOKEN}`
      },
      body: JSON.stringify({ message })
    });

    const data = await response.json();
    res.json({ reply: data.reply });
  } catch (error) {
    console.error("Error communicating with LangFlow:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
