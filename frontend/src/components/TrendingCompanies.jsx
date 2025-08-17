import React from 'react'
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts';
import {
    Paper,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Box,
} from '@mui/material'

function TrendingCompanies({ data }) {
    return (
        <Paper sx={{ p: 2, width: '100%', maxWidth: 800 }}>
            <Typography variant="h6" gutterBottom>
                📈 Trending Companies (Last 7 Days)
            </Typography>

            <Box sx={{ width: '100%', height: 300, mb: 3 }}>
                <ResponsiveContainer>
                    <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="domain" stroke="#fff" />
                        <YAxis stroke="#fff" />
                        <Tooltip />
                        <Bar dataKey="visits" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            </Box>

            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Rank</TableCell>
                        <TableCell>Company Domain</TableCell>
                        <TableCell>Visits</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((c, i) => (
                        <TableRow key={i}>
                            <TableCell>{i + 1}</TableCell>
                            <TableCell>{c.domain}</TableCell>
                            <TableCell>{c.visits}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    )
}

export default TrendingCompanies
