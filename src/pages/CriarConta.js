import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  Link,
  Snackbar,
  Alert,
} from "@mui/material";

const CriarConta = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erro, setErro] = useState(null);
  const [sucesso, setSucesso] = useState(false);
  const navigate = useNavigate();

  const handleCriarConta = async () => {
    // Validações
    if (!nome || !email || !senha || !confirmarSenha) {
      setErro("Todos os campos são obrigatórios.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setErro("Por favor, insira um e-mail válido.");
      return;
    }

    if (senha !== confirmarSenha) {
      setErro("As senhas não coincidem.");
      return;
    }

    console.log("📤 Enviando requisição para criar conta...");

    try {
      const response = await fetch(
        "https://project-n8n.s85eiy.easypanel.host/webhook/criarConta",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nome_completo: nome,
            email: email,
            senha: senha,
          }),
        }
      );

      const data = await response.json();
      console.log("✅ Resposta do servidor:", data);

      if (!response.ok) {
        throw new Error(data.mensagem || "Erro ao criar conta.");
      }

      setSucesso(true); // Exibir popup de sucesso

      // Aguardar 2 segundos e redirecionar para login
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error("❌ Erro ao criar conta:", error);
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
        {/* Título */}
        <Typography variant="h5" gutterBottom>
          Criar Conta
        </Typography>

        {/* Campos de Entrada */}
        <TextField
          label="Nome *"
          variant="outlined"
          fullWidth
          margin="normal"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
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
        <TextField
          label="Confirmar Senha *"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={confirmarSenha}
          onChange={(e) => setConfirmarSenha(e.target.value)}
        />

        {/* Botão Criar Conta */}
        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 3, bgcolor: "black", "&:hover": { bgcolor: "gray" } }}
          onClick={handleCriarConta}
        >
          Criar Conta
        </Button>

        {/* Link para Login */}
        <Box mt={2}>
          <Link href="/sis-cobrancas/login" variant="body2" color="primary">
            Já tem uma conta? Faça login
          </Link>
        </Box>
      </Paper>

      {/* Snackbar de Sucesso */}
      <Snackbar
        open={sucesso}
        autoHideDuration={2000}
        onClose={() => setSucesso(false)}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Conta criada com sucesso! Redirecionando...
        </Alert>
      </Snackbar>

      {/* Snackbar de Erro */}
      <Snackbar
        open={!!erro}
        autoHideDuration={6000}
        onClose={() => setErro(null)}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          {erro}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CriarConta;