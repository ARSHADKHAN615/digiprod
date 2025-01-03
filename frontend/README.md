This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Frontend Components and Structure

### Components

- `Header`: The header component of the application.
- `BottomNav`: The bottom navigation component.
- `ProductCard`: A card component to display product information.
- `ProductCarousel`: A carousel component to display products in a sliding manner.
- `ProductList`: A list component to display products.
- `RangeSlider`: A slider component for selecting a range of values.
- `SearchBar`: A search bar component for searching products.

### Pages

- `HomePage`: The main landing page of the application.
- `ProductPage`: The page to display individual product details.
- `ProductsPage`: The page to display a list of products based on search filters.

### API Endpoints Used in Frontend

- `GET /api/products/featured`: Fetches featured products.
- `GET /api/products/trending`: Fetches trending products.
- `GET /api/products/search`: Searches for products based on query parameters.
- `GET /api/products/:id`: Fetches a single product by its ID.
- `GET /api/products/similar/:categoryId`: Fetches similar products based on category ID.
- `GET /api/categories`: Fetches all categories.
- `GET /api/categories/:id`: Fetches a single category by its ID.
