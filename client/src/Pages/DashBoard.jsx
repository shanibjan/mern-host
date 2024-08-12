import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SensorChart from "../components/SensorChart";
import CardSensor from "../components/CardSensor";
import axios from "axios";

function DashBoard() {
  const location = useLocation();
  const [data, setdata] = useState([]);
  const [sensorData, setSensorData] = useState([]);
  const [selectedSensor, setSelectedSensor] = useState(null);
  const [chartData, setChartData] = useState([{ value: 1 }]);
  let sensored = [];
  sensored.push(sensorData);
  console.log(location);
  sensored.map((s) => {
    console.log(s);
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/sensors/simulate"
        );
        setSensorData(response.data.data);
      } catch (error) {
        console.error("Error fetching sensor data:", error);
      }
    };

    fetchData();
  }, []);

  const handleCardClick = async (sensorType) => {
    console.log(sensorType);
    setSelectedSensor(sensorType);
    setChartData([
      {
        value: sensorType,
        date: new Date(),
      },
    ]);
    
  };

  
  return (
    <>
      {location.state !=null ? (<div className="app">

<h1 className="head-card" >Current Sensor Data</h1>
<div className="sensor-cards">
 
  <div className="card-sensor" onClick={() => handleCardClick(sensorData.pH)}>
    <CardSensor title={"pH"} value={sensorData.pH} />
  </div>
  <div className="card-sensor" onClick={() => handleCardClick(sensorData.TSS)}>
    <CardSensor title={"TSS"} value={sensorData.TSS} />
  </div>
  <div className="card-sensor" onClick={() => handleCardClick(sensorData.TDS)}>
    <CardSensor title={"TDS"} value={sensorData.TDS} />
  </div>
  <div className="card-sensor" onClick={() => handleCardClick(sensorData.BOD)}>
    <CardSensor title={"BOD"} value={sensorData.BOD} />
  </div>
  <div className="card-sensor" onClick={() => handleCardClick(sensorData.COD)}>
    <CardSensor title={"COD"} value={sensorData.COD} />
  </div>
  <div className="card-sensor" onClick={() => handleCardClick(sensorData.pH)}>
    <CardSensor title={"chloride"} value={sensorData.pH} />
  </div>
</div>
{selectedSensor && (
  <div className="chart-container">
    <h2>{selectedSensor} Data Over Time</h2>
    <SensorChart data={chartData} label={selectedSensor} />
  </div>
)}
</div>):'404 Not Found'}
      
    </>
  );
}

export default DashBoard;
