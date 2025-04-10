const db = require('../db/connection');

exports.getAllTriggers = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM budgetTrigger');
    res.render('budgetTrigger/index', { triggers: rows });
  } catch (err) {
    res.status(500).send(err.message);
  }
};
