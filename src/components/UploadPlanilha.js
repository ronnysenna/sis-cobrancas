import React, { useState } from "react";
import { Box, Button, Typography, Input } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";

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
    <Box my={3}>
      <Typography variant="subtitle1" color="textPrimary" gutterBottom>
        Selecione um arquivo:
      </Typography>

      <label htmlFor="upload-file">
        <Input 
          type="file" 
          accept=".xlsx" 
          id="upload-file" 
          sx={{ display: "none" }} 
          onChange={handleFileChange} 
        />
        <Button
          variant="contained"
          component="span"
          color="primary"
          startIcon={<UploadFileIcon />}
        >
          Escolher Arquivo
        </Button>
      </label>

      {fileName && (
        <Typography variant="body2" color="success.main" mt={2}>
          Arquivo selecionado: {fileName}
        </Typography>
      )}
    </Box>
  );
};

export default UploadPlanilha;
