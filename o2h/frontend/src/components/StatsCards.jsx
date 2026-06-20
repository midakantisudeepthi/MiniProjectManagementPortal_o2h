import React from 'react';

const StatsCards = ({ tasks = [] }) => {
  const total = tasks.length;
  const pending = tasks.filter(t => t.status === 'Pending').length;
  const completed = tasks.filter(t => t.status === 'Completed').length;

  const cards = [
    { label: 'Total Tasks', value: total, border: 'metric-total', icon: 'bi-list-task' },
    { label: 'Pending', value: pending, border: 'metric-pending', icon: 'bi-clock' },
    { label: 'Completed', value: completed, border: 'metric-completed', icon: 'bi-check2-circle' }
  ];

  return (
    <div className="row g-3 mb-4">
      {cards.map((card, idx) => (
        <div key={idx} className="col-12 col-md-4">
          <div className={`glass-card metric-card p-3 d-flex align-items-center justify-content-between ${card.border}`}>
            <div>
              <div className="text-muted small text-uppercase fw-semibold">{card.label}</div>
              <h3 className="m-0 fw-bold">{card.value}</h3>
            </div>
            <i className={`bi ${card.icon} fs-3 text-secondary opacity-50`}></i>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
