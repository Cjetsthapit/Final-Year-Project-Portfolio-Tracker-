import { useTheme } from "@emotion/react";
import {  TableContainer, Typography,TableBody,Paper,Table,TableCell,TableRow,TablePagination, IconButton,TableFooter, TableHead, Grid, Button, Divider, Chip } from "@mui/material";
import { Box } from "@mui/system";
import React,{useState,useEffect} from "react";
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { userList } from "../../api/service";
import CssLoader from "../../components/CssLoader/CssLoader";
import { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import SharePrice from "../../components/SharePrice/SharePrice";
import axios from "axios";
import { toast } from "react-toastify";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    borderBottom: "1px solid black",
    color: theme.palette.common.white,
  },
}));
function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

const Dashboard = () => {
  const [rows,setRows]=useState([]);
  const [loading,setLoading]=useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [latest, setLatest] = useState();

  useEffect(() => {
    userList().then((users)=>{
     setRows(users.users)
      setLoading(false)
    })
    
    axios.get(`/api/latest`).then(res=>{
       const d = new Date(res.data.day[0].created_at).toString();
       setLatest(d)
      
    })
  }, []);
  const handleDailyApi=(e)=>{
    e.preventDefault();
    axios.get("/api/dailycall");
    toast.success("Daily Data fetched");
  }
  const handleCompanyImport=(e)=>{
    e.preventDefault();
    axios.get("/api/company");
    toast.success("Company Data Imported");

  }
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  if (loading){
    return <CssLoader/>
  }
  return (
    <>
      <Typography variant="h4" mb={3}>Dashboard</Typography>
      <TableContainer component={Paper} sx={{marginBottom:'5vh'}}>
      <Table sx={{ minWidth: 500 }}>
        <TableHead>
          <TableRow>
            <StyledTableCell>
              Name
            </StyledTableCell>
            <StyledTableCell>
              Email
            </StyledTableCell>
            <StyledTableCell>
              Number of Portfolios
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row,index) => (
            <TableRow key={index}>
              <TableCell >
                {row.name}
              </TableCell>
              <TableCell >
                {row.email}
              </TableCell>
              <TableCell >
                {row.portfolioCount}
              </TableCell>
            </TableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
    <Divider/>
    <Grid style={{marginBottom:'2vh',marginTop:'5vh'}}>
      <Button variant="contained" style={{marginRight:'3vh'}} onClick={handleDailyApi}>Fetch Daily Share </Button>
      <Button variant="contained" onClick={handleCompanyImport}>Import Company Details</Button>
    </Grid>
    <Chip color="secondary" label={latest} style={{marginBottom:'1vh'}}/>
    <SharePrice urlpath={`/admin/data/`}/>
  

    </>
  );
};

export default Dashboard;
