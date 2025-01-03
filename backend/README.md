# Backend Documentation

## Code Structure

The backend code is organized into the following main directories:

- `config`: Contains configuration files, such as the database configuration.
- `controllers`: Contains the controller files that handle the business logic for each route.
- `models`: Contains the Sequelize models that define the database schema.
- `routes`: Contains the route files that define the API endpoints.
- `scripts`: Contains utility scripts, such as the seed script for populating the database with sample data.

## API Endpoints

### Products

- `GET /api/products/featured`: Get featured products.
- `GET /api/products/trending`: Get trending products.
- `GET /api/products/search`: Search products with query parameters (query, category, minPrice, maxPrice, sort).
- `GET /api/products/:id`: Get a single product by ID.
- `GET /api/products/similar/:categoryId`: Get similar products by category ID.

### Categories

- `GET /api/categories`: Get all categories.
- `GET /api/categories/:id`: Get a category by ID.

### Reviews

- `GET /api/reviews/product/:productId`: Get reviews for a specific product.

## Database Schema

The database schema is defined using Sequelize models. The main models are:

### User

- `id`: Integer, primary key, auto-increment.
- `name`: String, not null.
- `email`: String, not null, unique.
- `password`: String, not null.

### Product

- `id`: Integer, primary key, auto-increment.
- `name`: String, not null.
- `description`: Text, not null.
- `price`: Decimal, not null.
- `originalPrice`: Decimal, not null.
- `stock`: Integer, not null, default 0.
- `images`: Text, not null, default '[]'.
- `sizes`: Text, not null, default '[]'.
- `isFeatured`: Boolean, not null, default false.
- `viewCount`: Integer, not null, default 0.
- `categoryId`: Integer, references Category.

### Category

- `id`: Integer, primary key, auto-increment.
- `name`: String, not null, unique.
- `description`: Text.
- `image`: String.
- `slug`: String, not null, unique.
- `isActive`: Boolean, default true.

### Review

- `id`: Integer, primary key, auto-increment.
- `rating`: Integer, not null.
- `comment`: Text.
- `userId`: Integer, references User.
- `productId`: Integer, references Product.
