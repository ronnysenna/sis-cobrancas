import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import "bootstrap/dist/css/bootstrap.min.css";

const Relatorio = () => {
  const [dados, setDados] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    const buscarRelatorio = async () => {
      try {
        const response = await axios.get("https://projetos-n8n-n8n.wchbax.easypanel.host/webhook/realatorio");
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
      <div className="container mt-4">
        <h1 className="mb-4">Relatório de Mensagens Enviadas</h1>

        {/* Mensagem de carregamento */}
        {carregando && <p>Carregando...</p>}
        
        {/* Mensagem de erro */}
        {erro && <p className="text-danger">{erro}</p>}

        {/* Exibe a tabela apenas se houver dados */}
        {dados.length > 0 && (
          <div className="table-responsive" style={{ maxHeight: "500px", overflowY: "auto", overflowX: "auto" }}>
            <table className="table table-bordered table-hover" style={{ fontSize: "14px" }}>
              <thead style={{ backgroundColor: "#007bff", color: "white", position: "sticky", top: "0", zIndex: "2" }}>
                <tr>
                  {Object.keys(dados[0]).map((coluna, index) => (
                    <th key={index} className="text-center">{coluna}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dados.map((linha, index) => (
                  <tr key={index}>
                    {Object.values(linha).map((valor, idx) => (
                      <td key={idx} className="text-center">{valor}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Mensagem caso não haja dados */}
        {!carregando && dados.length === 0 && !erro && (
          <p className="text-center">Nenhum dado encontrado.</p>
        )}
      </div>
    </Layout>
  );
};

export default Relatorio;
