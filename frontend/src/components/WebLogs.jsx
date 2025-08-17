import React, { useEffect, useState } from "react";
import {
    Box,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Pagination,
    Typography,
} from "@mui/material";

function WebLogs() {
    const [logs, setLogs] = useState([]);
    const [filteredLogs, setFilteredLogs] = useState([]);
    const [filters, setFilters] = useState({
        company: "",
        country: "",
        page: "",
    });
    const [page, setPage] = useState(1);
    const rowsPerPage = 5;

    useEffect(() => {
        fetch("http://localhost:8000/api/search")
            .then((res) => res.json())
            .then((data) => {
                setLogs(data);
                setFilteredLogs(data);
            });
    }, []);

    useEffect(() => {
        const filtered = logs.filter(
            (log) =>
                (!filters.company ||
                    log.company_name
                        ?.toLowerCase()
                        .includes(filters.company.toLowerCase())) &&
                (!filters.country ||
                    log.country?.toLowerCase().includes(filters.country.toLowerCase())) &&
                (!filters.page ||
                    log.url_path?.toLowerCase().includes(filters.page.toLowerCase()))
        );
        setFilteredLogs(filtered);
        setPage(1);
    }, [filters, logs]);

    const handleChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const paginatedLogs = filteredLogs.slice(
        (page - 1) * rowsPerPage,
        page * rowsPerPage
    );

    return (
        <Box
            sx={{
                p: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                minHeight: "100vh",
            }}
        >
            <Typography variant="h4" gutterBottom align="center">
                Web Logs
            </Typography>

            <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
                <TextField
                    label="Company"
                    name="company"
                    variant="outlined"
                    value={filters.company}
                    onChange={handleChange}
                />
                <TextField
                    label="Country"
                    name="country"
                    variant="outlined"
                    value={filters.country}
                    onChange={handleChange}
                />
                <TextField
                    label="Page"
                    name="page"
                    variant="outlined"
                    value={filters.page}
                    onChange={handleChange}
                />
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>Company</strong></TableCell>
                            <TableCell><strong>Domain</strong></TableCell>
                            <TableCell><strong>Country</strong></TableCell>
                            <TableCell><strong>Page</strong></TableCell>
                            <TableCell><strong>Timestamp</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedLogs.map((log, index) => (
                            <TableRow key={index}>
                                <TableCell>{log.company_name}</TableCell>
                                <TableCell>{log.company_domain}</TableCell>
                                <TableCell>{log.country}</TableCell>
                                <TableCell>{log.url_path}</TableCell>
                                <TableCell>
                                    {new Date(log.timestamp).toLocaleDateString()}<br />
                                    {new Date(log.timestamp).toLocaleTimeString()}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                <Pagination
                    count={Math.ceil(filteredLogs.length / rowsPerPage)}
                    page={page}
                    onChange={(e, val) => setPage(val)}
                />
            </Box>
        </Box>
    );
}

export default WebLogs;
