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
        'https://images.unsplash.com/photo-1512054502232-10a0a035d672?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?q=80&w=800&auto=format&fit=crop',
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

  // 4. OnePlus 12
  await prisma.product.create({
    data: {
      slug: 'oneplus-12-silky-black-256-gb',
      name: 'OnePlus 12 (Silky Black, 256 GB)',
      description: 'Smooth beyond belief. Co-developed with Hasselblad.',
      mrp: 69999,
      price: 64999,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=800&auto=format&fit=crop',
      ]),
      finishes: JSON.stringify(['Silky Black', 'Flowy Emerald']),
      variants: JSON.stringify(['256 GB', '512 GB']),
      seller: 'OnePlus Store',
      soldCount: 85,
      emiPlans: {
        create: [
          { months: 3, interestRate: 0, cashback: 0, monthlyPayment: 21666, downpayment: 0 },
          { months: 6, interestRate: 0, cashback: 0, monthlyPayment: 10833, downpayment: 0 },
        ],
      },
    },
  });

  // 5. Xiaomi 14 Ultra
  await prisma.product.create({
    data: {
      slug: 'xiaomi-14-ultra-black-512-gb',
      name: 'Xiaomi 14 Ultra (Black, 512 GB)',
      description: 'Photography redefined with Leica optics.',
      mrp: 99999,
      price: 99999,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop',
      ]),
      finishes: JSON.stringify(['Black', 'White']),
      variants: JSON.stringify(['512 GB']),
      seller: 'Mi India',
      soldCount: 30,
      emiPlans: {
        create: [
          { months: 6, interestRate: 0, cashback: 2000, monthlyPayment: 16666, downpayment: 0 },
          { months: 9, interestRate: 10, cashback: 0, monthlyPayment: 11111, downpayment: 0 },
        ],
      },
    },
  });

  // 6. Nothing Phone (2)
  await prisma.product.create({
    data: {
      slug: 'nothing-phone-2-dark-grey-256-gb',
      name: 'Nothing Phone (2) (Dark Grey, 256 GB)',
      description: 'Come to the bright side. Glyph interface evolved.',
      mrp: 49999,
      price: 44999,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1605236453806-6ff36851218e?q=80&w=800&auto=format&fit=crop',
      ]),
      finishes: JSON.stringify(['Dark Grey', 'White']),
      variants: JSON.stringify(['128 GB', '256 GB', '512 GB']),
      seller: 'Nothing Official',
      soldCount: 200,
      emiPlans: {
        create: [
          { months: 3, interestRate: 0, cashback: 0, monthlyPayment: 15000, downpayment: 0 },
          { months: 6, interestRate: 0, cashback: 0, monthlyPayment: 7500, downpayment: 0 },
        ],
      },
    },
  });

  console.log('✅ Database seeded successfully!');
}

main()
  .then(async () => { await prisma.$disconnect(); })
  .catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1); });
