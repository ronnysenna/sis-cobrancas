import axios from "axios";

const API_BASE_URL = "https://n8n.ronnysenna.com.br/webhook/receber_planilha";

const enviarArquivoParaN8n = async (arquivo) => {
  try {
    const formData = new FormData();
    formData.append("file", arquivo); // Envia o arquivo como 'file'

    const response = await axios.post(API_BASE_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("Resposta da API:", response.data);
    return response.data;
  } catch (error) {
    console.error("Erro ao enviar o arquivo:", error);
  }
};

export { enviarArquivoParaN8n };
