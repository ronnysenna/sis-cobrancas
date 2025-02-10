import axios from "axios";

const API_BASE_URL = "https://projetos-n8n-n8n.wchbax.easypanel.host/webhook/evolution"; 

const enviarArquivoParaN8n = async (arquivo, setProgresso) => {
  try {
    if (!arquivo) {
      console.error("❌ Nenhum arquivo selecionado para envio!");
      return { success: false, message: "Nenhum arquivo selecionado." };
    }

    const formData = new FormData();
    formData.append("file", arquivo);

    console.log("📤 Enviando arquivo para API:", arquivo.name);

    const response = await axios.post(API_BASE_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        if (setProgresso) {
          const percentComplete = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setProgresso(percentComplete);
        }
      },
    });

    console.log("✅ Resposta da API:", response.data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("❌ Erro ao enviar o arquivo:", error.response ? error.response.data : error.message);
    return { success: false, message: error.response ? error.response.data : "Erro desconhecido." };
  }
};

export { enviarArquivoParaN8n };
