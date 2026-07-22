# 🌍 PayLink - Plateforme Africaine de Paiement Numérique

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14+-blue.svg)](https://www.postgresql.org/)
[![Flutter](https://img.shields.io/badge/Flutter-3.0+-blue.svg)](https://flutter.dev/)

## 📖 Description

**PayLink** est une plateforme de paiement numérique nouvelle génération qui permet aux particuliers et aux entreprises d'accéder facilement aux services et produits numériques internationaux sans avoir besoin d'une carte bancaire internationale.

Disponible sur **Android**, **iOS** et **Web**, PayLink offre une expérience fluide, moderne et sécurisée pour les paiements numériques en Afrique.

## 🎯 Objectif

Devenir la référence africaine des paiements numériques internationaux en proposant une plateforme unique regroupant :

- 🎬 Abonnements streaming (Netflix, Disney+, Spotify, etc.)
- 🤖 Services IA (ChatGPT, Gemini, Claude, Midjourney, etc.)
- 🎨 Outils créatifs (Canva, Adobe, CapCut, etc.)
- 📦 Productivité (Microsoft 365, Google One, Slack, etc.)
- 🎮 Jeux & recharges (Steam, PlayStation, PUBG Mobile, etc.)
- 🎁 Cartes cadeaux (Google Play, Apple, Steam, etc.)
- 🛍️ Boutiques internationales (Amazon, AliExpress, SHEIN, etc.)

## 🏗️ Architecture

### Structure du Projet

```
PayLink/
├── backend/                          # API NestJS
│   ├── src/
│   │   ├── auth/                     # Authentification & JWT
│   │   ├── users/                    # Gestion des utilisateurs
│   │   ├── products/                 # Catalogue des produits
│   │   ├── orders/                   # Système de commandes
│   │   ├── payments/                 # Intégration paiements
│   │   ├── admin/                    # Dashboard administrateur
│   │   ├── support/                  # Centre de support
│   │   ├── notifications/            # Notifications (FCM)
│   │   ├── ai-assistant/             # Assistant IA
│   │   ├── common/                   # Utilitaires & middleware
│   │   └── main.ts
│   ├── test/
│   ├── docker-compose.yml
│   ├── .env.example
│   └── package.json
│
├── web/                              # Frontend Web (Vue 3)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── views/
│   │   ├── store/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── styles/
│   │   └── App.vue
│   ├── .env.example
│   └── package.json
│
├── flutter/                          # Application Mobile (Flutter)
│   ├── lib/
│   │   ├── models/
│   │   ├── screens/
│   │   ├── widgets/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── providers/
│   │   └── main.dart
│   ├── pubspec.yaml
│   └── .env.example
│
├── docs/                             # Documentation
│   ├── API.md
│   ├── ARCHITECTURE.md
│   ├── SETUP.md
│   ├── DEPLOYMENT.md
│   └── DATABASE_SCHEMA.md
│
├── scripts/                          # Scripts d'administration
│   ├── setup-db.sql
│   ├── seed-data.ts
│   └── deploy.sh
│
└── .github/
    └── workflows/                    # CI/CD
        ├── backend-tests.yml
        └── deploy.yml
```

## 🚀 Démarrage Rapide

### Prérequis

- **Node.js** 18+ & npm/yarn
- **PostgreSQL** 14+
- **Docker** & Docker Compose (optionnel)
- **Flutter** 3.0+ (pour mobile)
- **Git**

### Installation Backend

```bash
cd backend
cp .env.example .env
npm install
npm run start:dev
```

### Installation Frontend Web

```bash
cd web
cp .env.example .env
npm install
npm run dev
```

### Installation Mobile (Flutter)

```bash
cd flutter
cp .env.example .env
flutter pub get
flutter run
```

## 📚 Documentation

- [API Documentation](./docs/API.md)
- [Architecture](./docs/ARCHITECTURE.md)
- [Guide Setup](./docs/SETUP.md)
- [Schéma Base de Données](./docs/DATABASE_SCHEMA.md)
- [Déploiement](./docs/DEPLOYMENT.md)

## 🔒 Sécurité

- ✅ Authentification JWT
- ✅ Authentification 2FA (TOTP)
- ✅ Chiffrement des données sensibles
- ✅ Rate limiting
- ✅ Protection CORS
- ✅ Validation des entrées
- ✅ Gestion des permissions par rôle

## 👤 Admin Initial

- **Nom** : Codjia Winner
- **Email** : codjia55@gmail.com
- **Téléphone** : +2290161069793
- **Pays** : Bénin

## 🛠️ Technologies

### Backend
- **Framework** : NestJS
- **Runtime** : Node.js
- **Base de données** : PostgreSQL
- **Cache** : Redis
- **Auth** : JWT + 2FA (TOTP)

### Frontend Web
- **Framework** : Vue 3
- **Build Tool** : Vite
- **State Management** : Pinia
- **HTTP Client** : Axios
- **UI Components** : Headless UI / Tailwind CSS

### Mobile
- **Framework** : Flutter
- **State Management** : Riverpod
- **HTTP Client** : Dio
- **Local Storage** : Hive

### DevOps
- **Containerization** : Docker
- **Orchestration** : Docker Compose
- **CI/CD** : GitHub Actions
- **Cloud** : À définir (AWS, Heroku, DigitalOcean)

## 💰 Configuration Initiale

- **Devise** : XOF (Franc CFA)
- **Pays principal** : Bénin
- **Langues** : Français, Anglais
- **Domaine** : paylink.app

## 📱 Fonctionnalités Principales

### Pour les Utilisateurs
- ✅ Création de compte (email/téléphone)
- ✅ Authentification sécurisée
- ✅ Profil personnalisable
- ✅ Catalogue intelligent
- ✅ Recherche avancée
- ✅ Création de commandes
- ✅ Paiements sécurisés
- ✅ Suivi en temps réel
- ✅ Support client
- ✅ Assistant IA

### Pour les Administrateurs
- ✅ Dashboard analytique
- ✅ Gestion des utilisateurs
- ✅ Gestion du catalogue
- ✅ Gestion des commandes
- ✅ Gestion des paiements
- ✅ Gestion des employés
- ✅ Rapports financiers
- ✅ Gestion des promotions

## 📊 Paiements Supportés

À intégrer :
- 💳 Stripe
- 💳 Flutterwave
- 💳 Paystack
- 💵 Mobile Money (Orange Money, MTN Money, etc.)
- 💸 Espèces via agents partenaires

## 🤝 Contribution

Pour contribuer au projet :

1. Créer une branche (`git checkout -b feature/AmazingFeature`)
2. Commiter vos changements (`git commit -m 'Add some AmazingFeature'`)
3. Pousser la branche (`git push origin feature/AmazingFeature`)
4. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 📞 Contact

**PayLink**
- 📧 Email : codjia55@gmail.com
- 🌐 Site : paylink.app
- 📱 Téléphone : +2290161069793
- 🇧🇯 Localisation : Bénin

---

**Dernière mise à jour** : 2026-07-22
**Version** : 1.0.0 - BETA
