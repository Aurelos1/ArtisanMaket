### README.md

# Projet CultureVibe

Bienvenue dans le projet CultureVibe ! Ce README vous guidera à travers le processus d'installation pour mettre l'application en route sur votre machine locale.

## Table des matières
1. [Présentation du projet](#présentation-du-projet)
2. [Installation](#installation)
3. [Exécution de l'application](#exécution-de-lapplication)
4. [Structure du projet](#structure-du-projet)
5. [Requêtes SQL](#requêtes-sql)

## Présentation du projet
CultureVibe est une application mobile qui permet aux utilisateurs de partager et de découvrir des loisirs non sportifs au sein d'une communauté. L'application est construite avec Flutter pour le frontend et Node.js pour le backend.

### Frontend
- **Framework** : Flutter / Dart
- **Fonctionnalités** : 
  - Tri par date ou ordre alphabétique
  - Recherche par type de loisir ou par nom
  - Liste de catégories
  - Système de notation
  - Ajout des loisirs
  - Top 5 des loisirs sur la page d'accueil

### Backend
- **Framework** : Node.js
- **Bibliothèques** :
  - Express
  - mariadb pour la gestion de la base de données
  - cors
  - body-paser

## Installation

### Backend
1. Clonez le dépôt backend :
   ```bash
   git clone https://github.com/KiddMiguel/CultureVibe.git
   cd api
   ```

2. Installez les dépendances :
   ```bash
   npm install
   ```

3. Configurez Sequelize et la base de données :
   - Fichier `.env` et renseignez vos informations de base de données.
     ```bash
        DB_HOST = 'localhost'
        DB_USER = 'root'
        DB_PWD = ''
        DB_NAME = 'culturevibe'
        DB_PORT = 3306
     ```

4. Démarrez le serveur :
   ```bash
   npm start
   ```

### Frontend
1. Clonez le dépôt frontend :
   ```bash
   git clone https://github.com/KiddMiguel/CultureVibe.git
   cd app
   ```

2. Installez les dépendances :
   ```bash
   flutter pub get
   ```

3. Exécutez l'application sur un émulateur ou un appareil physique :
   ```bash
   flutter run
   ```

## Exécution de l'application
Pour exécuter l'application, assurez-vous que le backend et le frontend sont correctement configurés et lancés. Vous pouvez ensuite interagir avec l'application via l'interface mobile.

## Structure du projet
- **backend/** : Contient le code source du serveur Node.js
  - **controllers/** : Contrôleurs pour gérer les requêtes
  - **database/** : Configuration et modèles de la base de données
  - **routes/** : Définition des routes de l'API

- **frontend/** : Contient le code source de l'application Flutter
  - **lib/** : Contient le code Dart de l'application

## Requêtes SQL
Voici les requêtes pour créer la base de données et insérer les données initiales :

### Création des tables
```sql

DROP DATABASE IF EXISTS cultureVibe;
    -- Création de la base de données
CREATE DATABASE cultureVibe;

USE cultureVibe;

CREATE TABLE category (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255) NOT NULL
);
-- Création de la table Loisir
CREATE TABLE loisir (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titre VARCHAR(255) NOT NULL,
    description TEXT,
    date_publication DATE,
    image VARCHAR(255), -- Colonne pour l'image
    category_id INT,
    FOREIGN KEY (category_id) REFERENCES category(id)
);

-- Création de la table Notation
CREATE TABLE notation (
    id INT AUTO_INCREMENT PRIMARY KEY,
    loisir_id INT,
    note INT CHECK (note >= 1 AND note <= 5),
    date_notation DATE,
    FOREIGN KEY (loisir_id) REFERENCES loisir(id)
);
```

### Insertion des données
```sql
  INSERT INTO `category` (`id`, `nom`) VALUES
  (1, 'Littérature'),
  (2, 'Films'),
  (3, 'Séries'),
  (4, 'Manga'),
  (5, 'Anime'),
  (6, 'Jeux vidéo'),
  (7, 'Livre'),
  (8, 'Offre sport'),
  (9, 'Cuisine'),
  (10, 'Cinéma'),
  (11, 'Musique'),
  (12, 'Art'),
  (13, 'Technologie');
  
  INSERT INTO `loisir` (`id`, `titre`, `description`, `date_publication`, `image`, `category_id`) VALUES
  (1, 'Harry Potter', 'A young wizard\'s journey', '1997-06-26', 'https://m.media-amazon.com/images/S/pv-target-images/c2ebc94ca85771b72e439a8329e01a6e2f3fd316fb38a3d2f1434d231d7a4f56.jpg', 1),
  (2, 'The Hobbit', 'A hobbit\'s adventure to reclaim a lost kingdom', '1937-09-21', 'https://fr.web.img4.acsta.net/pictures/210/552/21055250_20131106114016251.jpg', 1),
  (3, 'Inception', 'A thief who steals corporate secrets through dream-sharing technology', '2010-07-16', 'https://m.media-amazon.com/images/I/912AErFSBHL._AC_UF894,1000_QL80_.jpg', 2),
  (4, 'The Matrix', 'A computer hacker learns about the true nature of reality', '1999-03-31', 'https://m.media-amazon.com/images/I/813dE2pH7XL._UF1000,1000_QL80_.jpg', 2),
  (5, 'Breaking Bad', 'A high school chemistry teacher turned methamphetamine producer', '2008-01-20', 'https://fr.web.img5.acsta.net/pictures/19/06/18/12/11/3956503.jpg', 3),
  (6, 'Stranger Things', 'A group of kids uncover supernatural occurrences in their town', '2016-07-15', 'https://images.justwatch.com/poster/166136683/s332/saison-5', 3),
  (7, 'The Witcher', 'A mutated monster-hunter for hire', '2019-12-20', 'https://images.ladepeche.fr/api/v1/images/view/5e5014128fe56f530a4104c7/full/image.jpg?v=1', 3),
  (8, '1984', 'A dystopian novel set in a totalitarian society', '1949-06-08', 'https://fr.web.img4.acsta.net/pictures/23/11/02/10/29/1482978.jpg', 1),
  (9, 'The Shawshank Redemption', 'Two imprisoned men bond over a number of years', '1994-09-22', 'https://cdn.kobo.com/book-images/71f95ccc-b734-44cc-9365-71da90c86bf8/353/569/90/False/the-shawshank-redemption-revealed.jpg', 2),
  (10, 'Game of Thrones', 'Noble families vie for control of the Iron Throne', '2011-04-17', 'https://fr.web.img5.acsta.net/pictures/23/01/03/14/13/0717778.jpg', 3),
  (11, 'One Piece', 'Un manga épique sur les pirates.', '1997-07-22', 'https://static.wikia.nocookie.net/onepiece/images/1/12/One_Piece_Film_Red_Troisi%C3%A8me_Poster.png/revision/latest?cb=20220609171551&path-prefix=fr', 4),
  (12, 'Naruto', 'Un anime sur un jeune ninja.', '2002-10-03', 'https://static.wikia.nocookie.net/naruto/images/0/0d/Naruto_the_Movie_-_Road_to_Ninja%27s_affiche_principale.jpg/revision/latest?cb=20150112210812&path-prefix=fr', 4),
  (13, 'The Legend of Zelda: Breath of the Wild', 'Un jeu vidéo d\'aventure dans un monde ouvert.', '2017-03-03', 'https://m.media-amazon.com/images/I/71GuaH9r+1L.jpg', 6),
  (14, 'Harry Potter à l\'école des sorciers', 'Le premier livre de la série Harry Potter.', '1997-06-26', 'https://fr.web.img2.acsta.net/pictures/18/07/02/17/25/3643090.jpg', 6),
  (15, 'Yoga et méditation', 'Offres sportives pour la santé mentale.', '2020-01-01', 'https://fr.heartfulness.org/wp-content/uploads/2019/12/Affiche-1.png', 6),
  (17, 'Warzone', 'description', '2024-07-19', 'https://chocobonplan.com/wp-content/uploads/2024/04/SLIDER-call-of-duty-warzone-3-saison-3-article-blog.jpg', 6);
  
  INSERT INTO `notation` (`id`, `loisir_id`, `note`, `date_notation`) VALUES
  (1, 1, 5, '2023-01-10'),
  (2, 1, 4, '2023-02-15'),
  (3, 2, 5, '2023-03-20'),
  (4, 3, 5, '2023-04-25'),
  (5, 3, 4, '2023-05-30'),
  (6, 4, 5, '2023-06-10'),
  (7, 5, 5, '2023-07-15'),
  (8, 6, 4, '2023-08-20'),
  (9, 7, 4, '2023-09-25'),
  (10, 8, 5, '2023-10-30'),
  (11, 9, 5, '2023-11-10'),
  (12, 9, 4, '2023-12-15'),
  (13, 10, 5, '2024-01-10'),
  (14, 10, 4, '2024-02-15'),
  (15, 5, 5, '2024-03-20'),
  (16, 1, 4, '2023-05-15'),
  (17, 2, 5, '2023-06-20'),
  (18, 3, 4, '2023-04-10'),
  (19, 4, 5, '2023-05-01'),
  (20, 5, 3, '2023-07-05'),
  (21, 4, 5, '2024-07-19'),
  (22, 10, 5, '2024-07-19'),
  (23, 12, 5, '2024-07-19'),
  (24, 11, 3, '2024-07-19'),
  (25, 10, 2, '2024-07-19'),
  (26, 13, 5, '2024-07-19'),
  (27, 14, 5, '2024-07-19'),
  (28, 14, 1, '2024-07-19'),
  (29, 14, 3, '2024-07-19'),
  (30, 11, 5, '2024-07-19'),
  (31, 4, 5, '2024-07-19'),
  (32, 14, 5, '2024-07-19'),
  (33, 10, 4, '2024-07-19'),
  (34, 17, 5, '2024-07-19');
```

Ces requêtes vous permettront de configurer la base de données initiale et d'insérer des exemples de données pour tester l'application.
