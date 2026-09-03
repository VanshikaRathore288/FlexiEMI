import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        emiPlans: { orderBy: { monthlyPayment: 'asc' } },
      },
    });
    const parsed = products.map((p) => ({
      ...p,
      images: p.images ? JSON.parse(p.images as string) : [],
      finishes: p.finishes ? JSON.parse(p.finishes as string) : [],
      variants: p.variants ? JSON.parse(p.variants as string) : [],
    }));
    return NextResponse.json(parsed);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
