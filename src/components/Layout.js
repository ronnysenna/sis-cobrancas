import React from "react";
import { Link } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <div className="bg-dark text-white p-3" style={{ width: "250px", minHeight: "100vh" }}>
        <h3 className="text-center">Menu</h3>
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link to="/dashboard" className="nav-link text-white">Dashboard</Link>
          </li>
          <li className="nav-item">
            <Link to="/relatorio" className="nav-link text-white">Relatório</Link> {/* Alterado de "Cobranças" para "Relatório" */}
          </li>
          <li className="nav-item">
            <Link to="/configuracoes" className="nav-link text-white">Configurações</Link>
          </li>
        </ul>
      </div>

      {/* Conteúdo Principal */}
      <div className="flex-grow-1 p-4 bg-light">
        {children}
      </div>
    </div>
  );
};

export default Layout;
