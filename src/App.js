import React, { useState } from "react";
import { Box, Typography, TextField } from "@mui/material";
import CalculatorTable from "./components/CalculatorTable";

function App() {
  const [rows, setRows] = useState(5);
  const [deliveryCharges, setDeliveryCharges] = useState(0);
  const [error, setError] = useState("");

  const handleRowChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value > 30) {
      setError("Maximum number of rows allowed is 30.");
    } else {
      setError("");
      setRows(value || 1); // Default to 1 if input is empty
    }
  };

  const handleDeliveryChargesChange = (e) => {
    const value = parseFloat(e.target.value);
    if (value < 0) {
    } else {
      setDeliveryCharges(value || 0); // Default to 0 if input is empty
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
          <a
            href="https://www.we-over-i.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/logo192.png"
              alt="Logo"
              style={{ width: "auto", height: "50px" }}
            />
          </a>
        </Box>
        <Typography variant="h5">{"WE > i: Splitwise Calculator"}</Typography>
        <Box>
        <TextField
            label="Delivery Charges"
            placeholder="Enter, if any..."
            type="number"
            value={deliveryCharges === 0 ? "" : deliveryCharges}
            onChange={handleDeliveryChargesChange}
            error={!!error}
            helperText={error}
            variant="outlined"
            size="small"
            sx={{ width: 160 , mr: 2}}
          />
          <TextField
            label="Number of Rows"
            type="number"
            value={rows}
            onChange={handleRowChange}
            error={!!error}
            helperText={error}
            variant="outlined"
            size="small"
            sx={{ width: 160, mb: 2 }}
          />
         
        </Box>
      </Box>
      <CalculatorTable rows={rows} deliveryCharges={deliveryCharges} />
    </Box>
  );
}

export default App;