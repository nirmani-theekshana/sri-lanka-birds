const express = require('express');
const router = express.Router();
const pool = require('../db/pool');
const auth = require('../middleware/authMiddleware');

// Get all birds (search + filter)
router.get('/', auth, async (req, res) => {
    const { search, family_id } = req.query;

    let query = `
    SELECT b.*.bf.common_family_name, bf.family_name
    FROM birds b
    JOIN bird_damilies bf ON b.family_id = bf.id
    WHERE b.is_endemic = TRUE
    `;
    const params = [];

    if (search) {
        params.push(`%${search}%`);
        query += ` AND (b.common_name ILIKE $${params.length} 
        OR b.scientific_name ILIKE $${params.length})`;
    }
    if (family_id) {
        params.push(family_id);
        query += ` AND b.family_id = $${params.length}`;
    }
    query += ' ORDER BY b.common_name';

    try {
        const result = await pool.query(query, params);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: 'failed to fetch birds' });
    }
});

//get all birds families for dropdown filter
router.get('/families', auth, async (req, res) => {
    const result = await pool.query(
        'SELECT * FROM bird_families ORDER BY common_family_name'
    );
    res.json(result.rows);
});

//get recently visited birds for the logged in user
router.get('/recently-visited', auth, async (req, res) => {
    const result = await pool.query(`
        SELECT DISTINCT ON (b.id) b.*, rv.visited_at
        FROM recently_visited rv
        JOIN birds b ON rv.bird_id = b.id
        WHERE rv.user_id = $1
        ORDER BY b.id, rv.visited_at DESC
        LIMIT 6
        `, [req.userId]);
    res.json(result.rows);
});

//get single bird by ID + log visit
router.get('/:id', auth, async (req, res) => {
    try {
        const bird = await pool.query(
         'SELECT b.*, bf.common_family_name FROM birds b JOIN bird_families bf ON b.family_id = bf.id WHERE b.id = $1',
            [req.params.id]   
        );
        if (!bird.rows[0]) return res.status(404).json({ error: 'Bird not found' });

        //log visit
        await pool.query(
            'INSERT INTO recently_visited (user_id, bird_id) VALUES ($1, $2)',
            [req.userId, req.params.id]
        );

        res.json(bird.rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'server error' });
    }
});

module.exports = router;