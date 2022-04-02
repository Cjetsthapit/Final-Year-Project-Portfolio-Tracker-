import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import CssLoader from "../../components/CssLoader/CssLoader";
import {
  Table,
  TableHead,
  TableContainer,
  TableRow,
  TableCell,
  Paper,
  TableBody,
  Typography,
  Grid,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";

const SharePrice = ({urlpath}) => {
  const [share, setShare] = useState();
  const [loading, setLoading] = useState(true);
  const [gainer, setGainer] = useState();
  const [loser, setLoser] = useState();
  useEffect(() => {
    axios.get(`/api/call`).then((res) => {
      setShare(res.data.share);
    });

    axios.get(`/api/gainer`).then((res) => {
      setGainer(res.data.gainer);
      setLoser(res.data.loser);
      console.log(res.data);
      setLoading(false);
    });
  }, []);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      borderBottom:'1px solid black',
      color: theme.palette.common.white,
    },
  }));
  const GreenTableRow = styled(TableRow)(({ theme }) => ({
    // backgroundColor: "#52705D",
    backgroundColor: "#1C8754",
  }));
  const RedTableRow = styled(TableRow)(({ theme }) => ({
    backgroundColor: "#D33342",
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  }));
  const Sample = ({ row }) => {
    return (
      <>
        <StyledTableCell component="th" scope="row">
          <Link
            to={`${urlpath}${row.symbol}`}
            style={{
              textDecoration: "none",
              fontWeight: "bold",
              color: "#fff",
            }}
          >
            {row.symbol}
          </Link>
        </StyledTableCell>
        <StyledTableCell align="right">{row.close}</StyledTableCell>
        <StyledTableCell align="right">{row.open}</StyledTableCell>
        <StyledTableCell align="right">{row.low}</StyledTableCell>
        <StyledTableCell align="right">{row.high}</StyledTableCell>
        <StyledTableCell align="right">{row.diff}</StyledTableCell>
        <StyledTableCell align="right">{row.diffper}</StyledTableCell>
        <StyledTableCell align="right">{row.turnover}</StyledTableCell>
      </>
    );
  };
  if (loading) {
    return (

        <CssLoader />

    );
  }
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <TableContainer component={Paper} elevation={10}>
            <Table stickyHeader={true}>
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell>Gainers</StyledTableCell>
                  <StyledTableCell align="right">LTP</StyledTableCell>
                  <StyledTableCell align="right">% Change</StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {gainer?.map((row) => (
                  <TableRow
                    key={row.symbol}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 }}}
                    style={{color:'#007000'}}
                  >
                    <StyledTableCell component="th" scope="row">
                      <Link
                        to={`${urlpath}${row.symbol}`}
                        style={{
                          textDecoration: "none",
                          fontWeight: "bold",
                          color: "#007000",
                        }}
                      >
                        {row.symbol}
                      </Link>
                    </StyledTableCell>
                    <StyledTableCell align="right" className="text-success">{row.close}</StyledTableCell>

                    <StyledTableCell align="right" className="text-success">
                      {row.diffper}
                    </StyledTableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={6}>
          <TableContainer component={Paper} elevation={10}>
            <Table stickyHeader={true}>
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell>Losers</StyledTableCell>
                  <StyledTableCell align="right">LTP</StyledTableCell>
                  <StyledTableCell align="right">% Change</StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {loser?.map((row) => (
                  <TableRow
                    key={row.symbol}
                    sx={{ 
                      "&:last-child td, &:last-child th": { border: 0 }
                     }}
                  >
                    <StyledTableCell component="th" scope="row">
                      <Link
                        to={`${urlpath}${row.symbol}`}
                        style={{
                          textDecoration: "none",
                          fontWeight: "bold",
                          color: "#d2222d",
                        }}
                      >
                        {row.symbol}
                      </Link>
                    </StyledTableCell>
                    <StyledTableCell align="right"className="text-danger">{row.close}</StyledTableCell>

                    <StyledTableCell align="right" className="text-danger">
                      {row.diffper}
                    </StyledTableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>

      <Grid container justify="space-between">
        <Typography
          variant="h5"
          style={{ marginBottom: "8px", marginTop: "20px" }}
        >
          Today's Share Price
        </Typography>
      </Grid>

      <TableContainer component={Paper} elevation={10}>
        <Table sx={{ minWidth: 650 }} stickyHeader={true}>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>Symbol</StyledTableCell>
              <StyledTableCell align="right">LTP</StyledTableCell>
              <StyledTableCell align="right">Open</StyledTableCell>
              <StyledTableCell align="right">Low</StyledTableCell>
              <StyledTableCell align="right">High</StyledTableCell>
              <StyledTableCell align="right">Diff</StyledTableCell>
              <StyledTableCell align="right">Diff %</StyledTableCell>
              <StyledTableCell align="right">Turnover</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {share?.map((row) =>
              row.diff > 0 ? (
                <GreenTableRow
                  key={row.symbol}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                 >
                  <Sample row={row} />
                </GreenTableRow>
              ) : (
                <RedTableRow
                  key={row.symbol}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 }}}
                >
                  <Sample row={row} />
                </RedTableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default SharePrice;
