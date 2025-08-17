import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  TextField,
  Button,
  Box,
} from "@mui/material";

function AccountTable() {
  const [accounts, setAccounts] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchDomain, setSearchDomain] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/accounts")
      .then((res) => res.json())
      .then((data) => setAccounts(data))
      .catch((err) => console.error(err));
  }, []);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedAccounts = accounts.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleSearch = () => {
    if (searchDomain.trim()) {
      navigate(`/account/${searchDomain.trim()}`);
    }
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Account Summaries
      </Typography>

      <Box display="flex" justifyContent="center" gap={2} mb={3}>
        <TextField
          label="Search domain"
          variant="outlined"
          size="small"
          value={searchDomain}
          onChange={(e) => setSearchDomain(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <Button variant="contained" onClick={handleSearch}>
          Go
        </Button>
      </Box>

      <TableContainer
        component={Paper}
        sx={{ maxWidth: 800, margin: "0 auto" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Company</strong>
              </TableCell>
              <TableCell>
                <strong>Domain</strong>
              </TableCell>
              <TableCell>
                <strong>Visits</strong>
              </TableCell>
              <TableCell>
                <strong>Last Seen</strong>
              </TableCell>
              <TableCell>
                <strong>Country</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedAccounts.map((acc, idx) => (
              <TableRow key={idx}>
                <TableCell>
                  <Link
                    to={`/account/${acc.domain}`}
                    style={{ textDecoration: "none", color: "#92a8f6ff" }}
                  >
                    {acc.company_name}
                  </Link>
                </TableCell>
                <TableCell>{acc.domain}</TableCell>
                <TableCell>{acc.visits}</TableCell>
                <TableCell>
                  {new Date(acc.last_seen).toLocaleDateString()}<br />
                  {new Date(acc.last_seen).toLocaleTimeString()}
                </TableCell>
                <TableCell>{acc.country}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={accounts.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Container>
  );
}

export default AccountTable;
