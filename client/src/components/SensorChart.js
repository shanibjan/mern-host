import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

const SensorChart = ({ data, label }) => {
    const chartData = {
        labels: data.map(entry => new Date(entry.timestamp).toLocaleTimeString()),
        datasets: [
            {
                label,
                data: data.map(entry => entry.value),
                fill: true,
                borderColor: 'red',
                color:'red',
                tension: 1
            }
        ]
    };

    return <Line data={chartData} />;
};

export default SensorChart;
