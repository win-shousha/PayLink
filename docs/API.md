# API Documentation

## Base URL

```
http://localhost:3000/api/v1
```

## Authentication

La plupart des endpoints nécessitent une authentification. Incluez le token JWT dans le header `Authorization`:

```
Authorization: Bearer <token>
```

## Response Format

Toutes les réponses suivent ce format:

### Success (2xx)

```json
{
  "statusCode": 200,
  "message": "Success",
  "data": {...}
}
```

### Error (4xx, 5xx)

```json
{
  "statusCode": 400,
  "message": "Error message",
  "error": "BadRequest"
}
```

## Endpoints

### Authentication

#### Register

```
POST /auth/register
```

**Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "+22901234567",
  "password": "password123"
}
```

#### Login

```
POST /auth/login
```

**Body:**
```json
{
  "identifier": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "statusCode": 200,
  "message": "Login successful",
  "data": {
    "accessToken": "eyJhbGc...",
    "user": {...}
  }
}
```

### Products

#### List Products

```
GET /products?page=1&limit=20&category=streaming
```

#### Get Product

```
GET /products/:id
```

#### Create Product (Admin)

```
POST /products
```

**Body:**
```json
{
  "name": "Netflix Premium",
  "description": "Compte Netflix Premium 3 mois",
  "category": "streaming",
  "price": 15000,
  "stock": 100
}
```

### Orders

#### Create Order

```
POST /orders
```

**Body:**
```json
{
  "productId": "product-uuid",
  "amount": 15000
}
```

#### Get User Orders

```
GET /orders?page=1
```

#### Get Order Details

```
GET /orders/:id
```

### Payments

#### Initiate Payment

```
POST /payments/initiate
```

**Body:**
```json
{
  "orderId": "order-uuid",
  "provider": "stripe",
  "phoneNumber": "+22901234567"
}
```

#### Confirm Payment

```
POST /payments/confirm
```

**Body:**
```json
{
  "paymentId": "payment-uuid",
  "transactionId": "txn_123456"
}
```

### Support

#### Create Support Ticket

```
POST /support/tickets
```

**Body:**
```json
{
  "subject": "Payment issue",
  "message": "My payment was not processed",
  "priority": "high"
}
```

#### Get User Tickets

```
GET /support/tickets?page=1
```

### FAQ

#### List FAQs

```
GET /faq?category=payments&page=1
```

#### Search FAQs

```
GET /faq/search?q=payment&page=1
```

#### Get FAQ

```
GET /faq/:id
```

#### Mark as Helpful

```
POST /faq/:id/helpful
```

### Admin

#### Dashboard

```
GET /admin/dashboard
```

#### Get Logs

```
GET /admin/logs?page=1
```

#### Get Settings

```
GET /admin/settings
```

#### Update Setting

```
PUT /admin/settings/:key
```

**Body:**
```json
{
  "value": "0.05"
}
```

## Error Codes

| Code | Message |
|------|----------|
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 409 | Conflict |
| 500 | Internal Server Error |

## Rate Limiting

Les limites de taux par défaut sont:

- **Public endpoints**: 100 requêtes/minute
- **Authenticated endpoints**: 1000 requêtes/minute
- **Admin endpoints**: Pas de limite

## Pagination

Les endpoints avec pagination supportent:

- `page`: Numéro de page (défaut: 1)
- `limit`: Éléments par page (défaut: 20, max: 100)

## Filtering

Les filtres dépendent de l'endpoint. Consultez la documentation spécifique.

## Webhooks

Les webhooks sont disponibles pour les événements importants:

- `order.created`
- `order.completed`
- `payment.received`
- `support.ticket.created`

Pour configurer les webhooks, visitez `/admin/webhooks`.
