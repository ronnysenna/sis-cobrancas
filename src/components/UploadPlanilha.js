import React from "react";

const UploadPlanilha = ({ onFileSelected }) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onFileSelected(file);
    }
  };

  return (
    <div>
      <input type="file" accept=".xlsx" onChange={handleFileChange} />
    </div>
  );
};

export default UploadPlanilha;
