import axios from "axios";

const API_BASE_URL = "https://projetos-n8n-n8n.wchbax.easypanel.host/webhook/evolution"; 

const enviarArquivoParaN8n = async (arquivo) => {
  try {
    if (!arquivo) {
      console.error("Nenhum arquivo selecionado para envio!");
      return;
    }

    const formData = new FormData();
    formData.append("file", arquivo);

    console.log("Enviando arquivo para API:", arquivo.name); // Log para depuração

    const response = await axios.post(API_BASE_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("Resposta da API:", response.data);
    return response.data;
  } catch (error) {
    console.error("Erro ao enviar o arquivo:", error.response ? error.response.data : error.message);
  }
};

export { enviarArquivoParaN8n };
