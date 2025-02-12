
require("dotenv").config();
const express = require("express");
const { Pool } = require("pg");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Conectar ao PostgreSQL
const db = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT, // Normalmente 5432
});

// Verificar conexão
db.connect()
  .then(() => console.log("✅ Conectado ao PostgreSQL"))
  .catch((err) => console.error("❌ Erro ao conectar ao banco:", err));

