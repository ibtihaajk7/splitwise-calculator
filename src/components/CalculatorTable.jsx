import React, { useEffect, useState, useMemo } from "react";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
} from "@mui/material";

const TAX_RATE_5 = 0.05;
const TAX_RATE_16 = 0.16;

const HEADER_STYLE = {
  backgroundColor: "#B6FFBB",
  color: "black",
  fontWeight: "bold",
};

const TOTAL_STYLE = {
  fontWeight: "bold",
  color: "#4169E1",
};

const CalculatorTable = ({ rows, deliveryCharges }) => {
  const [data, setData] = useState(
    Array.from({ length: rows }, () => ({
      name: "",
      orderValue: 0,
      tax5: 0,
      total5: 0,
      tax16: 0,
      total16: 0,
      deliveryShare: 0,
    }))
  );

  useEffect(() => {
    setData((prevData) => {
      if (rows > prevData.length) {
        // Add new rows
        return [
          ...prevData,
          ...Array.from({ length: rows - prevData.length }, () => ({
            name: "",
            orderValue: 0,
            tax5: 0,
            total5: 0,
            tax16: 0,
            total16: 0,
            deliveryShare: 0,
          })),
        ];
      }
      // Remove extra rows
      return prevData.slice(0, rows);
    });
  }, [rows]);

  useEffect(() => {
    const share = deliveryCharges > 0 ? (deliveryCharges / rows).toFixed(2) : 0;
    setData((prevData) =>
      prevData.map((row) => ({
        ...row,
        deliveryShare: share,
      }))
    );
  }, [deliveryCharges, rows]);

  const { subtotal5, subtotal16, subTotal } = useMemo(() => {
    let subTotal = data
      .reduce((sum, row) => sum + parseFloat(row.orderValue || 0), 0)
      .toFixed(2);
    let subtotal5 = data
      .reduce((sum, row) => sum + parseFloat(row.total5 || 0), 0)
      .toFixed(2);
    let subtotal16 = data
      .reduce((sum, row) => sum + parseFloat(row.total16 || 0), 0)
      .toFixed(2);
    subtotal5 = (parseFloat(subtotal5) + parseFloat(deliveryCharges)).toFixed(
      2
    );
    subtotal16 = (parseFloat(subtotal16) + parseFloat(deliveryCharges)).toFixed(
      2
    );
    subTotal = (parseFloat(subTotal) + parseFloat(deliveryCharges)).toFixed(2);

    return { subtotal5, subtotal16, subTotal };
  }, [data, deliveryCharges]);

  const handleInputChange = (index, field, value) => {
    const updatedData = [...data];
    updatedData[index][field] =
      field === "orderValue" ? parseFloat(value) || 0 : value;

    if (field === "orderValue") {
      const orderValue = parseFloat(value) || 0;
      updatedData[index].tax5 = (orderValue * TAX_RATE_5).toFixed(2);
      updatedData[index].total5 = (orderValue * (1 + TAX_RATE_5)).toFixed(2);
      updatedData[index].tax16 = (orderValue * TAX_RATE_16).toFixed(2);
      updatedData[index].total16 = (orderValue * (1 + TAX_RATE_16)).toFixed(2);
    }

    setData(updatedData);
  };

  return (
    <>
      <TableContainer component={Paper} style={{ overflowY: "auto" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {[
                "Sr#",
                "Name",
                "Order Value",
                "5% Tax",
                "16% Tax",
                "Delivery Share",
                "Total(5% tax + Delivery)",
                "Total with 16% + Delivery",
              ].map((header) => (
                <TableCell key={header} sx={HEADER_STYLE}>
                  {header}
                </TableCell>
              ))}
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
                <TableCell>{row.tax16}</TableCell>
                <TableCell>{row.deliveryShare}</TableCell>
                <TableCell style={TOTAL_STYLE}>
                  {(
                    parseFloat(row.total5) + parseFloat(row.deliveryShare)
                  ).toFixed(1)}
                </TableCell>

                <TableCell style={TOTAL_STYLE}>
                  {(
                    parseFloat(row.total16) + parseFloat(row.deliveryShare)
                  ).toFixed(1)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Subtotal Section */}
      <Box sx={{ mt: 2, textAlign: "left" }}>
        <Typography variant="h6" sx={{ ...TOTAL_STYLE, mb: 1 }}>
          Subtotal: {subTotal}
        </Typography>
        <Typography variant="h6" sx={{ ...TOTAL_STYLE, mb: 1 }}>
          Subtotal with 5%: {subtotal5}
        </Typography>
        {/* Powered by XYZ Section with URL */}
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" sx={TOTAL_STYLE}>
            Subtotal with 16%: {subtotal16}
          </Typography>

          <Typography
            component="a"
            href="https://links.ibtihaaj.com"
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
