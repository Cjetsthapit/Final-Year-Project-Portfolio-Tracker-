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
import SharePrice from "../../components/SharePrice/SharePrice";

const HomePage = () => {
  const [share, setShare] = useState();
  const [loading, setLoading] = useState(true);
  const [gainer, setGainer] = useState();
  const [loser, setLoser] = useState();
   
  return (
    <SharePrice urlpath={`/homepage/`}/>
  );
};

export default HomePage;
