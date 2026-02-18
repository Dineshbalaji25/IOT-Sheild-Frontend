import React from 'react';
import './Table.css';

const SensorTable = ({ data }) => {
    if (!data || data.length === 0) {
        return <div className="no-data">No sensor data found.</div>;
    }

    return (
        <div className="table-container">
            <table className="data-table">
                <thead>
                    <tr>
                        <th>Timestamp</th>
                        <th>Device ID</th>
                        <th>Temp (°C)</th>
                        <th>Humidity (%)</th>
                        <th>Voltage (V)</th>
                        <th>Current (A)</th>
                        <th>Pressure (hPa)</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={item.id || index}>
                            <td>{new Date(item.timestamp).toLocaleString()}</td>
                            <td>{item.device_id}</td>
                            <td>{item.temperature?.toFixed(2)}</td>
                            <td>{item.humidity?.toFixed(2)}</td>
                            <td>{item.voltage?.toFixed(2)}</td>
                            <td>{item.current?.toFixed(2)}</td>
                            <td>{item.pressure?.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SensorTable;
