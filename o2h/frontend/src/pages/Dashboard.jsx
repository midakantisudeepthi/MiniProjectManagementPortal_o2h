import React, { useState, useEffect } from 'react';
import { taskService } from '../services/api';
import { useToast } from '../components/ToastContainer';
import StatsCards from '../components/StatsCards';
import ConfirmationModal from '../components/ConfirmationModal';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState({ open: false, task: null });
  const { showToast } = useToast();

  const loadTasks = async () => {
    setLoading(true);
    try {
      const res = await taskService.getTasks(filter);
      setTasks(res.data);
    } catch (err) {
      console.error('Error loading tasks:', err);
      showToast('Error loading tasks', 'danger');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, [filter]);

  const handleComplete = async (task) => {
    try {
      await taskService.updateTaskStatus(task.id, 'Completed');
      showToast('Task marked as completed', 'success');
      loadTasks();
    } catch (err) {
      console.error('Error updating task:', err);
      showToast('Failed to update task', 'danger');
    }
  };

  const handleDelete = async () => {
    try {
      await taskService.deleteTask(modal.task.id);
      showToast('Task deleted successfully', 'warning');
      loadTasks();
    } catch (err) {
      console.error('Error deleting task:', err);
      showToast('Failed to delete task', 'danger');
    } finally {
      setModal({ open: false, task: null });
    }
  };

  // Filter tasks based on live title search input
  const filteredTasks = tasks.filter(t => t.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-4 mt-2">
        <h1 className="h3 fw-bold font-outfit mb-0">Dashboard</h1>
        <button className="btn btn-primary-custom" onClick={loadTasks} disabled={loading}>
          <i className="bi bi-arrow-clockwise me-1"></i> Refresh
        </button>
      </div>

      <StatsCards tasks={tasks} />
      
      {/* Search and Filters panel */}
      <div className="glass-card p-3 mb-4 d-flex flex-column flex-md-row gap-3 align-items-center">
        <input 
          type="text" 
          className="form-control" 
          placeholder="Search tasks by title..." 
          value={search} 
          onChange={e => setSearch(e.target.value)} 
        />
        <select className="form-select" style={{ minWidth: '180px', width: 'auto' }} value={filter} onChange={e => setFilter(e.target.value)}>
          <option value="All">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {/* Main Table Card */}
      <div className="glass-card p-3">
        {loading ? (
          <div className="text-center py-5"><div className="spinner-border text-primary" role="status"></div></div>
        ) : filteredTasks.length === 0 ? (
          <div className="text-center py-5 text-muted">No tasks available.</div>
        ) : (
          <div className="table-responsive">
            <table className="table custom-table align-middle mb-0">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Created Date</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTasks.map(task => (
                  <tr key={task.id}>
                    <td className="fw-semibold">{task.title}</td>
                    <td className="text-truncate" style={{ maxWidth: '240px' }} title={task.description}>
                      {task.description}
                    </td>
                    <td>
                      <span className={`badge-${task.status.toLowerCase().replace(' ', '')}`}>{task.status}</span>
                    </td>
                    <td style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                      {new Date(task.created_at).toLocaleDateString()}
                    </td>
                    <td className="text-end">
                      <div className="d-flex justify-content-end gap-2">
                        {task.status !== 'Completed' && (
                          <button className="btn btn-sm btn-success px-3" onClick={() => handleComplete(task)}>Complete</button>
                        )}
                        <button className="btn btn-sm btn-danger px-3" onClick={() => setModal({ open: true, task })}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <ConfirmationModal 
        isOpen={modal.open} 
        onClose={() => setModal({ open: false, task: null })} 
        onConfirm={handleDelete} 
        taskTitle={modal.task ? modal.task.title : ''} 
      />
    </div>
  );
};

export default Dashboard;
