const express = require('express');
const router = express.Router();
const db = require('./db');

router.get('/toys', async (req, res) => {
    try{
        const result = await db.query('SELECT * FROM toys ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error' });
    }
});

router.get('/toys/:id', async (req, res) => {
    const { id } = req.params;
    try{
        const toy = await db.query('SELECT * FROM toys WHERE id = $1',[id]);
        res.json(toy.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error' });
    }
});



router.post('/toys', async (req, res) => {
    try {
      const { name, category, status, min_age, max_age, purchase_price, source_name, image_url, source_url, is_favorite } = req.body;
      const newToy = await db.query(
        'INSERT INTO toys (name, category, status, min_age, max_age, purchase_price, source_name, image_url, source_url, is_favorite) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
        [name, category, status, min_age, max_age, purchase_price, source_name, image_url, source_url, is_favorite]
      );
      res.json(newToy.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Server error' });
    }
  });

router.patch('/toys/:id', async (req, res) => {
    const { id } = req.params;
    const { is_favorite, status, sold_price } = req.body;

    try {
        const updatedToy = await db.query(
            `UPDATE toys 
             SET is_favorite = COALESCE($1, is_favorite),
                 status = COALESCE($2, status),
                 sold_price = COALESCE($3, sold_price)
             WHERE id = $4
             RETURNING *`,
            [is_favorite, status, sold_price, id] 
        );

        if (updatedToy.rows.length === 0) {
            return res.status(404).json({message:"Toy not found"})
        }
        res.json(updatedToy.rows[0]);
    } catch (err){
        console.error(err.message);
        res.status(500).json({ error: 'Server error' });
    }

});

router.delete('/toys/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query('DELETE FROM toys WHERE id = $1', [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: "Toy not found" });
        }

        res.json({message: "Toy deleted successfully"});
    } catch(err) {
        console.error(err.message);
        res.status(500).json({error: 'Server error'})
    }
});
  
  module.exports = router;