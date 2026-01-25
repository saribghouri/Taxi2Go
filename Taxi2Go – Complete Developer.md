Taxi2Go – Complete Developer
Documentation (Go + Flutter)
This document is the authoritative A–Z technical blueprint for building Taxi2Go using Go
(backend) and Flutter (frontend).
It defines UX flow, APIs, database, pricing logic, maps, tolls, payments, SMS, admin
controls, and future extensibility. This document must be followed strictly to avoid logic gaps
and rework.
Frontend website already exists:
● Public Website: https://taxi2-go.vercel.app/
1. Product Definition (What Taxi2Go Is)
Taxi2Go is a guest-based taxi booking platform.
● No passenger login or accounts
● One-time guest booking
● Real-time fare calculation
● Admin-only dashboard
● Stripe payments
● Twilio SMS alerts
Taxi2Go acts as a booking + pricing engine, later connectable to Captain Taxis or any
dispatcher.
2. Technology Stack (Locked)
Frontend
● Flutter (Web + Mobile)
● Google Maps SDK
● Google Places Autocomplete
Backend
● Go (Golang)
● Gin / Fiber framework
● REST APIs
Services
● Google Routes API (distance + tolls)
● Stripe Checkout
● Twilio SMS
Database
● PostgreSQL or MySQL
3. Complete User Booking Flow (UX Logic)
Step 1: Pickup & Drop-off (Entry Gate)
Visible Fields Initially:
● Pickup location (Google Places)
● Drop-off location (Google Places)
➡️ Only after BOTH are filled, the rest of the form becomes visible.
Step 2: Map Preview & Route Info (Auto)
Once pickup & drop-off are entered:
System must display:
● Live Google Map
● Route from A → B
● Total distance (KM)
● Estimated travel time (ETA)
● Toll roads highlighted (if any)
Map updates dynamically if locations change.
Step 3: Ride Options (Expandable Section)
Fields:
● Pickup time:
○ Now
○ Schedule later (date + time picker)
● Extra options (icon based):
○ Child seat
○ Wheelchair access
● Special requirements (textarea)
Step 4: Vehicle Selection (With Pricing)
Each vehicle card must show:
● Vehicle type (Sedan / SUV / Van)
● Passenger capacity
● Luggage capacity
● Total distance (KM)
● Base fare
● Toll fees
● Airport surcharge (if applicable)
● Final total price (live)
Price updates instantly per vehicle.
Step 5: Passenger Details (Guest)
Fields:
● Full name
● Phone number
● Email address
No login, OTP for cash ride only.
Step 6: Payment
● Card payment via Stripe Checkout
● Optional cash toggle (OTP needed for cash ride)
On success → booking confirmed.
4. Fare Calculation Engine (Core Logic)
Base Formula
Base Fare = Distance (KM) × Fare Per KM
Total Fare = Base Fare + Toll Fees + Airport Surcharge
Default Values
● Fare per KM: $2.80
● Sydney Airport surcharge: $5.00
All values must be editable from admin dashboard.
5. Sydney Airport Detection Logic
If pickup OR drop-off contains:
● "Sydney Airport"
● OR Place ID matches airport
Then:
Airport Surcharge = $5.00
Stored as a separate field in booking.
6. Google Maps & Tolls Integration
Required APIs
● Routes API
● Places API
● Maps SDK
Routes API Request
POST https://routes.googleapis.com/directions/v2:computeRoutes
Payload:
{
"origin": { "address": "PICKUP" },
"destination": { "address": "DROPOFF" },
"travelMode": "DRIVE",
"routingPreference": "TRAFFIC_AWARE",
"routeModifiers": { "avoidTolls": false },
"extraComputations": ["TOLLS", "DISTANCE"]
}
Extracted Data
● Distance (meters → KM)
● Estimated duration (seconds → minutes)
● Toll amount (AUD)
Sydney toll roads supported (M2, M4, M5, M7, tunnels).
7. Backend API Design (Go)
Calculate Fare API
POST /api/fare/calculate
Input:
● pickup
● dropoff
● vehicle_type
Output:
● distance_km
● duration_minutes
● base_fare
● toll_amount
● airport_surcharge
● total_fare
Create Booking API
POST /api/booking/create
Actions:
● Save passenger
● Save booking
● Create Stripe Checkout session
Returns:
● Stripe checkout URL
8. Database Schema
Passengers
● id
● full_name
● phone
● email
● created_at
Bookings
● id
● passenger_id
● pickup_address
● dropoff_address
● pickup_time
● distance_km
● duration_minutes
● fare_per_km
● base_fare
● toll_amount
● airport_surcharge
● total_fare
● vehicle_type
● child_seat (bool)
● wheelchair (bool)
● special_requirements
● payment_status
● booking_status
● stripe_payment_id
● created_at
Admin Settings
● fare_per_km
● airport_surcharge
● admin_phone
9. Stripe Integration
● Stripe Checkout (hosted)
● Webhook verification mandatory
Events:
● checkout.session.completed
On success:
● Mark booking as PAID
● Trigger SMS
10. Twilio SMS Logic
Triggered when:
● Booking is created AND paid
SMS content:
🚕 Taxi2Go – New Booking
Pickup: {{pickup}}
Drop: {{dropoff}}
KM: {{distance}}
ETA: {{duration}} mins
Fare: ${{total}}
11. Admin Dashboard (Internal)
Admin Can:
● View bookings
● Edit fare per KM
● Edit airport surcharge
● View payment status
● Export CSV
No passenger access.
12. Security & Compliance
● Google API key restricted by IP
● Stripe keys server-side only
● HTTPS mandatory
● Webhook signature verification
13. Deployment Checklist
● Go services deployed
● Flutter frontend connected
● Environment variables set
● Stripe webhooks live
● Twilio SMS tested
END OF DOCUMENT