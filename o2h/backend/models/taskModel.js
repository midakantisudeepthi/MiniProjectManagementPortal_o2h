const db = require('../config/db');

const Task = {
  // Fetch tasks for the authenticated user, with optional status filter
  async getAll(status, userId) {
    let sql = 'SELECT * FROM tasks WHERE user_id = ?';
    const params = [userId];
    if (status) {
      sql += ' AND status = ?';
      params.push(status);
    }
    const [rows] = await db.query(sql + ' ORDER BY created_at DESC', params);
    return rows;
  },

  // Get single task by ID and user ID
  async getById(id, userId) {
    const [rows] = await db.query('SELECT * FROM tasks WHERE id = ? AND user_id = ?', [id, userId]);
    return rows[0] || null;
  },

  // Create a task associated with a user ID
  async create({ title, description, status, userId }) {
    const [result] = await db.query(
      'INSERT INTO tasks (title, description, status, user_id) VALUES (?, ?, ?, ?)',
      [title, description, status || 'Pending', userId]
    );
    return { id: result.insertId, title, description, status: status || 'Pending', userId };
  },

  // Update status for user's task
  async updateStatus(id, status, userId) {
    await db.query('UPDATE tasks SET status = ? WHERE id = ? AND user_id = ?', [status, id, userId]);
    return this.getById(id, userId);
  },

  // Delete user's task
  async delete(id, userId) {
    const [result] = await db.query('DELETE FROM tasks WHERE id = ? AND user_id = ?', [id, userId]);
    return result.affectedRows > 0;
  }
};

module.exports = Task;
