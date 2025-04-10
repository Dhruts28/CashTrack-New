const db = require('../db/connection');

exports.getAllUsers = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM user');
    res.render('user/index', { users: rows });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.getUserById = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM user WHERE id = ?', [req.params.id]);
    res.render('user/details', { user: rows[0] });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.createUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    await db.query('INSERT INTO user (username, email, password) VALUES (?, ?, ?)', [username, email, password]);
    res.redirect('/users');
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.updateUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    await db.query('UPDATE user SET username = ?, email = ?, password = ? WHERE id = ?', [username, email, password, req.params.id]);
    res.redirect('/users');
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await db.query('DELETE FROM user WHERE id = ?', [req.params.id]);
    res.redirect('/users');
  } catch (err) {
    res.status(500).send(err.message);
  }
};
