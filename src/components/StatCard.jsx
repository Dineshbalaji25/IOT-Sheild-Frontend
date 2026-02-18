import React from 'react';
import './StatCard.css';

const StatCard = ({ title, value, color }) => {
    return (
        <div className="stat-card" style={{ borderTop: `4px solid ${color}` }}>
            <div className="stat-card-content">
                <h3 className="stat-title">{title}</h3>
                <p className="stat-value">{value}</p>
            </div>
        </div>
    );
};

export default StatCard;
