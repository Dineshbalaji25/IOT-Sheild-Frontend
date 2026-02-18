import React, { useState, useEffect, useCallback } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    AreaChart, Area
} from 'recharts';
import sensorService from '../services/sensorService';
import alertService from '../services/alertService';
import StatCard from '../components/StatCard';
import './Dashboard.css';

const Dashboard = () => {
    const [latestData, setLatestData] = useState([]);
    const [stats, setStats] = useState({
        total_messages: 0,
        total_alerts: 0,
        active_devices: 0
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [recentAlerts, setRecentAlerts] = useState([]);

    const fetchData = useCallback(async () => {
        try {
            const [latestResponse, statsResponse, alertsResponse] = await Promise.all([
                sensorService.getLatestSensors(),
                sensorService.getStats(),
                alertService.getAlerts()
            ]);

            // Normalize data to use 'timestamp' consistently
            const latest = (Array.isArray(latestResponse) ? latestResponse : (latestResponse?.items || [])).map(item => ({
                ...item,
                timestamp: item.received_at || item.timestamp || new Date().toISOString()
            }));

            const alerts = (Array.isArray(alertsResponse) ? alertsResponse : (alertsResponse?.items || [])).map(item => ({
                ...item,
                timestamp: item.alert_created_at || item.message_timestamp || item.received_at || item.timestamp || new Date().toISOString()
            }));

            setLatestData(latest);
            setStats({
                total_messages: statsResponse?.total_messages ?? 0,
                total_alerts: statsResponse?.total_alerts ?? 0,
                active_devices: statsResponse?.active_devices ?? 0
            });
            setRecentAlerts(alerts.slice(0, 5));
            setError(null);
        } catch (err) {
            console.error('Error fetching dashboard data:', err);
            setError('Backend unavailable');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 5000);
        return () => clearInterval(interval);
    }, [fetchData]);

    if (loading && latestData.length === 0) {
        return <div className="spinner"></div>;
    }

    const lastSyncTime = latestData.length > 0
        ? new Date(latestData[0].timestamp).toLocaleTimeString()
        : new Date().toLocaleTimeString(); // Fallback to current time if no data yet

    return (
        <div className="container">
            <header className="dashboard-header">
                <h1>Real-Time Monitoring</h1>
                <p className="subtitle">Live telemetry from all connected IoT devices</p>
                {error && <div className="error-message">{error}</div>}
            </header>

            <div className="grid grid-cols-4">
                <StatCard title="Total Messages" value={(stats.total_messages || 0).toLocaleString()} color="var(--primary-color)" />
                <StatCard title="Total Alerts" value={(stats.total_alerts || 0).toLocaleString()} color="var(--danger-color)" />
                <StatCard title="Active Devices" value={stats.active_devices || 0} color="var(--success-color)" />
                <StatCard title="Last Sync" value={lastSyncTime} color="var(--warning-color)" />
            </div>

            <div className="dashboard-charts grid mt-2">
                <div className="card chart-container">
                    <h3>Temperature Comparison (°C)</h3>
                    <div style={{ height: 300 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={latestData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                <XAxis dataKey="device_id" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Legend iconType="circle" />
                                <Line
                                    type="monotone"
                                    dataKey="temperature"
                                    stroke="#ef4444"
                                    strokeWidth={3}
                                    dot={{ r: 6, fill: '#ef4444', strokeWidth: 2, stroke: '#fff' }}
                                    activeDot={{ r: 8 }}
                                    name="Temperature"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="card chart-container">
                    <h3>Humidity Comparison (%)</h3>
                    <div style={{ height: 300 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={latestData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                <XAxis dataKey="device_id" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Legend iconType="circle" />
                                <Line
                                    type="monotone"
                                    dataKey="humidity"
                                    stroke="#3b82f6"
                                    strokeWidth={3}
                                    dot={{ r: 6, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }}
                                    activeDot={{ r: 8 }}
                                    name="Humidity"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="card chart-container">
                    <h3>Voltage Levels (V)</h3>
                    <div style={{ height: 300 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={latestData}>
                                <defs>
                                    <linearGradient id="colorVoltage" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                <XAxis dataKey="device_id" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Legend iconType="circle" />
                                <Area
                                    type="monotone"
                                    dataKey="voltage"
                                    stroke="#f59e0b"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorVoltage)"
                                    name="Voltage"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="card recent-alerts-container">
                    <h3>Recent Alerts</h3>
                    <div className="mini-alerts">
                        {recentAlerts.length === 0 ? (
                            <p className="no-alerts">No active alerts</p>
                        ) : (
                            <ul className="alert-list-mini">
                                {recentAlerts.map((alert, idx) => (
                                    <li key={idx} className="alert-item-mini">
                                        <span className="alert-badge text-danger">Alert</span>
                                        <span className="alert-device">{alert.device_id}</span>
                                        <span className="alert-param">
                                            {Array.isArray(alert.violated_parameters)
                                                ? alert.violated_parameters.join(', ')
                                                : (typeof alert.violated_parameters === 'string'
                                                    ? alert.violated_parameters
                                                    : 'Violation')}
                                        </span>
                                        <span className="alert-time">{new Date(alert.timestamp).toLocaleTimeString()}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
