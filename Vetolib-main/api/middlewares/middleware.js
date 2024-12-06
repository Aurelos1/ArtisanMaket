const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.authenticator = (req, res, next) => {
    // Initialisation d'une variable pour le token
    let token;

    if (req.params.token) {
        token = req.params.token;
    } else if (req.headers.authorization) {
        // Extraire le token de l'en-tête d'autorisation
        const bearerHeader = req.headers.authorization;
        if (bearerHeader.startsWith('Bearer ')) {
            // Le token est après le mot "Bearer "
            token = bearerHeader.slice(7, bearerHeader.length);
        }
    }

    // Procéder avec la vérification du token JWT s'il existe
    if (token && process.env.SECRET_KEY) {
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                console.log(err); // Afficher l'erreur pour le débogage
                res.status(401).json({ erreur: "Accès refusé" });
            } else {
                next();
            }
        });
    } else {
        res.status(401).json({ erreur: "Accès refusé" });
    }
};

exports.isAdmin = (req, res, next) => {
    // Supposons que le token est envoyé dans le header d'autorisation comme 'Bearer [token]'
    const authHeader = req.headers.authorization;
    

    if (authHeader) {
        const token = authHeader.split(' ')[1]; // Extraire le token du header

        jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
            if (err) {
                return res.status(403).json({ message: "Accès refusé." });
            }

            // Vérifie si le rôle de l'utilisateur est 'admin'
            if (user.role !== 'admin') {
                return res.status(403).json({ message: "Accès refusé. Réservé aux administrateurs." });
            }

            req.user = user; // Stocker les informations de l'utilisateur dans l'objet req pour un usage ultérieur
            next(); // Passer au prochain middleware si l'utilisateur est admin
        });
    } else {
        res.status(401).json({ message: "Aucun token fourni. Authentification requise." });
    }
};
exports.isPrpriétaire = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1]; 

        jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
            if (err) {
                return res.status(403).json({ message: "Accès refusé." });
            }

            if (!['propriétaire', 'admin'].includes(user.role)) {
                return res.status(403).json({ message: "Accès refusé. Réservé aux Propriétaire et Admin." });
            }

            req.user = user; 
            next(); 
        });
    } else {
        res.status(401).json({ message: "Aucun token fourni. Authentification requise." });
    }
};