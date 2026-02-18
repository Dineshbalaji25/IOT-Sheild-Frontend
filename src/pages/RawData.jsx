import React, { useState, useEffect } from 'react';
import sensorService from '../services/sensorService';
import SensorTable from '../components/SensorTable';
import './RawData.css';

const RawData = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [limit] = useState(20);
    const [deviceId, setDeviceId] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const params = {
                    page,
                    limit,
                    device_id: deviceId || undefined,
                    start_time: startTime || undefined,
                    end_time: endTime || undefined
                };
                const response = await sensorService.getSensorHistory(params);

                // Backend might return { items: [], total: 0 } or just an array
                if (response && response.items) {
                    setData(response.items);
                } else if (Array.isArray(response)) {
                    setData(response);
                } else {
                    setData([]);
                }

                setError(null);
            } catch (err) {
                console.error('Error fetching sensor history:', err);
                setError('Backend unavailable');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [page, limit, deviceId, startTime, endTime]);

    return (
        <div className="container">
            <header className="page-header">
                <h1>Raw Telemetry Data</h1>
                <p className="subtitle">Detailed historical sensor logs</p>
            </header>

            <div className="filters card">
                <div className="filter-grid">
                    <div className="filter-group">
                        <label>Device ID</label>
                        <input
                            type="text"
                            value={deviceId}
                            onChange={(e) => { setDeviceId(e.target.value); setPage(1); }}
                            placeholder="e.g. sensor_001"
                        />
                    </div>
                    <div className="filter-group">
                        <label>Start Time</label>
                        <input
                            type="datetime-local"
                            value={startTime}
                            onChange={(e) => { setStartTime(e.target.value); setPage(1); }}
                        />
                    </div>
                    <div className="filter-group">
                        <label>End Time</label>
                        <input
                            type="datetime-local"
                            value={endTime}
                            onChange={(e) => { setEndTime(e.target.value); setPage(1); }}
                        />
                    </div>
                </div>
            </div>

            {error && <div className="error-message">{error}</div>}

            {loading ? (
                <div className="spinner"></div>
            ) : (
                <div className="data-section mt-1">
                    <SensorTable data={data} />

                    <div className="pagination">
                        <button
                            className="pagination-btn"
                            disabled={page === 1}
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                        >
                            Previous
                        </button>
                        <span className="page-info">Page {page}</span>
                        <button
                            className="pagination-btn"
                            disabled={data.length < limit}
                            onClick={() => setPage(p => p + 1)}
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RawData;
