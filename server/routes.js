const express = require('express');
const router = express.Router();
const db = require('./db');

router.get('/toys', async (req, res) => {
    try{
        const result = await db.query('SELECT * FROM toys ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Database error' });
    }
});

router.post('/toys', async (req, res) => {
    try {
      const { name, category, status, min_age_months, max_age_months, purchase_price, source_name, image_url, source_url, is_favorite } = req.body;
      const newToy = await db.query(
        'INSERT INTO toys (name, category, status, min_age_months, max_age_months, purchase_price, source_name, image_url, source_url, is_favorite) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
        [name, category, status, min_age_months, max_age_months, purchase_price, source_name, image_url, source_url, is_favorite]
      );
      res.json(newToy.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Database error' });
    }
  });

router.patch('/toys/:id', async (req, res) => {
    const { id } = req.params;
    const { is_favorite } = req.body;

    try {
        const updatedToy = await db.query(
            'UPDATE toys SET is_favoriate = $1 WHERE id = $2 RETURNING *',
            [is_favorite, id] 
        );
        res.json(updatedToy.rows[0]);
    } catch (err){
        console.error(err.message);
        res.status(500).json({ error: 'Database error' });
    }

});
  
  module.exports = router;