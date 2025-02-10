import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
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
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ReportIcon from "@mui/icons-material/Assessment";
import SettingsIcon from "@mui/icons-material/Settings";

const Relatorio = () => {
  const [dados, setDados] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

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
    <Layout>
      <Drawer variant="permanent" sx={{ width: 240, flexShrink: 0 }}>
        <List>
          <ListItem button>
            <ListItemIcon><DashboardIcon /></ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button>
            <ListItemIcon><ReportIcon /></ListItemIcon>
            <ListItemText primary="Relatório" />
          </ListItem>
          <ListItem button>
            <ListItemIcon><SettingsIcon /></ListItemIcon>
            <ListItemText primary="Configurações" />
          </ListItem>
        </List>
      </Drawer>
      <Container maxWidth="md">
        <Box my={4} textAlign="center">
          <Typography variant="h4" component="h1">
            Relatório de Mensagens Enviadas
          </Typography>
        </Box>

        {carregando && (
          <Box display="flex" justifyContent="center" my={4}>
            <CircularProgress />
          </Box>
        )}

        {erro && (
          <Box my={3}>
            <Alert severity="error">{erro}</Alert>
          </Box>
        )}

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

        {!carregando && dados.length === 0 && !erro && (
          <Typography variant="body1" color="textSecondary" align="center" mt={3}>
            Nenhum dado encontrado.
          </Typography>
        )}
      </Container>
    </Layout>
  );
};

export default Relatorio;
