import { Container, Grid, Typography } from "@material-ui/core";
import React from "react";
import { useParams } from "react-router-dom";
import SmallComponent from "../BlockView/SmallComponent";

const Component1 = ({ data, detailed }) => {
  let number = 0;
  let name = "";
  let sold = 0;
  let investment = 0;
  let buyNumber = 0;
  let avg = 0;
  let soldValue = 0;
  let profit = 0;
  data &&
    data.map((d) => {
      name = d.Share;

      if (d.type == "buy") {
        buyNumber = buyNumber + d.units;

        number = number + d.units;
        investment = investment + d.investment;
      } else {
        number = number - parseInt(d.units);
        sold = sold + d.units;
      }
    });
  let latest = parseFloat(detailed?.close?.replace(/,/g, "")) * number;
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
  avg = investment / buyNumber;
  data &&
    data.map((a) => {
      if (a.type == "sell") {
        soldValue = soldValue + a.investment;
        profit = profit + (a.investment - avg * a.units);
      }
    });
  if (number !== 0) {
    if (latest <= number * avg) {
      profit = profit + (latest - 25 - broker - sebon - number * avg);
    } else {
      profit =
        profit + (37 / 40) * (latest - 25 - broker - sebon - number * avg);
    }
    // profit = profit + (19/20) * (latest - 25 - broker - sebon - number * avg);
  }
  let profitper = (profit / investment) * 100;
  let buttonClasses = ["btn", "btn-primary"];
  const { id } = useParams();
  if (detailed?.diffper < 0) {
    buttonClasses.pop();
    buttonClasses.push("btn-danger");
  } else {
    buttonClasses.pop();
    buttonClasses.push("btn-success");
  }
  return (
    <Container style={{marginTop:'2em'}}>
      <Grid item sm={12}>
        <div className="card border-dark">
          <div className="card-header d-flex justify-content-between text-white border-secondary bg-dark">
            <Typography className="btn btn-secondary">
              {detailed && detailed.symbol}
            </Typography>
            <Typography>
              LTP:{" "}
              <Typography className={buttonClasses.join(" ")}>
                Rs. {detailed && detailed.close}
              </Typography>
            </Typography>
            <div>
              Change:{" "}
              <Typography className={buttonClasses.join(" ")}>
                {detailed && detailed.diff}
              </Typography>
            </div>
            <Typography className={buttonClasses.join(" ")}>
              {detailed && detailed.diffper}%
            </Typography>
          </div>
          <div className="card-body bg-dark text-light">
            <div className="row">
              <SmallComponent title="Current Units" data={number} />
              <SmallComponent title="Sold Units" data={sold} />
              <SmallComponent title="Investment" data={"Rs. " + (Math.round(investment)).toLocaleString()} />
            </div>
            <div className="row">
              <SmallComponent title="WACC" data={"Rs. " + avg.toFixed(2)} />
              <SmallComponent title="Sold Value" data={soldValue} />
              <SmallComponent
                title="Current Value"
                data={
                  "Rs. " +
                  (
                    number * parseFloat(detailed?.close?.replace(/,/g, ""))
                  ).toLocaleString()
                }
              />
            </div>
            <div className="row">
              <SmallComponent
                title={profit >= 0 ? "Estimated Profit" : "Estimated Loss"}
                data={"Rs. " + (Math.round(profit)).toLocaleString()}
                text={profit >= 0 ? "text-success" : "text-danger"}
              />
              <SmallComponent
                title={profit >= 0 ? "Profit %" : "Loss %"}
                data={Math.round(profitper) + "%"}
                text={profit >= 0 ? "text-success" : "text-danger"}
              />
              <SmallComponent
                title={
                  detailed?.diff * number >= 0
                    ? "Today's Profit"
                    : "Today's Loss"
                }
                data={detailed?.diff * number}
                text={
                  detailed?.diff * number >= 0 ? "text-success" : "text-danger"
                }
              />
            </div>
          </div>
        </div>
      </Grid>
    </Container>
  );
};

export default Component1;
