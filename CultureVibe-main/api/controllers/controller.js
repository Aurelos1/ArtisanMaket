const pool = require('../database/database');


exports.getLoisir = async (req, res) => {
    try{
        const loisir = await pool.query('SELECT l.*, SUM(n.note) AS note,AVG(n.note) AS moyen_note, c.nom AS category_nom FROM loisir l LEFT JOIN notation n ON l.id = n.loisir_id LEFT JOIN category c ON l.category_id = c.id GROUP BY l.id, c.nom');
        loisir.forEach((loisir) => {
            loisir.moyen_note = parseFloat(loisir.moyen_note);
            loisir.note = parseFloat(loisir.note);
        });
        res.status(200).json(loisir);
    }catch(err){
        res.status(400).json({message: err.message});
    }
};

exports.getLoisirById = async (req, res) => {
    try{
        const loisir = await pool.query(` SELECT l.*, AVG(n.note) AS note, c.nom AS category_nom FROM loisir l LEFT JOIN notation n ON l.id = n.loisir_id LEFT JOIN category c ON l.category_id = c.id WHERE l.id = ? GROUP BY l.id, c.nom LIMIT 1 `, [req.params.id]);        res.status(200).json(loisir);
    }catch(err){
        res.status(400).json({message: err.message});
    }
};

exports.createLoisir = async (req, res) => {
    try{
        const loisir = await pool.query('INSERT INTO loisir (titre, description, date_publication, image, category_id) VALUES (?, ?, ?, ?, ?)', [req.body.titre, req.body.description, req.body.date_publication, req.body.image, req.body.category_id]);
        res.status(201).json({message: 'Loisir créé'});
    }catch(err){
        res.status(400).json({message: err.message});
    }
};

// Notation
exports.createNotation = async (req, res) => {
    try{
        const currentDate = new Date().toISOString().split('T')[0];
        const loisir = await pool.query('INSERT INTO notation (note, loisir_id, date_notation) VALUES (?, ?, ?)', [req.body.note, req.body.loisir_id, req.body.date_notation]);
        res.status(201).json({message: 'Notation créée'});
    }catch(err){
        res.status(400).json({message: err.message});
    }
};

exports.getNotation = async (req, res) => {
    try{
        const loisir = await pool.query('SELECT * FROM notation WHERE loisir_id = ?', [req.params.id]);
        res.status(200).json(loisir);
    }catch(err){
        res.status(400).json({message: err.message});
    }
};

// CATEGORY

exports.getCategory = async (req, res) => {
    try{
        const loisir = await pool.query('SELECT * FROM category');
        res.status(200).json(loisir);
    }catch(err){
        res.status(400).json({message: err.message});
    }
};

exports.getCategoryById = async (req, res) => {
    try{
        const loisir = await pool.query('SELECT * FROM category WHERE id = ?', [req.params.id]);
        res.status(200).json(loisir);
    }catch(err){
        res.status(400).json({message: err.message});
    }
};

exports.createCategory = async (req, res) => {
    try{
        const loisir = await pool.query('INSERT INTO category (nom) VALUES (?)', [req.body.nom]);
        res.status(201).json(loisir);
    }catch(err){
        res.status(400).json({message: err.message});
    }
};