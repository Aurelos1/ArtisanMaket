# ArtisanMarket

Bienvenue sur ArtisanMarket, la plateforme dédiée à la valorisation et à la vente d'œuvres artisanales. Notre mission est de connecter les artisans talentueux du monde entier avec des clients à la recherche de produits uniques et faits à la main.

## À propos du projet

ArtisanMarket est une vitrine en ligne où l'authenticité et la qualité de l'artisanat sont à l'honneur. Nous offrons un espace où les artisans peuvent présenter et vendre leurs créations, et où les clients peuvent découvrir et acheter des produits qui portent en eux une histoire et un savoir-faire particuliers.

## Fonctionnalités

- **Catalogue de Produits** : Parcourir une variété de produits artisanaux classés par catégories.
- **Profils Artisans** : Découvrir les artisans, leur histoire, leur processus de création et leurs articles disponibles à la vente.
- **Système de Commande** : Commander facilement avec un processus de paiement sécurisé et une interface intuitive.
- **Espace Client** : Gérer ses commandes, suivre ses achats et interagir avec les artisans.

## Technologies Utilisées

Listez ici les technologies que vous avez utilisées, par exemple :
- Frontend : twig.js, Bootstrap pour la mise en page et les composants.
- Backend : PHP, Symfony avec Express pour le serveur, MongoDB pour la base de données.

```markdown
# Configuration Environnementale

Pour configurer l'environnement de développement local, vous aurez besoin de définir les variables d'environnement nécessaires. Créez un fichier `.env` à la racine de votre projet en suivant l'exemple ci-dessous :

```plaintext
# .env example

# Base de données
DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=artisanmarket
DB_USER=utilisateurDB
DB_PASS=motdepasseDB

# Autres variables d'environnement
# ...
```

Assurez-vous de ne jamais commettre ce fichier `.env` dans votre dépôt Git, car il contient des informations sensibles relatives à votre configuration.

# Initialisation de la Base de Données

Pour initialiser votre base de données avec les catégories de produits et les profils d'artisans, vous pouvez utiliser les requêtes suivantes :

## Insertion de Catégories

```sql
INSERT INTO categories (nom, description) VALUES 
('Bijoux', 'Accessoires faits main tels que colliers, bracelets, boucles d’oreilles.'),
('Céramique', 'Produits en céramique faits main, incluant la poterie, les vases et les assiettes.'),
('Textiles', 'Articles textiles faits main comme des écharpes, des couvertures et des vêtements.'),
('Décoration', 'Objets de décoration artisanaux pour embellir l’intérieur de la maison.'),
('Jouets', 'Jouets en bois et autres matériaux naturels, conçus et créés par des artisans.');

```

## Insertion d'Artisans

```sql
INSERT INTO artisans (nom, description, adresse, numero) VALUES 
( 'Alice Dupont', 'Bijoutière spécialisée dans le travail du fil et les métaux précieux.', '123 Rue de Artisan, 75001 Paris', '0123456789'),
( 'Paul Martin', 'Céramiste, créateur de pièces uniques en porcelaine et argile.', '456 Avenue de la Poterie, 13002 Marseille', '0123456790'),
( 'Lucie Durand', 'Créatrice textile et passionnée de mode durable.', '789 Boulevard des Tisseurs, 69003 Lyon', '0123456791'),
('Marc Lenoir', 'Ébéniste, spécialiste du mobilier sur mesure en bois massif.', '321 Chemin du Bois, 31000 Toulouse', '0123456792'),
('Julie Verne', 'Jouetière, créatrice de jouets en bois éducatifs et ludiques.', '654 Allée des Jeux, 33000 Bordeaux', '0123456793');

-- Répétez pour d'autres artisans
```

## Insertion de Produits

```sql
INSERT INTO produits (nom, description, prix, quantite) VALUES 
('Collier en macramé', 'Collier fait main en corde de coton avec des perles en bois.', 2500, 1),
('Vase en céramique', 'Vase en argile cuite avec glaçure bleue faite main.', 4000, 2),
('Couverture en laine', 'Couverture tricotée à la main en laine pure.', 8000, 3),
('Lampe de table', 'Lampe avec base en céramique faite main, parfaite pour les intérieurs cosy.', 5500, 4),
('Cheval à bascule', 'Jouet classique en bois pour enfants, avec finitions naturelles.', 4.00, 5),
('Bracelet tressé', 'Bracelet en cuir tressé avec fermoir magnétique.', 2000, 1),
('Assiette décorative', 'Assiette en céramique peinte à la main, non destinée à l’usage alimentaire.', 3000, 2),
('Sac à main en toile', 'Sac à main durable et stylé, fabriqué à partir de matériaux recyclés.', 3500, 3);

-- Répétez pour d'autres produits avec les IDs de catégorie et d'artisan correspondants
```
