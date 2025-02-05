import React from "react";
import { Link } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div className="bg-dark text-white vh-100 p-3" style={{ width: "250px" }}>
        <h3 className="text-center">Menu</h3>
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link to="/dashboard" className="nav-link text-white">Dashboard</Link>
          </li>
          <li className="nav-item">
            <Link to="/cobrancas" className="nav-link text-white">Cobranças</Link>
          </li>
          <li className="nav-item">
            <Link to="/configuracoes" className="nav-link text-white">Configurações</Link>
          </li>
        </ul>
      </div>

      {/* Conteúdo Principal */}
      <div className="flex-grow-1 p-4">
        {children}
      </div>
    </div>
  );
};

export default Layout;
