# PayLink - Plateforme de Paiement en Ligne

PayLink est une plateforme de paiement en ligne sécurisée et moderne adaptée à l'Afrique de l'Ouest, permettant l'achat de services digitaux (comptes streaming, IA, jeux PC, cartes cadeaux, etc.).

## 🚀 Caractéristiques

### Fonctionnalités principales
- **Catalogue de produits** : Streaming, IA, jeux PC, cartes cadeaux
- **Système de paiement multi-fournisseur** : Stripe, Flutterwave, Paystack, Mobile Money, Cash
- **Gestion des commandes** : Création, suivi et historique des commandes
- **Système de support** : Tickets de support avec priorités
- **FAQ complète** : Base de connaissance avec recherche
- **Dashboard utilisateur** : Vue d'ensemble des commandes et paiements
- **Admin panel** : Gestion des paramètres, logs, statistiques
- **Notifications** : Push, Email, SMS

## 📁 Structure du projet

```
PayLink/
├── backend/                  # API NestJS
│   ├── src/
│   │   ├── auth/            # Authentification
│   │   ├── users/           # Gestion des utilisateurs
│   │   ├── products/        # Catalogue de produits
│   │   ├── orders/          # Gestion des commandes
│   │   ├── payments/        # Système de paiement
│   │   ├── support/         # Tickets de support
│   │   ├── faq/             # FAQ
│   │   ├── admin/           # Panel administrateur
│   │   ├── notifications/   # Notifications
│   │   └── common/          # Utilitaires
│   ├── package.json
│   └── docker-compose.yml
├── web/                      # Frontend Vue 3
│   ├── src/
│   │   ├── pages/           # Pages
│   │   ├── components/      # Composants
│   │   ├── stores/          # Stores Pinia
│   │   ├── router/          # Routeur
│   │   ├── services/        # Services API
│   │   └── style.css        # Styles
│   ├── package.json
│   └── vite.config.js
├── docs/                     # Documentation
├── docker-compose.yml        # Orchestration Docker
└── README.md
```

## 🛠️ Stack Technique

### Backend
- **Framework** : NestJS
- **Base de données** : PostgreSQL
- **ORM** : TypeORM
- **Authentification** : JWT
- **Validation** : Class-validator
- **Cache** : Redis (optionnel)

### Frontend
- **Framework** : Vue 3
- **Build** : Vite
- **State Management** : Pinia
- **Styling** : Tailwind CSS
- **HTTP Client** : Axios
- **Routing** : Vue Router

## 📋 Prérequis

- Node.js 18+
- PostgreSQL 12+
- Docker & Docker Compose (optionnel)
- npm ou yarn

## 🚀 Installation

### Option 1: Installation locale

#### Backend

```bash
cd backend
npm install

# Créer un fichier .env
cp .env.example .env

# Configurer la base de données
# Éditer .env avec vos paramètres PostgreSQL

# Lancer les migrations
npm run migration:run

# Démarrer le serveur
npm run start:dev
```

#### Frontend

```bash
cd web
npm install

# Créer un fichier .env
cp .env.example .env

# Démarrer le serveur de développement
npm run dev
```

### Option 2: Installation avec Docker

```bash
docker-compose up -d
```

## 📝 Variables d'environnement

### Backend (.env)

```env
# Database
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=paylink
DATABASE_PASSWORD=your_password
DATABASE_NAME=paylink_db

# JWT
JWT_SECRET=your_jwt_secret
JWT_EXPIRATION=7d

# API
API_URL=http://localhost:3000
FRONTEND_URL=http://localhost:5173

# Payment Providers
STRIPE_API_KEY=your_stripe_key
FLUTTERWAVE_API_KEY=your_flutterwave_key
PAYSTACK_API_KEY=your_paystack_key

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email
SMTP_PASSWORD=your_password
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:3000/api/v1
VITE_APP_NAME=PayLink
VITE_APP_VERSION=1.0.0
```

## 🔐 Authentification

L'application utilise JWT pour l'authentification. Les tokens sont stockés dans le localStorage du navigateur.

### Endpoints d'authentification

```
POST   /api/v1/auth/register   - Inscription
POST   /api/v1/auth/login      - Connexion
POST   /api/v1/auth/logout     - Déconnexion
POST   /api/v1/auth/refresh    - Rafraîchir le token
```

## 📦 Modules Backend

### Auth Module
Gestion de l'authentification et autorisation.

```
GET    /api/v1/auth/me         - Informations utilisateur
POST   /api/v1/auth/login      - Connexion
POST   /api/v1/auth/register   - Inscription
```

### Products Module
Gestion du catalogue de produits.

```
GET    /api/v1/products        - Lister les produits
GET    /api/v1/products/:id    - Détails du produit
POST   /api/v1/products        - Créer un produit (admin)
PUT    /api/v1/products/:id    - Modifier un produit (admin)
DELETE /api/v1/products/:id    - Supprimer un produit (admin)
```

### Orders Module
Gestion des commandes.

```
GET    /api/v1/orders         - Mes commandes
GET    /api/v1/orders/:id     - Détails de la commande
POST   /api/v1/orders         - Créer une commande
PUT    /api/v1/orders/:id     - Modifier une commande
```

### Payments Module
Gestion des paiements.

```
POST   /api/v1/payments/initiate     - Initier un paiement
POST   /api/v1/payments/confirm      - Confirmer un paiement
GET    /api/v1/payments/:id          - Détails du paiement
GET    /api/v1/payments              - Mes paiements
```

### Support Module
Gestion des tickets de support.

```
GET    /api/v1/support/tickets      - Mes tickets
GET    /api/v1/support/tickets/:id  - Détails du ticket
POST   /api/v1/support/tickets      - Créer un ticket
PUT    /api/v1/support/tickets/:id  - Mettre à jour un ticket
```

### FAQ Module
Gestion de la FAQ.

```
GET    /api/v1/faq              - Lister les FAQs
GET    /api/v1/faq/search       - Rechercher dans les FAQs
GET    /api/v1/faq/:id          - Détails de la FAQ
POST   /api/v1/faq/:id/helpful  - Marquer comme utile
```

### Admin Module
Panel administrateur.

```
GET    /api/v1/admin/dashboard  - Tableau de bord
GET    /api/v1/admin/logs       - Logs d'activité
GET    /api/v1/admin/settings   - Paramètres
PUT    /api/v1/admin/settings/:key - Modifier un paramètre
```

## 🎨 Pages Frontend

- **Home** (`/`) - Accueil avec categories
- **Products** (`/products`) - Catalogue de produits
- **Product Detail** (`/products/:id`) - Détails du produit
- **Login** (`/login`) - Connexion
- **Register** (`/register`) - Inscription
- **Dashboard** (`/dashboard`) - Tableau de bord (authentifié)
- **Orders** (`/orders`) - Mes commandes (authentifié)
- **Order Detail** (`/orders/:id`) - Détails de la commande (authentifié)
- **Payments** (`/payments`) - Mes paiements (authentifié)
- **Support** (`/support`) - Support (authentifié)
- **FAQ** (`/faq`) - FAQ
- **Profile** (`/profile`) - Mon profil (authentifié)

## 📊 Base de données

### Tables principales

- **users** - Utilisateurs
- **products** - Produits
- **product_variants** - Variantes de produits
- **orders** - Commandes
- **payments** - Paiements
- **support_tickets** - Tickets de support
- **faqs** - FAQs
- **admin_logs** - Logs administrateur
- **settings** - Paramètres

## 🧪 Tests

### Backend

```bash
cd backend

# Tests unitaires
npm run test

# Tests e2e
npm run test:e2e

# Coverage
npm run test:cov
```

### Frontend

```bash
cd web

# Tests
npm run test
```

## 📦 Build et Deployment

### Backend

```bash
cd backend
npm run build
```

### Frontend

```bash
cd web
npm run build
```

## 🚀 Déploiement

### Avec Docker

```bash
docker-compose -f docker-compose.prod.yml up -d
```

### Avec Heroku

```bash
heroku create paylink-api
git push heroku main
```

## 📞 Support et Contribution

Pour toute question ou contribution, veuillez consulter la section Support ou créer une issue sur GitHub.

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus de détails.

## 👥 Auteurs

- **win-shousha** - Développement initial

## 🗓️ Changelog

### v1.0.0 (22 Juillet 2024)
- Version initiale
- Fonctionnalités de base
- Authentication
- Gestion des commandes
- Système de paiement
- Support client
- FAQ

---

**Made with ❤️ in West Africa**
