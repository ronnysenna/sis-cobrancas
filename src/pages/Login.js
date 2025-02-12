import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState(null);
  const [sucesso, setSucesso] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    console.log("📤 Enviando requisição de login...");

    try {
      const response = await fetch(
        "https://projetos-n8n-n8n.wchbax.easypanel.host/webhook/webhook/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            senha: senha,
          }),
        }
      );

      console.log("✅ Resposta recebida. Status:", response.status);

      const responseText = await response.text();
      console.log("✅ Texto da resposta:", responseText);
      
      let data;
      try {
        data = JSON.parse(responseText);

        // Verifica se o JSON está aninhado de forma incorreta
        if (typeof data === "object" && Object.keys(data).length === 1) {
          const firstKey = Object.keys(data)[0];
          if (Array.isArray(data[firstKey])) {
            data = data[firstKey][0]; // Pega o primeiro elemento do array
          }
        }
        
      } catch (e) {
        throw new Error("Resposta do servidor não é um JSON válido.");
      }

      console.log("✅ Resposta do servidor ajustada:", data);

      if (data && typeof data === "object" && data.sucesso) {
        console.log("✅ Login bem-sucedido!");
        setSucesso(true);

        setTimeout(() => {
          setSucesso(false);
          navigate("/dashboard");
        }, 2000);
      } else {
        console.error("❌ Resposta inválida:", data);
        throw new Error(data?.mensagem || "Erro ao fazer login.");
      }
    } catch (error) {
      console.error("❌ Erro ao fazer login:", error);
      setErro(error.message);
    }
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
        <img src="/img/logo.jpeg" alt="Logo" style={{ width: '360px', marginBottom: '16px' }} />

        <TextField
          label="Email *"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Senha *"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        {erro && (
          <Typography color="error" sx={{ mt: 1 }}>
            {erro}
          </Typography>
        )}

        <Button variant="contained" fullWidth sx={{ mt: 3, bgcolor: "black", "&:hover": { bgcolor: "gray" } }} onClick={handleLogin}>
  ENTRAR
</Button>

<Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
  <a href="/EsqueceuSenha" style={{ textDecoration: 'none', color: '#1976d2' }}>Esqueci minha senha</a>
</Typography>
<Typography variant="body2" sx={{ mt: 1, textAlign: 'center' }}>
  Não tem uma conta? <a href="/CriarConta" style={{ textDecoration: 'none', color: '#1976d2' }}>Criar conta</a>
</Typography>

      </Paper>

      <Snackbar
        open={sucesso}
        autoHideDuration={2000}
        onClose={() => setSucesso(false)}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Login bem-sucedido! Redirecionando...
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Login;
