"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

type EmiPlan = {
  id: string;
  months: number;
  interestRate: number;
  cashback: number | null;
  monthlyPayment: number;
};

type Product = {
  id: string;
  name: string;
  description: string;
  mrp: number;
  price: number;
  imageUrl: string;
  finishes: string[];
  emiPlans: EmiPlan[];
};

export default function ProductPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [selectedFinish, setSelectedFinish] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${slug}`);
        if (res.ok) {
          const data = await res.json();
          setProduct(data);
          if (data.finishes && data.finishes.length > 0) {
            setSelectedFinish(data.finishes[0]);
          }
          if (data.emiPlans && data.emiPlans.length > 0) {
            setSelectedPlanId(data.emiPlans[0].id);
          }
        } else {
          console.error("Failed to fetch product");
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    if (slug) fetchProduct();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-black"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <h1 className="text-2xl font-semibold text-gray-800">Product not found</h1>
      </div>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7] py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="mx-auto max-w-5xl rounded-3xl bg-white p-6 md:p-12 shadow-xl flex flex-col md:flex-row gap-12">
        {/* Left Column: Product Image & Finishes */}
        <div className="w-full md:w-1/2 flex flex-col items-center">
          <div className="self-start mb-4">
            <span className="text-xs font-bold tracking-wider text-red-500 uppercase">New</span>
            <h1 className="mt-1 text-4xl font-semibold text-gray-900 tracking-tight">{product.name}</h1>
            <p className="text-lg text-gray-500 mt-1">256GB</p>
          </div>
          
          <div className="relative w-full h-[400px] mt-8">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-contain"
              priority
            />
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-gray-500 mb-4">Available in {product.finishes.length} finishes</p>
            <div className="flex justify-center gap-3">
              {product.finishes.map((finish) => (
                <button
                  key={finish}
                  onClick={() => setSelectedFinish(finish)}
                  className={`h-8 w-8 rounded-full border-2 focus:outline-none transition-all ${
                    selectedFinish === finish ? "border-black scale-110" : "border-transparent ring-1 ring-gray-200"
                  }`}
                  style={{
                    backgroundColor:
                      finish.toLowerCase().includes("black") || finish.toLowerCase().includes("obsidian")
                        ? "#2d2d2d"
                        : finish.toLowerCase().includes("silver") || finish.toLowerCase().includes("porcelain")
                        ? "#f0f0f0"
                        : finish.toLowerCase().includes("titanium") || finish.toLowerCase().includes("gray")
                        ? "#8f8f8f"
                        : finish.toLowerCase().includes("gold")
                        ? "#d4af37"
                        : finish.toLowerCase().includes("violet") || finish.toLowerCase().includes("hazel")
                        ? "#6a5acd"
                        : "#ccc",
                  }}
                  title={finish}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Pricing & EMI Plans */}
        <div className="w-full md:w-1/2">
          <div className="mb-6">
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-gray-900 tracking-tight">{formatCurrency(product.price)}</span>
            </div>
            <div className="text-lg text-gray-500 line-through mt-1 font-medium">{formatCurrency(product.mrp)}</div>
            <h3 className="text-xl font-medium text-gray-800 mt-6">EMI plans backed by mutual funds</h3>
          </div>

          <div className="space-y-3 mt-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
            {product.emiPlans.map((plan) => (
              <div
                key={plan.id}
                onClick={() => setSelectedPlanId(plan.id)}
                className={`cursor-pointer rounded-2xl border-2 p-4 transition-all duration-200 ${
                  selectedPlanId === plan.id
                    ? "border-blue-500 bg-blue-50/30 shadow-md"
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                <div className="flex justify-between items-center">
                  <div className="font-semibold text-gray-900 text-lg">
                    {formatCurrency(plan.monthlyPayment)} <span className="text-sm font-normal text-gray-500">x {plan.months} months</span>
                  </div>
                  <div className="text-sm font-medium text-gray-700">
                    {plan.interestRate}% interest
                  </div>
                </div>
                {plan.cashback && plan.cashback > 0 && (
                  <div className="mt-2 text-sm font-medium text-green-600">
                    Additional cashback of {formatCurrency(plan.cashback)}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8">
            <button
              onClick={() => {
                const plan = product.emiPlans.find((p) => p.id === selectedPlanId);
                alert(`Proceeding with ${plan?.months} months EMI plan for ${product.name} (${selectedFinish}).`);
              }}
              className="w-full rounded-full bg-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:bg-blue-700 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-500/50 transition-all duration-200 active:scale-95"
            >
              Proceed with selected plan
            </button>
          </div>
        </div>
      </div>
      
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1; 
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #d1d5db; 
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #9ca3af; 
        }
      `}</style>
    </div>
  );
}
