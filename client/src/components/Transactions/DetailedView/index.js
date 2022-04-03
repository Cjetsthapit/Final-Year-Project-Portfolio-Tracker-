import { Button, Grid, Typography } from "@material-ui/core";
import AddCircleOutlineOutlined from "@material-ui/icons/AddCircleOutlineOutlined";
import {
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { fetchSingleLineData, singlePortfolio, singleTransaction } from "../../../api/service";
import CssLoader from "../../CssLoader/CssLoader";
import Layout from "../../Layout/Layout";
import AddTransaction from "../add";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import Component1 from "./component1";
import { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import MyResponsiveLine from "../Graph/line";

const DetailedView = () => {
  const history = useHistory();
  const { id, name } = useParams();
  const [portfolio, setPortfolio] = useState();
  const [type, setType] = useState();
  const [datas, setDatas] = useState();
  const [share, setShare] = useState();
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [openS, setOpenS] = useState(false);
  const [openE, setOpenE] = useState(false);
  const [openES, setOpenES] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenS = () => setOpenS(true);
  const handleCloseS = () => setOpenS(false);
  const handleOpenE = () => setOpenE(true);
  const handleCloseE = () => setOpenE(false);
  const handleOpenES = () => setOpenES(true);
  const handleCloseES = () => setOpenES(false);
  const [gdata, setGdata] = useState();
  const location = useLocation();
  useEffect(()=>{
    fetchSingleLineData(id,name).then(
      res=>{
        setGdata(res.data.data)
      }
    )
  },[])


  let out=[];
  let da=[];
  // gdata?.map((d)=>{
     out = [...new Map(gdata?.map(item =>
      [item['x'], item])).values()];
      da.push({"id":id,"data":out})

  // });

  
  useEffect(() => {
    singlePortfolio(id).then((res) => {
      if(res.data.status  === 404){
        history.goBack();
      }
      else{
        setPortfolio(res.data.status[0]);

      }
    });
    axios.get(`/api/call`).then((res) => {
      setShare(res.data.share);
    });
    singleTransaction(id, name).then((res) => {
      if (res.data.status === 404) {
        history.goBack();
      } else {
        setDatas(res.data.data[name]);
      }
    });
    setLoading(false);
  }, []);
  if (loading) {
    return (
      <Layout>
        <CssLoader />
      </Layout>
    );
  }
  let filterData = () => {
    return share && share.filter((item) => item.symbol === name);
  };
  const detailed = share && filterData()[0];
  const handleDeleteTransaction = (id) => {
    axios.delete(`/api/delete-singletransaction/${id}`, id).then((res) => {
      setLoading(true);
      console.log(res);
      window.location.reload();
    });
  };
  const handleEditTransaction = (item) => {
    if (item.type === 'sell'){
      handleOpenES();
    }else{
      handleOpenE()
    }
    setType(item);

  };
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  return (
    <>
      <Grid sx={{ margin: "100px auto", width: "80%" }}>
        <Grid container justify="space-between">
          <Typography variant="h5">{portfolio?.name} </Typography>
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<AddCircleOutlineOutlined />}
              onClick={handleOpen}
            >
              Add Shares
            </Button>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<RemoveCircleOutlineOutlinedIcon />}
              onClick={handleOpenS}
            >
              Sell Shares
            </Button>
          </Stack>
        </Grid>
      </Grid>
      <AddTransaction
        open={open}
        handleClose={handleClose}
        title="Add"
        button="Add"
        share={[{ symbol: name }]}
        type="disabled"
        ttype="buy"
      ></AddTransaction>
      <AddTransaction
        open={openS}
        handleClose={handleCloseS}
        title="Sell"
        button="Sell"
        share={[{ symbol: name }]}
        type="disabled"
        ttype="sell"
        data={datas}
        detailed={detailed}
      ></AddTransaction>
      <Component1 data={datas} detailed={detailed} type="detailed" />
      <TableContainer
        component={Paper}
        elevation={10}
        sx={{ marginTop: "15px" }}
      >
        <Table className="table">
          <TableHead>
            <TableRow>
              <StyledTableCell>S.N.</StyledTableCell>
              <StyledTableCell>Type</StyledTableCell>
              <StyledTableCell>Units</StyledTableCell>
              <StyledTableCell>Price</StyledTableCell>
              <StyledTableCell>Date of Transaction</StyledTableCell>
              <StyledTableCell sx={{width:'20%'}}>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {datas &&
              datas.map((item, index) => (
                <TableRow key={index}>
                  <StyledTableCell className="font-weight-bold">{index + 1}</StyledTableCell>
                  <StyledTableCell className="text-capitalize">{item.type}</StyledTableCell>
                  <StyledTableCell>{item.units}</StyledTableCell>
                  <StyledTableCell>{item.price}</StyledTableCell>
                  <StyledTableCell>{item.date}</StyledTableCell>

                  <StyledTableCell>
                    <button
                      className="btn btn-success me-4"
                      onClick={() => handleEditTransaction(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeleteTransaction(item.id)}
                    >
                      Delete
                    </button>
                  </StyledTableCell>
                </TableRow>
              ))}
            <AddTransaction
              open={openE}
              handleClose={handleCloseE}
              title="Edit Buy"
              button="Edit"
              share={[{ symbol: name }]}
              type="disabled"
              item={type}
            ></AddTransaction>
            <AddTransaction
              open={openES}
              handleClose={handleCloseES}
              title="Edit Sell"
              button="Edit"
              share={[{ symbol: name }]}
              type="disabled"
              item={type}
              ttype="sell"

            ></AddTransaction>
          </TableBody>
        </Table>
      </TableContainer>
                
      <div className="card mt-4" >
        <div className="card-body" style={{height:'70vh'}}>
        {da && <MyResponsiveLine data={da}/>}

        </div>
      </div>
    </>
  );
};

export default DetailedView;
