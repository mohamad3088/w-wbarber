# W&W Barber Shop — website

Statische site (HTML/CSS/JS, geen build). Upload de map naar eender welke host
(Netlify, Vercel, Cloudflare Pages, gewone webhosting). Uploaden: `index.html`, `styles.css`, `script.js` en de map `assets/`.
`_originelen/` en `.claude/` hoeven niet mee.

Lokaal bekijken: `python -m http.server 5173` → http://localhost:5173

## Echt (van Instagram / Google Maps)
- Adres, telefoon, openingsuren, 4,9★ / 192 reviews, 9,5K volgers, review-quotes, alle foto's.

## Nog te bevestigen met de eigenaar
- **Prijzen en duur**: indicatief ingevuld. Aanpassen in `index.html` (sectie *Diensten*) én in `SERVICES` bovenaan `script.js`.
- **"Het W&W Ritueel"**: voorgestelde combo-formule.
- **Domein**: `canonical` in `index.html` staat op `wwbarbershop.be` (placeholder).
- Openingsuren wijzigen? `HOURS` in `script.js` + de tabel in `index.html` + het JSON-LD-blok bovenaan.

## Features
- Reserveren via WhatsApp: formulier met dienst/datum/tijdslot (alleen binnen de openingsuren), opent een ingevuld WhatsApp-bericht naar +32 460 96 85 33. Er zijn geen server of kosten nodig.
- Live status "Nu open / Gesloten", gerekend in Brusselse tijd. De dag van vandaag wordt in de openingsuren gemarkeerd.
- NL / EN-schakelaar.
- Mobiele actiebalk (Bel · Route · Reserveer), lightbox-galerij, reviews-carousel, Google Maps.
- SEO: meta-tags, Open Graph en schema.org `BarberShop`-gegevens (sterren, uren, adres) voor Google.
- Houdt rekening met `prefers-reduced-motion`. De afbeeldingen zijn geoptimaliseerd (±3,4 MB in totaal, lazy-loaded).

Na een update aan CSS/JS: verhoog `?v=4` in `index.html` zodat bezoekers niet de oude cache zien.
