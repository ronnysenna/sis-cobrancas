import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import CriarConta from "./pages/CriarConta";
import EsqueceuSenha from "./pages/EsqueceuSenha";
import Dashboard from "./pages/Dashboard";
import Relatorio from "./pages/Relatorio";
import Configuracoes from "./pages/Configuracoes";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          {/* Redireciona para Login ao entrar no sistema */}
          <Route path="/" element={<Navigate to="/login" />} />

          {/* Páginas principais */}
          <Route path="/login" element={<Login />} />
          <Route path="/criar-conta" element={<CriarConta />} />
          <Route path="/esqueceu-senha" element={<EsqueceuSenha />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/relatorio" element={<Relatorio />} />
          <Route path="/configuracoes" element={<Configuracoes />} />

          {/* Página 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
