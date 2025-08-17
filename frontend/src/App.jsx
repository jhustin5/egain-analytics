import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import AccountTable from './components/AccountTable'
import AccountDetail from './components/AccountDetail'
import WebLogs from './components/WebLogs'
import Trends from './components/Trends'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<AccountTable />} />
        <Route path="/account/:domain" element={<AccountDetail />} />
        <Route path="/logs" element={<WebLogs />} />
        <Route path="/trending" element={<Trends />} />
      </Routes>
    </Router>
  )
}

export default App