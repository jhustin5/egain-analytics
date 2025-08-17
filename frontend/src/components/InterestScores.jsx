import React from 'react'
import {
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from '@mui/material'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts'

function InterestScores({ data }) {
  return (
    <Paper sx={{ p: 2, width: '100%', maxWidth: 800 }}>
      <Typography variant="h6" gutterBottom>🔥 Top Interest Scores</Typography>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data.slice(0, 10)} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="company_name" stroke="#fff" />
          <YAxis stroke="#fff" />
          <Tooltip />
          <Bar dataKey="interest_score" fill="#ffb74d" />
        </BarChart>
      </ResponsiveContainer>

      <Table sx={{ mt: 2 }}>
        <TableHead>
          <TableRow>
            <TableCell>Company</TableCell>
            <TableCell>Domain</TableCell>
            <TableCell>Score</TableCell>
            <TableCell>Visits</TableCell>
            <TableCell>Country</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.slice(0, 10).map((row, i) => (
            <TableRow key={i}>
              <TableCell>{row.company_name}</TableCell>
              <TableCell>{row.domain}</TableCell>
              <TableCell>{row.interest_score}</TableCell>
              <TableCell>{row.visits}</TableCell>
              <TableCell>{row.country}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  )
}

export default InterestScores
