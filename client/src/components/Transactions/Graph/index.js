import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchGraphData } from "../../../api/service";
import MyResponsivePie from "../../Graphs/pie";

const Graph = () => {
  const { id } = useParams();
  const [units, setUnits] = useState();
  const [investment, setInvestment] = useState();
  useEffect(() => {
    fetchGraphData(id).then(({ databyUnits, databyInvestment }) => {
      console.log(databyUnits);
      setUnits(databyUnits);
      setInvestment(databyInvestment);
    });
  }, [id])
  return (
    <div className="d-flex flex-row" >
      <div className="card"  style={{width:'48%', marginRight:'2%'}}>
        <div className="card-header">Share Distribution by Units</div>
        <div className="card-body" style={{height:'50vh'}}>
          {units && <MyResponsivePie data={units} color="dark2" />}
        </div>
      </div>
      <div className="card " style={{width:'48%',marginLeft:'2%'}}>
        <div className="card-header">Share Distribution by Investment</div>
        <div className="card-body" style={{height:'50vh'}}>
          {investment && <MyResponsivePie data={investment} color="nivo" />}
        </div>
      </div>
    </div>
  );
};

export default Graph;
