import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { Box, Typography } from "@mui/material";

export function DonutChart({ Color, Status, AllStatus }) {
    const COLORS = [Color, "#D9D9D9"];
    const data = [
        { name: Status.label, value: Status.value },
        { name: AllStatus.label, value: AllStatus.value },
    ];
    const percent = Math.round(Status.value / (Status.value + AllStatus.value) * 100);

    return (
        <Box sx={{ position: "relative", width: 200, height: 200 }}>
            <PieChart width={200} height={200}>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={90}
                    fill="#8884d8"
                    paddingAngle={3}
                    dataKey="value"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip/>
            </PieChart>
            {/* Phần trăm ở giữa donut */}
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    textAlign: "center",
                    zIndex:0
                }}
            >
                <Typography variant="h4" sx={{ fontWeight: 700, color: Color }}>
                    {percent}%
                </Typography>
                <Typography variant="body2" sx={{ color: "#333" }}>
                    {Status.label}
                </Typography>
            </Box>
            {/* Legend custom */}
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center",mt:1 }}>
                <span style={{
                    display: "inline-block",
                    width: 16,
                    height: 16,
                    background: Color,
                    marginRight: 8,
                    borderRadius: 4
                }} />
                <span>{Status.label}</span>
            </Box>
        </Box>
    );
}