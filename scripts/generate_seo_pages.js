const fs = require('fs');
const path = require('path');

const devices = [
  {
    slug: 'ps5-dualsense',
    name: 'PS5 DualSense Wireless Controller',
    category: 'Gaming Controllers',
    width: 100, height: 85, angle: 64, depth: 34, lip: 24, thickness: 8, cableNotch: true,
    filamentGrams: 72, printMinutes: 105, costUSD: '1.44', supports: 'None (Support-Free)',
    description: 'Custom ergonomic desktop display stand engineered for the PlayStation 5 DualSense controller with rear paddle clearance and bottom USB-C charging relief.'
  },
  {
    slug: 'ps5-dualsense-edge',
    name: 'PS5 DualSense Edge Pro Controller',
    category: 'Gaming Controllers',
    width: 102, height: 85, angle: 64, depth: 36, lip: 24, thickness: 8, cableNotch: true,
    filamentGrams: 75, printMinutes: 110, costUSD: '1.50', supports: 'None (Support-Free)',
    description: 'Precision cradle tailored for the PS5 DualSense Edge, providing extra clearance for rear stainless steel back paddles and customizable function levers.'
  },
  {
    slug: 'nintendo-switch-2',
    name: 'Nintendo Switch 2 (Next-Gen)',
    category: 'Handheld Consoles',
    width: 120, height: 90, angle: 72, depth: 22, lip: 20, thickness: 8, cableNotch: true,
    filamentGrams: 82, printMinutes: 120, costUSD: '1.64', supports: 'None (Support-Free)',
    description: 'Engineered for the larger 8.4-inch chassis of the Nintendo Switch 2. Features an anti-tip base stabilizer and centered USB-C port channel for continuous tabletop gaming.'
  },
  {
    slug: 'nintendo-switch-oled',
    name: 'Nintendo Switch OLED Model',
    category: 'Handheld Consoles',
    width: 115, height: 90, angle: 72, depth: 20, lip: 20, thickness: 8, cableNotch: true,
    filamentGrams: 78, printMinutes: 115, costUSD: '1.56', supports: 'None (Support-Free)',
    description: 'Sleek tabletop stand for the Nintendo Switch OLED, designed to prevent screen glare and keep the console securely anchored without blocking rear intake vents.'
  },
  {
    slug: 'nintendo-switch-standard',
    name: 'Nintendo Switch V1 / V2',
    category: 'Handheld Consoles',
    width: 115, height: 88, angle: 72, depth: 18, lip: 19, thickness: 7, cableNotch: true,
    filamentGrams: 74, printMinutes: 110, costUSD: '1.48', supports: 'None (Support-Free)',
    description: 'Minimalist desk stand for original Nintendo Switch V1 and V2 consoles with integrated Joy-Con grip support.'
  },
  {
    slug: 'nintendo-switch-lite',
    name: 'Nintendo Switch Lite',
    category: 'Handheld Consoles',
    width: 95, height: 80, angle: 70, depth: 16, lip: 18, thickness: 6, cableNotch: true,
    filamentGrams: 58, printMinutes: 85, costUSD: '1.16', supports: 'None (Support-Free)',
    description: 'Compact travel stand for the unibody Nintendo Switch Lite with bottom charging cutout.'
  },
  {
    slug: 'steam-deck-oled',
    name: 'Steam Deck OLED',
    category: 'Handheld Consoles',
    width: 125, height: 95, angle: 68, depth: 28, lip: 22, thickness: 9, cableNotch: true,
    filamentGrams: 92, printMinutes: 135, costUSD: '1.84', supports: 'None (Support-Free)',
    description: 'Heavy-duty cradle for the Valve Steam Deck OLED, engineered to avoid blocking lower rear cooling exhaust fans.'
  },
  {
    slug: 'steam-deck-lcd',
    name: 'Steam Deck (Original LCD)',
    category: 'Handheld Consoles',
    width: 125, height: 95, angle: 68, depth: 28, lip: 22, thickness: 9, cableNotch: true,
    filamentGrams: 92, printMinutes: 135, costUSD: '1.84', supports: 'None (Support-Free)',
    description: 'Sturdy anti-tip desktop dock for the original Valve Steam Deck LCD handheld PC.'
  },
  {
    slug: 'asus-rog-ally-x',
    name: 'ASUS ROG Ally X',
    category: 'Handheld Consoles',
    width: 122, height: 92, angle: 68, depth: 26, lip: 21, thickness: 8, cableNotch: true,
    filamentGrams: 88, printMinutes: 125, costUSD: '1.76', supports: 'None (Support-Free)',
    description: 'Custom contoured stand for ASUS ROG Ally X with deep ergonomic palm rest cutouts.'
  },
  {
    slug: 'asus-rog-ally',
    name: 'ASUS ROG Ally',
    category: 'Handheld Consoles',
    width: 120, height: 90, angle: 68, depth: 24, lip: 21, thickness: 8, cableNotch: true,
    filamentGrams: 84, printMinutes: 120, costUSD: '1.68', supports: 'None (Support-Free)',
    description: 'Desktop stand tailored to the white ASUS ROG Ally Windows handheld.'
  },
  {
    slug: 'lenovo-legion-go',
    name: 'Lenovo Legion Go',
    category: 'Handheld Consoles',
    width: 132, height: 105, angle: 66, depth: 32, lip: 24, thickness: 9, cableNotch: true,
    filamentGrams: 105, printMinutes: 150, costUSD: '2.10', supports: 'None (Support-Free)',
    description: 'Reinforced desktop easel for the massive 8.8-inch Lenovo Legion Go with TrueStrike controller clearance.'
  },
  {
    slug: 'xbox-series-controller',
    name: 'Xbox Series X/S Wireless Controller',
    category: 'Gaming Controllers',
    width: 98, height: 82, angle: 65, depth: 32, lip: 22, thickness: 8, cableNotch: true,
    filamentGrams: 68, printMinutes: 100, costUSD: '1.36', supports: 'None (Support-Free)',
    description: 'Low-profile display stand designed to lock into the contours of the standard Xbox Wireless Controller.'
  },
  {
    slug: 'xbox-elite-series-2',
    name: 'Xbox Elite Wireless Controller Series 2',
    category: 'Gaming Controllers',
    width: 100, height: 84, angle: 65, depth: 34, lip: 24, thickness: 8, cableNotch: true,
    filamentGrams: 72, printMinutes: 105, costUSD: '1.44', supports: 'None (Support-Free)',
    description: 'Engineered for the Xbox Elite Series 2 with rear paddle slots and magnetic dock clearance.'
  },
  {
    slug: 'nintendo-switch-pro-controller',
    name: 'Nintendo Switch Pro Controller',
    category: 'Gaming Controllers',
    width: 96, height: 82, angle: 66, depth: 32, lip: 22, thickness: 8, cableNotch: true,
    filamentGrams: 66, printMinutes: 98, costUSD: '1.32', supports: 'None (Support-Free)',
    description: 'Clean desktop dock for the official Nintendo Switch Pro Controller.'
  },
  {
    slug: '8bitdo-ultimate-controller',
    name: '8BitDo Ultimate Wireless Controller',
    category: 'Gaming Controllers',
    width: 96, height: 82, angle: 65, depth: 30, lip: 22, thickness: 8, cableNotch: true,
    filamentGrams: 65, printMinutes: 96, costUSD: '1.30', supports: 'None (Support-Free)',
    description: 'Precision cradle for the 8BitDo Ultimate Controller with 2.4G/Bluetooth toggles.'
  },
  {
    slug: 'scuf-reflex-ps5',
    name: 'SCUF Reflex Pro PS5 Controller',
    category: 'Gaming Controllers',
    width: 102, height: 85, angle: 64, depth: 36, lip: 24, thickness: 8, cableNotch: true,
    filamentGrams: 76, printMinutes: 110, costUSD: '1.52', supports: 'None (Support-Free)',
    description: 'Custom cradle with deep undercuts for SCUF Reflex quad rear paddles.'
  },
  {
    slug: 'playstation-portal',
    name: 'PlayStation Portal Remote Player',
    category: 'Handheld Consoles',
    width: 135, height: 95, angle: 68, depth: 32, lip: 24, thickness: 9, cableNotch: true,
    filamentGrams: 102, printMinutes: 145, costUSD: '2.04', supports: 'None (Support-Free)',
    description: 'Extra-wide cradle designed specifically to cradle the DualSense grips and 8-inch screen of the PlayStation Portal.'
  },
  {
    slug: 'iphone-16-pro-max',
    name: 'iPhone 16 Pro Max (MagSafe)',
    category: 'Smartphones',
    width: 72, height: 85, angle: 72, depth: 16, lip: 16, thickness: 6, cableNotch: true,
    filamentGrams: 52, printMinutes: 75, costUSD: '1.04', supports: 'None (Support-Free)',
    description: 'Sleek desktop viewing stand for the 6.9-inch iPhone 16 Pro Max with centered USB-C cutout.'
  },
  {
    slug: 'iphone-16-pro',
    name: 'iPhone 16 Pro',
    category: 'Smartphones',
    width: 68, height: 80, angle: 72, depth: 15, lip: 16, thickness: 6, cableNotch: true,
    filamentGrams: 48, printMinutes: 70, costUSD: '0.96', supports: 'None (Support-Free)',
    description: 'Minimalist phone stand calibrated for the iPhone 16 Pro.'
  },
  {
    slug: 'iphone-16-plus',
    name: 'iPhone 16 Plus',
    category: 'Smartphones',
    width: 72, height: 84, angle: 72, depth: 15, lip: 16, thickness: 6, cableNotch: true,
    filamentGrams: 50, printMinutes: 72, costUSD: '1.00', supports: 'None (Support-Free)',
    description: 'Bedside nightstand dock for iPhone 16 Plus with StandBy mode support.'
  },
  {
    slug: 'iphone-16',
    name: 'iPhone 16 (Standard)',
    category: 'Smartphones',
    width: 68, height: 78, angle: 72, depth: 15, lip: 16, thickness: 6, cableNotch: true,
    filamentGrams: 46, printMinutes: 68, costUSD: '0.92', supports: 'None (Support-Free)',
    description: 'Desk stand for standard iPhone 16 with smooth chamfered edges.'
  },
  {
    slug: 'iphone-15-pro-max',
    name: 'iPhone 15 Pro Max',
    category: 'Smartphones',
    width: 72, height: 84, angle: 72, depth: 16, lip: 16, thickness: 6, cableNotch: true,
    filamentGrams: 50, printMinutes: 72, costUSD: '1.00', supports: 'None (Support-Free)',
    description: 'Universal stand for titanium iPhone 15 Pro Max.'
  },
  {
    slug: 'iphone-15-pro',
    name: 'iPhone 15 Pro',
    category: 'Smartphones',
    width: 68, height: 80, angle: 72, depth: 15, lip: 16, thickness: 6, cableNotch: true,
    filamentGrams: 48, printMinutes: 70, costUSD: '0.96', supports: 'None (Support-Free)',
    description: 'Everyday carry stand for iPhone 15 Pro.'
  },
  {
    slug: 'iphone-14-pro-max',
    name: 'iPhone 14 Pro Max',
    category: 'Smartphones',
    width: 72, height: 84, angle: 72, depth: 16, lip: 16, thickness: 6, cableNotch: true,
    filamentGrams: 50, printMinutes: 72, costUSD: '1.00', supports: 'None (Support-Free)',
    description: 'Desk dock for iPhone 14 Pro Max with Lightning & USB-C clearance.'
  },
  {
    slug: 'samsung-galaxy-s24-ultra',
    name: 'Samsung Galaxy S24 Ultra',
    category: 'Smartphones',
    width: 74, height: 86, angle: 70, depth: 16, lip: 17, thickness: 6, cableNotch: true,
    filamentGrams: 54, printMinutes: 78, costUSD: '1.08', supports: 'None (Support-Free)',
    description: 'Solid stand for Galaxy S24 Ultra with flat sides and bottom S-Pen / USB-C notch.'
  },
  {
    slug: 'samsung-galaxy-s24-plus',
    name: 'Samsung Galaxy S24+',
    category: 'Smartphones',
    width: 70, height: 82, angle: 70, depth: 15, lip: 16, thickness: 6, cableNotch: true,
    filamentGrams: 49, printMinutes: 72, costUSD: '0.98', supports: 'None (Support-Free)',
    description: 'Tabletop dock for Samsung Galaxy S24 Plus.'
  },
  {
    slug: 'samsung-galaxy-s24',
    name: 'Samsung Galaxy S24',
    category: 'Smartphones',
    width: 66, height: 78, angle: 70, depth: 14, lip: 16, thickness: 6, cableNotch: true,
    filamentGrams: 45, printMinutes: 65, costUSD: '0.90', supports: 'None (Support-Free)',
    description: 'Compact phone holder for Samsung Galaxy S24.'
  },
  {
    slug: 'samsung-galaxy-z-fold-6',
    name: 'Samsung Galaxy Z Fold 6',
    category: 'Smartphones',
    width: 82, height: 95, angle: 68, depth: 22, lip: 18, thickness: 7, cableNotch: true,
    filamentGrams: 68, printMinutes: 98, costUSD: '1.36', supports: 'None (Support-Free)',
    description: 'Heavy dual-mode stand supporting Galaxy Z Fold 6 folded or fully opened in tablet mode.'
  },
  {
    slug: 'google-pixel-9-pro-xl',
    name: 'Google Pixel 9 Pro XL',
    category: 'Smartphones',
    width: 72, height: 84, angle: 72, depth: 16, lip: 16, thickness: 6, cableNotch: true,
    filamentGrams: 52, printMinutes: 75, costUSD: '1.04', supports: 'None (Support-Free)',
    description: 'Modern phone cradle for Pixel 9 Pro XL with horizontal camera visor relief.'
  },
  {
    slug: 'google-pixel-9-pro',
    name: 'Google Pixel 9 Pro',
    category: 'Smartphones',
    width: 68, height: 80, angle: 72, depth: 15, lip: 16, thickness: 6, cableNotch: true,
    filamentGrams: 48, printMinutes: 70, costUSD: '0.96', supports: 'None (Support-Free)',
    description: 'Desk dock for Google Pixel 9 Pro.'
  },
  {
    slug: 'google-pixel-9',
    name: 'Google Pixel 9',
    category: 'Smartphones',
    width: 68, height: 78, angle: 72, depth: 15, lip: 16, thickness: 6, cableNotch: true,
    filamentGrams: 46, printMinutes: 68, costUSD: '0.92', supports: 'None (Support-Free)',
    description: 'Sleek phone stand for Google Pixel 9.'
  },
  {
    slug: 'ipad-pro-13-m4',
    name: 'iPad Pro 13-inch (M4)',
    category: 'Tablets',
    width: 140, height: 125, angle: 66, depth: 18, lip: 22, thickness: 9, cableNotch: false,
    filamentGrams: 115, printMinutes: 165, costUSD: '2.30', supports: 'None (Support-Free)',
    description: 'Wide anti-tip easel stand designed to hold the ultra-thin 13-inch M4 iPad Pro securely in landscape or portrait.'
  },
  {
    slug: 'ipad-pro-11-m4',
    name: 'iPad Pro 11-inch (M4)',
    category: 'Tablets',
    width: 130, height: 115, angle: 68, depth: 18, lip: 20, thickness: 8, cableNotch: false,
    filamentGrams: 98, printMinutes: 140, costUSD: '1.96', supports: 'None (Support-Free)',
    description: 'Minimalist desktop easel for the 11-inch M4 iPad Pro.'
  },
  {
    slug: 'ipad-air-13',
    name: 'iPad Air 13-inch (M2)',
    category: 'Tablets',
    width: 138, height: 122, angle: 66, depth: 18, lip: 22, thickness: 9, cableNotch: false,
    filamentGrams: 112, printMinutes: 160, costUSD: '2.24', supports: 'None (Support-Free)',
    description: 'Heavy-duty tablet easel for the 13-inch iPad Air M2.'
  },
  {
    slug: 'ipad-air-11',
    name: 'iPad Air 11-inch (M2)',
    category: 'Tablets',
    width: 128, height: 112, angle: 68, depth: 18, lip: 20, thickness: 8, cableNotch: false,
    filamentGrams: 94, printMinutes: 135, costUSD: '1.88', supports: 'None (Support-Free)',
    description: 'Desktop stand for the 11-inch iPad Air.'
  },
  {
    slug: 'ipad-mini-6',
    name: 'iPad Mini 6',
    category: 'Tablets',
    width: 105, height: 95, angle: 70, depth: 16, lip: 18, thickness: 7, cableNotch: true,
    filamentGrams: 68, printMinutes: 100, costUSD: '1.36', supports: 'None (Support-Free)',
    description: 'Compact easel dock for the 8.3-inch iPad Mini 6 with charging route.'
  },
  {
    slug: 'ipad-10th-gen',
    name: 'iPad (10th Generation)',
    category: 'Tablets',
    width: 125, height: 110, angle: 68, depth: 18, lip: 20, thickness: 8, cableNotch: false,
    filamentGrams: 92, printMinutes: 130, costUSD: '1.84', supports: 'None (Support-Free)',
    description: 'Everyday tablet stand for 10.9-inch 10th Gen iPad.'
  },
  {
    slug: 'samsung-galaxy-tab-s9-ultra',
    name: 'Samsung Galaxy Tab S9 Ultra',
    category: 'Tablets',
    width: 145, height: 130, angle: 64, depth: 20, lip: 24, thickness: 10, cableNotch: false,
    filamentGrams: 135, printMinutes: 190, costUSD: '2.70', supports: 'None (Support-Free)',
    description: 'Reinforced ultra-wide tablet stand for the 14.6-inch Galaxy Tab S9 Ultra.'
  },
  {
    slug: 'microsoft-surface-pro-11',
    name: 'Microsoft Surface Pro 11 (Copilot+)',
    category: 'Tablets',
    width: 135, height: 120, angle: 66, depth: 20, lip: 22, thickness: 9, cableNotch: false,
    filamentGrams: 108, printMinutes: 155, costUSD: '2.16', supports: 'None (Support-Free)',
    description: 'Desktop workstation stand for Surface Pro 11 with keyboard attached.'
  },
  {
    slug: 'kindle-paperwhite-11',
    name: 'Kindle Paperwhite (11th Gen)',
    category: 'E-Readers',
    width: 95, height: 90, angle: 70, depth: 16, lip: 18, thickness: 6, cableNotch: false,
    filamentGrams: 56, printMinutes: 80, costUSD: '1.12', supports: 'None (Support-Free)',
    description: 'Hands-free reading easel for 6.8-inch Kindle Paperwhite.'
  },
  {
    slug: 'kindle-oasis',
    name: 'Kindle Oasis',
    category: 'E-Readers',
    width: 100, height: 92, angle: 70, depth: 16, lip: 18, thickness: 7, cableNotch: false,
    filamentGrams: 60, printMinutes: 85, costUSD: '1.20', supports: 'None (Support-Free)',
    description: 'Asymmetric reading stand contoured for the Kindle Oasis rear ergonomic grip bump.'
  },
  {
    slug: 'game-boy-advance-original',
    name: 'Game Boy Advance (AGB-001)',
    category: 'Retro Gaming',
    width: 90, height: 75, angle: 68, depth: 26, lip: 18, thickness: 7, cableNotch: false,
    filamentGrams: 58, printMinutes: 85, costUSD: '1.16', supports: 'None (Support-Free)',
    description: 'Retro collector display stand for the classic horizontal Game Boy Advance.'
  },
  {
    slug: 'game-boy-advance-sp',
    name: 'Game Boy Advance SP',
    category: 'Retro Gaming',
    width: 82, height: 75, angle: 70, depth: 25, lip: 18, thickness: 7, cableNotch: false,
    filamentGrams: 52, printMinutes: 75, costUSD: '1.04', supports: 'None (Support-Free)',
    description: 'Clamshell display dock for the iconic Game Boy Advance SP (open or closed).'
  },
  {
    slug: 'game-boy-color',
    name: 'Game Boy Color (CGB-001)',
    category: 'Retro Gaming',
    width: 80, height: 78, angle: 70, depth: 28, lip: 18, thickness: 7, cableNotch: false,
    filamentGrams: 54, printMinutes: 78, costUSD: '1.08', supports: 'None (Support-Free)',
    description: 'Nostalgic vertical shelf display stand for Nintendo Game Boy Color.'
  },
  {
    slug: 'nintendo-3ds-xl',
    name: 'New Nintendo 3DS XL',
    category: 'Retro Gaming',
    width: 105, height: 85, angle: 68, depth: 24, lip: 18, thickness: 7, cableNotch: false,
    filamentGrams: 68, printMinutes: 98, costUSD: '1.36', supports: 'None (Support-Free)',
    description: 'Shelf display stand for the New Nintendo 3DS XL.'
  },
  {
    slug: 'nintendo-2ds-xl',
    name: 'New Nintendo 2DS XL',
    category: 'Retro Gaming',
    width: 102, height: 82, angle: 68, depth: 22, lip: 18, thickness: 7, cableNotch: false,
    filamentGrams: 64, printMinutes: 92, costUSD: '1.28', supports: 'None (Support-Free)',
    description: 'Custom cradle for the New Nintendo 2DS XL.'
  },
  {
    slug: 'digital-caliper-stand',
    name: 'Digital Vernier Caliper Desk Stand',
    category: 'Workshop Tools',
    width: 55, height: 85, angle: 75, depth: 18, lip: 20, thickness: 7, cableNotch: false,
    filamentGrams: 46, printMinutes: 65, costUSD: '0.92', supports: 'None (Support-Free)',
    description: 'Precision workshop holder to keep digital calipers safe and upright on your 3D printing workbench.'
  },
  {
    slug: 'soldering-iron-stand',
    name: 'TS100 / TS101 / Pinecil Soldering Stand',
    category: 'Workshop Tools',
    width: 65, height: 75, angle: 65, depth: 22, lip: 18, thickness: 8, cableNotch: false,
    filamentGrams: 55, printMinutes: 80, costUSD: '1.10', supports: 'None (Support-Free)',
    description: 'Heat-resistant tool rest and holder for portable soldering irons (TS100, TS101, Pinecil).'
  },
  {
    slug: 'under-desk-headphone-mount',
    name: 'Under-Desk Dual Headphone Mount',
    category: 'Desk Organization',
    width: 60, height: 95, angle: 85, depth: 40, lip: 16, thickness: 8, cableNotch: true,
    filamentGrams: 75, printMinutes: 110, costUSD: '1.50', supports: 'None (Support-Free)',
    description: 'Heavy-duty clamp and screw mount to suspend audiophile and gaming headphones under any desk.'
  },
  {
    slug: 'apple-watch-phone-dock',
    name: 'Apple Watch & iPhone Bedside Nightstand Dock',
    category: 'Desk Organization',
    width: 90, height: 80, angle: 75, depth: 20, lip: 18, thickness: 7, cableNotch: true,
    filamentGrams: 68, printMinutes: 98, costUSD: '1.36', supports: 'None (Support-Free)',
    description: 'Dual charging dock holding an iPhone in StandBy mode alongside a magnetic Apple Watch charging puck.'
  }
];

// Save JSON database
fs.writeFileSync(
  path.join(__dirname, '../data/devices.json'),
  JSON.stringify(devices, null, 2)
);
console.log(`Saved ${devices.length} devices to data/devices.json`);

// HTML generator for static programmatic pages
function generatePageHTML(d) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${d.name} Stand (3D Printable STL) - PrintForge Studio</title>
  <meta name="description" content="Download free 3D printable ${d.name} stand STL file. Pre-configured for Bambu Lab, Prusa, and Ender 3D printers with zero supports required.">
  <link rel="canonical" href="https://gabrielkhenrique.github.io/printforge-studio/stand/${d.slug}/">
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; background-color: #08090C; color: #f8fafc; }
    .mono { font-family: 'JetBrains Mono', monospace; }
    .glass-card { background: rgba(30, 41, 59, 0.55); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.08); }
  </style>

  <!-- Google Schema.org 3DModel & Product Rich Snippets -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": "https://gabrielkhenrique.github.io/printforge-studio/stand/${d.slug}#product",
        "name": "${d.name} Stand (3D Printable)",
        "description": "${d.description}",
        "sku": "PFS-${d.slug.toUpperCase()}",
        "category": "3D Models > ${d.category}",
        "brand": { "@type": "Brand", "name": "PrintForge Studio" },
        "offers": {
          "@type": "Offer",
          "price": "0.00",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock",
          "url": "https://gabrielkhenrique.github.io/printforge-studio/stand/${d.slug}/"
        },
        "subjectOf": {
          "@type": "3DModel",
          "name": "${d.name} Stand 3D Mesh",
          "encoding": [
            {
              "@type": "MediaObject",
              "contentUrl": "https://gabrielkhenrique.github.io/printforge-studio/stand/${d.slug}/${d.slug}.stl",
              "encodingFormat": "model/stl",
              "description": "Watertight binary STL mesh for slicer import"
            }
          ]
        },
        "additionalProperty": [
          { "@type": "PropertyValue", "name": "Filament Weight", "value": "${d.filamentGrams}g PLA" },
          { "@type": "PropertyValue", "name": "Print Time", "value": "${d.printMinutes} minutes" },
          { "@type": "PropertyValue", "name": "Supports", "value": "${d.supports}" }
        ]
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "PrintForge Studio", "item": "https://gabrielkhenrique.github.io/printforge-studio/" },
          { "@type": "ListItem", "position": 2, "name": "${d.category}", "item": "https://gabrielkhenrique.github.io/printforge-studio/" },
          { "@type": "ListItem", "position": 3, "name": "${d.name} Stand", "item": "https://gabrielkhenrique.github.io/printforge-studio/stand/${d.slug}/" }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Do I need supports to 3D print this ${d.name} stand?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No. The geometry is parametrically engineered with an optimal self-supporting ${d.angle}-degree backrest angle, printing 100% support-free on all modern FDM 3D printers."
            }
          },
          {
            "@type": "Question",
            "name": "Can I charge the ${d.name} while resting on the stand?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "${d.cableNotch ? 'Yes, this model includes an integrated centered USB-C cable pass-through channel in the cradle floor.' : 'This model is engineered for slim wireless display orientation.'}"
            }
          }
        ]
      }
    ]
  }
  </script>
</head>
<body class="min-h-screen flex flex-col justify-between p-4 md:p-8">

  <!-- Header -->
  <header class="max-w-4xl mx-auto w-full flex items-center justify-between pb-6 border-b border-white/[0.08]">
    <a href="../../index.html" class="flex items-center gap-2.5 text-white hover:opacity-80 transition">
      <div class="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-cyan-400 flex items-center justify-center font-bold text-xs shadow-lg">PF</div>
      <span class="font-bold text-sm tracking-tight">PrintForge Studio</span>
    </a>
    <a href="../../index.html" class="text-xs bg-slate-900 hover:bg-slate-800 border border-white/[0.08] px-3.5 py-1.5 rounded-lg text-slate-300 font-medium transition">
      Open 3D CAD Studio &rarr;
    </a>
  </header>

  <!-- Hero Content -->
  <main class="max-w-4xl mx-auto w-full py-8 space-y-8">
    
    <!-- Breadcrumb -->
    <nav class="text-xs text-slate-500 flex items-center gap-2">
      <a href="../../index.html" class="hover:text-slate-300">Home</a>
      <span>/</span>
      <span>${d.category}</span>
      <span>/</span>
      <span class="text-indigo-400 font-medium">${d.name}</span>
    </nav>

    <!-- Title & Specs -->
    <div class="space-y-3">
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold mono">
        <span>✓ 100% Support-Free FDM Geometry</span>
      </div>
      <h1 class="text-2xl md:text-3xl font-extrabold text-white tracking-tight">${d.name} Desktop Stand</h1>
      <p class="text-sm text-slate-400 max-w-2xl leading-relaxed">${d.description}</p>
    </div>

    <!-- Quick Action Card Cluster -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      
      <!-- Action 1: Free STL Download & Studio Customizer -->
      <div class="glass-card p-6 rounded-2xl space-y-4 flex flex-col justify-between">
        <div class="space-y-2">
          <div class="text-xs font-bold text-indigo-300 uppercase tracking-wider mono">3D Printable Model</div>
          <h2 class="text-base font-bold text-white">Free Watertight .STL File</h2>
          <p class="text-xs text-slate-400">Pre-calibrated for Bambu Lab, Prusa, Creality, and Voron printers.</p>
        </div>
        <div class="space-y-2 pt-2">
          <a href="../../index.html?device=${d.slug}" class="w-full bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-xs py-3 rounded-xl shadow-lg shadow-indigo-600/25 transition flex items-center justify-center gap-2">
            <span>⚡ Open & Customize in 3D Studio</span>
          </a>
          <div class="text-center text-[11px] text-slate-500 mono">Instant client-side STL export • No signup required</div>
        </div>
      </div>

      <!-- Action 2: Physical Print Order -->
      <div class="glass-card p-6 rounded-2xl space-y-4 flex flex-col justify-between border-indigo-500/30 bg-gradient-to-br from-indigo-950/20 via-slate-900/60 to-slate-900/80">
        <div class="space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-emerald-400 uppercase tracking-wider mono">Don't Have a 3D Printer?</span>
            <span class="text-sm font-extrabold text-emerald-400">$18.99</span>
          </div>
          <h2 class="text-base font-bold text-white">Order Physical Print</h2>
          <p class="text-xs text-slate-400">Manufactured in Matte Black PLA+ on a Bambu Lab printer with free USPS shipping.</p>
        </div>
        <a href="mailto:gabrielrick1990@gmail.com?subject=PrintForge Order: ${encodeURIComponent(d.name + ' Stand')}&body=Hi Gabriel, I would like to order a physical print of the ${encodeURIComponent(d.name + ' Stand')}.%0A%0ASpecifications:%0A- Device: ${encodeURIComponent(d.name)}%0A- Color: Matte Black PLA+%0A- Price: $18.99 (Free Shipping)%0A%0AShipping Address:%0A[Your Name]%0A[Your Address]" class="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs py-3 rounded-xl shadow-lg shadow-emerald-600/20 transition flex items-center justify-center gap-2">
          <span>📦 Order It Printed ($18.99) &rarr;</span>
        </a>
      </div>

    </div>

    <!-- Slicer Telemetry Audit Table -->
    <div class="glass-card p-6 rounded-2xl space-y-4">
      <h3 class="text-xs font-bold uppercase tracking-wider text-slate-400 mono">Bambu Lab & Prusa Slicer Telemetry</h3>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs mono">
        <div class="bg-slate-900/80 p-3 rounded-xl border border-white/[0.06]">
          <span class="text-slate-500 block text-[10px]">Filament Weight</span>
          <span class="text-emerald-400 font-bold text-sm">~${d.filamentGrams}g PLA</span>
        </div>
        <div class="bg-slate-900/80 p-3 rounded-xl border border-white/[0.06]">
          <span class="text-slate-500 block text-[10px]">Est. Print Time</span>
          <span class="text-cyan-400 font-bold text-sm">${Math.floor(d.printMinutes / 60)}h ${d.printMinutes % 60}m</span>
        </div>
        <div class="bg-slate-900/80 p-3 rounded-xl border border-white/[0.06]">
          <span class="text-slate-500 block text-[10px]">Material Cost</span>
          <span class="text-slate-200 font-bold text-sm">~$${d.costUSD} USD</span>
        </div>
        <div class="bg-slate-900/80 p-3 rounded-xl border border-white/[0.06]">
          <span class="text-slate-500 block text-[10px]">Supports</span>
          <span class="text-emerald-400 font-bold text-sm">0% (Zero waste)</span>
        </div>
      </div>
      <div class="text-[11px] text-slate-400 leading-normal pt-2 border-t border-white/[0.06]">
        <strong>Recommended Slicer Settings:</strong> 0.20mm Standard layer height, 3 wall loops (perimeters), 15% Gyroid infill. Oriented standing flat on bottom base.
      </div>
    </div>

    <!-- FAQ Accordion -->
    <div class="glass-card p-6 rounded-2xl space-y-4">
      <h3 class="text-xs font-bold uppercase tracking-wider text-slate-400 mono">Frequently Asked Questions</h3>
      <div class="space-y-3 text-xs">
        <div class="space-y-1">
          <div class="font-bold text-slate-200">Will this tip over backwards?</div>
          <p class="text-slate-400 leading-relaxed">No. PrintForge Studio calculates center of gravity dynamically and extends an anti-tip stabilizer foot at the rear of the base.</p>
        </div>
        <div class="space-y-1">
          <div class="font-bold text-slate-200">Can I adjust the angle or slot thickness?</div>
          <p class="text-slate-400 leading-relaxed">Yes! Click "Open & Customize in 3D Studio" to tweak the width, slot depth, wall thickness, and rest angle with live 3D preview.</p>
        </div>
      </div>
    </div>

  </main>

  <!-- Footer -->
  <footer class="max-w-4xl mx-auto w-full pt-6 border-t border-white/[0.08] text-center text-xs text-slate-500 mono">
    PrintForge Studio • 100% Free Parametric 3D CAD & AI Copilot for 3D Printing
  </footer>

</body>
</html>`;
}

// Generate each device page
devices.forEach(d => {
  const dir = path.join(__dirname, '../stand', d.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), generatePageHTML(d));
});
console.log(`Successfully generated ${devices.length} programmatic SEO landing pages in stand/*/index.html`);

// Generate sitemap.xml
const sitemapXML = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://gabrielkhenrique.github.io/printforge-studio/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
${devices.map(d => `  <url>
    <loc>https://gabrielkhenrique.github.io/printforge-studio/stand/${d.slug}/</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n')}
</urlset>`;

fs.writeFileSync(path.join(__dirname, '../sitemap.xml'), sitemapXML);
console.log('Generated sitemap.xml with 51 total URLs');
