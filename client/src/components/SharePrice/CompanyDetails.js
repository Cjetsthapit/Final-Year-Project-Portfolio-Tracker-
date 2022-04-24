import React, {  useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import CssLoader from "../../components/CssLoader/CssLoader";
import { Chip, Grid } from "@mui/material";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { fetchCompany } from "../../api/service";
import MyResponsiveLine from "../Graphs/line";
const Row=({title,data})=>{
  return(
      <TableRow>
      <TableCell>{title}</TableCell>
      <TableCell>{data}</TableCell>
    </TableRow>
  )
}
const CompanyDetails = () => {
  const history = useHistory();
  const { id } = useParams();
  const [company, setCompany] = useState({});
  const [chart, setChart] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchCompany(id).then(({ status, company, chart }) => {
      if (status === 200) {
        setCompany(company[0]);
        setLoading(false);
        setChart(chart);
        console.log(chart);
      } else {
        setLoading(false);
        history.push("/error");
      }
    });
  }, [id, history]);
  if (loading) {
    return <CssLoader />;
  }
  return (
    <>
      <Chip
        label={company.fname}
        sx={{
          background: "#111827",
          color: "white",
          padding: "20px 18px",
          fontSize: "1.1rem",
        }}
      />
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TableContainer
            component={Paper}
            sx={{ marginTop: "3vh" }}
            elevation={10}
          >
            <Table aria-label="simple table">
              <Row title="Sector" data={company.sector}/>
             <Row title='Shares Outstanding' data={company.sharesout}/>
             <Row title='Market Price' data={company.close}/>
             <Row title='% Change' data={company.diffper}/>
             <Row title='52 Weeks High - Low' data={company.low_high}/>
             <Row title='120 Day Average' data={company.avg_120}/>
             <Row title='1 Year Yield' data={company.yield}/>
             <Row title='EPS' data={company.eps}/>
             <Row title='P/E Ratio' data={company.pe}/>
             <Row title='Book Value' data={company.sector}/>
             <Row title='PBV' data={company.bookvalue}/>
             <Row title='% Dividend' data={company.dividend}/>
             <Row title='% Bonus' data={company.bonus}/>
             <Row title='Right Share' data={company.rightshares}/>
             <Row title='30-Day Avg Volume' data={company.avgvol}/>
             <Row title='Market Capitalization' data={company.marketcap}/>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={6} height="50vh">
          <div className="card " style={{ marginLeft: "2%" }}>
            <div className="card-header">Price History</div>
            <div className="card-body" style={{ height: "50vh" }}>
              {chart && (
                <MyResponsiveLine data={[chart]}/>
              )}
            </div>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default CompanyDetails;
