# Product API - Express Architecture

## Structure

```text
src/
├── config/
│   └── db.js
├── controllers/
│   ├── auth.controller.js
│   └── product.controller.js
├── middleware/
│   ├── auth.middleware.js
│   └── error.middleware.js
├── models/
│   ├── Product.js
│   └── User.js
├── routes/
│   ├── auth.routes.js
│   └── product.routes.js
├── services/
│   ├── auth.service.js
│   └── product.service.js
├── utils/
│   └── jwt.js
├── validators/
│   ├── auth.validator.js
│   └── product.validator.js
└── server.js
```

## Request flow

```text
Request
  ↓
Route
  ↓
Validation middleware
  ↓
Authentication middleware (protected routes)
  ↓
Controller
  ↓
Service
  ↓
Model / MongoDB
  ↓
Controller response
```

## Setup

1. Create file of  `.env`.
2. Add your MongoDB URI and a strong JWT secret.
3. Install dependencies:

```bash
npm install
```

4. Start development server:

```bash
npm run dev
```

## Authentication

Register:

`POST /api/auth/register`

```json
{
  "name": "Neeraj",
  "email": "neeraj@example.com",
  "password": "123456"
}
```

Login:

`POST /api/auth/login`

```json
{
  "email": "neeraj@example.com",
  "password": "123456"
}
```

Use the returned JWT on protected product endpoints:

```text
Authorization: Bearer YOUR_TOKEN
```

## Product endpoints

- `GET /api/products`
- `GET /api/products/:id`
- `POST /api/products`
- `PUT /api/products/:id`
- `DELETE /api/products/:id`

All product routes require authentication.
