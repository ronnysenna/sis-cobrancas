import React, { useState } from "react";
import { Container, Typography, Button, Box } from "@mui/material";

const Dashboard = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" align="center">
          Dashboard
        </Typography>
        <Button variant="contained" color="primary">
          Clique Aqui
        </Button>
      </Box>
    </Container>
  );
};

export default Dashboard;
