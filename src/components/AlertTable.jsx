import React from 'react';
import './Table.css';

const AlertTable = ({ alerts }) => {
    if (!alerts || alerts.length === 0) {
        return <div className="no-data">No alerts found.</div>;
    }

    return (
        <div className="table-container">
            <table className="data-table">
                <thead>
                    <tr>
                        <th>Timestamp</th>
                        <th>Device ID</th>
                        <th>Topic</th>
                        <th>Violated Params</th>
                        <th>Actual Values</th>
                    </tr>
                </thead>
                <tbody>
                    {alerts.map((alert, index) => (
                        <tr key={alert.id || index}>
                            <td>{new Date(alert.timestamp).toLocaleString()}</td>
                            <td>{alert.device_id}</td>
                            <td>{alert.topic}</td>
                            <td className="text-danger">
                                {alert.violated_parameters.join(', ')}
                            </td>
                            <td>
                                <pre className="json-values">
                                    {JSON.stringify(alert.actual_values, null, 2)}
                                </pre>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AlertTable;
