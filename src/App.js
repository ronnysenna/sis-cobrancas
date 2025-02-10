import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Relatorio from "./pages/Relatorio"; // Nova página
import Configuracoes from "./pages/Configuracoes";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} /> {/* Redireciona para Dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/relatorio" element={<Relatorio />} /> {/* Nova rota */}
          <Route path="/configuracoes" element={<Configuracoes />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
