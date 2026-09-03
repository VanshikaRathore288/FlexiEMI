"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

/* ── Inline SVG Icons ── */
import React from 'react';

const IconChevronRight = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);
const IconFlame = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
    <path d="M12.017 0C9.93 4.338 12.784 6.76 10.927 10.418c-1.07-1.138-1.274-2.97-.535-4.44C7.108 8.086 5.966 12.188 8.02 15.408a5.956 5.956 0 009.293-.816 5.956 5.956 0 00.614-4.596c-.387-1.43-1.26-2.668-2.438-3.53.15 1.308-.62 2.554-1.754 3.072C13.954 7.326 14.326 3.58 12.017 0z" />
  </svg>
);
const IconChevronDown = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);
const IconShield = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

/* ── Types ── */
type EmiPlan = {
  id: string;
  months: number;
  interestRate: number;
  cashback: number | null;
  monthlyPayment: number;
  downpayment: number;
};

type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  mrp: number;
  price: number;
  images: string[];
  finishes: string[];
  variants: string[];
  seller: string;
  soldCount: number;
  emiPlans: EmiPlan[];
};

/* ── Helpers ── */
function formatINR(amount: number) {
  return "₹" + new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(amount);
}

function safeStr(v: unknown): string {
  if (typeof v === "string") return v;
  if (v === null || v === undefined) return "";
  try { return JSON.stringify(v); } catch { return String(v); }
}

/* ── Component ── */
export default function ProductPage() {
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeImage, setActiveImage] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState<EmiPlan | null>(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedVariant, setSelectedVariant] = useState("");

  useEffect(() => {
    if (!slug) return;
    fetch(`/api/products/${slug}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) { setError(data.error); return; }
        const finishes: string[] = (data.finishes ?? []).map(safeStr).filter(Boolean);
        const variants: string[] = (data.variants ?? []).map(safeStr).filter(Boolean);
        setProduct({ ...data, finishes, variants });
        setSelectedColor(finishes[0] ?? "");
        setSelectedVariant(variants[0] ?? "");
        setSelectedPlan(data.emiPlans?.[0] ?? null);
      })
      .catch(() => setError("Failed to load product."))
      .finally(() => setLoading(false));
  }, [slug]);

  /* ── Loading ── */
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div style={{ textAlign: "center" }}>
          <div style={{
            width: 40, height: 40, border: "4px solid #f97316",
            borderTopColor: "transparent", borderRadius: "50%",
            animation: "spin 0.8s linear infinite", margin: "0 auto 12px"
          }} />
          <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
          <p style={{ color: "#9ca3af", fontSize: 14 }}>Loading product…</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div style={{ textAlign: "center" }}>
          <p style={{ color: "#ef4444", fontSize: 18, fontWeight: 600 }}>{error || "Product not found."}</p>
          <Link href="/" style={{ color: "#f97316", textDecoration: "underline", marginTop: 8, display: "block" }}>← Back to products</Link>
        </div>
      </div>
    );
  }

  const discount = product.mrp > product.price
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
    : 0;

  const extraImages = product.images.length > 4 ? product.images.length - 4 : 0;
  const thumbImages = product.images.slice(0, 4);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#fff", fontFamily: "'Inter', sans-serif", color: "#111" }}>

      {/* ── Google Fonts ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Inter', sans-serif; }
        .emi-radio:checked + .emi-label { border-color: #f97316; background: #fff7ed; }
        select { -webkit-appearance: none; -moz-appearance: none; appearance: none; }
      `}</style>

      {/* ── Navbar ── */}
      <header style={{
        borderBottom: "1px solid #e5e7eb", backgroundColor: "#fff",
        position: "sticky", top: 0, zIndex: 50, boxShadow: "0 1px 4px rgba(0,0,0,0.06)"
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 16px", height: 56, display: "flex", alignItems: "center", gap: 16 }}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <span style={{ fontSize: 22, fontWeight: 800, color: "#f97316", letterSpacing: "-0.5px" }}>EasyEMI</span>
          </Link>
        </div>
      </header>



      {/* ── Breadcrumb ── */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "8px 16px", display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "#6b7280" }}>
        <Link href="/" style={{ color: "#6b7280", textDecoration: "none" }}>Shop on EMI</Link>
        <IconChevronRight />
        <span>Smart Phones</span>
        <IconChevronRight />
        <span>Apple</span>
        <IconChevronRight />
        <span style={{ color: "#111", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{product.name}</span>
      </div>

      {/* ── Main Grid ── */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "8px 16px 40px", display: "flex", gap: 40, flexWrap: "wrap" }}>

        {/* ── LEFT: Image Panel ── */}
        <div style={{ flex: "0 0 520px", minWidth: 0, display: "flex", gap: 12 }}>

          {/* Thumbnail strip */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8, width: 56 }}>
            {thumbImages.map((img, i) => (
              <button key={i} onClick={() => setActiveImage(i)} style={{
                width: 54, height: 54, borderRadius: 6, border: activeImage === i ? "2px solid #f97316" : "1px solid #e5e7eb",
                overflow: "hidden", cursor: "pointer", background: "#fafafa", padding: 2, position: "relative"
              }}>
                <Image src={img} alt={`thumb-${i}`} fill style={{ objectFit: "contain" }} sizes="54px" />
              </button>
            ))}
            {extraImages > 0 && (
              <button onClick={() => setActiveImage(4)} style={{
                width: 54, height: 54, borderRadius: 6, border: "1px solid #e5e7eb",
                background: "#f3f4f6", cursor: "pointer", fontSize: 13, fontWeight: 700, color: "#374151"
              }}>+{extraImages}</button>
            )}
          </div>

          {/* Main image + dropdowns */}
          <div style={{ flex: 1 }}>
            <div style={{
              position: "relative", backgroundColor: "#fafafa", borderRadius: 12,
              border: "1px solid #f3f4f6", aspectRatio: "4/3", overflow: "hidden"
            }}>
              <Image src={product.images[activeImage] || product.images[0]} alt={product.name}
                fill style={{ objectFit: "contain", padding: 24 }} priority sizes="460px" />
              {discount > 0 && (
                <div style={{
                  position: "absolute", top: 10, left: 10, backgroundColor: "#22c55e",
                  color: "#fff", fontSize: 11, fontWeight: 700, padding: "3px 8px", borderRadius: 4
                }}>{discount}% OFF</div>
              )}
              <div style={{
                position: "absolute", bottom: 10, right: 10, backgroundColor: "#fff",
                border: "1px solid #e5e7eb", borderRadius: 6, padding: "3px 8px",
                display: "flex", alignItems: "center", gap: 4, fontSize: 12, fontWeight: 700
              }}>
                ⭐ 4.2
              </div>
            </div>

            {/* Color & Variant dropdowns */}
            <div style={{ display: "flex", gap: 12, marginTop: 14 }}>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#6b7280", display: "block", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>Color</label>
                <div style={{ position: "relative" }}>
                  <select value={selectedColor} onChange={e => setSelectedColor(e.target.value)} style={{
                    width: "100%", border: "1px solid #d1d5db", borderRadius: 8, padding: "10px 32px 10px 12px",
                    fontSize: 13, backgroundColor: "#fff", cursor: "pointer", color: "#111",
                    outline: "none", fontFamily: "inherit"
                  }}>
                    {product.finishes.map(f => <option key={f}>{f}</option>)}
                  </select>
                  <IconChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#9ca3af" }} />
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#6b7280", display: "block", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>Variant</label>
                <div style={{ position: "relative" }}>
                  <select value={selectedVariant} onChange={e => setSelectedVariant(e.target.value)} style={{
                    width: "100%", border: "1px solid #d1d5db", borderRadius: 8, padding: "10px 32px 10px 12px",
                    fontSize: 13, backgroundColor: "#fff", cursor: "pointer", color: "#111",
                    outline: "none", fontFamily: "inherit"
                  }}>
                    {product.variants.map(v => <option key={v}>Storage: {v}</option>)}
                  </select>
                  <IconChevronDown style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#9ca3af" }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT: Product Info ── */}
        <div style={{ flex: 1, minWidth: 300, maxWidth: 460 }}>

          {/* Title */}
          <h1 style={{ fontSize: 22, fontWeight: 700, lineHeight: 1.3, color: "#111", marginBottom: 4 }}>{product.name}</h1>
          <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 8 }}>
            (Storage: {selectedVariant}, Color: {selectedColor})
          </p>

          {/* Sold count */}
          {product.soldCount > 0 && (
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 14 }}>
              <IconFlame style={{ color: "#f97316", fill: "#f97316" }} />
              <span style={{ fontSize: 13, color: "#374151", fontWeight: 500 }}>{product.soldCount}+ sold</span>
            </div>
          )}

          {/* Price */}
          <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 16 }}>
            <span style={{ fontSize: 30, fontWeight: 800, color: "#111" }}>{formatINR(product.price)}</span>
            {product.mrp > product.price && (
              <span style={{ fontSize: 15, color: "#9ca3af", textDecoration: "line-through" }}>{formatINR(product.mrp)}</span>
            )}
          </div>

          {/* App banner */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            border: "1px solid #fed7aa", backgroundColor: "#fff7ed", borderRadius: 10,
            padding: "12px 16px", marginBottom: 14
          }}>
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#111" }}>Higher Credit Instantly</p>
              <p style={{ fontSize: 11, color: "#6b7280", marginTop: 2 }}>Download Snapmint App</p>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {["App Store", "Google Play"].map(s => (
                <div key={s} style={{
                  backgroundColor: "#111", color: "#fff", fontSize: 9, fontWeight: 700,
                  padding: "5px 8px", borderRadius: 5, lineHeight: 1.4, whiteSpace: "pre-wrap", textAlign: "center"
                }}>{s.replace(" ", "\n")}</div>
              ))}
            </div>
          </div>

          {/* Pay only */}
          {selectedPlan && (
            <div style={{
              display: "flex", alignItems: "center", gap: 10,
              backgroundColor: "#fff7ed", border: "1px solid #fed7aa", borderRadius: 10,
              padding: "12px 16px", marginBottom: 18
            }}>
              <div style={{
                width: 30, height: 30, backgroundColor: "#f97316", borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
              }}>
                <span style={{ color: "#fff", fontSize: 14 }}>₹</span>
              </div>
              <span style={{ fontSize: 15, fontWeight: 700, color: "#111" }}>
                Pay only {formatINR(selectedPlan.downpayment)} now
              </span>
            </div>
          )}

          {/* EMI Tenure */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <h2 style={{ fontSize: 15, fontWeight: 700, color: "#111" }}>Choose EMI Tenure</h2>
              <span style={{ fontSize: 11, color: "#9ca3af" }}>EMIs starting 3<sup>rd</sup> Oct</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {product.emiPlans.map((plan) => {
                const isSelected = selectedPlan?.id === plan.id;
                return (
                  <div key={plan.id} onClick={() => setSelectedPlan(plan)} style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "12px 14px", borderRadius: 10, cursor: "pointer",
                    border: isSelected ? "2px solid #f97316" : "1px solid #e5e7eb",
                    backgroundColor: isSelected ? "#fff7ed" : "#fff",
                    transition: "all 0.15s"
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      {/* Radio */}
                      <div style={{
                        width: 18, height: 18, borderRadius: "50%", border: `2px solid ${isSelected ? "#f97316" : "#9ca3af"}`,
                        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
                      }}>
                        {isSelected && <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#f97316" }} />}
                      </div>
                      <span style={{ fontSize: 14, fontWeight: 600, color: "#111" }}>
                        {formatINR(plan.monthlyPayment)}{" "}
                        <span style={{ fontWeight: 400, color: "#6b7280" }}>x {plan.months} months</span>
                      </span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      {plan.cashback !== null && plan.cashback > 0 && (
                        <span style={{
                          fontSize: 11, fontWeight: 700, color: "#16a34a",
                          backgroundColor: "#dcfce7", padding: "2px 8px", borderRadius: 4
                        }}>
                          ₹{plan.cashback} cashback
                        </span>
                      )}
                      <span style={{
                        fontSize: 11, fontWeight: 700, color: "#fff",
                        backgroundColor: plan.interestRate === 0 ? "#f97316" : "#374151",
                        padding: "3px 10px", borderRadius: 4
                      }}>
                        {plan.interestRate === 0 ? "0% EMI" : `${plan.interestRate}% EMI`}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {product.emiPlans.some(p => p.interestRate > 0) && (
              <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 8 }}>
                *Total extra payment per month/order value
              </p>
            )}
          </div>

          {/* CTA */}
          <button
            onClick={() => alert(`Proceeding:\n${product.name}\nColor: ${selectedColor}\nVariant: ${selectedVariant}\nEMI: ${formatINR(selectedPlan?.monthlyPayment ?? 0)} × ${selectedPlan?.months} months`)}
            style={{
              width: "100%", backgroundColor: "#f97316", color: "#fff",
              fontFamily: "inherit", fontSize: 16, fontWeight: 700,
              padding: "16px 0", borderRadius: 10, border: "none", cursor: "pointer",
              boxShadow: "0 4px 14px rgba(249,115,22,0.3)", transition: "background 0.15s", marginBottom: 14
            }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#ea6c0a")}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#f97316")}
          >
            Buy on {selectedPlan?.months} months EMI
          </button>

          {/* Sold by */}
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <IconShield style={{ color: "#22c55e", flexShrink: 0 }} />
            <span style={{ fontSize: 13, color: "#374151" }}>
              Sold By:{" "}
              <span style={{ color: "#f97316", fontWeight: 600, cursor: "pointer" }}>{product.seller}</span>
              {" "}
              <IconChevronRight style={{ display: "inline", verticalAlign: "middle" }} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
