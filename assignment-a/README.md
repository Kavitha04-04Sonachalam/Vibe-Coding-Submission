# Vibe UPI Payment Demo

This project demonstrates a simple UPI deep-link payment flow (INR 1.00) and includes a local SMS-confirmation simulator for testing.

Live demo
- If you've deployed to Vercel/Netlify/etc., open that URL on a mobile device and click "Pay via UPI" to launch an installed UPI app (GPay/PhonePe/BHIM).

Files
- `index.html` — UI: order summary, Pay via UPI, debug helpers.
- `script.js` — UPI deep-link generator (upi://pay) and SMS parsing/simulation helpers.
- `README.md` — This file.

How the UPI deep-link works
- The page builds a UPI link in this format: `upi://pay?pa=<vpa>&pn=<name>&am=<amount>&cu=INR&tn=<orderId>`
- Example: `upi://pay?pa=merchant@bank&pn=MerchantName&am=1.00&cu=INR&tn=ORDER12345`

How to test
1. Open the hosted URL on a mobile device (or open `index.html` directly on your phone).
2. Confirm the payee VPA and click "Pay via UPI". The page uses INR 1.00 by default.
3. Your phone should offer UPI apps to complete the payment. Complete it in your UPI app.

Confirmation (mechanisms)

1) Server-side reconciliation (recommended)

- Flow (high level):
  1. Your backend creates an order and returns an `orderId`.
  2. Client opens UPI link including `tn=orderId` so the transaction contains a reference you can match.
  3. When the PSP/bank credits your account, it will either send a webhook to your backend or you can poll the PSP reconciliation API to verify the incoming credit.
  4. Backend marks the order `paid` only after matching amount + orderId/txn reference.

- Example webhook simulation (curl):

  Simulate a PSP/bank webhook to mark order paid (replace `order-123`):

  ```powershell
  curl -X POST http://localhost:3000/webhook -H "Content-Type: application/json" -d '{"orderId":"order-123","amount":"1.00","status":"SUCCESS","txnId":"TXN98765"}'
  ```

  A real PSP webhook will include authentication (HMAC/secret) — validate that before updating state.

2) SMS-based confirmation (optional / bonus)

- Android app can read incoming SMS messages (requires user permission READ_SMS) and POST parsed confirmations to your backend.
- SMS Retriever / User Consent APIs are alternatives but require sender cooperation (usually not feasible for bank messages).
- Risks: privacy concerns and Play Store policy restrictions. Prefer server-side reconciliation for production.

3) Semi-manual / demo approach (acceptable for assignment submission)

- Provide a simulator or instructions for a human to paste the received SMS into the page (this repo includes an SMS-simulation textarea + parser).

References
- SuperLabs guide on direct UPI integration (useful reference): https://blog.superlabs.co/direct-upi-integration/

Notes on security and production readiness
- Always verify payments server-side. Client-side indications (like returning from a UPI app) are not proof of payment.
- Authenticate and validate webhooks (HMAC, signatures) before updating order status.
- If building an SMS-reading Android app, document and request permissions responsibly and ensure compliance with store policies.

Submission checklist
- [x] Hosted project URL (Vercel / Netlify / GitHub Pages).
- [x] GitHub repo with code and README.
- [x] Order summary + Pay via UPI button + INR 1.00 deep-link.
- [x] Mechanism or documented plan for payment confirmation (this README + server-side recommendation). 
- [ ] Optional: Automatic SMS confirmation (bonus).

License: MIT
<<<<<<< HEAD
Vibe UPI Payment Demo
=====================

This small project demonstrates a UPI deep-link payment flow (INR 1.00) and includes a local SMS-confirmation simulator to help test automatic confirmation flows.

Files
- `index.html` — Simple UI: order summary, Pay via UPI button, SMS parsing helpers.
- `script.js` — Builds UPI deep-links (upi://pay) and contains SMS parsing/simulation helpers.

How to test locally
1. Open `index.html` in a browser on your phone OR host the folder on a static host (Vercel, Netlify, GitHub Pages).
2. On the page, confirm UPI ID (default `merchant@upi`) and click "Pay via UPI". This opens an installed UPI app (GPay/PhonePe/BHIM) on mobile.
3. Complete the payment in the UPI app for INR 1.00.

If you open the page on desktop, the page will show the UPI deep-link; copy it to your phone and open it there.

Payment confirmation approaches

1) Polling / Server-side reconciliation (recommended for production)
 - After creating an order and redirecting the user to UPI, keep the order in your backend in "pending" state.
 - Use the payment provider's webhook or reconciliation API (for example, your acquiring bank / PSP) to verify incoming credits for your merchant VPA or account.
 - If the PSP provides a transaction reference (merchant order id) include it in the UPI `tn` parameter so you can match callbacks.

2) SMS-based confirmation (bonus / optional)
 - On Android, it's possible to read incoming SMS messages if the app has the user's permission (READ_SMS) or using the SMS Retriever API from Google for limited verification flows.
 - Approach A (full SMS read): Build an Android app that requests SMS read permissions and looks for incoming messages indicating a credit to your account. Parse the amount and transaction reference and call your backend to mark the order paid.
 - Approach B (SMS Retriever / OTP-style): Use the SMS Retriever API to securely get messages that contain an app-specific hash. This is intended for OTPs, not general bank messages, so it may not work for UPI credits unless the sender cooperates.

Limitations and security
- UPI deep-link only launches the UPI app; it does not guarantee payment completion. You must verify the payment server-side.
- Reading SMS requires explicit mobile app permissions and careful privacy handling. For production, prefer bank/PSP reconciliation or webhooks.

What I implemented
- Frontend UPI deep-link generator (amount INR 1.00).
- Intent-based link for Android browsers.
- SMS parsing and simulator for local testing.

Optional next steps
- Add a minimal backend (Node/Express or Firebase Function) to create/record orders and poll or receive webhook callbacks.
- Create a tiny Android companion app to auto-read SMS and call the backend to confirm payment (requires Play Store policy, user consent).

License: MIT
=======
# Vibe-Coding
>>>>>>> ea2d64b7e62aed35d80fa6810b95dc5685626408
