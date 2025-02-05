import React, { useState } from "react";
import Layout from "../components/Layout";
import api from "../services/api"; // Importação correta da API

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState("");

  const enviarCobranca = async () => {
    setLoading(true);
    setMensagem("");
    try {
      const response = await api.post("/", {
        cliente: "João Silva",
        valor: 250.00
      });

      setMensagem("Cobrança enviada com sucesso!");
      console.log("Resposta da API:", response.data);
    } catch (error) {
      setMensagem("Erro ao enviar cobrança.");
      console.error("Erro ao enviar cobrança:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <h1 className="text-primary">Dashboard</h1>
      <p>Bem-vindo ao sistema de cobrança!</p>

      {/* Botão para enviar cobrança */}
      <button className="btn btn-success mt-3" onClick={enviarCobranca} disabled={loading}>
        {loading ? "Enviando..." : "Enviar Cobrança"}
      </button>

      {/* Exibir mensagem de status */}
      {mensagem && <p className="mt-3">{mensagem}</p>}
    </Layout>
  );
};

export default Dashboard;
