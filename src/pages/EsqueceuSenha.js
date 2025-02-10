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

const EsqueceuSenha = () => {
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate();

  const handleRecuperarSenha = () => {
    // Simulação de envio de e-mail
    console.log("Recuperação de senha enviada para:", email);
    setMensagem("Se este email estiver cadastrado, você receberá um link para redefinir sua senha.");
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
          Esqueceu a Senha?
        </Typography>

        {/* Campo de Email */}
        <TextField
          label="Email *"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Mensagem de Sucesso */}
        {mensagem && (
          <Typography color="primary" sx={{ mt: 1 }}>
            {mensagem}
          </Typography>
        )}

        {/* Botão de Recuperação */}
        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 3, bgcolor: "gray", "&:hover": { bgcolor: "black" } }}
          onClick={handleRecuperarSenha}
        >
          Recuperar Senha
        </Button>

        {/* Link para Login */}
        <Box mt={2}>
          <Link href="/" variant="body2" color="primary">
            Voltar para Login
          </Link>
        </Box>
      </Paper>
    </Box>
  );
};

export default EsqueceuSenha;
