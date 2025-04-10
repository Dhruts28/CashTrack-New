const db = require('../db/connection');

exports.getAll = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM frequent_transactions');
    res.render('frequent_transactions/index', { entries: rows });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.getById = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM frequent_transactions WHERE id = ?', [req.params.id]);
    res.render('frequent_transactions/details', { entry: rows[0] });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.create = async (req, res) => {
  const { user_id, account_id, category_id, amount, type, description } = req.body;
  try {
    await db.query(
      `INSERT INTO frequent_transactions 
       (user_id, account_id, category_id, amount, type, description) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [user_id, account_id, category_id, amount, type, description]
    );
    res.redirect('/frequent-transactions');
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.update = async (req, res) => {
  const { account_id, category_id, amount, type, description } = req.body;
  try {
    await db.query(
      `UPDATE frequent_transactions 
       SET account_id = ?, category_id = ?, amount = ?, type = ?, description = ?
       WHERE id = ?`,
      [account_id, category_id, amount, type, description, req.params.id]
    );
    res.redirect('/frequent-transactions');
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.delete = async (req, res) => {
  try {
    await db.query('DELETE FROM frequent_transactions WHERE id = ?', [req.params.id]);
    res.redirect('/frequent-transactions');
  } catch (err) {
    res.status(500).send(err.message);
  }
};
