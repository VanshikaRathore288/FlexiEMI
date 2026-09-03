# EMI Shopping Application

A modern full-stack web application for viewing products with multiple EMI plans backed by mutual funds.

## Tech Stack

- **Frontend:** React, Next.js (App Router), Tailwind CSS
- **Backend:** Next.js Route Handlers (Node.js)
- **Database:** PostgreSQL
- **ORM:** Prisma

## Setup and Run Instructions

### Prerequisites
- Node.js (v18+)
- A PostgreSQL Database URL (You can get a free one from [Neon.tech](https://neon.tech/) or [Supabase](https://supabase.com/)).

### Installation
1. Clone this repository or copy the `emi-shopping-app` folder.
2. Navigate to the project directory:
   ```bash
   cd emi-shopping-app
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Copy the `.env.example` file to `.env` and add your PostgreSQL connection string:
   ```bash
   cp .env.example .env
   # Edit .env and set DATABASE_URL
   ```

### Database Setup
1. Push the Prisma schema to your PostgreSQL database:
   ```bash
   npx prisma db push
   ```
2. Seed the database with dummy products (iPhone 17 Pro, Samsung S24 Ultra, Pixel 9 Pro) and EMI plans:
   ```bash
   npm run prisma:seed
   ```
   *(Note: ensure you have added the `"prisma": { "seed": ... }` to your package.json as configured in the project).* Or run directly with: `npx ts-node --compiler-options "{\"module\":\"CommonJS\"}" prisma/seed.ts`

### Running the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## API Endpoints

### 1. Get All Products
**Endpoint:** `GET /api/products`

**Example Response:**
```json
[
  {
    "id": "cuid_1",
    "slug": "iphone-17-pro",
    "name": "iPhone 17 Pro",
    "description": "The ultimate iPhone experience.",
    "mrp": 134900,
    "price": 127400,
    "imageUrl": "https://images.unsplash.com/...",
    "finishes": ["Silver", "Titanium", "Black"],
    "createdAt": "2024-05-18T12:00:00.000Z",
    "updatedAt": "2024-05-18T12:00:00.000Z"
  },
  // ... more products
]
```

### 2. Get Product by Slug (with EMI Plans)
**Endpoint:** `GET /api/products/:slug` (e.g., `/api/products/iphone-17-pro`)

**Example Response:**
```json
{
  "id": "cuid_1",
  "slug": "iphone-17-pro",
  "name": "iPhone 17 Pro",
  "mrp": 134900,
  "price": 127400,
  "imageUrl": "https://images.unsplash.com/...",
  "finishes": ["Silver", "Titanium", "Black"],
  "emiPlans": [
    {
      "id": "cuid_plan_1",
      "productId": "cuid_1",
      "months": 3,
      "interestRate": 0,
      "cashback": 7500,
      "monthlyPayment": 44967
    },
    // ... more plans
  ]
}
```

---

## Database Schema (Prisma)

```prisma
model Product {
  id          String   @id @default(cuid())
  slug        String   @unique
  name        String
  description String?
  mrp         Float
  price       Float
  imageUrl    String
  finishes    String[] 
  emiPlans    EmiPlan[]
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model EmiPlan {
  id             String  @id @default(cuid())
  productId      String
  product        Product @relation(fields: [productId], references: [id], onDelete: Cascade)
  months         Int
  interestRate   Float
  cashback       Float?
  monthlyPayment Float
}
```

---

## Deployment (Vercel)

1. Push this code to a GitHub repository.
2. Sign in to [Vercel](https://vercel.com/) and create a new project.
3. Import your GitHub repository.
4. Add the `DATABASE_URL` to the Environment Variables in the Vercel dashboard.
5. Click **Deploy**. Vercel will automatically run `npm run build`. 
   *Note: Because Prisma is used, you can add a postinstall script `"postinstall": "prisma generate"` in `package.json` if required by Vercel.*

## Demo Video Instructions
To fulfill the deliverable requirement:
1. Use a screen recording tool (like Loom, OBS, or built-in OS tools).
2. Show the Vercel deployment running (the UI, selecting a product, selecting an EMI plan).
3. Briefly show the backend code (`app/api/products/[slug]/route.ts`).
4. Show the PostgreSQL database (e.g., using Neon dashboard or Prisma Studio `npx prisma studio`).
5. Upload to Google Drive / YouTube and make it public.
