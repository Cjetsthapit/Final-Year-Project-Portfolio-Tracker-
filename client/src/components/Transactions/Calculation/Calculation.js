import React from "react";
import BlockView from "../BlockView";
import TableView from "../TableView";
const Calculation = ({ data, filterData, type, index }) => {
  // const extApi = filterData()[0];
  let extApi= filterData()[0]
  

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
  let latest = parseFloat(extApi?.close?.replace(/,/g, "")) * number;
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
  let view = null;
  if (type === "block") {
    view = (
      <BlockView
        filterData={filterData}
        number={number}
        name={name}
        sold={sold}
        soldValue={soldValue.toFixed(2)}
        avg={Math.round((avg + Number.EPSILON) * 100) / 100}
        investment={Math.round(investment).toLocaleString()}
        profit={Math.round(profit)}
        profitper={profitper}
      />
    );
  } else if (type === "table") {
    view = (
      <TableView
        number={number}
        filterData={filterData}
        index={index}
        name={name}
        sold={sold}
        soldValue={soldValue.toFixed(2)}
        avg={Math.round((avg + Number.EPSILON) * 100) / 100}
        investment={Math.round(investment).toLocaleString()}
        profit={Math.round(profit)}
        profitper={profitper}
      />
    );
  } else {
    // view = (
    //   <Component1
    //     data={data}
    //     number={number}
    //     detailed={detailed}
    //     sold={sold}
    //     soldValue={soldValue.toFixed(2)}
    //     avg={Math.round((avg + Number.EPSILON) * 100) / 100}
    //     investment={Math.round(investment).toLocaleString()}
    //     profit={Math.round(profit)}
    //     profitper={profitper}
    //   />
    // );
  }

  return (
    <>
      {view}
    </>
  );
};

export default Calculation;
