import React, { useState } from "react";
import * as XLSX from "xlsx";
import Layout from "../components/Layout";
import UploadPlanilha from "../components/UploadPlanilha";
import { enviarArquivoParaN8n } from "../services/api";
import "bootstrap/dist/css/bootstrap.min.css"; // Importação do Bootstrap

const Dashboard = () => {
  const [arquivo, setArquivo] = useState(null);
  const [planilhaDados, setPlanilhaDados] = useState([]);
  const [mensagem, setMensagem] = useState("");
  const [enviando, setEnviando] = useState(false);

  const handleArquivoSelecionado = (file) => {
    setArquivo(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      const jsonData = XLSX.utils.sheet_to_json(sheet);
      setPlanilhaDados(jsonData);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleEnviarArquivo = async () => {
    if (!arquivo) {
      setMensagem("Nenhum arquivo selecionado!");
      return;
    }

    setEnviando(true);
    setMensagem("");

    try {
      console.log("Enviando arquivo:", arquivo.name);
      const response = await enviarArquivoParaN8n(arquivo);

      if (response) {
        setMensagem("Arquivo enviado com sucesso!");
      } else {
        setMensagem("Erro ao enviar o arquivo.");
      }
    } catch (error) {
      setMensagem("Erro ao enviar o arquivo.");
      console.error("Erro no envio:", error);
    }

    setEnviando(false);
  };

  return (
    <Layout>
      <div className="container mt-4">
        <h1 className="mb-4">Dashboard</h1>

        {/* Componente de Upload */}
        <UploadPlanilha onFileSelected={handleArquivoSelecionado} />

        {/* Exibe mensagem do arquivo selecionado */}
        {arquivo && <p className="mt-2 text-primary">Arquivo: {arquivo.name}</p>}

        {/* Exibe a tabela apenas se houver dados */}
        {planilhaDados.length > 0 && (
          <>
            {/* Contêiner para permitir rolagem lateral e vertical */}
            <div className="table-responsive" style={{ maxHeight: "500px", overflowY: "auto", overflowX: "auto" }}>
              <table className="table table-bordered table-hover" style={{ fontSize: "14px" }}>
                <thead style={{ backgroundColor: "#007bff", color: "white", position: "sticky", top: "0", zIndex: "2" }}>
                  <tr>
                    {Object.keys(planilhaDados[0]).map((coluna, index) => (
                      <th key={index} className="text-center">{coluna}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {planilhaDados.map((linha, index) => (
                    <tr key={index}>
                      {Object.values(linha).map((valor, idx) => (
                        <td key={idx} className="text-center">{valor}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Botão para enviar dados ao back-end */}
            <div className="d-flex justify-content-end">
              <button 
                className="btn btn-success mt-3"
                onClick={handleEnviarArquivo}
                disabled={enviando}
              >
                {enviando ? "Enviando..." : "Enviar Arquivo para o Back-end"}
              </button>
            </div>
          </>
        )}

        {/* Mensagem de status */}
        {mensagem && <p className="mt-3 text-center">{mensagem}</p>}
      </div>
    </Layout>
  );
};

export default Dashboard;
