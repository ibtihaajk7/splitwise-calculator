import React, { useState } from "react";
import { Box, Typography, TextField } from "@mui/material";
import CalculatorTable from "./components/CalculatorTable";

const LOGO_URL = "/logo192.png";
const WEBSITE_URL = "https://www.we-over-i.com";
const MAX_ROWS = 30;

function App() {
  const [rows, setRows] = useState(5);
  const [deliveryCharges, setDeliveryCharges] = useState(0);
  const [error, setError] = useState("");

  const handleRowChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value > MAX_ROWS) {
      setError(`Maximum number of rows allowed is ${MAX_ROWS}.`);
    } else {
      setError("");
      setRows(value || 1);
    }
  };

  const handleDeliveryChargesChange = (e) => {
    const value = parseFloat(e.target.value);
    if (value >= 0 || isNaN(value)) {
      setDeliveryCharges(value || 0);
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
          <a href={WEBSITE_URL} target="_blank" rel="noopener noreferrer">
            <img
              src={LOGO_URL}
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
            sx={{ width: 160, mr: 2 }}
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
