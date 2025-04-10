const db = require('../db/connection');

exports.getAllTransactions = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT t.*, a.name AS account_name, c.name AS category_name
      FROM transactions t
      JOIN accounts a ON t.account_id = a.id
      JOIN categories c ON t.category_id = c.id
      ORDER BY t.date DESC
    `);
    res.render('transaction/index', { transactions: rows });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.getTransactionById = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM transactions WHERE id = ?', [req.params.id]);
    res.render('transaction/details', { transaction: rows[0] });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.createTransaction = async (req, res) => {
  const { account_id, category_id, amount, type, description, date } = req.body;
  try {
    await db.query(
      `INSERT INTO transactions (account_id, category_id, amount, type, description, date) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [account_id, category_id, amount, type, description, date]
    );
    // Your trigger will handle balance update automatically.
    res.redirect('/transactions');
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.updateTransaction = async (req, res) => {
  const { account_id, category_id, amount, type, description, date } = req.body;
  try {
    await db.query(
      `UPDATE transactions 
       SET account_id = ?, category_id = ?, amount = ?, type = ?, description = ?, date = ?
       WHERE id = ?`,
      [account_id, category_id, amount, type, description, date, req.params.id]
    );
    // Your update trigger should handle versioning of old data.
    res.redirect('/transactions');
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.deleteTransaction = async (req, res) => {
  try {
    await db.query('DELETE FROM transactions WHERE id = ?', [req.params.id]);
    res.redirect('/transactions');
  } catch (err) {
    res.status(500).send(err.message);
  }
};
