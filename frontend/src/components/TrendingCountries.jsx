import React from 'react'
import {
    Paper,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from 'recharts'

function TrendingCountries({ data }) {
    return (
        <Paper sx={{ p: 2, width: '100%', maxWidth: 800 }}>
            <Typography variant="h6" gutterBottom>
                🌍 Trending Countries (Last 7 Days)
            </Typography>

            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis dataKey="country" stroke="#fff" /> 
                    <YAxis stroke="#fff" />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#333', border: 'none', color: '#fff' }}
                        itemStyle={{ color: '#fff' }}
                        labelStyle={{ color: '#fff' }}
                    />
                    <Bar dataKey="visits" fill="#82ca9d" />
                </BarChart>
            </ResponsiveContainer>

            <Table size="small" sx={{ marginTop: 2 }}>
                <TableHead>
                    <TableRow>
                        <TableCell>Rank</TableCell>
                        <TableCell>Country</TableCell>
                        <TableCell>Visits</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((c, i) => (
                        <TableRow key={i}>
                            <TableCell>{i + 1}</TableCell>
                            <TableCell>{c.country}</TableCell>
                            <TableCell>{c.visits}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    )
}

export default TrendingCountries
