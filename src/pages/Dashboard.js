import React, { useState } from "react";
import * as XLSX from "xlsx";
import { useNavigate } from "react-router-dom";
import { enviarArquivoParaN8n } from "../services/api";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  CircularProgress,
  Alert,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import DescriptionIcon from "@mui/icons-material/Description";

const Dashboard = () => {
  const [arquivo, setArquivo] = useState(null);
  const [planilhaDados, setPlanilhaDados] = useState([]);
  const [mensagem, setMensagem] = useState("");
  const [enviando, setEnviando] = useState(false);
  const navigate = useNavigate();

  const handleArquivoSelecionado = (event) => {
    const file = event.target.files[0];
    if (file) {
      setArquivo(file);

      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });

        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        const jsonData = XLSX.utils.sheet_to_json(sheet);
        setPlanilhaDados(jsonData);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleEnviarArquivo = async () => {
    if (!arquivo) {
      setMensagem("Nenhum arquivo selecionado!");
      return;
    }

    setEnviando(true);
    setMensagem("");

    try {
      console.log("Enviando arquivo:", arquivo.name);
      const response = await enviarArquivoParaN8n(arquivo);

      if (response) {
        setMensagem("Arquivo enviado com sucesso!");
      } else {
        setMensagem("Erro ao enviar o arquivo.");
      }
    } catch (error) {
      setMensagem("Erro ao enviar o arquivo.");
      console.error("Erro no envio:", error);
    }

    setEnviando(false);
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: 240, boxSizing: "border-box", backgroundColor: "#1976d2", color: "white" },
        }}
      >
        <Typography variant="h6" align="center" sx={{ padding: "16px" }}>
          Menu
        </Typography>
        <Divider />
        <List>
          <ListItem button onClick={() => navigate("/dashboard")}>
            <HomeIcon sx={{ marginRight: 1 }} />
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button onClick={() => navigate("/relatorio")}>
            <DescriptionIcon sx={{ marginRight: 1 }} />
            <ListItemText primary="Relatório" />
          </ListItem>
          <ListItem button onClick={() => navigate("/configuracoes")}>
            <SettingsIcon sx={{ marginRight: 1 }} />
            <ListItemText primary="Configurações" />
          </ListItem>
        </List>
      </Drawer>

      {/* Conteúdo Principal */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Container maxWidth="md">
          <Box my={4} textAlign="center">
            <Typography variant="h4" component="h1">
              Envie Sua Planilha
            </Typography>
          </Box>

          {/* Botão de Upload */}
          <Box display="flex" alignItems="center" gap={2} mb={2}>
            <input
              accept=".xlsx"
              style={{ display: "none" }}
              id="upload-file"
              type="file"
              onChange={handleArquivoSelecionado}
            />
            <label htmlFor="upload-file">
              <Button
                variant="contained"
                color="primary"
                component="span"
                startIcon={<UploadFileIcon />}
              >
                Escolher Arquivo
              </Button>
            </label>

            {arquivo && (
              <Typography variant="body1" color="textSecondary">
                {arquivo.name}
              </Typography>
            )}
          </Box>

          {/* Exibe a tabela apenas se houver dados */}
          {planilhaDados.length > 0 && (
            <>
              <TableContainer component={Paper} sx={{ maxHeight: 400, mt: 4 }}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      {Object.keys(planilhaDados[0]).map((coluna, index) => (
                        <TableCell key={index} align="center" sx={{ fontWeight: "bold", backgroundColor: "#1976d2", color: "white" }}>
                          {coluna}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {planilhaDados.map((linha, index) => (
                      <TableRow key={index} hover>
                        {Object.values(linha).map((valor, idx) => (
                          <TableCell key={idx} align="center">
                            {valor}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* Botão de Envio */}
              <Box textAlign="right" mt={3}>
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleEnviarArquivo}
                  disabled={enviando}
                  startIcon={enviando ? <CircularProgress size={20} /> : <CloudUploadIcon />}
                >
                  {enviando ? "Enviando..." : "Enviar Arquivo"}
                </Button>
              </Box>
            </>
          )}

          {/* Mensagem de status */}
          {mensagem && (
            <Box mt={3}>
              <Alert severity={mensagem.includes("sucesso") ? "success" : "error"}>{mensagem}</Alert>
            </Box>
          )}
        </Container>
      </Box>
    </Box>
  );
};

export default Dashboard;
