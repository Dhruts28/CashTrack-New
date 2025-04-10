const db = require('../db/connection');

exports.getAllVersions = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM transaction_versions ORDER BY versioned_at DESC');
    res.render('transaction_versions/index', { versions: rows });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.getVersionById = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM transaction_versions WHERE id = ?', [req.params.id]);
    res.render('transaction_versions/details', { version: rows[0] });
  } catch (err) {
    res.status(500).send(err.message);
  }
};
