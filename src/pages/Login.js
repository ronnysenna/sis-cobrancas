import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  IconButton,
  Link,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState(null);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email === "admin@ideal.com" && senha === "123456") {
      navigate("/dashboard");
    } else {
      setErro("Email ou senha incorretos.");
    }
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
        {/* Ícone de Configurações */}
        <IconButton sx={{ position: "absolute", top: 16, right: 16 }} color="inherit">
          <SettingsIcon />
        </IconButton>

        {/* Logo */}
        <Box mb={3}>
          <img src="/img/Logo_Ideal-03.png" alt="Grupo Ideal" style={{ width: "150px" }} />
        </Box>

        {/* Campos de Entrada */}
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

        {/* Mensagem de Erro */}
        {erro && (
          <Typography color="error" sx={{ mt: 1 }}>
            {erro}
          </Typography>
        )}

        {/* Botão de Login */}
        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 3, bgcolor: "gray", "&:hover": { bgcolor: "black" } }}
          onClick={handleLogin}
        >
          ENTRAR
        </Button>

        {/* Links para Criar Conta e Esqueceu Senha */}
        <Box mt={2}>
          <Link href="/esqueceu-senha" variant="body2" color="primary">
            Esqueceu a senha?
          </Link>
        </Box>
        <Box mt={1}>
          <Link href="/criar-conta" variant="body2" color="primary">
            Criar uma conta
          </Link>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
