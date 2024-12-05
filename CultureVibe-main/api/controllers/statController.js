const pool = require('../database/database');

// Récupérer le top 5 des loisirs les mieux notés
exports.getTopLoisir = async (req, res) => {
    try {
        const loisir = await pool.query(`
            SELECT 
                l.id, 
                l.titre, 
                l.description,
                l.image,
                c.nom AS category_nom, 
                SUM(n.note) as note , 
                AVG(n.note) AS average_note 
            FROM 
                loisir l 
            JOIN 
                notation n 
            ON 
                l.id = n.loisir_id 
            JOIN 
                category c 
            ON 
                l.category_id = c.id 
            GROUP BY 
                l.id, l.titre, c.nom 
            ORDER BY 
                average_note DESC 
            LIMIT 5
        `);
        loisir.forEach((loisir) => {
            loisir.average_note = parseFloat(loisir.average_note);
            loisir.note = parseFloat(loisir.note);
        });
        console.log(loisir);

        res.status(200).json(loisir);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


exports.getTopLoisirByCategory = async (req, res) => {
    try{
        console.log(req.params.id);
        const loisir = await pool.query('SELECT loisir.category_id, loisir.id, loisir.titre, notation.note, category.nom AS category_nom FROM loisir JOIN notation ON loisir.id = notation.loisir_id JOIN category ON loisir.category_id = category.id WHERE loisir.category_id = ? ORDER BY note DESC LIMIT 5', [req.params.id]);
        res.status(200).json(loisir);
    }catch(err){
        res.status(400).json({message: err.message});
    }
};
