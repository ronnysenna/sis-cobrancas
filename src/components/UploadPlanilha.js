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
    <div className="mb-3">
      <label className="form-label">Selecione um arquivo:</label>
      <input type="file" accept=".xlsx" className="form-control" onChange={handleFileChange} />
      {fileName && <p className="mt-2 text-success">Arquivo selecionado: {fileName}</p>}
    </div>
  );
};

export default UploadPlanilha;
