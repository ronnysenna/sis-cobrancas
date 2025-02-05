import axios from "axios";

// URL do Webhook do n8n
const API_BASE_URL = "https://n8n.ronnysenna.com.br/webhook/cobranca_rastro";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

