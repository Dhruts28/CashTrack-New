const db = require('../db/connection');

exports.getAllBudgets = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM budget');
    res.render('budget/index', { budgets: rows });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.getBudgetById = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM budget WHERE id = ?', [req.params.id]);
    res.render('budget/details', { budget: rows[0] });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.createBudget = async (req, res) => {
  const { user_id, category_id, amount, start_date, end_date } = req.body;
  try {
    await db.query(
      'INSERT INTO budget (user_id, category_id, amount, start_date, end_date) VALUES (?, ?, ?, ?, ?)',
      [user_id, category_id, amount, start_date, end_date]
    );
    res.redirect('/budget');
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.updateBudget = async (req, res) => {
  const { amount, start_date, end_date } = req.body;
  try {
    await db.query(
      'UPDATE budget SET amount = ?, start_date = ?, end_date = ? WHERE id = ?',
      [amount, start_date, end_date, req.params.id]
    );
    res.redirect('/budget');
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.deleteBudget = async (req, res) => {
  try {
    await db.query('DELETE FROM budget WHERE id = ?', [req.params.id]);
    res.redirect('/budget');
  } catch (err) {
    res.status(500).send(err.message);
  }
};
