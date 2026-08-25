# AgoraNet Backend

![Node.js](https://img.shields.io/badge/Node.js->=24.13.0-green)
![TypeScript](https://img.shields.io/badge/TypeScript-6.0-blue)
![MySQL](https://img.shields.io/badge/MySQL-8.0-orange)
![License](https://img.shields.io/badge/License-ISC-yellow)

A RESTful API for a second-hand marketplace built with Node.js, Express, TypeScript, and MySQL.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [API Documentation](#api-documentation)
- [API Endpoints](#api-endpoints)
- [Business Logic](#business-logic)
- [Project Structure](#project-structure)
- [Security](#security)
- [Database Schema](#database-schema)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

## Tech Stack

- **Runtime:** Node.js >= 24.13.0
- **Framework:** Express.js 5
- **Language:** TypeScript 6
- **Database:** MySQL 8
- **ORM:** Sequelize
- **Authentication:** JWT (JSON Web Tokens)
- **Validation:** Zod
- **Password Hashing:** bcrypt
- **File Upload:** Multer
- **Security:** Helmet, CORS, Rate Limiting
- **API Documentation:** Swagger UI

## Features

- JWT Authentication with token blacklisting on logout
- User management with buyer/seller roles
- Become a seller flow with profile validation
- Product listings with image upload and pagination
- Product image management (upload, delete)
- Order management with status tracking (pending, confirmed, cancelled)
- Seller reviews system (only after confirmed orders)
- Wishlist functionality with active product filtering
- Security headers with Helmet
- Rate limiting (100 requests per 15 minutes per IP)
- Input validation with Zod on all endpoints
- File cleanup on product and image deletion
- Environment variable validation on server startup
- Global error handling middleware

## Prerequisites

- Node.js >= 24.13.0
- npm >= 11.6.2
- MySQL >= 8.0

## Installation

1. **Clone the repository**
```bash
git clone https://github.com/your-username/agoranet-backend.git
cd agoranet-backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Create the database**
```sql
CREATE DATABASE agoranet;
```

4. **Set up environment variables**

Create a `.env` file in the root directory:
```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_NAME=agoranet
DB_USER=root
DB_PASSWORD=your_password
BCRYPT_SALT_ROUNDS=10
JWT_SECRET=your_jwt_secret
JWT_EXPIRES=1h
```

5. **Run the development server**
```bash
npm run dev
```

The server will start on `http://localhost:3000`

## API Documentation

Swagger UI is available at `http://localhost:3000/api-docs`

## API Endpoints

### Auth

#### POST /api/auth/register
Register a new user. Automatically assigns the buyer role.

Request body:
```json
{
    "username": "johndoe",
    "email": "john@example.com",
    "password": "Password1!",
    "firstname": "John",
    "lastname": "Doe"
}
```

Response:
```json
{
    "token": "eyJhbGciOiJIUzI1NiJ9...",
    "user": {
        "id": 1,
        "username": "johndoe",
        "email": "john@example.com",
        "firstname": "John",
        "lastname": "Doe",
        "phoneNumber": null,
        "avatarUrl": null,
        "isActive": true,
        "roles": [{ "id": 1, "name": "buyer" }]
    }
}
```

#### POST /api/auth/login
Login with email or username.

Request body:
```json
{
    "credential": "johndoe",
    "password": "Password1!"
}
```

Response:
```json
{
    "token": "eyJhbGciOiJIUzI1NiJ9...",
    "user": { ... }
}
```

#### GET /api/auth/me
Get the current authenticated user. Requires Bearer token.

#### POST /api/auth/logout
Logout and blacklist the current token. Requires Bearer token.

---

### Users

#### GET /api/users/:username
Get a user's public profile by username.

Response:
```json
{
    "status": true,
    "data": {
        "id": 1,
        "username": "johndoe",
        "firstname": "John",
        "lastname": "Doe",
        "phoneNumber": "6912345678",
        "avatarUrl": "https://example.com/avatar.jpg",
        "isActive": true,
        "roles": [{ "id": 1, "name": "buyer", "createdAt": "2026-07-01T00:00:00.000Z" }]
    }
}
```

#### PUT /api/users/:username
Update user profile. Requires Bearer token and ownership.

Request body (all fields optional):
```json
{
    "firstname": "John",
    "lastname": "Doe",
    "email": "john@example.com",
    "phoneNumber": "6912345678",
    "avatarUrl": "https://example.com/avatar.jpg",
    "currentPassword": "OldPassword1!",
    "password": "NewPassword1!"
}
```

Note: `currentPassword` is required when changing the password.

#### POST /api/users/become-seller
Upgrade the current user to seller role. Requires Bearer token and a phone number on the profile.

---

### Products

#### GET /api/products
Get all active products with pagination and optional filters.

Query parameters:
| Parameter | Type | Description |
|-----------|------|-------------|
| `page` | number | Page number (default: 1) |
| `limit` | number | Items per page (default: 20) |
| `search` | string | Search by title |
| `category` | number | Filter by category ID |

Response:
```json
{
    "status": true,
    "data": [...],
    "total": 83,
    "page": 1,
    "totalPages": 5
}
```

#### GET /api/products/:id
Get a single product by ID.

#### GET /api/products/my/selling
Get the authenticated seller's products. Requires Bearer token and seller role.

#### POST /api/products
Create a new product. Requires Bearer token and seller role.

Request body:
```json
{
    "title": "iPhone 14 Pro",
    "description": "Like new condition",
    "price": 800,
    "categoryId": 1
}
```

#### PUT /api/products/:id
Update a product. Requires Bearer token, seller role and ownership.

#### DELETE /api/products/:id
Delete a product. Requires Bearer token, seller role and ownership. Also deletes all associated images from disk.

#### POST /api/products/:id/images
Upload images for a product. Requires Bearer token, seller role and ownership.

- Content-Type: multipart/form-data
- Field name: `images`
- Max files: 5
- Allowed types: JPEG, PNG, WEBP
- Max size: 5MB per file

#### DELETE /api/products/:id/images/:imageId
Delete a specific product image. Requires Bearer token, seller role and ownership. Also deletes the file from disk.

---

### Orders

#### POST /api/orders
Create an order (Buy Now). Requires Bearer token. Sets the product as inactive after purchase.

Request body:
```json
{
    "productId": 1
}
```

#### GET /api/orders/my
Get all orders for the authenticated buyer. Requires Bearer token.

Response includes product details with images and seller information.

#### GET /api/orders/selling
Get all incoming orders for the authenticated seller. Requires Bearer token and seller role.

#### PUT /api/orders/:id/status
Update order status. Requires Bearer token and seller role.

Request body:
```json
{
    "status": "confirmed"
}
```

Allowed values: `confirmed`, `cancelled`

#### PUT /api/orders/:id/cancel
Cancel an order as a buyer. Requires Bearer token. Only pending orders can be cancelled.

---

### Reviews

#### POST /api/reviews
Create a review for a seller. Requires Bearer token.

Rules:
- The buyer must have a confirmed order with the seller
- Only one review per order is allowed

Request body:
```json
{
    "orderId": 1,
    "rating": 5,
    "comment": "Great seller, fast shipping!"
}
```

#### GET /api/reviews/seller/:username
Get all reviews for a seller. Public endpoint.

---

### Wishlist

#### GET /api/wishlist
Get all wishlist items for the authenticated user. Requires Bearer token. Only returns active products.

#### POST /api/wishlist/:productId
Toggle a product in the wishlist. Requires Bearer token. Adds the product if not in wishlist, removes it if already there.

Response:
```json
{
    "status": true,
    "added": true
}
```

#### GET /api/wishlist/:productId/check
Check if a product is in the authenticated user's wishlist. Requires Bearer token.

---

## Business Logic

### User Roles
- **buyer** — Default role assigned on registration. Can browse, purchase, review and wishlist products.
- **seller** — Can list products, manage orders and upload images. Requires phone number to become a seller.

### Product Lifecycle
1. Seller creates a product with `isActive: true`
2. Buyer purchases the product
3. Product is automatically set to `isActive: false`
4. Product no longer appears in listings

### Order Flow
1. Buyer clicks Buy Now on an active product
2. Order is created with status `pending`
3. Product becomes inactive
4. Seller confirms or cancels the order
5. Buyer can also cancel a pending order
6. After confirmation, buyer can leave a review

### Review System
- Reviews are for sellers, not products
- A buyer can only review a seller after a confirmed order
- Only one review per order is allowed

### Token Blacklist
- On logout, the JWT token is stored in the `blacklisted_tokens` table with its expiry date
- Every authenticated request checks if the token is blacklisted and not expired
- Expired tokens are automatically ignored via the `expires_at` field

---

## Project Structure

src/
├── controller/ # Route handlers
│ ├── auth.controller.ts
│ ├── user.controller.ts
│ ├── product.controller.ts
│ ├── order.controller.ts
│ ├── review.controller.ts
│ └── wishlist.controller.ts
├── dao/ # Database access layer
│ ├── user.dao.ts
│ ├── product.dao.ts
│ ├── order.dao.ts
│ ├── review.dao.ts
│ └── wishlist.dao.ts
├── dto/ # Data transfer objects
│ ├── user.dto.ts
│ ├── product.dto.ts
│ ├── order.dto.ts
│ ├── review.dto.ts
│ └── role.dto.ts
├── mappers/ # Response mappers
│ ├── user.mapper.ts
│ ├── product.mapper.ts
│ └── order.mapper.ts
├── middlewares/ # Express middlewares
│ ├── auth.middleware.ts
│ ├── validate.middleware.ts
│ ├── upload.middleware.ts
│ └── error.middleware.ts
├── models/ # Sequelize models
│ ├── user.model.ts
│ ├── product.model.ts
│ ├── product-image.model.ts
│ ├── order.model.ts
│ ├── review.model.ts
│ ├── wishlist.model.ts
│ ├── role.model.ts
│ ├── blacklisted-token.model.ts
│ └── index.ts
├── routes/ # Express routes with Swagger docs
│ ├── auth.routes.ts
│ ├── user.routes.ts
│ ├── product.routes.ts
│ ├── order.routes.ts
│ ├── review.routes.ts
│ └── wishlist.routes.ts
├── services/ # Business logic
│ ├── auth.service.ts
│ ├── user.service.ts
│ ├── product.service.ts
│ ├── order.service.ts
│ ├── review.service.ts
│ ├── wishlist.service.ts
│ └── blacklist.service.ts
├── utils/ # Utilities
│ └── db.ts
├── validators/ # Zod schemas
│ ├── user.validator.ts
│ └── product.validator.ts
├── app.ts # Express app setup
├── server.ts # Server entry point
└── swagger.ts # Swagger configuration


## Security

- **JWT Blacklist** — Tokens are blacklisted on logout and checked on every authenticated request
- **Token Expiry** — JWT tokens expire after a configurable time (default: 1 hour)
- **bcrypt** — Passwords are hashed with bcrypt (10 salt rounds by default)
- **Helmet** — Security headers including CSP, HSTS, X-Frame-Options and more
- **Cross-Origin Resource Policy** — Set to cross-origin to allow image serving
- **Rate Limiting** — 100 requests per 15 minutes per IP address
- **CORS** — Configured for frontend origin only (http://localhost:5173)
- **Zod Validation** — All request inputs are validated before processing
- **Ownership Checks** — Users can only modify their own resources
- **Environment Validation** — Required environment variables are validated on startup

## Database Schema

### Tables
- `users` — User accounts
- `roles` — Available roles (buyer, seller)
- `user_roles` — Many-to-many relationship between users and roles
- `categories` — Product categories (Electronics, Clothing, Home & Garden, Sports, Books, Toys, Beauty, Automotive)
- `products` — Product listings
- `product_images` — Product images with primary flag
- `orders` — Purchase orders with status tracking (pending, confirmed, cancelled)
- `reviews` — Seller reviews linked to confirmed orders
- `wishlist_items` — User wishlist entries
- `blacklisted_tokens` — Invalidated JWT tokens with expiry dates

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port | Yes |
| `DB_HOST` | Database host | Yes |
| `DB_PORT` | Database port | Yes |
| `DB_NAME` | Database name | Yes |
| `DB_USER` | Database user | Yes |
| `DB_PASSWORD` | Database password | Yes |
| `BCRYPT_SALT_ROUNDS` | bcrypt salt rounds | Yes |
| `JWT_SECRET` | JWT signing secret | Yes |
| `JWT_EXPIRES` | JWT expiry time (e.g. 1h) | Yes |

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'feat: add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

## License

ISC
