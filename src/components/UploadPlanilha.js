import React, { useState } from "react";

const UploadPlanilha = ({ onFileSelected }) => {
  const [fileName, setFileName] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      console.log("Arquivo selecionado:", file.name); // Log para depuração
      onFileSelected(file);
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-medium mb-2">Selecione um arquivo:</label>
      
      <input 
        type="file" 
        accept=".xlsx" 
        className="block w-full border border-gray-300 shadow-sm rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={handleFileChange} 
      />
      
      {fileName && (
        <p className="mt-2 text-green-600 font-medium">
          Arquivo selecionado: {fileName}
        </p>
      )}
    </div>
  );
};

export default UploadPlanilha;
