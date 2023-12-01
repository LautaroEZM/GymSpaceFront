import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/system";

const ServiceGraph = ({ data }) => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                justifyContent: "center",
                alignItems: "center",
                justifyItems: "center",
                margin: "auto", // Agregar esta línea para centrar horizontalmente
            }}
        >
            <Box
                sx={{
                    color: "#f3a143",
                    fontSize: "40px",
                    textAlign: "center",
                }}
            >
                PRODUCT STATS
            </Box>
            <ResponsiveContainer width="100%" height={500}>
                <BarChart
                    data={data}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="product" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="sales" fill={theme.palette.success.main} />
                </BarChart>
            </ResponsiveContainer>
        </Box>
    );
};

export default ServiceGraph;