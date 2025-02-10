import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Relatorio from "../pages/Relatorio";
import Configuracoes from "../pages/Configuracoes";
import CriarConta from "../pages/CriarConta";
import EsqueceuSenha from "../pages/EsqueceuSenha";
import NotFound from "../pages/NotFound";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} /> {/* Página inicial corrigida */}
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/relatorio" element={<Relatorio />} />
                <Route path="/configuracoes" element={<Configuracoes />} />
                <Route path="/criar-conta" element={<CriarConta />} /> {/* Corrigida */}
                <Route path="/esqueceu-senha" element={<EsqueceuSenha />} /> {/* Corrigida */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
