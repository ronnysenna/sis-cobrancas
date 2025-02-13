import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import CriarConta from "./pages/CriarConta";
import EsqueceuSenha from "./pages/EsqueceuSenha";
import Dashboard from "./pages/Dashboard";
import Relatorio from "./pages/Relatorio";
import Configuracoes from "./pages/Configuracoes";
import RedefinirSenha from "./pages/RedefinirSenha";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter basename="/sis-cobrancas"> {/* Adicionado basename */}
      <Routes>
        {/* Redireciona para Login ao entrar no sistema */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Páginas principais */}
        <Route path="/login" element={<Login />} />
        <Route path="/criarconta" element={<CriarConta />} />
        <Route path="/esqueceusenha" element={<EsqueceuSenha />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/relatorio" element={<Relatorio />} />
        <Route path="/configuracoes" element={<Configuracoes />} />
        <Route path="/redefinirsenha/:token" element={<RedefinirSenha />} />


        {/* Página 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
