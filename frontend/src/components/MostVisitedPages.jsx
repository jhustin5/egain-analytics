import React from 'react'
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
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

function MostVisitedPages({ data }) {
  const tickFormatter = (v) => (v.length > 14 ? `${v.slice(0, 12)}…` : v)

  return (
    <Paper sx={{ p: 2, width: '100%', maxWidth: 800, backgroundColor: '#1e1e1e' }}>
      <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
        🧭 Most Visited Pages
      </Typography>

      <Box sx={{ width: '100%', height: 300, mb: 3 }}>
        <ResponsiveContainer>
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 10, bottom: 50 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis
              dataKey="url_path"
              stroke="#fff"
              tickFormatter={tickFormatter}
              interval={0}
              angle={-35}
              textAnchor="end"
            />
            <YAxis stroke="#fff" />
            <Tooltip
              contentStyle={{ backgroundColor: '#333', border: 'none', color: '#fff' }}
              itemStyle={{ color: '#fff' }}
              labelStyle={{ color: '#fff' }}
              formatter={(value) => [`${value}`, 'Visits']}
              labelFormatter={(label) => `URL: ${label}`}
            />
            <Bar dataKey="visits" fill="#1976d2" />
          </BarChart>
        </ResponsiveContainer>
      </Box>

      <Table size="small" sx={{ color: 'white' }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: 'white' }}>Rank</TableCell>
            <TableCell sx={{ color: 'white' }}>Page URL</TableCell>
            <TableCell sx={{ color: 'white' }}>Visits</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((p, i) => (
            <TableRow key={i}>
              <TableCell sx={{ color: 'white' }}>{i + 1}</TableCell>
              <TableCell sx={{ color: 'white' }}>{p.url_path}</TableCell>
              <TableCell sx={{ color: 'white' }}>{p.visits}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  )
}

export default MostVisitedPages
