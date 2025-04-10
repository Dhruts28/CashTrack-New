const db = require('../db/connection');

exports.getAllAccounts = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM accounts');
    res.render('account/index', { accounts: rows });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.getAccountById = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM accounts WHERE id = ?', [req.params.id]);
    res.render('account/details', { account: rows[0] });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.createAccount = async (req, res) => {
  const { user_id, name, type, balance } = req.body;
  try {
    await db.query(
      'INSERT INTO accounts (user_id, name, type, balance) VALUES (?, ?, ?, ?)',
      [user_id, name, type, balance]
    );
    res.redirect('/accounts');
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.updateAccount = async (req, res) => {
  const { name, type, balance } = req.body;
  try {
    await db.query(
      'UPDATE accounts SET name = ?, type = ?, balance = ? WHERE id = ?',
      [name, type, balance, req.params.id]
    );
    res.redirect('/accounts');
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    await db.query('DELETE FROM accounts WHERE id = ?', [req.params.id]);
    res.redirect('/accounts');
  } catch (err) {
    res.status(500).send(err.message);
  }
};
