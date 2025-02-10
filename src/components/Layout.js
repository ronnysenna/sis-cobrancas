import React from "react";
import { Link } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="bg-gray-900 text-white w-64 p-4 flex flex-col">
        <h3 className="text-center text-xl font-semibold mb-4">Menu</h3>
        <ul className="space-y-2">
          <li>
            <Link to="/dashboard" className="block px-4 py-2 rounded-lg hover:bg-gray-700 transition">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/relatorio" className="block px-4 py-2 rounded-lg hover:bg-gray-700 transition">
              Relatório
            </Link>
          </li>
          <li>
            <Link to="/configuracoes" className="block px-4 py-2 rounded-lg hover:bg-gray-700 transition">
              Configurações
            </Link>
          </li>
        </ul>
      </div>

      {/* Conteúdo Principal */}
      <div className="flex-grow p-6 bg-gray-100">
        {children}
      </div>
    </div>
  );
};

export default Layout;
