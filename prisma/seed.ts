const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // 1. iPhone 17 Pro
  const iphone = await prisma.product.upsert({
    where: { slug: 'iphone-17-pro' },
    update: {},
    create: {
      slug: 'iphone-17-pro',
      name: 'iPhone 17 Pro',
      description: 'The ultimate iPhone experience.',
      mrp: 134900,
      price: 127400,
      imageUrl: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=800&auto=format&fit=crop', // Placeholder image
      finishes: ['Silver', 'Titanium', 'Black'],
      emiPlans: {
        create: [
          { months: 3, interestRate: 0, cashback: 7500, monthlyPayment: 44967 },
          { months: 6, interestRate: 0, cashback: 7500, monthlyPayment: 22483 },
          { months: 12, interestRate: 0, cashback: 7500, monthlyPayment: 11242 },
          { months: 24, interestRate: 0, cashback: 7500, monthlyPayment: 5621 },
          { months: 36, interestRate: 10.5, cashback: 7500, monthlyPayment: 4297 },
          { months: 48, interestRate: 10.5, cashback: 7500, monthlyPayment: 3385 },
          { months: 60, interestRate: 10.5, cashback: 7500, monthlyPayment: 2842 },
        ],
      },
    },
  });

  // 2. Samsung Galaxy S24 Ultra
  const samsung = await prisma.product.upsert({
    where: { slug: 'samsung-s24-ultra' },
    update: {},
    create: {
      slug: 'samsung-s24-ultra',
      name: 'Samsung Galaxy S24 Ultra',
      description: 'Galaxy AI is here.',
      mrp: 129999,
      price: 119999,
      imageUrl: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=800&auto=format&fit=crop',
      finishes: ['Titanium Gray', 'Titanium Black', 'Titanium Violet'],
      emiPlans: {
        create: [
          { months: 3, interestRate: 0, cashback: 5000, monthlyPayment: 41666 },
          { months: 6, interestRate: 0, cashback: 5000, monthlyPayment: 20833 },
          { months: 12, interestRate: 0, cashback: 5000, monthlyPayment: 10416 },
          { months: 24, interestRate: 0, cashback: 5000, monthlyPayment: 5208 },
          { months: 36, interestRate: 12.0, cashback: 2000, monthlyPayment: 3985 },
        ],
      },
    },
  });

  // 3. Google Pixel 9 Pro
  const pixel = await prisma.product.upsert({
    where: { slug: 'google-pixel-9-pro' },
    update: {},
    create: {
      slug: 'google-pixel-9-pro',
      name: 'Google Pixel 9 Pro',
      description: 'The pro Google phone.',
      mrp: 99999,
      price: 89999,
      imageUrl: 'https://images.unsplash.com/photo-1598327105666-5b89351cb315?q=80&w=800&auto=format&fit=crop',
      finishes: ['Obsidian', 'Porcelain', 'Hazel'],
      emiPlans: {
        create: [
          { months: 3, interestRate: 0, cashback: 3000, monthlyPayment: 30999 },
          { months: 6, interestRate: 0, cashback: 3000, monthlyPayment: 15499 },
          { months: 12, interestRate: 0, cashback: 3000, monthlyPayment: 7749 },
          { months: 24, interestRate: 10.0, cashback: 0, monthlyPayment: 4154 },
        ],
      },
    },
  });

  console.log({ iphone, samsung, pixel });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
