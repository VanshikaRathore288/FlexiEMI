"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  mrp: number;
  price: number;
  imageUrl: string;
};

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        if (res.ok) {
          const data = await res.json();
          setProducts(data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
            Premium EMI Shopping
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get the latest smartphones with easy EMI plans backed by mutual funds.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-black"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <Link href={`/products/${product.slug}`} key={product.id}>
                <div className="group bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer h-full flex flex-col items-center border border-gray-100 hover:border-gray-200">
                  <div className="relative w-full h-64 mb-8 transform group-hover:scale-105 transition-transform duration-500">
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2 text-center">
                    {product.name}
                  </h2>
                  <p className="text-gray-500 text-center mb-4 flex-grow text-sm">
                    {product.description}
                  </p>
                  <div className="flex flex-col items-center mt-auto w-full pt-4 border-t border-gray-100">
                    <span className="text-xl font-bold text-gray-900 mb-1">
                      From {formatCurrency(product.price)}
                    </span>
                    <span className="text-sm font-medium text-blue-600 group-hover:text-blue-700 transition-colors">
                      View EMI Plans &rarr;
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
