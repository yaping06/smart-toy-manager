const express = require('express');
const router = express.Router();
const db = require('./db');
const upload = require('./cloudinaryConfig');
const { GoogleGenerativeAI } = require("@google/generative-ai");

// 2. Initialize the Google Generative AI with your key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });


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



router.post('/toys', upload.single('image'), async (req, res) => {
    
    try {
      const { name, category, status, min_age, max_age, purchase_price, source_name, source_url, is_favorite } = req.body;
      const image_url =
        req.file?.path ||
        req.file?.secure_url ||
        req.file?.url ||
        null;
      
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

router.post('/ai/inventory-check', async (req, res) => {
    const { childAge } = req.body;
    try {
        // 1. Get all toys that aren't sold
        const result = await db.query(
            "SELECT name, category, min_age, max_age, status FROM toys WHERE status != 'sold'"
        );
        const toys = result.rows;

        

        // 2. Structured prompt for inventory analysis
        const prompt = `
            My son Lucas is ${childAge} years old. 
            Here is a list of his current toys: ${JSON.stringify(toys)}.
            Please provide a professional summary:
            1. Identify toys that are likely outgrown.
            2. Suggest 2-3 types of new toys or categories he is missing for his development (motor skills, logic, etc.).
            Keep the tone encouraging and the advice practical.
        `;

        const aiResult = await model.generateContent(prompt);
        res.json({ analysis: aiResult.response.text() });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Analysis failed" });
    }
});

router.post('/ai/toy-play-idea', async (req, res) => {
    const { toyName, category, age } = req.body;
    try {
        const prompt = `
            Lucas is ${age} years old. Suggest 2 quick play ideas for his ${toyName}. 
            Format the response using Markdown with bold headers and short bullet points. 
            Keep it under 150 words total.`;
        const result = await model.generateContent(prompt);
        res.json({ suggestion: result.response.text() });
    } catch (error) {
        res.status(500).json({ error: "AI failed to respond" });
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