const Joi = require('joi');

// Définition du schéma de validation
const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': 'Le format de l’adresse email est invalide.',
        'any.required': 'L’email est obligatoire.'
    }),
    password: Joi.string().min(6).required().messages({
        'string.min': 'Le mot de passe doit contenir au moins 6 caractères.',
        'any.required': 'Le mot de passe est obligatoire.'
    })
});
const registerSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': 'Le format de l’adresse email est invalide.',
        'any.required': 'L’email est obligatoire.'
    }),
    password: Joi.string().min(6).required().messages({
        'string.min': 'Le mot de passe doit contenir au moins 6 caractères.',
        'any.required': 'Le mot de passe est obligatoire.'
    }),
    nom: Joi.string().max(100).required().messages({
        'string.max': 'Le nom ne peut pas dépasser 100 caractères.',
        'any.required': 'Le nom est obligatoire.'
    }),
    prenom: Joi.string().max(100).required().messages({
        'string.max': 'Le prénom ne peut pas dépasser 100 caractères.',
        'any.required': 'Le prénom est obligatoire.'
    }),
    user_type: Joi.string().valid('admin', 'propriétaire', 'user').required().messages({
        'any.only': 'Le type d’utilisateur doit être admin, propriétaire, ou user.',
        'any.required': 'Le type d’utilisateur est obligatoire.'
    })
});
exports.validateLoginData = (req, res, next) => {
    const { error } = loginSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

exports.validateRegisterData = (req, res, next) => {
    const { error } = registerSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};