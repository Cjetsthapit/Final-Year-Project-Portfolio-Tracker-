import { Button, Container, Grid, Typography } from '@material-ui/core'
import AddCircleOutlineOutlined from '@material-ui/icons/AddCircleOutlineOutlined';
import { Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import {listUserPortfolio, portfolioInvestment } from '../../api/service';
import CssLoader from '../../components/CssLoader/CssLoader';
import AddPortfolio from '../../components/Portfolio/AddPortfolio';
import PortfolioBlock from '../../components/Portfolio/PortfolioBlock';

const PortfolioList = () => {
    const [loading, setLoading] = useState(true);
    const [portfolioList, setPortfolioList] = useState();
    const [empty, setEmpty] = useState();
    useEffect(() => {
        setLoading(false);
        listUserPortfolio(localStorage.getItem('auth_id')).then(res => {
            setEmpty(res.data.status)
        })
        portfolioInvestment(localStorage.getItem('auth_id')).then(res => {
            setPortfolioList(res.data.status);
        })
    }, [])
    let demo = [];
    let portfolio = [];

    portfolioList && Object.keys(portfolioList).map(function (key, index) {
        return (
            demo.push(portfolioList[key])
        )
    })
    demo.map(item => {
        let sum = 0;
        item.map(it => {
            sum += it.total
        })
        portfolio.push({
            name: item[0].pname,
            id: item[0].id,
            total: sum
        })
    })

    const [openM, setOpenM] = useState(false);
    const handleOpenM = () => setOpenM(true);
    const handleCloseM = () => setOpenM(false);

    let add = '';
    let unique = [];
    empty?.map(e => {
        let isUnique = true;
        portfolio.map(p => {
            if (p.id === e.id) {
                isUnique = false
            }
        })
        if (isUnique === true) {
            unique.push(e)
        }
    })
    if (portfolioList?.length === 0 && unique?.length === 0) {
        add = <div>Add Portfolio</div>
            ;
    }
    if (loading) {
        return (<><CssLoader /></>)
    }
    return (
        <>

            <Grid sx={{ margin: '100px auto', width: '80%' }}>
                <Grid container justify="space-between">
                    <Typography variant="h5">Current Portfolios</Typography>
                    <Stack direction="row" spacing={2}>
                        <Button variant="contained" color="secondary" startIcon={<AddCircleOutlineOutlined />} onClick={handleOpenM}>
                            Add Portfolio
                        </Button>
                    </Stack>
                </Grid>
            </Grid>
            <AddPortfolio open={openM} handleClose={handleCloseM} title="Create a new Portfolio" button="Add Portfolio" type="add" />

            <Container maxWidth="" >
                <Grid container spacing={4} style={{ marginTop: '3vh' }}>
                    {add}
                    {portfolio && portfolio?.map((data, index) =>
                        <PortfolioBlock key={data.id} name={data.name} id={data.id} inv={data.total} />
                    )}
                    {unique && unique?.map((data, index) =>
                        <PortfolioBlock key={data.id} name={data.name} id={data.id} inv="0" />
                    )}
                </Grid>

            </Container>

        </>
    )
}

export default PortfolioList
