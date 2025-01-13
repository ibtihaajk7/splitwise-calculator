import React, { useEffect, useState } from "react";
import { Typography, Box } from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
} from "@mui/material";

const CalculatorTable = ({ rows }) => {
  const [data, setData] = useState(
    Array.from({ length: rows }, () => ({
      name: "",
      orderValue: 0,
      tax5: 0,
      total5: 0,
      tax16: 0,
      total16: 0,
    }))
  );

  useEffect(() => {
    setData((prevData) => {
      if (rows > prevData.length) {
        // Add new rows
        return [
          ...prevData,
          ...Array.from({ length: rows - prevData.length }, (_, index) => ({
            name: "",
            orderValue: 0,
            tax5: 0,
            total5: 0,
            tax16: 0,
            total16: 0,
          })),
        ];
      }
      // Remove extra rows
      return prevData.slice(0, rows);
    });
  }, [rows]);

  const { subtotal5, subtotal16 } = React.useMemo(() => {
    const subtotal5 = data.reduce((sum, row) => sum + parseFloat(row.total5 || 0), 0).toFixed(2);
    const subtotal16 = data.reduce((sum, row) => sum + parseFloat(row.total16 || 0), 0).toFixed(2);
    return { subtotal5, subtotal16 };
  }, [data]);

  const handleInputChange = (index, field, value) => {
    const updatedData = [...data];
    updatedData[index][field] = field === "orderValue" ? parseFloat(value) || 0 : value;

    if (field === "orderValue") {
      const orderValue = parseFloat(value) || 0;
      updatedData[index].tax5 = (orderValue * 0.05).toFixed(2);
      updatedData[index].total5 = (orderValue * 1.05).toFixed(2);
      updatedData[index].tax16 = (orderValue * 0.16).toFixed(2);
      updatedData[index].total16 = (orderValue * 1.16).toFixed(2);
    }

    setData(updatedData);
  };

  return (
    <>
    <TableContainer component={Paper} style={{  overflowY: "auto" }}>
      <Table stickyHeader>
      <TableHead>
        <TableRow>
                <TableCell sx={{ backgroundColor: "#B6FFBB", color: "black", fontWeight: "bold" }}>
                    Sr#
                </TableCell>
                <TableCell sx={{ backgroundColor: "#B6FFBB", color: "black", fontWeight: "bold" }}>
                    Name
                </TableCell>
                <TableCell sx={{ backgroundColor: "#B6FFBB", color: "black", fontWeight: "bold" }}>
                    Order Value
                </TableCell>
                <TableCell sx={{ backgroundColor: "#B6FFBB", color: "black", fontWeight: "bold" }}>
                    5% Tax
                </TableCell>
                <TableCell sx={{ backgroundColor: "#B6FFBB", color: "black", fontWeight: "bold" }}>
                    Total with 5%
                </TableCell>
                <TableCell sx={{ backgroundColor: "#B6FFBB", color: "black", fontWeight: "bold" }}>
                    16% Tax
                </TableCell>
                <TableCell sx={{ backgroundColor: "#B6FFBB", color: "black", fontWeight: "bold" }}>
                    Total with 16%
                </TableCell>
            </TableRow>
    </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow
              key={index}
              style={{
                backgroundColor: index % 2 === 0 ? "#f5f5f5" : "#ffffff",
              }}
            >
                <TableCell>{index + 1}</TableCell>
              <TableCell>
                <TextField
                  variant="outlined"
                  size="small"
                  value={row.name}
                  onChange={(e) =>
                    handleInputChange(index, "name", e.target.value)
                  }
                />
              </TableCell>
              <TableCell>
              <TextField
  error={isNaN(row.orderValue)}
  helperText={isNaN(row.orderValue) ? "Invalid number" : ""}
  variant="outlined"
  size="small"
  type="text"
  value={row.orderValue === 0 ? "" : row.orderValue}
  onChange={(e) => {
    const value = e.target.value;
    if (value === "" || !isNaN(Number(value))) {
      handleInputChange(index, "orderValue", value);
    }
  }}
  inputProps={{
    inputMode: "decimal",
  }}
/>
              
                </TableCell>
              <TableCell>{row.tax5}</TableCell>
              <TableCell style={{ fontWeight: "bold", color: "#4169E1" }}>
                {row.total5}
              </TableCell>
              <TableCell>{row.tax16}</TableCell>
              <TableCell style={{ fontWeight: "bold", color: "#4169E1" }}>
                {row.total16}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      {/* Subtotal Section */}
    <Box sx={{ mt: 2, textAlign: "left" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#4169E1", mb: 1 }}>
            Subtotal with 5%: {subtotal5}
        </Typography>
        {/* Powered by XYZ Section with URL */}
  <Box sx={{display: "flex", justifyContent: "space-between", }}>
  <Typography variant="h6" sx={{ fontWeight: "bold", color: "#4169E1" }}>
            Subtotal with 16%: {subtotal16}
        </Typography>
    <Typography
      component="a"
      href="https://links.ibtihaaj.com" // Replace with your URL
      target="_blank"
      rel="noopener noreferrer"
      variant="body2"
      color="primary"
      sx={{ textDecoration: "underline", marginTop: 2 }}
    >
      {"Made with ❤️ by Ibtihaaj"}
    </Typography>
  
       
        </Box>
    </Box>
    </>
  );
};

export default CalculatorTable;