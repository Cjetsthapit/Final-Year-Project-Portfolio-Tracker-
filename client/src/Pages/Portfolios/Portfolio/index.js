import {
  Grid,
  Typography,
  Button,
  Container,
  Table,
  TableRow,
  TableHead,
  TableContainer,
  Paper,
  TableBody,
} from "@material-ui/core";
import AddCircleOutlineOutlined from "@material-ui/icons/AddCircleOutlineOutlined";
import { Stack } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {  useHistory, useParams } from "react-router-dom";
import { getTransaction, singlePortfolio } from "../../../api/service";
import CssLoader from "../../../components/CssLoader/CssLoader";
import AddTransaction from "../../../components/Transactions/add";
import Calculation from "../../../components/Transactions/Calculation/Calculation";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import TableCell from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import BigComponent from "../../../components/Transactions/BlockView/BigComponent";

const Portfolio = () => {
  const history = useHistory();
  const [portfolio, setPortfolio] = useState();
  const [view, setView] = useState(true);
  const [transaction, setTransaction] = useState();
  const [share, setShare] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { id } = useParams();

  useEffect(() => {
    singlePortfolio(id).then((res) => {
      if(res.data.status === 404){
        history.goBack();
      }else{
        setPortfolio(res.data.status[0]);
      }
    });
    getTransaction(id).then((res) => {
      if(res.data.status === 404){
        history.push('/portfolio');
      }else{
        setTransaction(res.data.data);

      }
    });
    axios.get(`/api/call`).then((res) => {
      setShare(res.data.share);
      setLoading(false);
    });
  }, [setTransaction,history,id]);
  let filterData = (symbol) => {
    return share && share.filter((item) => item.symbol === symbol);
  };
  const Hello =
    transaction &&
    Object.keys(transaction).map(function (key, index) {
      return (
        <Calculation
          data={transaction[key]}
          index={index}
          filterData={() => filterData(key)}
          type={view ? "block" : "table"}
        />
      );
    });
  let totalunits = 0;
  let soldunits = 0;
  let investment = 0;
  let current = 0;
  let soldValue = 0;
  let profit = 0;
  let today = 0;
  transaction &&
    Object.keys(transaction).map(function (key, index) {
      let extApi = filterData(key)[0];
      // let profitper = 0;
      let units = 0;
      let avg = 0;
      let buyNumber = 0;
      let svalue = 0;
      let sinvestment = 0;
      transaction[key].map((item) => {
        if (item.type === "buy") {
          buyNumber = buyNumber + item.units;

          units += item.units;
          totalunits += item.units;
          investment += item.investment;
          sinvestment += item.investment;
        } else {
          soldValue = soldValue + item.investment;
          totalunits -= item.units;
          soldunits += item.units;
          units -= item.units;
        }
      });
      current += units * parseFloat(extApi?.close?.replace(/,/g, ""));

      let latest = parseFloat(extApi?.close?.replace(/,/g, "")) * units;
      let broker = 0;
      if (latest < 50000) {
        broker = 0.004 * latest;
      } else if (latest >= 50000 && latest < 500000) {
        broker = 0.0037 * latest;
      } else if (latest >= 500000 && latest < 2000000) {
        broker = 0.0034 * latest;
      } else if (latest >= 2000000 && latest < 10000000) {
        broker = 0.003 * latest;
      } else {
        broker = 0.0027 * latest;
      }
      let sebon = 0.00015 * latest;

      avg = sinvestment / buyNumber;
      console.log(avg);
      transaction[key].map((a) => {
        if (a.type === "sell") {
          svalue = svalue + a.investment;
          profit = profit + (a.investment - avg * a.units);
        }
      });
      if (units !== 0) {
        if (latest <= units * avg) {
          profit = profit + (latest - 25 - broker - sebon - units * avg);
        } else {
          profit =
            profit + (37 / 40) * (latest - 25 - broker - sebon - units * avg);
        }
      }
      today = today + units * extApi?.diff;
      // profitper = (profit / investment) * 100;
    });
  
    
    const StyledTableRow = styled(TableRow)(({ theme }) => ({
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
      // hide last border
      '&:last-child td, &:last-child th': {
        border: 0,
      },
    }));
    const navigatetoGraph=(e)=>{
      e.preventDefault();
      history.push(`/portfolio-chart/${id}`);
    }
  if (loading) {
    return (
      <>
        <CssLoader />
      </>
    );
  }

  return (
    <>
      <Grid sx={{ margin: "100px auto", width: "80%" }}>
        <Grid container justify="space-between">
          <Typography variant="h5">
            {portfolio?.name}{" "}
            <ChangeCircleIcon onClick={() => setView(!view)} fontSize="large" />
            <Button variant="contained" style={{marginLeft:'2vh'}} color="primary" onClick={navigatetoGraph}>Graph</Button>
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<AddCircleOutlineOutlined />}
              onClick={handleOpen}
            >
              Add Shares
            </Button>
          </Stack>
        </Grid>
      </Grid>
      <AddTransaction
        open={open}
        handleClose={handleClose}
        title="Add"
        button="Add"
        share={share}
        ttype="buy"
      ></AddTransaction>
      <Container maxWidth="">
        <Grid item sm={12} lg={12} style={{ marginTop: 20 }}>
          <div className="card-header d-flex justify-content-between text-white border-secondary bg-dark">
            <Typography>Portfolio Summary</Typography>
          </div>
          <div className="card-body bg-dark text-light">
            <div className="row">
              <BigComponent title="Total Units" data={totalunits} />
              <BigComponent title="Sold Units" data={soldunits} />
              <BigComponent
                title="Investment"
                data={"Rs. " + Math.round(investment).toLocaleString()}
              />
              <BigComponent
                title="Current Value"
                data={"Rs. " + current.toLocaleString()}
              />
              <BigComponent title="Sold Value" data={"Rs. " + soldValue} />
              <BigComponent
                title={profit >= 0 ? "Estimated Profit" : "Estimated Loss"}
                text={profit >= 0 ? "text-success" : "text-danger"}
                data={"Rs. " + Math.round(profit).toLocaleString()}
                className="text-danger"
              />
              <BigComponent
                title={profit >= 0 ? "Profit %" : "Loss %"}
                text={profit >= 0 ? "text-success" : "text-danger"}
                data={((profit / investment) * 100).toFixed(1) + " %"}
              />
              <BigComponent
                title={today >= 0 ? "Today's Profit" : "Today's Loss"}
                text={today >= 0 ? "text-success" : "text-danger"}
                data={"Rs. " + today}
              />
            </div>
          </div>
        </Grid>

        {view ? (
          <Grid container spacing={4} style={{ marginTop: "3vh" }}>
            {Hello}
          </Grid>
        ) : (
          <TableContainer component={Paper} style={{ marginTop: "3vh" }}> 
          <Table>
            <TableHead>
              <StyledTableRow className="bg-dark text-white">
                <TableCell>S.N</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Units</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Investment</TableCell>
                <TableCell>Profit/Loss</TableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>{Hello}</TableBody>
          </Table>
          </TableContainer>
        )}
      </Container>
    </>
  );
};

export default Portfolio;
