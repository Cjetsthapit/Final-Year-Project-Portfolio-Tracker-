import {  Grid, Typography } from "@material-ui/core";
import React from "react";
import { Link, useParams } from "react-router-dom";
import SmallComponent from "./SmallComponent";

const BlockView = ({
  filterData,
  number,
  sold,
  investment,
  avg,
  soldValue,
  profit,
  profitper,
}) => {
  const extApi = filterData()[0];
  const buttonClasses = ["btn", "btn-primary"];
  const { id } = useParams();
  if (extApi?.diffper < 0) {
    buttonClasses.pop();
    buttonClasses.push("btn-danger");
  } else {
    buttonClasses.pop();
    buttonClasses.push("btn-success");
  }
  return (
    <Grid item sm={12} lg={6}>
      {/* <Link to={`/portfolio/${id}/${extApi && extApi.symbol}`} style={{textDecoration:'none'}} state={{number:'number'}}> */}
      <Link to={{ pathname: `/portfolio/${id}/${extApi && extApi.symbol}`, state:{ number: number } }} style={{ textDecoration: 'none' }} >

        <div className="card border-dark">
          <div className="card-header d-flex justify-content-between text-white border-secondary bg-dark">
            <Typography className="btn btn-secondary">
              {extApi && extApi.symbol}
            </Typography>
            <Typography>
              LTP:{" "}
              <Typography className={buttonClasses.join(" ")}>
                Rs. {extApi && extApi.close}
              </Typography>
            </Typography>
            <div>
              Change:{" "}
              <Typography className={buttonClasses.join(" ")}>
                {extApi && extApi.diff}
              </Typography>
            </div>
            <Typography className={buttonClasses.join(" ")}>
              {extApi && extApi.diffper}%
            </Typography>
          </div>
          <div className="card-body bg-dark text-light">
            <div className="row">
              <SmallComponent title="Current Units" data={number} />
              <SmallComponent title="Sold Units" data={sold} />
              <SmallComponent title="Investment" data={"Rs. " + investment} />
            </div>
            <div className="row">
              <SmallComponent title="WACC" data={"Rs. " + avg.toFixed(2)} />
              <SmallComponent title="Sold Value" data={soldValue} />
              <SmallComponent
                title="Current Value"
                data={
                  "Rs. " +
                  (
                    number * parseFloat(extApi?.close?.replace(/,/g, ""))
                  ).toLocaleString()
                }
              />
            </div>
            <div className="row">
              <SmallComponent
                title={profit >= 0 ? "Estimated Profit" : "Estimated Loss"}
                data={"Rs." + profit.toLocaleString()}
                text={profit >= 0 ? "text-success" : "text-danger"}

              />
              <SmallComponent
                title={profit >= 0 ? "Profit %" : "Loss %"}
                data={Math.round(profitper) + "%"}
                text={profit >= 0 ? "text-success" : "text-danger"}

              />
              <SmallComponent
                title={
                  extApi?.diff * number >= 0 ? "Today's Profit" : "Today's Loss"
                }
                data={extApi?.diff * number}
                text={extApi?.diff * number >= 0 ? "text-success" : "text-danger"}

              />
            </div>
          </div>
        </div>
      </Link>
    </Grid>
  );
};

export default BlockView;
