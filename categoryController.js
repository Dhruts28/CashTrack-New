const db = require('../db/connection');

exports.getAllCategories = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM categories');
    res.render('categories/index', { categories: rows });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM categories WHERE id = ?', [req.params.id]);
    res.render('categories/details', { category: rows[0] });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.createCategory = async (req, res) => {
  const { name, type } = req.body;
  try {
    await db.query('INSERT INTO categories (name, type) VALUES (?, ?)', [name, type]);
    res.redirect('/categories');
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.updateCategory = async (req, res) => {
  const { name, type } = req.body;
  try {
    await db.query('UPDATE categories SET name = ?, type = ? WHERE id = ?', [name, type, req.params.id]);
    res.redirect('/categories');
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    await db.query('DELETE FROM categories WHERE id = ?', [req.params.id]);
    res.redirect('/categories');
  } catch (err) {
    res.status(500).send(err.message);
  }
};
