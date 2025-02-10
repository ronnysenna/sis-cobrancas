import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Relatorio from "../pages/Relatorio"; // Alterado de "Cobrancas" para "Relatorio"
import Configuracoes from "../pages/Configuracoes";
import NotFound from "../pages/NotFound";

const theme = createTheme({
    palette: {
        primary: {
            main: "#1976d2",
        },
        secondary: {
            main: "#dc004e",
        },
    },
});

const AppRoutes = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline /> {/* Reseta estilos padrão para seguir Material UI */}
            <Router>
                <Routes>
                    <Route path="/" element={<Navigate to="/dashboard" />} /> {/* Redireciona para Dashboard */}
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/relatorio" element={<Relatorio />} /> {/* Atualizado */}
                    <Route path="/configuracoes" element={<Configuracoes />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
        </ThemeProvider>
    );
};

export default AppRoutes;
