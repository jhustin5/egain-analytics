import React, { useEffect, useState } from 'react'
import {
    Box,
    Typography,
    Tabs,
    Tab,
    Paper,
} from '@mui/material'
import InterestScores from './InterestScores'
import TrendingCompanies from './TrendingCompanies'
import TrendingCountries from './TrendingCountries'
import MostVisitedPages from './MostVisitedPages'


function Trends() {
    const [trending, setTrending] = useState({
        top_companies_last_7_days: [],
        top_countries_last_7_days: [],
    })
    const [interestScores, setInterestScores] = useState([])
    const [pages, setPages] = useState([])
    const [visitors, setVisitors] = useState([])
    const [selectedTab, setSelectedTab] = useState('scores')

    useEffect(() => {
        fetch('${import.meta.env.VITE_API_URL}/api/scores')
            .then((res) => res.json())
            .then(setInterestScores)
        fetch('${import.meta.env.VITE_API_URL}/api/trending')
            .then((res) => res.json())
            .then(setTrending)

        fetch('${import.meta.env.VITE_API_URL}/api/pages')
            .then((res) => res.json())
            .then(setPages)

        fetch('${import.meta.env.VITE_API_URL}/api/last-visitors')
            .then((res) => res.json())
            .then(setVisitors)
    }, [])

    return (
        <Box
            sx={{
                p: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4,
                minHeight: '100vh',
            }}
        >
            <Typography variant="h4" align="center" gutterBottom>
                Trends
            </Typography>

            <Paper sx={{ width: '100%', maxWidth: 800 }}>
                <Tabs
                    value={selectedTab}
                    onChange={(e, newVal) => setSelectedTab(newVal)}
                    centered
                    textColor="inherit"
                    TabIndicatorProps={{ style: { backgroundColor: '#1976d2' } }}
                >
                    <Tab
                        label="Interest Scores"
                        value="scores"
                        sx={{ textTransform: 'none', color: 'white', fontSize: '1.1rem' }}
                    />
                    <Tab
                        label="Trending Companies"
                        value="companies"
                        sx={{ textTransform: 'none', color: 'white', fontSize: '1.1rem' }}
                    />
                    <Tab
                        label="Trending Countries"
                        value="countries"
                        sx={{ textTransform: 'none', color: 'white', fontSize: '1.1rem' }}
                    />
                    <Tab
                        label="Most Visited Pages"
                        value="pages"
                        sx={{ textTransform: 'none', color: 'white', fontSize: '1.1rem' }}
                    />
                </Tabs>
            </Paper>

            <Paper sx={{ width: '100%', maxWidth: 800, p: 2 }}>
                {selectedTab === 'scores' && <InterestScores data={interestScores} />}
                {selectedTab === 'companies' && (
                    <TrendingCompanies data={trending.top_companies_last_7_days} />
                )}
                {selectedTab === 'countries' && (
                    <TrendingCountries data={trending.top_countries_last_7_days} />
                )}
                {selectedTab === 'pages' && <MostVisitedPages data={pages} />}
            </Paper>
        </Box>
    )
}

export default Trends
