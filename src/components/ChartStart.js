import React from "react";
import "./App.scss";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
Chart.register(ArcElement);

const ChartStart = (props) => {
  var ref = React.createRef();
  var dataIncome = {
    labels: props.data,
    datasets: [
      {
        data: props.data,
        backgroundColor: [
          "#1B7F7A",
          "#61E8E1",
          "#E89061",
          "#9C4C22",
          "#9E5F8C",
          "#AAEBD5",
          "#A35148",
          "#EBE0A8",
          "#997FFF",
        ],
        borderWidth: 0,
        padding: 10,
      },
    ],
  };

  var options = {
    maintainAspectRatio: true,
    responsive: true,
    cutout: "70%",
  };

  return <Doughnut ref={ref} data={dataIncome} options={options} />;
};

export default ChartStart;
