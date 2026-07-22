# Changelog

Tous les changements notables de ce projet seront documentés dans ce fichier.

## [1.0.0] - 2024-07-22

### Added
- ✨ Structure complète du projet (backend et frontend)
- 🔐 Système d'authentification avec JWT
- 📦 Gestion des produits et variantes
- 🛒 Système de commandes
- 💳 Intégration multi-fournisseurs de paiement (Stripe, Flutterwave, Paystack, Mobile Money, Cash)
- 🎟️ Gestion des tickets de support
- ❓ Module FAQ avec recherche et analytics
- 👨‍💼 Panel administrateur avec dashboard
- 📧 Système de notifications (Push, Email, SMS)
- 🎨 Interface utilisateur moderne avec Vue 3 et Tailwind CSS
- 🐳 Support Docker et Docker Compose
- 📚 Documentation complète

### Features
- Inscription et connexion utilisateur
- Catalogue de produits par catégories
- Système de variantes de produits
- Création et suivi de commandes
- Multiples méthodes de paiement
- Dashboard utilisateur
- Support client avec tickets
- FAQ complète avec recherche
- Panel administrateur
- Logs d'activité
- Paramètres système

### Technical
- Backend: NestJS + TypeORM + PostgreSQL
- Frontend: Vue 3 + Vite + Pinia + Tailwind CSS
- Database: PostgreSQL avec migrations
- Cache: Redis (optionnel)
- Authentication: JWT
- API: RESTful

---

## Structure de versioning

Nous utilisons [Semantic Versioning](https://semver.org/).

### Format
- **MAJOR**: Changements incompatibles de l'API
- **MINOR**: Nouvelles fonctionnalités compatibles
- **PATCH**: Corrections de bugs

### Tagging
```bash
git tag -a v1.0.0 -m "Version 1.0.0"
git push origin v1.0.0
```
