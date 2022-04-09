import {
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from "@material-ui/core";
import { Modal, Box, Typography, Grid, TextField } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import {  useParams } from "react-router-dom";
import { toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-40%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #eee",
  boxShadow: 24,
  p: 4,
};
const AddTransaction = ({
  open,
  handleClose,
  type,
  title,
  button,
  share,
  data,
  ttype,
  item,
}) => {
  const { id } = useParams();
  const { name } = useParams();
  const [tshare, setTshare] = useState();
  const [tdate, setTdate] = useState();
  const [tunits, setTunits] = useState();
  const [tprice, setTprice] = useState();
  const [gain, setGain] = useState();
  const [avg, setAvg] = useState();
  useEffect(() => {
    if (share[0]) {
      setTshare(share[0].symbol);
    }
    if (item) {
      return;
    }
     name && axios.get(`/api/get-average/${id}/${name}`).then((res) => {
      setAvg(res.data.average);
    });
  }, [item,share,id,name]);
  const handleAdd = (e) => {
    e.preventDefault();
    if (item?.type === "sell") {
      const data = {
        portfolio_id: id,
        name: tshare,
        date: tdate,
        price: tprice,
        units: tunits,
        type: "sell",
        avg: avg,
        gainper: gain,
      };
      console.log(data)
      if (tdate && tprice && tunits && avg && gain) {

      axios.post(`/api/editsell-transaction/${item?.id}`, data).then((res) => {
        
          toast.success("Updated");
          window.location.reload();
        });
        } else {
          handleClose();
          toast.error("Please fill in all the fields correctly");
        }
    } else if (item?.type === "buy") {
      const data = {
        portfolio_id: id,
        name: tshare,
        date: tdate,
        price: tprice,
        units: tunits,
        type: "buy",
      };
      if (tdate && tprice && tunits) {
      
        axios.post(`/api/editbuy-transaction/${item?.id}`, data).then((res) => {
          toast.success("Updated");
          window.location.reload();
        });
      }
      else{
        toast.error("Please fill in all the fields correctly");
      }
    } else if (ttype === "sell") {
      const data = {
        portfolio_id: id,
        name: tshare,
        date: tdate,
        price: tprice,
        units: tunits,
        type: "sell",
        avg: avg,
        gainper: gain,
      };
      if (tdate && tprice && tunits && avg && gain) {
        axios.post(`/api/sell-transaction`, data).then((res) => {
          toast.success("Sold");
          window.location.reload();
        });
      } else {
        handleClose();
        toast.error("Please fill in all the fields correctly");
      }
    } else if (ttype === "buy") {
      const data = {
        portfolio_id: id,
        name: tshare,
        date: tdate,
        price: tprice,
        units: tunits,
        type: "buy",
      };
      axios.post(`/api/create-transaction`, data).then((res) => {
        toast.success("Added");
        window.location.reload();
      });
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {title}
        </Typography>
        {type === "disabled" ? (
          <TextField
            type="text"
            label="Select a Share"
            fullWidth
            margin="dense"
            variant="filled"
            value={tshare}
            disabled
          />
        ) : (
          <FormControl sx={{ mb: 1 }} fullWidth margin="dense" variant="filled">
            <InputLabel id="demo-simple-select-filled-label">
              Select a Share
            </InputLabel>
            <Select
              id="demo-simple-select-helper"
              fullWidth
              variant="filled"
              margin="dense"
              onChange={(e) => setTshare(e.target.value)}
            >
              {share.map((item) => (
                <MenuItem value={item.symbol}>{item.symbol}</MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        <TextField
          type="number"
          label="Units"
          fullWidth
          margin="dense"
          variant="filled"
          value={tunits}
          onChange={(e) => setTunits(e.target.value)}
        />
        <TextField
          type="number"
          label="Price"
          fullWidth
          margin="dense"
          variant="filled"
          value={tprice}
          onChange={(e) => setTprice(e.target.value)}
        />
        {ttype === "sell" && (
          <FormControl margin="dense">
            <FormLabel>Capital Gain Tax</FormLabel>
            <RadioGroup
              variant="filled"
              value={gain}
              onClick={(e) => setGain(e.target.value)}
            >
              <FormControlLabel value="7.5" control={<Radio />} label="7.5 %" />
              <FormControlLabel value="5" control={<Radio />} label="5 %" />
            </RadioGroup>
          </FormControl>
        )}

        <TextField
          InputLabelProps={{
            shrink: true,
          }}
          label="Date of Transaction"
          type="date"
          fullWidth
          margin="dense"
          variant="filled"
          value={tdate}
          onChange={(e) => setTdate(e.target.value)}
        />

        <Grid container style={{ marginTop: "1vh" }} spacing={1}>
          <Grid item>
            <button className="btn btn-success" mt={2} onClick={handleAdd}>
              {button}
            </button>
          </Grid>

          <Grid item>
            <button className="btn btn-danger" mt={2} onClick={handleClose}>
              Cancel
            </button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default AddTransaction;
