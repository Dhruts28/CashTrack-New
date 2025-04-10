const db = require('../db/connection');

exports.getLogs = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM audit_log ORDER BY timestamp DESC');
    res.render('audit_log/index', { logs: rows });
  } catch (err) {
    res.status(500).send(err.message);
  }
};
