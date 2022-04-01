import {
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Table,
    TableCell,
    TableContainer,
    TableRow,
    Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Row from "../../components/Compare/Row";
const SelectForm = ({ share, handleClick,pointer }) => {
    return (
        <FormControl sx={{ mb: 1 }} fullWidth margin="dense" variant="filled">
            <InputLabel id="demo-simple-select-filled-label">
                Select a Share
            </InputLabel>
            <Select
                id="demo-simple-select-helper"
                fullWidth
                variant="filled"
                margin="dense"
                onChange={(e) => handleClick(e, e.target.value,pointer)}
            >
                {share?.map((item) => (
                    <MenuItem value={item.symbol}>{item.symbol}</MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

const Compare = () => {
    const [share, setShare] = useState();
    const [share1, setShare1] = useState();
    const [share2, setShare2] = useState();
    const [share3, setShare3] = useState();

    useEffect(() => {
        axios.get(`/api/call`).then((res) => {
           setShare(res.data.share)
        });
    }, []);
    const handleClick = (e, name, id) => {
        console.log(e)
        axios.get(`/api/callCompany/${name}`).then((res) => {
            console.log(res.data.company[0])
            {id === '1' && setShare1(res.data.company)}
            {id === '2' && setShare2(res.data.company)}
            {id === '3' && setShare3(res.data.company)}

        });
    };
    return (
        <>
            <Grid container justify="space-between">
                <Typography variant="h5" style={{ marginBottom: "8px" }}>
                    Compare Stocks
                </Typography>
            </Grid>
            <Grid container justify="space-between" spacing={4}>
                <Grid item xs={3} />

                <Grid item xs={3}>
                    <SelectForm share={share} handleClick={handleClick} pointer="1"></SelectForm>
                </Grid>
                <Grid item xs={3}>
                    <SelectForm share={share} handleClick={handleClick} pointer="2"></SelectForm>
                </Grid>
                <Grid item xs={3}>
                    <SelectForm share={share} handleClick={handleClick} pointer="3"></SelectForm>
                </Grid>
            </Grid>
            <Grid container justify="space-between" spacing={4}>
                
                <Grid item xs={3}>
                    <TableContainer
                        component={Paper}
                        sx={{ marginTop: "2vh" }}
                        elevation={4}
                    >
                        <Table style={{ backgroundColor: "#222", color: "#fff" }}>
                            <TableRow>
                                <TableCell>Sector</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Shares Outstanding</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Market Price</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>% Change</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>52 Weeks High - Low</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>120 Day Average</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>1 Year Yield</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>EPS</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>P/E Ratio</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Book Value</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>PBV</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>% Dividend</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>% Bonus</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Right Share</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>30-Day Avg Volume</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Market Capitalization</TableCell>
                            </TableRow>
                        </Table>
                    </TableContainer>
                </Grid>

                <Grid item xs={3}>
                    <Row share={share1}></Row>
                </Grid>
                <Grid item xs={3}>
                    <Row share={share2}></Row>
                </Grid>
                <Grid item xs={3}>
                    <Row share={share3}></Row>
                </Grid>
            </Grid>
        </>
    );
};

export default Compare;
