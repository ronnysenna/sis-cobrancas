import React, { useState } from "react";
import * as XLSX from "xlsx"; // Biblioteca para processar XLSX
import Layout from "../components/Layout";
import UploadPlanilha from "../components/UploadPlanilha";
import { enviarArquivoParaN8n } from "../services/api";

const Dashboard = () => {
  const [arquivo, setArquivo] = useState(null);
  const [planilhaDados, setPlanilhaDados] = useState([]);
  const [enviando, setEnviando] = useState(false);
  const [mensagem, setMensagem] = useState("");

  const handleArquivoSelecionado = (file) => {
    setArquivo(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      const sheetName = workbook.SheetNames[0]; // Pega a primeira aba
      const sheet = workbook.Sheets[sheetName];

      const jsonData = XLSX.utils.sheet_to_json(sheet); // Converte para JSON
      setPlanilhaDados(jsonData.slice(0, 5)); // Mostra os primeiros 5 registros
    };
    reader.readAsArrayBuffer(file);
  };

  const enviarPlanilhaParaN8n = async () => {
    if (!arquivo) {
      alert("Nenhum arquivo selecionado para envio.");
      return;
    }

    setEnviando(true);
    setMensagem("");

    try {
      const resposta = await enviarArquivoParaN8n(arquivo);
      if (resposta) {
        setMensagem("Arquivo enviado com sucesso!");
      } else {
        setMensagem("Erro ao enviar o arquivo.");
      }
    } catch (error) {
      setMensagem("Erro ao enviar o arquivo.");
      console.error("Erro:", error);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <Layout>
      <h1 className="text-primary">Dashboard</h1>
      <p>Bem-vindo ao sistema de cobrança!</p>

      {/* Componente de Upload */}
      <UploadPlanilha onFileSelected={handleArquivoSelecionado} />

      {/* Exibir prévia dos dados */}
      {planilhaDados.length > 0 && (
        <div className="mt-3">
          <h5>Prévia da Planilha:</h5>
          <table className="table">
            <thead>
              <tr>
                {Object.keys(planilhaDados[0]).map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {planilhaDados.map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((value, i) => (
                    <td key={i}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Botão de Envio */}
      <button className="btn btn-success mt-3" onClick={enviarPlanilhaParaN8n} disabled={enviando}>
        {enviando ? "Enviando..." : "Iniciar Disparo"}
      </button>

      {/* Exibir status do envio */}
      {mensagem && <p className="mt-3">{mensagem}</p>}
    </Layout>
  );
};

export default Dashboard;
