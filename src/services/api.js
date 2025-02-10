import axios from "axios";

const API_BASE_URL = "https://projetos-n8n-n8n.wchbax.easypanel.host/webhook/evolution";

const enviarArquivoParaN8n = async (arquivo, setProgresso, setMensagem) => {
  try {
    if (!arquivo) {
      console.error("❌ Nenhum arquivo selecionado para envio!");
      setMensagem && setMensagem({ type: "error", text: "Nenhum arquivo selecionado." });
      return { success: false, message: "Nenhum arquivo selecionado." };
    }

    const formData = new FormData();
    formData.append("file", arquivo);

    console.log(`📤 Enviando arquivo para API: ${arquivo.name}`);

    // Criando um AbortController para cancelar a requisição se necessário
    const controller = new AbortController();
    const signal = controller.signal;

    const response = await axios.post(API_BASE_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      signal, // Passando o sinal do AbortController
      timeout: 30000, // Timeout de 30 segundos
      onUploadProgress: (progressEvent) => {
        if (setProgresso) {
          const percentComplete = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setProgresso(percentComplete);
        }
      },
    });

    console.log("✅ Resposta da API:", response.data);
    setMensagem && setMensagem({ type: "success", text: "Arquivo enviado com sucesso!" });

    return { success: true, data: response.data };
  } catch (error) {
    let errorMessage = "Erro desconhecido.";

    if (axios.isCancel(error)) {
      errorMessage = "O envio do arquivo foi cancelado.";
    } else if (error.code === "ECONNABORTED") {
      errorMessage = "Tempo limite atingido. Tente novamente.";
    } else if (error.response) {
      errorMessage = error.response.data.message || "Erro ao enviar o arquivo.";
    } else {
      errorMessage = error.message;
    }

    console.error("❌ Erro ao enviar o arquivo:", errorMessage);
    setMensagem && setMensagem({ type: "error", text: errorMessage });

    return { success: false, message: errorMessage };
  }
};

export { enviarArquivoParaN8n };
