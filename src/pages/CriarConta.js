import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  Link,
} from "@mui/material";

const CriarConta = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erro, setErro] = useState(null);
  const navigate = useNavigate();

  const handleCriarConta = () => {
    if (senha !== confirmarSenha) {
      setErro("As senhas não coincidem.");
      return;
    }

    // Simulação de criação de conta (trocar por API real depois)
    console.log("Conta criada:", { nome, email });
    navigate("/dashboard");
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#1976d2", // Fundo azul total
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

        {/* Mensagem de Erro */}
        {erro && (
          <Typography color="error" sx={{ mt: 1 }}>
            {erro}
          </Typography>
        )}

        {/* Botão Criar Conta */}
        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 3, bgcolor: "gray", "&:hover": { bgcolor: "black" } }}
          onClick={handleCriarConta}
        >
          Criar Conta
        </Button>

        {/* Link para Login */}
        <Box mt={2}>
          <Link href="/" variant="body2" color="primary">
            Já tem uma conta? Faça login
          </Link>
        </Box>
      </Paper>
    </Box>
  );
};

export default CriarConta;
