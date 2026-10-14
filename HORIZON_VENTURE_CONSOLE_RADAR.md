# 🎮 Horizon Venture 2: "RetroFix Radar"
## Automated Console Flipping Profit Engine & Diagnostic Assistant

**Prepared for:** Gabriel Henrique  
**Domain:** Physical Console Refurbishment + AI Diagnostics + Automated Arbitrage  
**Status:** Complete Architectural Blueprint & Business Plan

---

## 1. Executive Summary & The Problem

As a technician who buys broken consoles, repairs them, and flips them for profit, you face three primary bottlenecks that prevent it from becoming a high-margin, scalable enterprise:
1. **Manual Sourcing Grind:** Spending hours manually refreshing eBay "For parts or not working", Mercari, Facebook Marketplace, and OLX trying to find underpriced consoles before competitors snag them.
2. **Hidden Repair Cost Uncertainty:** Buying a "PS5 Blinking Blue Light" or "Nintendo Switch not charging" without instantly knowing whether it's a $3 diode/fuse replacement, an $8 HDMI port, or an unfixable dead APU.
3. **Inventory & Margin Tracking:** No structured system that logs acquisition cost, replacement component costs (HDMI ports, capacitors, thermal paste), 3D printed replacement parts, and marketplace seller fees (eBay 13.25%, Mercari 10%) to calculate true net profit.

**The Solution:** **RetroFix Radar** — A specialized micro-SaaS and local automated workstation tool that combines:
- **Live Arbitrage Scraper & Price Matrix:** Scrapes broken console listings, calculates estimated repair parts cost + your labor target, and flags listings with a **>50% Net Margin score**.
- **Visual Diagnostic Fault Tree & AI Symptom Checker:** Input console symptom (e.g. *"PS4 turns on, white light, no video"* or *"Switch drawing 0.41A at 15V on USB-C meter"*) $\rightarrow$ returns the exact circuit path to test, component part numbers (e.g., M92T36 power IC, BQ24193 charging chip), and soldering difficulty rating.
- **3D Printed Replacement Parts Synergy:** Direct integration with your 3D printer for custom replacement battery doors, optical drive bay brackets, custom faceplates, and display stands to increase flip resale value by 20–30%!

---

## 2. Console Flipping Profit & Diagnostic Matrix

Below is the verified profit matrix across the 8 most profitable consoles to flip today:

| Console | Common Fault / Symptom | Typical "For Parts" Buy Price | Required Replacement Part | Part Cost | Refurbished Resale Price | Net Profit (after fees & parts) | Difficulty |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Nintendo Switch V2 / OLED** | USB-C port damaged or M92T36 IC shorted (drawing 0.41A or 0.00A) | $45 – $70 | M92T36 IC + USB-C Port | $6.50 | $160 – $220 | **$85 – $120** | Medium (Hot air SMD) |
| **Nintendo Switch Lite** | Joy-Con stick drift + blown backlight fuse | $40 – $55 | 2x Hall Effect Joysticks + Fuse | $7.00 | $120 – $140 | **$60 – $75** | Easy |
| **PlayStation 5 (Disc/Digital)** | Broken HDMI Port pins or liquid metal dry spot | $120 – $180 | OEM PS5 HDMI Port + Thermal Grizzly Conductonaut | $8.50 | $350 – $420 | **$160 – $210** | Medium (Hot air + iron) |
| **PlayStation 4 Pro** | Overheating jet engine noise / thermal shutdown | $50 – $75 | Cleaning + Arctic MX-4 paste + 1mm thermal pads | $3.00 | $150 – $180 | **$75 – $95** | Easy (Disassembly only) |
| **Xbox Series X** | Bent HDMI port pins / no sync button | $130 – $170 | Xbox Series X HDMI Port | $9.00 | $340 – $380 | **$140 – $180** | Medium |
| **Game Boy Advance (Original)** | Corroded battery terminals + dim screen | $25 – $40 | IPS V3 Backlight Mod + 3D Printed Shell | $38.00 (Mod kit) | $140 – $170 | **$65 – $85** | Easy-Medium |
| **Nintendo 3DS XL** | Broken top IPS screen or charging port loose | $50 – $75 | Replacement Top LCD + USB-C mod port | $18.00 | $180 – $220 | **$85 – $115** | Hard (Ribbon cable threading) |
| **PlayStation 3 (Slim)** | NEC/TOKIN capacitors failing (Yellow Light of Death) | $20 – $35 | 4x 470uF Tantalum Capacitors | $4.50 | $110 – $130 | **$70 – $85** | Medium |

---

## 3. System Architecture & Technical Implementation

```
┌────────────────────────────────────────────────────────────────────────┐
│                   RETROFIX RADAR SYSTEM ARCHITECTURE                   │
├────────────────────────────────────────────────────────────────────────┤
│ 1. SOURCING RADAR (CRON WORKER)                                        │
│    - Scrapes eBay Finding API / Browse API: "Broken / For Parts"       │
│    - Filters: Buy-It-Now or Ending Soon, Seller Rating > 98%          │
│    - Price threshold alert -> Discord / Telegram bot ping              │
├────────────────────────────────────────────────────────────────────────┤
│ 2. ARBITRAGE VALUATION ENGINE                                          │
│    Formula: Net Margin = ResaleAvg - (BuyPrice + Shipping + Parts + Fees)│
│    Flags listings with Net Margin > 45%                                │
├────────────────────────────────────────────────────────────────────────┤
│ 3. MULTIMODAL AI DIAGNOSTIC COPILOT (Gemini Vision API)                │
│    - Upload high-res photo of console motherboard / multimeter readout │
│    - Pinpoints blown 0402 SMD fuses, corroded traces, burnt chokes     │
│    - Step-by-step soldering temperature guidelines & probe test points │
├────────────────────────────────────────────────────────────────────────┤
│ 4. 3D PRINTED ACCESSORY INTEGRATION                                    │
│    - Auto-generates matching 3D printable stands (from PrintForge!)    │
│    - Custom controller grips & replacement battery doors to maximize   │
│      perceived value on eBay/Facebook Marketplace listing photos!      │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Minimum Viable Product (MVP) Code Architecture

The MVP can be deployed as an edge web app with a single-file SQLite database tracking inventory:

```typescript
// Core Arbitrage Calculation Engine
interface ConsoleListing {
  model: 'PS5' | 'Switch_OLED' | 'Switch_V2' | 'Xbox_Series_X' | 'PS4_Pro';
  listPrice: number;
  shipping: number;
  reportedSymptom: string;
}

interface RepairEstimate {
  estimatedPartsCost: number;
  estimatedLaborMinutes: number;
  expectedResalePrice: number;
  marketplaceFeeRate: number; // e.g. 0.1325 for eBay
  netProfit: number;
  roiPercentage: number;
  recommendation: 'BUY_NOW' | 'NEGOTIATE' | 'PASS';
}

export function evaluateConsoleDeal(listing: ConsoleListing): RepairEstimate {
  const catalog = {
    PS5: { resale: 380, baseParts: 12, fee: 0.1325 },
    Switch_OLED: { resale: 210, baseParts: 8, fee: 0.1325 },
    Switch_V2: { resale: 160, baseParts: 7, fee: 0.1325 },
    Xbox_Series_X: { resale: 360, baseParts: 14, fee: 0.1325 },
    PS4_Pro: { resale: 165, baseParts: 5, fee: 0.1325 }
  };

  const modelData = catalog[listing.model];
  const totalCost = listing.listPrice + listing.shipping + modelData.baseParts;
  const marketplaceFees = modelData.resale * modelData.fee;
  const netProfit = modelData.resale - totalCost - marketplaceFees;
  const roi = (netProfit / totalCost) * 100;

  return {
    estimatedPartsCost: modelData.baseParts,
    estimatedLaborMinutes: 45,
    expectedResalePrice: modelData.resale,
    marketplaceFeeRate: modelData.fee,
    netProfit: Math.round(netProfit),
    roiPercentage: Math.round(roi),
    recommendation: roi >= 50 && netProfit >= 60 ? 'BUY_NOW' : (roi >= 35 ? 'NEGOTIATE' : 'PASS')
  };
}
```

---

## 5. 90-Day Execution Plan to Scale to $3,000/Month

1. **Month 1: Sourcing Discipline & Standard Toolkit**
   - Purchase standard repair kit: TS101 soldering iron, 858D hot air station, Amtech flux, Kingbo solder wick, multimeter with fine-point gold probes.
   - Buy and flip **4 consoles** (focus on Nintendo Switch USB-C / Joy-Con drift: fastest turnaround, lowest financial risk).
   - Expected Profit: **$350 – $500**.
2. **Month 2: 3D Print Packaging & Brand Bundle**
   - Bundle every flipped console with a **custom 3D printed stand from PrintForge Studio** in matching colors (e.g. White stand for PS5, Neon Red/Blue for Switch).
   - This differentiates your listing from random pawn shops and lets you charge a $20 premium on eBay/Marketplace.
   - Scale to **8 consoles/month**. Expected Profit: **$900 – $1,200**.
3. **Month 3: Automated Scraping & Local Drop-Off Network**
   - Deploy the automated RetroFix Radar bot to alert your phone the second an underpriced broken console is listed on Facebook/Mercari.
   - Launch a simple local repair drop-off landing page for gamers in your city who need HDMI ports or Joy-Con drift fixed (100% labor margin, no sourcing risk).
   - Scale to **15 flips + 10 repair services/month**. Expected Profit: **$2,500 – $3,500/month**.
