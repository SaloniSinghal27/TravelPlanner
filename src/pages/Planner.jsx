import React, { useState } from 'react';
import './Planner.css';

function Planner() {
  const [formData, setFormData] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    budget: '',
  });

  const [summary, setSummary] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { destination, startDate, endDate, budget } = formData;

    if (!destination || !startDate || !endDate || !budget) {
      alert('Please fill in all fields.');
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (end <= start) {
      alert('End date must be after start date.');
      return;
    }

    const duration = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    const costPerDay = (budget / duration).toFixed(2);

    setSummary({
      ...formData,
      duration,
      costPerDay,
    });
  };

  return (
    <div className="planner-container">
      <div className="planner-form-section">
        <form className="planner-form" onSubmit={handleSubmit}>
          <h2>Trip Planner</h2>

          <label>Destination:</label>
          <input type="text" name="destination" value={formData.destination} onChange={handleChange} required />

          <label>Start Date:</label>
          <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} required />

          <label>End Date:</label>
          <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} required />

          <label>Budget (₹):</label>
          <input type="number" name="budget" value={formData.budget} onChange={handleChange} required />

          <button type="submit">Submit Plan</button>

          {summary && (
            <div className="trip-summary">
              <h3>Trip Summary:</h3>
              <p><strong>Destination:</strong> {summary.destination}</p>
              <p><strong>Duration:</strong> {summary.duration} days</p>
              <p><strong>Budget:</strong> ₹{summary.budget}</p>
              <p><strong>Cost per Day:</strong> ₹{summary.costPerDay}</p>
            </div>
          )}
        </form>
      </div>

      <div className="planner-map-section">
        <iframe
          title="Map"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          src={`https://www.openstreetmap.org/export/embed.html?bbox=76.8,28.4,77.6,28.9&layer=mapnik&marker=28.6139,77.2090`}
        ></iframe>
      </div>
    </div>
  );
}

export default Planner;
