const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Clear old data
  await prisma.emiPlan.deleteMany();
  await prisma.product.deleteMany();

  // 1. Apple iPhone 17 Pro
  await prisma.product.create({
    data: {
      slug: 'apple-iphone-17-pro-silver-256-gb',
      name: 'Apple iPhone 17 Pro (Silver, 256 GB)',
      description: 'The ultimate iPhone experience with titanium design and A19 Pro chip.',
      mrp: 134900,
      price: 134900,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1512054502232-10a0a035d672?q=80&w=800&auto=format&fit=crop',
      ]),
      finishes: JSON.stringify(['Silver', 'Black Titanium', 'Natural Titanium', 'Desert Titanium']),
      variants: JSON.stringify(['256 GB', '512 GB', '1 TB']),
      seller: 'Balaji Infocom',
      soldCount: 70,
      emiPlans: {
        create: [
          { months: 6,  interestRate: 0,    cashback: 0,    monthlyPayment: 19111, downpayment: 20235 },
          { months: 9,  interestRate: 0,    cashback: 0,    monthlyPayment: 12741, downpayment: 20235 },
          { months: 12, interestRate: 0,    cashback: 0,    monthlyPayment: 9555,  downpayment: 20235 },
          { months: 18, interestRate: 10.5, cashback: 0,    monthlyPayment: 7200,  downpayment: 20235 },
          { months: 24, interestRate: 10.5, cashback: 0,    monthlyPayment: 5750,  downpayment: 20235 },
        ],
      },
    },
  });

  // 2. Samsung Galaxy S24 Ultra
  await prisma.product.create({
    data: {
      slug: 'samsung-galaxy-s24-ultra-titanium-gray-256-gb',
      name: 'Samsung Galaxy S24 Ultra (Titanium Gray, 256 GB)',
      description: 'Galaxy AI is here. The most powerful Galaxy yet with S Pen.',
      mrp: 129999,
      price: 119999,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1607936854279-55e8a4c64888?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?q=80&w=800&auto=format&fit=crop',
      ]),
      finishes: JSON.stringify(['Titanium Gray', 'Titanium Black', 'Titanium Violet', 'Titanium Yellow']),
      variants: JSON.stringify(['256 GB', '512 GB']),
      seller: 'Samsung Official Store',
      soldCount: 120,
      emiPlans: {
        create: [
          { months: 6,  interestRate: 0,    cashback: 5000, monthlyPayment: 16666, downpayment: 20000 },
          { months: 9,  interestRate: 0,    cashback: 5000, monthlyPayment: 11111, downpayment: 20000 },
          { months: 12, interestRate: 0,    cashback: 5000, monthlyPayment: 8333,  downpayment: 20000 },
          { months: 24, interestRate: 12.0, cashback: 2000, monthlyPayment: 5000,  downpayment: 20000 },
        ],
      },
    },
  });

  // 3. Google Pixel 9 Pro
  await prisma.product.create({
    data: {
      slug: 'google-pixel-9-pro-obsidian-256-gb',
      name: 'Google Pixel 9 Pro (Obsidian, 256 GB)',
      description: 'Google AI on your phone. The smartest Pixel yet.',
      mrp: 109999,
      price: 99999,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1615822986427-0c91ba0f7ee5?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1598327105666-5b89351cb315?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1605236453806-6ff36851218e?q=80&w=800&auto=format&fit=crop',
      ]),
      finishes: JSON.stringify(['Obsidian', 'Porcelain', 'Hazel', 'Rose Quartz']),
      variants: JSON.stringify(['128 GB', '256 GB', '512 GB']),
      seller: 'Google Store India',
      soldCount: 45,
      emiPlans: {
        create: [
          { months: 6,  interestRate: 0,    cashback: 3000, monthlyPayment: 13999, downpayment: 16000 },
          { months: 9,  interestRate: 0,    cashback: 3000, monthlyPayment: 9333,  downpayment: 16000 },
          { months: 12, interestRate: 0,    cashback: 3000, monthlyPayment: 7000,  downpayment: 16000 },
          { months: 18, interestRate: 10.0, cashback: 0,    monthlyPayment: 5200,  downpayment: 16000 },
        ],
      },
    },
  });

  console.log('✅ Database seeded successfully!');
}

main()
  .then(async () => { await prisma.$disconnect(); })
  .catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1); });
