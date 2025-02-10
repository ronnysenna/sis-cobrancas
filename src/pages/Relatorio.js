import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";

const Relatorio = () => {
  const [dados, setDados] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    const buscarRelatorio = async () => {
      try {
        const response = await axios.get("https://projetos-n8n-n8n.wchbax.easypanel.host/webhook/relatorio");
        setDados(response.data);
      } catch (error) {
        console.error("Erro ao buscar relatório:", error);
        setErro("Erro ao carregar os dados.");
      }
      setCarregando(false);
    };

    buscarRelatorio();
  }, []);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Relatório de Mensagens Enviadas</h1>

        {/* Mensagem de carregamento */}
        {carregando && <p className="text-center text-gray-500">Carregando...</p>}
        
        {/* Mensagem de erro */}
        {erro && <p className="text-center text-red-600">{erro}</p>}

        {/* Exibe a tabela apenas se houver dados */}
        {dados.length > 0 && (
          <div className="overflow-x-auto overflow-y-auto max-h-80 border border-gray-300 rounded-md shadow-md mt-4">
            <table className="w-full border-collapse">
              <thead className="bg-blue-600 text-white sticky top-0">
                <tr>
                  {Object.keys(dados[0]).map((coluna, index) => (
                    <th key={index} className="px-4 py-2 text-center border border-gray-300">{coluna}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dados.map((linha, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    {Object.values(linha).map((valor, idx) => (
                      <td key={idx} className="px-4 py-2 text-center border border-gray-300">{valor}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Mensagem caso não haja dados */}
        {!carregando && dados.length === 0 && !erro && (
          <p className="text-center text-gray-500">Nenhum dado encontrado.</p>
        )}
      </div>
    </Layout>
  );
};

export default Relatorio;
