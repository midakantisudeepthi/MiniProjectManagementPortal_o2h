import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { taskService } from '../services/api';
import { useToast } from '../components/ToastContainer';

const AddTask = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Pending');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!title.trim()) errs.title = 'Title is required';
    if (description.trim().length < 10) errs.description = 'Description must be at least 10 characters';
    if (!status) errs.status = 'Status is required';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    try {
      await taskService.createTask({ title, description, status });
      showToast('Task created successfully', 'success');
      navigate('/');
    } catch (err) {
      console.error('Error creating task:', err);
      const errMsg = err.response?.data?.message || 'Error creating task';
      showToast(errMsg, 'danger');
    }
  };

  return (
    <div className="container" style={{ maxWidth: '600px' }}>
      <button onClick={() => navigate('/')} className="btn btn-link px-0 text-decoration-none text-secondary mb-3">
        ← Back to Dashboard
      </button>

      <div className="glass-card p-4">
        <h3 className="mb-4 font-outfit fw-bold">Add New Task</h3>
        <form onSubmit={handleSubmit}>
          
          <div className="mb-3">
            <label className="form-label">Task Title</label>
            <input 
              type="text" 
              className={`form-control ${errors.title ? 'is-invalid' : ''}`} 
              value={title} 
              onChange={e => { setTitle(e.target.value); setErrors(p => ({...p, title: ''})); }} 
            />
            {errors.title && <div className="invalid-feedback">{errors.title}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea 
              className={`form-control ${errors.description ? 'is-invalid' : ''}`} 
              rows="3" 
              value={description} 
              onChange={e => { setDescription(e.target.value); setErrors(p => ({...p, description: ''})); }}
            ></textarea>
            {errors.description && <div className="invalid-feedback">{errors.description}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Status</label>
            <select className="form-select" value={status} onChange={e => setStatus(e.target.value)}>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
            </select>
          </div>

          <div className="d-flex gap-2 justify-content-end mt-4">
            <button type="button" className="btn btn-secondary" onClick={() => navigate('/')}>Cancel</button>
            <button type="submit" className="btn btn-primary-custom">Add Task</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
