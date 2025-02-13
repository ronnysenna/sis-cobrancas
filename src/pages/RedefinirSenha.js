import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";

import {
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  Alert,
} from "@mui/material";
import axios from "axios";

const RedefinirSenha = () => {
  const { token } = useParams(); // Captura o token da URL
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const navigate = useNavigate();

  const handleRedefinirSenha = async () => {
    if (senha !== confirmarSenha) {
      setErro("As senhas não coincidem.");
      return;
    }

    setCarregando(true);
    setErro(null);
    setMensagem("");

    try {
      const response = await axios.post(
        "https://projetos-n8n-n8n.wchbax.easypanel.host/webhook/redefinir-senha", // Endpoint correto para redefinir senha
        { token, senha }
      );

      if (response.data.sucesso || response.data.success) {
        setMensagem("Senha redefinida com sucesso! Você será redirecionado.");
        setTimeout(() => navigate("/sis-cobrancas/login"), 3000);
      } else {
        setErro(response.data.mensagem || "Token inválido ou expirado.");
      }
    } catch (error) {
      console.error("❌ Erro ao redefinir senha:", error);
      setErro(error.response?.data?.mensagem || "Erro ao redefinir a senha. Tente novamente.");
    } finally {
      setCarregando(false);
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
        <Typography variant="h5" gutterBottom>
          Redefinir Senha
        </Typography>

        <TextField
          label="Nova Senha *"
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

        {erro && <Alert severity="error">{erro}</Alert>}
        {mensagem && <Alert severity="success">{mensagem}</Alert>}

        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 3, bgcolor: "gray", "&:hover": { bgcolor: "black" } }}
          onClick={handleRedefinirSenha}
          disabled={carregando}
        >
          {carregando ? <CircularProgress size={24} color="inherit" /> : "Redefinir Senha"}
        </Button>
      </Paper>
    </Box>
  );
};

export default RedefinirSenha;