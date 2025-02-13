import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  Link,
  CircularProgress,
  Alert
} from "@mui/material";
import axios from "axios";

const EsqueceuSenha = () => {
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);
  const navigate = useNavigate();

  // Validação de e-mail (formato correto)
  const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleRecuperarSenha = async () => {
    // Verifica se o campo está vazio
    if (!email.trim()) {
      setErro("Por favor, insira um e-mail.");
      return;
    }

    // Valida o formato do e-mail
    if (!validarEmail(email)) {
      setErro("Por favor, insira um e-mail válido.");
      return;
    }

    setCarregando(true);
    setErro(null);
    setMensagem("");

    try {
      console.log("📨 Enviando requisição para recuperação de senha...");
      
      const response = await axios.post(
        "https://projetos-n8n-n8n.wchbax.easypanel.host/webhook/api/recuperar-senha",
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("📩 Resposta da API:", response.data);

      // Garante que a resposta seja interpretada corretamente
      const resposta = response.data;

      // Verifica se a resposta contém 'sucesso' ou 'successo' (caso haja variação)
      const sucesso = resposta.sucesso || resposta.successo || false;
      const mensagemResposta = resposta.mensagem || "Verifique seu e-mail para redefinir sua senha.";

      if (sucesso) {
        setMensagem(mensagemResposta);
        
        // Aguarda 3 segundos e redireciona para o login
        setTimeout(() => {
          navigate("/login"); // Redireciona para a página de login
        }, 3000);
      } else {
        setErro(mensagemResposta || "E-mail não encontrado. Verifique e tente novamente.");
      }
    } catch (error) {
      console.error("❌ Erro ao recuperar senha:", error);

      // Trata erros de rede ou respostas mal formatadas
      if (error.response) {
        // Se a API retornar uma resposta com status de erro
        setErro(error.response.data?.mensagem || "Erro ao solicitar recuperação de senha. Tente novamente mais tarde.");
      } else if (error.request) {
        // Se a requisição foi feita, mas não houve resposta
        setErro("Não foi possível conectar ao servidor. Verifique sua conexão com a internet.");
      } else {
        // Outros erros
        setErro("Ocorreu um erro inesperado. Tente novamente mais tarde.");
      }
    }

    setCarregando(false);
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#1976d2",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          textAlign: "center",
          width: "100%",
          maxWidth: 400,
          borderRadius: 3,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Esqueceu a Senha?
        </Typography>

        <TextField
          label="Email *"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {erro && <Alert severity="error">{erro}</Alert>}
        {mensagem && <Alert severity="success">{mensagem}</Alert>}

        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 3, bgcolor: "gray", "&:hover": { bgcolor: "black" } }}
          onClick={handleRecuperarSenha}
          disabled={carregando}
        >
          {carregando ? <CircularProgress size={24} color="inherit" /> : "Recuperar Senha"}
        </Button>

        <Box mt={2}>
          <Link href="/sis-cobrancas/login" variant="body2" color="primary">
            Voltar para Login
          </Link>
        </Box>
      </Paper>
    </Box>
  );
};

export default EsqueceuSenha;