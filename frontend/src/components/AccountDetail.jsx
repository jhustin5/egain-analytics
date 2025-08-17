import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { List, ListItem, ListItemText, Container, Typography, Paper, ButtonGroup, Button } from '@mui/material'
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts'

function AccountDetail() {
  const { domain } = useParams()
  const [account, setAccount] = useState(null)
  const [selectedTab, setSelectedTab] = useState('top_pages')

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/account/${domain}`)
      .then(res => res.json())
      .then(setAccount)
      .catch(err => {
        console.error(err)
        setAccount(null)
      })
  }, [domain])

  const formatDateTime = (rawDate) => {
    try {
      const date = new Date(rawDate)
      return date.toLocaleString(undefined, {
        year: 'numeric', month: 'short', day: 'numeric',
        hour: 'numeric', minute: '2-digit', second: '2-digit',
      })
    } catch {
      return rawDate
    }
  }

  const renderChart = () => {
    if (!account) return null

    switch (selectedTab) {
      case 'top_pages':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={account.top_pages.map(([path, count]) => ({ path, count }))}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="path" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        )
      case 'daily_activity':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={Object.entries(account.daily_activity).map(([date, count]) => ({ date, count }))}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip />
              <Bar dataKey="count" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        )
      case 'recent_visits':
        return (
          <List sx={{ mt: 2 }}>
            {account.recent_visits?.map((v, i) => (
              <ListItem key={i} disableGutters>
                <Typography variant="body1">
                  {formatDateTime(v.timestamp)} — {v.url_path}
                </Typography>
              </ListItem>
            ))}
          </List>
        )
      default:
        return null
    }
  }

  if (!account || !account.company_name) {
    return (
      <Container sx={{ textAlign: 'center', marginTop: 4 }}>
        <Typography variant="h6">Account not found.</Typography>
      </Container>
    )
  }

  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <Paper sx={{ padding: 4, backgroundColor: '#2c2c2c', color: 'white' }}>
        <Typography variant="h5" gutterBottom>{account.company_name}</Typography>
        <Typography><strong>Domain:</strong> {account.domain}</Typography>
        <Typography><strong>Country:</strong> {account.country}</Typography>
        <Typography><strong>Visits:</strong> {account.visits}</Typography>
        <Typography><strong>Last Seen:</strong> {formatDateTime(account.last_seen)}</Typography>
        <Typography><strong>Interest Score:</strong> {account.interest_score}</Typography>
      </Paper>

      <ButtonGroup sx={{ marginTop: 4 }}>
        <Button onClick={() => setSelectedTab('top_pages')} variant={selectedTab === 'top_pages' ? 'contained' : 'outlined'}>Top Pages</Button>
        <Button onClick={() => setSelectedTab('daily_activity')} variant={selectedTab === 'daily_activity' ? 'contained' : 'outlined'}>Daily Activity</Button>
        <Button onClick={() => setSelectedTab('recent_visits')} variant={selectedTab === 'recent_visits' ? 'contained' : 'outlined'}>Recent Visits</Button>
      </ButtonGroup>

      <Paper sx={{ padding: 2, backgroundColor: '#1e1e1e', marginTop: 2 }}>
        {renderChart()}
      </Paper>
    </Container>
  )
}

export default AccountDetail
