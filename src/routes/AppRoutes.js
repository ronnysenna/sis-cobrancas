import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Relatorio from "../pages/Relatorio";
import Configuracoes from "../pages/Configuracoes";
import CriarConta from "../pages/CriarConta";
import EsqueceuSenha from "../pages/EsqueceuSenha";
import RedefinirSenha from "../pages/RedefinirSenha";
import NotFound from "../pages/NotFound";

import { BrowserRouter as Router } from "react-router-dom";

const AppRoutes = () => {
    return (
        <Router basename="/sis-cobrancas"> {/* Adicionando basename */}
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/relatorio" element={<Relatorio />} />
                <Route path="/configuracoes" element={<Configuracoes />} />
                <Route path="/criarconta" element={<CriarConta />} />
                <Route path="/esqueceusenha" element={<EsqueceuSenha />} />
                <Route path="/redefinirsenha/:token" element={<RedefinirSenha />} /> {/* Rota corrigida */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
