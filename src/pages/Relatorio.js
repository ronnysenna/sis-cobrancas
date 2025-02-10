import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
  CircularProgress,
  Alert,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import DescriptionIcon from "@mui/icons-material/Description";

const Relatorio = () => {
  const [dados, setDados] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const buscarRelatorio = async () => {
      try {
        const response = await axios.get("https://projetos-n8n-n8n.wchbax.easypanel.host/webhook/relatorio");
        setDados(response.data);
      } catch (error) {
        console.error("Erro ao buscar relatório:", error);
        setErro("Erro ao carregar os dados.");
      }
      setCarregando(false);
    };

    buscarRelatorio();
  }, []);

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
              Relatório de Mensagens Enviadas
            </Typography>
          </Box>

          {/* Mensagem de carregamento */}
          {carregando && (
            <Box display="flex" justifyContent="center" my={4}>
              <CircularProgress />
            </Box>
          )}

          {/* Mensagem de erro */}
          {erro && (
            <Box my={3}>
              <Alert severity="error">{erro}</Alert>
            </Box>
          )}

          {/* Exibe a tabela apenas se houver dados */}
          {dados.length > 0 && (
            <TableContainer component={Paper} sx={{ maxHeight: 400, mt: 4 }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    {Object.keys(dados[0]).map((coluna, index) => (
                      <TableCell key={index} align="center" sx={{ fontWeight: "bold", backgroundColor: "#1976d2", color: "white" }}>
                        {coluna}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dados.map((linha, index) => (
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
          )}

          {/* Mensagem caso não haja dados */}
          {!carregando && dados.length === 0 && !erro && (
            <Typography variant="body1" color="textSecondary" align="center" mt={3}>
              Nenhum dado encontrado.
            </Typography>
          )}
        </Container>
      </Box>
    </Box>
  );
};

export default Relatorio;
