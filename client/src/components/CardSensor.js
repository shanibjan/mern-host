import React from 'react';

const CardSensor = ({ title, value }) => {
   
    return (
        <div className="sensor-card">
            <h3>{title}</h3>
            <p>{value}</p>
        </div>
    );
};

export default CardSensor;
