import React, { useState, useEffect } from 'react';
import alertService from '../services/alertService';
import AlertTable from '../components/AlertTable';

const Alerts = () => {
    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAlerts = async () => {
            try {
                const data = await alertService.getAlerts();
                const sortedData = [...data].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
                setAlerts(sortedData);
                setError(null);
            } catch (err) {
                console.error('Error fetching alerts:', err);
                setError('Backend unavailable');
            } finally {
                setLoading(false);
            }
        };

        fetchAlerts();
        const interval = setInterval(fetchAlerts, 5000);
        return () => clearInterval(interval);
    }, []);

    if (loading) return <div className="spinner"></div>;

    return (
        <div className="container">
            <header className="page-header">
                <h1>Alert History</h1>
                <p className="subtitle">List of all system alerts and threshold violations</p>
                {error && <div className="error-message">{error}</div>}
            </header>

            <AlertTable alerts={alerts} />
        </div>
    );
};

export default Alerts;
