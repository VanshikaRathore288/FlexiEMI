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
  images: string[];
  soldCount: number;
  emiPlans?: { monthlyPayment: number; months: number; interestRate: number }[];
};

function formatINR(amount: number) {
  return "₹" + new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(amount);
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then(r => r.json())
      .then(setProducts)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#fff", fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; }
        a { text-decoration: none; }
        .prod-card { transition: box-shadow 0.2s, transform 0.2s; }
        .prod-card:hover { box-shadow: 0 8px 32px rgba(0,0,0,0.12); transform: translateY(-2px); }
        .prod-img { transition: transform 0.4s; }
        .prod-card:hover .prod-img { transform: scale(1.05); }
        nav a:hover { color: #f97316 !important; }
        .cat-link:hover { color: #f97316 !important; }
      `}</style>

      {/* ── Navbar ── */}
      <header style={{
        borderBottom: "1px solid #e5e7eb", backgroundColor: "#fff",
        position: "sticky", top: 0, zIndex: 50, boxShadow: "0 1px 4px rgba(0,0,0,0.06)"
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 16px", height: 56, display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ fontSize: 22, fontWeight: 800, color: "#f97316", letterSpacing: "-0.5px", cursor: "pointer" }}>EasyEMI</span>
        </div>
      </header>



      {/* ── Hero ── */}
      <div style={{ background: "linear-gradient(135deg, #f97316 0%, #fb923c 100%)", color: "#fff" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "32px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div>
            <h1 style={{ fontSize: 30, fontWeight: 800, marginBottom: 6, lineHeight: 1.2 }}>Buy Now, Pay in Easy EMIs</h1>
            <p style={{ fontSize: 15, color: "#fef3c7", lineHeight: 1.5 }}>0% interest plans backed by mutual funds. No credit card needed.</p>
          </div>
          <button style={{ backgroundColor: "#fff", color: "#f97316", fontWeight: 700, padding: "10px 28px", borderRadius: 25, border: "none", cursor: "pointer", fontSize: 15, flexShrink: 0 }}>
            Shop Now
          </button>
        </div>
      </div>

      {/* ── Products Grid ── */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "32px 16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: "#111" }}>Popular Smartphones on EMI</h2>
          <a href="#" style={{ color: "#f97316", fontSize: 14, fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
            View all →
          </a>
        </div>

        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: 240 }}>
            <div style={{
              width: 40, height: 40, border: "4px solid #f97316",
              borderTopColor: "transparent", borderRadius: "50%",
              animation: "spin 0.8s linear infinite"
            }} />
            <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
            {products.map(product => {
              const discount = product.mrp > product.price
                ? Math.round(((product.mrp - product.price) / product.mrp) * 100) : 0;
              const cheapestPlan = product.emiPlans?.reduce((a, b) => a.monthlyPayment < b.monthlyPayment ? a : b);
              return (
                <Link key={product.id} href={`/products/${product.slug}`}>
                  <div className="prod-card" style={{
                    border: "1px solid #e5e7eb", borderRadius: 16, backgroundColor: "#fff",
                    overflow: "hidden", cursor: "pointer"
                  }}>
                    {/* Image */}
                    <div style={{ position: "relative", backgroundColor: "#fafafa", height: 220, overflow: "hidden" }}>
                      {product.images?.[0] && (
                        <Image className="prod-img" src={product.images[0]} alt={product.name}
                          fill style={{ objectFit: "contain", padding: 24 }} sizes="320px" />
                      )}
                      {discount > 0 && (
                        <div style={{
                          position: "absolute", top: 10, left: 10, backgroundColor: "#22c55e",
                          color: "#fff", fontSize: 11, fontWeight: 700, padding: "3px 8px", borderRadius: 4
                        }}>{discount}% OFF</div>
                      )}
                    </div>

                    {/* Info */}
                    <div style={{ padding: "14px 16px" }}>
                      <h3 style={{ fontSize: 14, fontWeight: 600, color: "#111", lineHeight: 1.4, marginBottom: 6, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                        {product.name}
                      </h3>

                      {product.soldCount > 0 && (
                        <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 8 }}>
                          <span style={{ color: "#f97316" }}>🔥</span>
                          <span style={{ fontSize: 12, color: "#6b7280" }}>{product.soldCount}+ sold</span>
                        </div>
                      )}

                      <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 10 }}>
                        <span style={{ fontSize: 18, fontWeight: 800, color: "#111" }}>{formatINR(product.price)}</span>
                        {product.mrp > product.price && (
                          <span style={{ fontSize: 12, color: "#9ca3af", textDecoration: "line-through" }}>{formatINR(product.mrp)}</span>
                        )}
                      </div>

                      {cheapestPlan && (
                        <div style={{
                          backgroundColor: "#fff7ed", border: "1px solid #fed7aa",
                          borderRadius: 8, padding: "8px 12px", marginBottom: 12
                        }}>
                          <span style={{ fontSize: 12, color: "#374151", fontWeight: 500 }}>
                            💳 EMI from {formatINR(cheapestPlan.monthlyPayment)}/mo
                            {" "}
                            <span style={{
                              backgroundColor: "#f97316", color: "#fff",
                              fontSize: 10, fontWeight: 700, padding: "1px 6px", borderRadius: 3, marginLeft: 4
                            }}>
                              {cheapestPlan.interestRate === 0 ? "0% EMI" : `${cheapestPlan.interestRate}%`}
                            </span>
                          </span>
                        </div>
                      )}

                      <button style={{
                        width: "100%", backgroundColor: "#f97316", color: "#fff",
                        fontSize: 13, fontWeight: 700, padding: "10px 0", borderRadius: 10,
                        border: "none", cursor: "pointer", fontFamily: "inherit"
                      }}>
                        View EMI Plans
                      </button>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
