import React, { useState } from "react";
import * as XLSX from "xlsx";
import Layout from "../components/Layout";
import UploadPlanilha from "../components/UploadPlanilha";
import { enviarArquivoParaN8n } from "../services/api";

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
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Envie Sua Planilha</h1>

        {/* Componente de Upload */}
        <UploadPlanilha onFileSelected={handleArquivoSelecionado} />

        {/* Exibe mensagem do arquivo selecionado */}
        {arquivo && <p className="mt-2 text-blue-500">Arquivo: {arquivo.name}</p>}

        {/* Exibe a tabela apenas se houver dados */}
        {planilhaDados.length > 0 && (
          <>
            {/* Contêiner para permitir rolagem lateral e vertical */}
            <div className="overflow-x-auto overflow-y-auto max-h-80 border border-gray-300 rounded-md shadow-md mt-4">
              <table className="w-full border-collapse">
                <thead className="bg-blue-600 text-white sticky top-0">
                  <tr>
                    {Object.keys(planilhaDados[0]).map((coluna, index) => (
                      <th key={index} className="px-4 py-2 text-center border border-gray-300">{coluna}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {planilhaDados.map((linha, index) => (
                    <tr key={index} className="hover:bg-gray-100">
                      {Object.values(linha).map((valor, idx) => (
                        <td key={idx} className="px-4 py-2 text-center border border-gray-300">{valor}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Botão de Envio */}
            <div className="flex justify-end mt-4">
              <button 
                className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition duration-300 disabled:bg-gray-400"
                onClick={handleEnviarArquivo}
                disabled={enviando}
              >
                {enviando ? "Enviando..." : "Enviar Arquivo"}
              </button>
            </div>
          </>
        )}

        {/* Mensagem de status */}
        {mensagem && <p className="mt-3 text-center text-gray-700">{mensagem}</p>}
      </div>
    </Layout>
  );
};

export default Dashboard;
