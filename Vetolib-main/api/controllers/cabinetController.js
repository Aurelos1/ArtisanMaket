const db = require('../databases/database');

exports.getAllCabinets = async(req, res) => {
    try {
        const resultats = await db.query("CALL GetAllCabinets()");
        res.status(200).json(resultats[0]);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des cabinets", error });
    }
};

exports.addCabinet = async(req, res) => {
    const { cabinet_name, owner_id, address, city, phone_number, image, is_available } = req.body;
    try {
        await db.query("CALL AddCabinet(?,?,?,?,?,?,?)", [cabinet_name, owner_id, address, city, phone_number, image, is_available]);
        res.status(201).json({ message: 'Cabinet ajouté avec succès' });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de l'ajout du cabinet", error });
    }
};

exports.getCabinet = async(req, res) => {
    const id = req.params.id;
    try {
        const result = await db.query("CALL GetCabinet(?)", [id]);
        if (result[0].length > 0) {
            res.status(200).json(result[0][0]);
        } else {
            res.status(404).json({ message: 'Cabinet non trouvé' });
        }
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération du cabinet", error });
    }
};



exports.getUserByOwner = async(req, res) => {
    const id = req.params.id; 
    try {
        const result = await db.query(
            "SELECT DISTINCT u.* FROM User u JOIN Cabinet c ON u.user_id = c.owner_id WHERE u.user_type = 'propriétaire' AND c.cabinet_id = ?;",
            [id]
        );
        if (result && result.length > 0) {
            res.status(200).json(result[0]);
        } else {
            res.status(404).json({ message: 'Propriétaire ou Cabinet non trouvé' });
        }
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de -la récupération du propriétaire", error });
    }
};


exports.getCabinetByOwner = async(req, res) => {
    const id = req.params.id; 
    try {
        const result = await db.query(
            "SELECT * FROM Cabinet WHERE owner_id = ?;",
            [id]
        );
        if (result && result.length > 0) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ message: 'Propriétaire ou Cabinet non trouvé' });
        }
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération du propriétaire", error });
    }
};

exports.editCabinet = async(req, res) => {
    const cabinet_id = req.params.id;
    const { cabinet_name, owner_id, address, city, phone_number, image, is_available } = req.body;
    try {
        await db.query("CALL EditCabinet(?,?,?,?,?,?,?,?)", [cabinet_id, cabinet_name, owner_id, address, city, phone_number, image, is_available]);
        res.status(200).json({ message: 'Cabinet mis à jour avec succès' });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la mise à jour du cabinet", error });
    }
};

exports.deleteCabinet = async(req, res) => {
    const id = req.params.id;
    try {
        await db.query("CALL DeleteCabinet(?)", [id]);
        res.status(200).json({ message: 'Cabinet supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la suppression du cabinet", error });
    }
};
