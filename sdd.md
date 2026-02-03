Blocrail Phase 1 - Implementation Plan
Overview
This implementation plan outlines the complete development of Blocrail Phase 1: a live-commerce payment and escrow infrastructure platform. This phase focuses on enabling sellers who stream on external platforms (Instagram, TikTok, Facebook) to generate secure checkout links, process payments through escrow, and manage orders with risk-based payout logic.

Key Objectives:

Build a production-ready Laravel 11 + Vue 3 application
Implement secure escrow-based payment processing with Paystack
Create a risk-tier payout system with automated fund release logic
Develop a comprehensive dispute resolution system
Ensure scalability and modularity for future streaming integration
User Review Required
IMPORTANT

Architecture Decision: Service Layer Pattern

We will implement a service-layer architecture with repository pattern for business logic separation. This ensures:

Clean separation of concerns
Testable business logic This implementation plan outlines the complete development of Blocrail Phase 1: a live-commerce payment and escrow infrastructure platform. This phase focuses on enabling sellers who stream on external platforms (Instagram, TikTok, Facebook) to generate secure checkout links, process payments through escrow, and manage orders with risk-based payout logic.
The goal is to provide a "Checkout-as-a-Service" API and dashboard that eliminates payment friction and fraud in social selling.

Project Status
Project Name: Blocrail
Current Phase: Phase 0 (Landing Page) & Phase 1 (Core Infrastructure)
Primary Tech: Laravel 11, Vue 3, TailwindCSS, Paystack API, MySQL
Architecture Decisions
1. Service Layer Pattern
We will use the Service Layer Pattern to encapsulate business logic. This keeps controllers thin and allows for easier testing and reuse (e.g., in API, Web, or Console commands).

app/Services/EscrowService.php: Logic for holding and releasing funds.
app/Services/RiskEngineService.php: Logic for calculating seller risk and payout tiers.
app/Services/PaystackService.php
: Wrapper for Paystack API calls.
2. Event-Driven Payments
Payment verification will be handled via Webhooks and Events.

app/Events/PaymentVerified.php: Triggered when Paystack confirms successful transaction.
app/Listeners/UpdateOrderOnPayment.php: Updates the order status.
app/Listeners/CreditEscrowAccount.php: Places funds in the systemic escrow account.
3. Progressive Payout Schedulers
The risk engine will determine when a seller gets paid.

Tier 1 (New): T+7 days after delivery confirmation.
Tier 2 (Trusted): T+3 days after delivery confirmation.
Tier 3 (Enterprise): Instant release upon delivery.
Module Breakdown
Phase 0: Landing Page (Marketing Site)
NOTE

Status: Completed Laravel integration. Hero, Header, and Problem sections are fully customized. Architecture: Laravel 11 + Vue 3 + Vite integration. Components reside in resources/js/components.

Positioning: Live Commerce Payment Infrastructure
Tone: Confident, Clean, Professional, Protective, Modern (More Stripe than TikTok)

[MODIFIED] 
App.vue
Orchestrates the landing page layout.
Integrates the new floating header and section components.
[NEW] 
HeaderSection.vue
Contemporary "island" design, detached from page edges.
Glassmorphic style with sticky scroll effects and rounded corners.
Fully responsive mobile menu.
Vue 3 Landing Page - Main Component Structure:

.btn-secondary:hover { background: rgba(139, 92, 246, 0.1); border-color: var(--purple-400); box-shadow: 0 0 20px rgba(139, 92, 246, 0.3); }

**Glassmorphism Cards:**
```css
.glass-card {
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: 1px solid var(--glass-border);
  border-radius: 1.5rem;
  padding: 2rem;
  transition: all 0.3s ease;
}
.glass-card:hover {
  background: rgba(26, 27, 46, 0.8);
  border-color: var(--border-glow);
  transform: translateY(-4px);
  box-shadow: 0 20px 60px rgba(139, 92, 246, 0.2);
}
/* Feature Card with Icon */
.feature-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-subtle);
  border-radius: 1.25rem;
  padding: 2.5rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}
.feature-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--gradient-purple);
  opacity: 0;
  transition: opacity 0.3s ease;
}
.feature-card:hover::before {
  opacity: 1;
}
.feature-card:hover {
  background: var(--bg-tertiary);
  border-color: var(--border-glow);
  transform: translateY(-4px);
}
Background Effects:

/* Grid Pattern Background */
.bg-grid {
  background-image: 
    linear-gradient(rgba(139, 92, 246, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(139, 92, 246, 0.05) 1px, transparent 1px);
  background-size: 50px 50px;
}
/* Gradient Orb Effects */
.gradient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.3;
  pointer-events: none;
}
.orb-purple {
  background: radial-gradient(circle, #8B5CF6 0%, transparent 70%);
  width: 500px;
  height: 500px;
}
.orb-pink {
  background: radial-gradient(circle, #EC4899 0%, transparent 70%);
  width: 400px;
  height: 400px;
}
Animations:

/* Fade In on Scroll */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in {
  animation: fadeInUp 0.6s ease-out forwards;
}
/* Glow Pulse Animation */
@keyframes glowPulse {
  0%, 100% {
    box-shadow: 0 0 20px rgba(139, 92, 246, 0.3);
  }
  50% {
    box-shadow: 0 0 40px rgba(139, 92, 246, 0.6);
  }
}
.glow-pulse {
  animation: glowPulse 2s ease-in-out infinite;
}
/* Floating Animation */
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}
.float-animation {
  animation: float 3s ease-in-out infinite;
}
Special Effects:

/* Code Block Style (for dashboard mockups) */
.code-block {
  background: #1E1E2E;
  border: 1px solid rgba(139, 92, 246, 0.2);
  border-radius: 1rem;
  padding: 1.5rem;
  font-family: 'Fira Code', monospace;
  font-size: 0.875rem;
  color: #E5E7EB;
  overflow-x: auto;
}
/* Gradient Text */
.gradient-text {
  background: var(--gradient-purple);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
/* Glowing Border */
.glow-border {
  position: relative;
  border: 2px solid transparent;
  background: var(--bg-secondary);
  background-clip: padding-box;
}
.glow-border::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 2px;
  background: var(--gradient-purple);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
}
Design Requirements
IMPORTANT

Dark Modern Theme - Visual Excellence Mandatory

The landing page must match the dark, modern SaaS aesthetic from the reference design:

Dark background (#0A0B14) with subtle grid patterns
Purple/violet accents (#8B5CF6) for CTAs and highlights
Glassmorphism effects on cards with backdrop blur
Gradient backgrounds (purple to pink) on key elements
Glowing effects on buttons and interactive elements
Floating gradient orbs for ambient background effects
Modern typography (Space Grotesk for headings, Inter for body)
Dashboard mockups with code-style blocks
Mobile-first responsive design
Load time < 2 seconds
Key Design Principles:

Dark & Premium: Deep dark backgrounds with vibrant purple accents create a modern, professional feel
Glassmorphism: Use frosted glass effects on cards for depth and sophistication
Glow & Gradients: Purple glowing effects on hover, gradient buttons and text
Trust-First: Security badges, clear escrow messaging, professional dashboard mockups
Mobile-Optimized: 60%+ of traffic will be mobile
Conversion-Focused: Clear purple gradient CTAs with glow effects
Performance: Optimized images, minimal JS, fast load despite visual richness
Accessibility: Ensure sufficient contrast with dark theme (WCAG AA)
Technology Stack for Landing Page
Core:

Vue 3 (Composition API)
TailwindCSS (compiled with PostCSS)
Vite (build tool for fast development)
Vue Router (for smooth scroll navigation)
Additional Libraries:

VueUse (for scroll animations, intersection observer)
Google Fonts (Space Grotesk, Inter)
Heroicons or Lucide Vue (for icons)
Build Setup: Vite + Vue 3 SPA served from Laravel public directory

Implementation Checklist
Vue Component Structure:

 Set up Vue 3 project with Vite
 Create main LandingPage.vue component
 Build reusable section components (Hero, Problem, Solution, etc.)
 Add meta tags via Vue Meta or useHead (SEO, Open Graph, Twitter Cards)
 Implement proper semantic HTML in templates
 Add accessibility attributes (aria-labels, alt text)
Styling:

 Set up TailwindCSS with Vue 3
 Configure tailwind.config.js with custom dark theme colors
 Implement typography system in Tailwind config
 Create reusable Vue components with scoped styles
 Build responsive grid layouts using Tailwind utilities
 Add hover effects and transitions with Tailwind classes
Interactivity (Vue Composition API):

 Smooth scroll navigation using Vue Router hash links
 Scroll-triggered animations using VueUse (useIntersectionObserver)
 CTA button interactions with Vue event handlers
 Mobile menu (hamburger) with Vue reactive state
 Form validation using VeeValidate or custom composables (if contact form added)
 Gradient orb animations using Vue transitions
Performance:

 Optimize images (WebP format, lazy loading)
 Minify CSS and JS
 Enable gzip compression
 Test load time (<2s target)
 Lighthouse score >90
Testing:

 Cross-browser testing (Chrome, Safari, Firefox)
 Mobile responsiveness (375px to 1920px)
 Accessibility audit (WCAG AA)
 CTA click tracking setup
 Analytics integration (Google Analytics)
Deployment
Hosting Options:

Static Hosting: Netlify, Vercel, GitHub Pages (recommended for speed)
Laravel Public Folder: Serve from /public directory
CDN: CloudFlare for global distribution
Domain Setup:

Primary: kwiqpay.com
Subdomain for app: app.kwiqpay.com (future)
SSL Certificate: Required (Let's Encrypt or hosting provider)

Phase 1: Core Application Development
Database Layer
[NEW] Database Migrations
Migration Files to Create:

create_users_table.php
Standard Laravel users table with additional fields
Fields: id, name, email, password, role (enum: seller, admin, support), email_verified_at, remember_token, timestamps
create_sellers_table.php
Seller profile and business information
Fields: id, user_id (FK), store_name, store_slug (unique), description, logo, bank_name, account_number, account_name, bvn (encrypted), risk_tier (enum: tier1, tier2, tier3), is_verified, timestamps
create_products_table.php
Product catalog with variant support
Fields: id, seller_id (FK), name, description, price (decimal), stock_quantity, variants (JSON), images (JSON), is_active, timestamps, soft_deletes
create_live_sessions_table.php
Live session checkout link generator
Fields: id, seller_id (FK), title, platform_type (enum: instagram, tiktok, facebook), session_token (unique), status (enum: scheduled, live, ended), start_time, end_time, stream_key (nullable, future), streaming_provider (nullable, future), playback_url (nullable, future), viewer_count (default 0, future), timestamps
create_live_session_products_table.php
Pivot table for session-product relationships
Fields: id, live_session_id (FK), product_id (FK), display_order, timestamps
create_orders_table.php
Order processing and tracking
Fields: id, seller_id (FK), live_session_id (FK, nullable), order_number (unique), buyer_name, buyer_phone, buyer_email (nullable), delivery_address (text), delivery_fee (decimal), subtotal (decimal), total_amount (decimal), payment_status (enum: pending, paid, failed, refunded), order_status (enum: pending, processing, dispatched, delivered, cancelled), escrow_status (enum: pending, held, released, refunded), risk_tier, payment_reference (unique), tracking_number (nullable), delivered_at (nullable), timestamps
create_order_items_table.php
Individual items within orders
Fields: id, order_id (FK), product_id (FK), product_name, product_price, quantity, variant_details (JSON, nullable), timestamps
create_escrow_accounts_table.php
Seller escrow balance tracking
Fields: id, seller_id (FK, unique), available_balance (decimal, default 0), pending_balance (decimal, default 0), reserve_balance (decimal, default 0), total_earned (decimal, default 0), total_withdrawn (decimal, default 0), timestamps
create_transactions_table.php
Double-entry ledger for all fund movements
Fields: id, seller_id (FK), order_id (FK, nullable), payout_id (FK, nullable), type (enum: payment, release, refund, fee, reserve, withdrawal), amount (decimal), balance_before (decimal), balance_after (decimal), reference (unique), description, metadata (JSON), timestamps
create_payouts_table.php
Withdrawal/payout tracking
Fields: id, seller_id (FK), amount (decimal), fee (decimal), net_amount (decimal), status (enum: pending, processing, completed, failed), provider_reference (nullable), bank_account, failure_reason (nullable), processed_at (nullable), timestamps
create_disputes_table.php
Buyer dispute management
Fields: id, order_id (FK), raised_by (buyer/seller), reason (enum: not_received, damaged, wrong_item, other), description (text), evidence (JSON), status (enum: open, under_review, resolved_refund, resolved_release), admin_notes (text, nullable), resolved_by (FK users, nullable), resolved_at (nullable), timestamps
create_risk_scores_table.php
Historical risk scoring for sellers
Fields: id, seller_id (FK), total_orders, successful_orders, disputed_orders, refunded_orders, chargeback_count, dispute_ratio (decimal), refund_ratio (decimal), avg_delivery_time_hours (decimal), calculated_tier (enum), calculated_at, timestamps
create_notifications_table.php
In-app notification system
Standard Laravel notifications table structure
create_settings_table.php
Platform configuration
Fields: id, key (unique), value (text), type (enum: string, integer, decimal, boolean, json), description, timestamps
Database Indexes:

Foreign keys on all relationship columns
Unique indexes on: sellers.store_slug, live_sessions.session_token, orders.order_number, orders.payment_reference
Composite indexes on: orders(seller_id, order_status), transactions(seller_id, type), disputes(order_id, status)
Core Infrastructure
[NEW] Service Layer Base Classes
app/Services/BaseService.php
Base service class with common functionality for all services.

app/Repositories/BaseRepository.php
Base repository pattern implementation for data access layer.

app/Traits/HasEscrowAccount.php
Trait for models that interact with escrow system.

Authentication & Authorization Module
[NEW] 
AuthController.php
register() - Seller registration with validation
login() - Sanctum token generation
logout() - Token revocation
me() - Get authenticated user details
[NEW] 
RegisterSellerRequest.php
Form request validation for seller registration.

[NEW] 
RoleMiddleware.php
Role-based access control middleware.

Seller Management Module
[NEW] 
SellerService.php
Business logic for seller operations:

createSellerProfile() - Create seller profile with store slug generation
updateBankDetails() - Update and encrypt bank information
getDashboardStats() - Calculate GMV, orders, payout stats
updateRiskTier() - Update seller tier based on risk score
[NEW] 
SellerController.php
store() - Create seller profile
update() - Update seller details
show() - Get seller profile
dashboard() - Get dashboard statistics
[NEW] 
Seller.php
Eloquent model with relationships and accessors.

Product Catalog Module
[NEW] 
ProductService.php
createProduct() - Create product with image upload
updateProduct() - Update product details
deleteProduct() - Soft delete product
updateStock() - Manage inventory
checkAvailability() - Validate stock before order
[NEW] 
ProductController.php
RESTful CRUD endpoints for products.

[NEW] 
Product.php
Model with variant casting and image handling.

Live Session Module
[NEW] 
LiveSessionService.php
createSession() - Generate unique session with token
attachProducts() - Link products to session
activateSession() - Set session to live
endSession() - Mark session as ended
getPublicSessionData() - Fetch session for checkout page
[NEW] 
LiveSessionController.php
store() - Create new live session
update() - Update session details
show() - Get session details
activate() - Start session
end() - End session
[NEW] 
PublicCheckoutController.php
show() - Display public checkout page by session token
[NEW] 
LiveSession.php
Model with token generation and product relationships.

Order Processing Module
[NEW] 
OrderService.php
createOrder() - Create order from checkout
updateOrderStatus() - Transition order states
markAsDelivered() - Confirm delivery and trigger release
calculateDeliveryFee() - Dynamic delivery calculation
[NEW] 
OrderController.php
store() - Create order and initiate payment
show() - Get order details
update() - Update order status
confirmDelivery() - Buyer confirms delivery
[NEW] 
Order.php
Model with status management and relationships.

Payment Integration Module
[NEW] 
PaymentService.php
Based on proven Paystack integration pattern from existing project.

Key Methods:

initializeTransaction(Order $order): array
Generate unique payment reference
Create Paystack payment initialization
Return authorization URL for frontend redirect
Set transaction expiry (15 minutes)
Log initialization for audit trail
Implementation Pattern:

public function initializeTransaction(Order $order): array
{
    $reference = $this->generateReference();
    
    $response = Http::withHeaders([
        'Authorization' => 'Bearer ' . config('paystack.secretKey'),
        'Content-Type' => 'application/json',
    ])->post(config('paystack.paymentUrl') . '/transaction/initialize', [
        'email' => $order->buyer_email ?? config('paystack.merchantEmail'),
        'amount' => $order->total_amount * 100, // Convert to kobo
        'reference' => $reference,
        'callback_url' => route('payment.callback'),
        'metadata' => [
            'order_id' => $order->id,
            'order_number' => $order->order_number,
            'seller_id' => $order->seller_id,
        ],
    ]);
    
    // Update order with payment reference
    $order->update(['payment_reference' => $reference]);
    
    return $response->json();
}
verifyTransaction(string $reference): array
Call Paystack verification endpoint
Validate response structure
Return standardized verification result
Handle API failures gracefully
Implementation Pattern:

public function verifyTransaction(string $reference): array
{
    $response = Http::withHeaders([
        'Authorization' => 'Bearer ' . config('paystack.secretKey'),
    ])->get(config('paystack.paymentUrl') . "/transaction/verify/{$reference}");
    
    if ($response->failed()) {
        throw new PaystackException('Failed to verify transaction');
    }
    
    $data = $response->json();
    
    return [
        'success' => $data['status'] ?? false,
        'data' => $data['data'] ?? null,
        'message' => $data['message'] ?? 'Unknown error',
    ];
}
processVerification(Order $order): array
Check if order can be verified (not already paid/failed)
Verify transaction with Paystack
Validate amount matches (critical security check)
Update order status based on Paystack response
Fire PaymentVerified event on success
Handle status: success, failed, abandoned, pending
Critical Amount Validation:

// Verify amount matches to prevent tampering
$expectedAmount = $order->total_amount * 100; // Convert to kobo
$paidAmount = $paystackData['amount'] ?? 0;
if ($paidAmount != $expectedAmount) {
    Log::error('Amount mismatch', [
        'order' => $order->order_number,
        'expected' => $expectedAmount,
        'paid' => $paidAmount,
    ]);
    
    $order->update(['payment_status' => 'failed']);
    return ['success' => false, 'message' => 'Amount mismatch detected'];
}
processWebhook(array $payload): bool
Validate webhook signature (critical security)
Check idempotency (prevent duplicate processing)
Extract payment reference
Process verification
Return success/failure
Webhook Signature Validation:

public function validateWebhookSignature(string $payload, string $signature): bool
{
    $hash = hash_hmac('sha512', $payload, config('paystack.webhookSecret'));
    return hash_equals($hash, $signature);
}
Idempotency Check:

// Prevent duplicate webhook processing
if ($order->payment_status === 'paid') {
    Log::info('Duplicate webhook ignored', ['reference' => $reference]);
    return true; // Return success to acknowledge webhook
}
generateReference(): string
Create unique transaction reference
Format: KWIQ-{timestamp}-{random}
Ensure uniqueness in database
[NEW] 
PaymentController.php
Endpoints:

initiate(Request $request)
public function initiate(Request $request)
{
    $order = Order::where('order_number', $request->order_number)->firstOrFail();
    
    if ($order->payment_status === 'paid') {
        return response()->json(['message' => 'Order already paid'], 400);
    }
    
    $result = $this->paymentService->initializeTransaction($order);
    
    return response()->json([
        'authorization_url' => $result['data']['authorization_url'],
        'reference' => $result['data']['reference'],
    ]);
}
callback(Request $request)
Handle Paystack redirect after payment
Extract reference from query params
Verify transaction
Redirect to success/failure page with status
verify(Request $request)
Frontend polling endpoint for payment status
Check order payment status
Return current status without calling Paystack (use cached status)
Support smart polling (max 60 attempts, 2-second intervals)
public function verify(Request $request)
{
    $order = Order::where('payment_reference', $request->reference)->firstOrFail();
    
    // If already paid, return immediately
    if ($order->payment_status === 'paid') {
        return response()->json([
            'status' => 'success',
            'message' => 'Payment verified',
            'order' => $order,
        ]);
    }
    
    // If still pending, verify with Paystack
    if ($order->payment_status === 'pending') {
        $result = $this->paymentService->processVerification($order);
        return response()->json($result);
    }
    
    return response()->json([
        'status' => $order->payment_status,
        'message' => 'Payment ' . $order->payment_status,
    ]);
}
webhook(Request $request)
public function webhook(Request $request)
{
    // Validate signature
    $signature = $request->header('X-Paystack-Signature');
    $payload = $request->getContent();
    
    if (!$this->paymentService->validateWebhookSignature($payload, $signature)) {
        Log::warning('Invalid webhook signature');
        return response()->json(['message' => 'Invalid signature'], 401);
    }
    
    $event = $request->input('event');
    
    if ($event === 'charge.success') {
        $reference = $request->input('data.reference');
        $order = Order::where('payment_reference', $reference)->first();
        
        if ($order) {
            $this->paymentService->processVerification($order);
        }
    }
    
    return response()->json(['message' => 'Webhook received'], 200);
}
[NEW] 
PaymentVerified.php
Event fired when payment is confirmed.

Payload:

class PaymentVerified
{
    public function __construct(
        public Order $order,
        public array $paystackData
    ) {}
}
[NEW] 
UpdateOrderOnPayment.php
Listener to update order status on payment.

Actions:

Update order status to "processing"
Update escrow status to "held"
Log payment transaction
Send confirmation email/SMS to buyer
Notify seller of new order
[NEW] 
CreditEscrowAccount.php
Listener to add funds to escrow on payment.

Actions:

Calculate platform fee
Credit seller's pending balance (total - fee)
Log escrow transaction
Create transaction record
Implementation:

public function handle(PaymentVerified $event)
{
    DB::transaction(function () use ($event) {
        $order = $event->order;
        $platformFee = $order->total_amount * (config('app.platform_fee_percentage') / 100);
        $sellerAmount = $order->total_amount - $platformFee;
        
        // Credit escrow pending balance
        $this->escrowService->creditPendingBalance(
            $order->seller_id,
            $sellerAmount,
            $order->id,
            'Payment received for order ' . $order->order_number
        );
        
        // Log platform fee
        $this->transactionService->logTransaction([
            'seller_id' => $order->seller_id,
            'order_id' => $order->id,
            'type' => 'fee',
            'amount' => $platformFee,
            'description' => 'Platform fee for order ' . $order->order_number,
        ]);
    });
}
[NEW] 
config/paystack.php
return [
    'publicKey' => env('PAYSTACK_PUBLIC_KEY'),
    'secretKey' => env('PAYSTACK_SECRET_KEY'),
    'paymentUrl' => env('PAYSTACK_PAYMENT_URL', 'https://api.paystack.co'),
    'webhookSecret' => env('PAYSTACK_WEBHOOK_SECRET'),
    'merchantEmail' => env('MERCHANT_EMAIL'),
    
    // Polling configuration for frontend
    'polling' => [
        'max_attempts' => 60, // 60 * 2s = 2 minutes
        'interval' => 2000, // 2 seconds in milliseconds
    ],
];
Escrow & Ledger Module
[NEW] 
EscrowService.php
Critical financial logic with strict validation:

creditPendingBalance() - Add payment to pending balance
releaseFunds() - Move from pending to available
refundFunds() - Process refund
deductPlatformFee() - Calculate and deduct fees
freezeFundsForDispute() - Lock funds during dispute
getSellerBalance() - Get current balances
validateSufficientBalance() - Check balance before operations
All methods wrapped in database transactions with balance validation.

[NEW] 
TransactionService.php
logTransaction() - Record all fund movements
getSellerTransactionHistory() - Fetch transaction log
generateReference() - Create unique transaction references
[NEW] 
EscrowAccount.php
Model with balance accessors and validation.

[NEW] 
Transaction.php
Immutable transaction log model.

Risk Engine Module
[NEW] 
RiskEngineService.php
calculateSellerRiskScore() - Compute risk metrics
determineSellerTier() - Assign tier based on score
getReleaseDuration() - Get hold period for tier
shouldInstantRelease() - Check if instant release allowed
calculateInstantReleasePercentage() - Get partial release amount
Risk Calculation Logic:

Dispute Ratio = (Disputed Orders / Total Orders) * 100
Refund Ratio = (Refunded Orders / Total Orders) * 100
Avg Delivery Time = Average hours from dispatch to delivery
Tier 1: Default (New sellers or high risk)
Tier 2: Dispute Ratio < 5%, Total Orders > 20, Avg Delivery < 72h
Tier 3: Dispute Ratio < 2%, Total Orders > 100, Avg Delivery < 48h
[NEW] 
CalculateSellerRiskScores.php
Daily scheduled command to recalculate all seller tiers.

[NEW] 
ProcessEscrowReleases.php
Scheduled command to release funds based on tier rules.

[NEW] 
RiskScore.php
Historical risk score tracking model.

Payout Module
[NEW] 
PayoutService.php
requestPayout() - Validate and create payout request
processPayout() - Execute Paystack transfer
handlePayoutFailure() - Retry logic for failed payouts
calculatePayoutFee() - Compute platform fee
validatePayoutEligibility() - Check minimum balance and reserves
[NEW] 
PayoutController.php
store() - Request withdrawal
index() - Get payout history
show() - Get payout details
[NEW] 
ProcessPayoutJob.php
Queued job for payout processing with retry logic.

[NEW] 
Payout.php
Payout tracking model.

Dispute Resolution Module
[NEW] 
DisputeService.php
raiseDispute() - Create dispute and freeze funds
uploadEvidence() - Handle evidence files
resolveDispute() - Admin resolution (refund/release)
getDisputeDetails() - Fetch dispute with evidence
[NEW] 
DisputeController.php
store() - Raise dispute
show() - Get dispute details
uploadEvidence() - Add evidence
resolve() - Admin resolution endpoint
[NEW] 
Dispute.php
Dispute model with evidence handling.

Admin Dashboard Module
[NEW] 
AdminDashboardController.php
index() - Platform overview stats
orders() - All orders management
disputes() - Dispute queue
sellers() - Seller management
analytics() - Platform analytics
[NEW] 
AdminOrderController.php
Admin order management endpoints.

[NEW] 
AdminDisputeController.php
Admin dispute resolution endpoints.

API Routes
[MODIFY] 
api.php
// Public routes
Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login', [AuthController::class, 'login']);
// Public checkout
Route::get('/live/{token}', [PublicCheckoutController::class, 'show']);
Route::post('/orders', [OrderController::class, 'store']);
// Payment webhooks
Route::post('/payments/webhook', [PaymentController::class, 'webhook']);
// Authenticated seller routes
Route::middleware(['auth:sanctum', 'role:seller'])->group(function () {
    Route::get('/seller/dashboard', [SellerController::class, 'dashboard']);
    Route::apiResource('products', ProductController::class);
    Route::apiResource('live-sessions', LiveSessionController::class);
    Route::post('/live-sessions/{id}/activate', [LiveSessionController::class, 'activate']);
    Route::post('/live-sessions/{id}/end', [LiveSessionController::class, 'end']);
    Route::apiResource('orders', OrderController::class)->only(['index', 'show', 'update']);
    Route::post('/orders/{id}/confirm-delivery', [OrderController::class, 'confirmDelivery']);
    Route::apiResource('disputes', DisputeController::class);
    Route::apiResource('payouts', PayoutController::class);
});
// Admin routes
Route::middleware(['auth:sanctum', 'role:admin'])->prefix('admin')->group(function () {
    Route::get('/dashboard', [AdminDashboardController::class, 'index']);
    Route::get('/orders', [AdminDashboardController::class, 'orders']);
    Route::get('/disputes', [AdminDashboardController::class, 'disputes']);
    Route::post('/disputes/{id}/resolve', [AdminDisputeController::class, 'resolve']);
});
Frontend - Vue 3 Components
Seller Dashboard
[NEW] 
Dashboard.vue
Main dashboard with stats cards (GMV, orders, pending payouts, disputes).

[NEW] 
Products/Index.vue
Product listing with CRUD operations.

[NEW] 
Products/Form.vue
Product create/edit form with image upload and variant management.

[NEW] 
LiveSessions/Index.vue
Live session management with link generation.

[NEW] 
LiveSessions/Create.vue
Create live session with product selection.

[NEW] 
Orders/Index.vue
Order management with status updates.

[NEW] 
Orders/Show.vue
Order details with tracking and delivery confirmation.

[NEW] 
Disputes/Index.vue
Dispute listing and management.

[NEW] 
Wallet/Index.vue
Wallet overview with balance breakdown and payout request.

[NEW] 
Settings/Index.vue
Seller profile and bank details management.

Public Checkout
[NEW] 
Checkout.vue
Mobile-first checkout page with:

Store branding
Product cards with variant selection
Order form (name, phone, address)
Delivery fee calculation
Secure checkout badge
Paystack payment integration
Design Requirements:

Load time < 2 seconds
Mobile-first responsive design
Clear trust indicators
Simple one-page checkout
No forced account creation
Admin Dashboard
[NEW] 
Admin/Dashboard.vue
Platform overview with key metrics.

[NEW] 
Admin/Orders.vue
All orders management interface.

[NEW] 
Admin/Disputes.vue
Dispute resolution interface with evidence review.

Configuration Files
[MODIFY] 
config/services.php
Add Paystack configuration:

'paystack' => [
    'public_key' => env('PAYSTACK_PUBLIC_KEY'),
    'secret_key' => env('PAYSTACK_SECRET_KEY'),
    'webhook_secret' => env('PAYSTACK_WEBHOOK_SECRET'),
],
[MODIFY] 
.env.example
Add required environment variables:

PAYSTACK_PUBLIC_KEY=
PAYSTACK_SECRET_KEY=
PAYSTACK_WEBHOOK_SECRET=
PLATFORM_FEE_PERCENTAGE=3.5
MINIMUM_PAYOUT_AMOUNT=5000
RESERVE_PERCENTAGE=10
TIER1_HOLD_HOURS=48
TIER2_HOLD_HOURS=24
TIER3_INSTANT_RELEASE_PERCENTAGE=70
[MODIFY] 
app/Console/Kernel.php
Schedule commands:

protected function schedule(Schedule $schedule)
{
    $schedule->command('risk:calculate')->daily();
    $schedule->command('escrow:process-releases')->hourly();
}
Testing Suite
Unit Tests
[NEW] 
EscrowServiceTest.php
Test cases:

test_credit_pending_balance_updates_correctly()
test_release_funds_moves_to_available_balance()
test_refund_funds_processes_correctly()
test_cannot_release_more_than_pending_balance()
test_platform_fee_deducted_correctly()
test_negative_balance_prevented()
test_all_transactions_logged()
[NEW] 
RiskEngineServiceTest.php
Test cases:

test_new_seller_assigned_tier1()
test_tier2_requirements_met()
test_tier3_requirements_met()
test_dispute_ratio_calculated_correctly()
test_tier_downgrade_on_high_disputes()
[NEW] 
PayoutServiceTest.php
Test cases:

test_payout_request_validates_minimum_amount()
test_payout_deducts_platform_fee()
test_payout_respects_reserve_balance()
test_failed_payout_can_retry()
Feature Tests
[NEW] 
CheckoutFlowTest.php
Test cases:

test_public_checkout_page_loads()
test_order_creation_with_valid_data()
test_payment_initiation_returns_authorization_url()
test_order_marked_paid_after_webhook()
test_escrow_credited_after_payment()
[NEW] 
WebhookVerificationTest.php
Test cases:

test_webhook_signature_validation()
test_invalid_signature_rejected()
test_duplicate_webhook_ignored()
test_payment_status_updated_once()
[NEW] 
DisputeFlowTest.php
Test cases:

test_dispute_creation_freezes_funds()
test_admin_can_resolve_dispute()
test_refund_processes_correctly()
test_release_after_dispute_resolution()
Verification Plan
Automated Tests
Unit Tests
Command:

php artisan test --filter=Unit
Coverage:

EscrowService: All balance operations, transaction logging, validation
RiskEngineService: Tier calculation, scoring logic
PayoutService: Validation, fee calculation, eligibility checks
Feature Tests
Command:

php artisan test --filter=Feature
Coverage:

Complete checkout flow from link to payment
Webhook signature validation and idempotency
Dispute creation and resolution
Escrow fund movements
Full Test Suite
Command:

php artisan test --coverage
Target: >80% code coverage on service classes

Manual Verification
1. Seller Onboarding Flow
Steps:

Register new seller account via /api/auth/register
Verify email confirmation sent
Complete seller profile with bank details
Confirm seller dashboard accessible
Verify escrow account created with zero balances
Expected Result: Seller can access dashboard with empty state

2. Product & Live Session Creation
Steps:

Create 3 products with different variants
Upload product images
Create live session and select products
Verify unique session token generated
Copy public checkout URL
Access checkout page in incognito browser
Expected Result: Public checkout page displays correctly with all products

3. Complete Checkout Flow
Steps:

On public checkout page, select product and variant
Fill delivery details (name, phone, address)
Click "Pay Now"
Complete Paystack payment (use test card: 4084084084084081)
Verify redirect to success page
Check seller dashboard for new order
Verify escrow pending balance increased
Check transaction log for payment entry
Expected Result:

Order created with "paid" status
Escrow pending balance = order total - platform fee
Transaction logged correctly
4. Escrow Release Flow
Steps:

Mark order as "processing" then "dispatched"
Add tracking number
Mark order as "delivered"
Wait for tier-based hold period OR manually trigger release command:
php artisan escrow:process-releases
Verify funds moved from pending to available balance
Check transaction log for release entry
Expected Result:

Available balance increased
Pending balance decreased
Transaction logged with type "release"
5. Payout Request
Steps:

Navigate to Wallet section
Request withdrawal of available balance
Verify payout created with "pending" status
Manually process payout queue:
php artisan queue:work --once
Check Paystack dashboard for transfer
Verify payout status updated to "completed"
Check available balance decreased
Expected Result:

Payout processed successfully
Platform fee deducted
Transaction logged
6. Dispute Flow
Steps:

Create test order and mark as paid
Raise dispute as buyer via /api/disputes
Upload evidence file
Verify escrow status changed to "frozen"
Admin reviews dispute in admin panel
Admin resolves dispute (refund)
Verify refund transaction created
Check escrow balance adjusted
Expected Result:

Funds frozen during dispute
Refund processed correctly
All parties notified
7. Risk Tier Calculation
Steps:

Create seller with 25 successful orders
Create 1 disputed order (4% dispute ratio)
Run risk calculation command:
php artisan risk:calculate
Verify seller upgraded to Tier 2
Check risk_scores table for entry
Verify seller dashboard shows new tier
Expected Result:

Seller tier updated to Tier 2
Hold period reduced to 24 hours
8. Webhook Security
Steps:

Send webhook request without signature
Verify request rejected with 401
Send webhook with invalid signature
Verify request rejected
Send valid webhook with correct signature
Verify payment processed
Send duplicate webhook with same reference
Verify duplicate ignored (idempotency)
Expected Result:

Only valid, unique webhooks processed
No duplicate payments
9. Performance Testing
Steps:

Use Apache Bench to test checkout page:
ab -n 100 -c 10 http://kwiqpay.test/api/live/{token}
Verify average response time < 2 seconds
Test concurrent order creation
Monitor database query count
Expected Result:

Page loads < 2 seconds
No N+1 query issues
10. Security Audit
Steps:

Verify HTTPS enforced (redirect HTTP to HTTPS)
Test CSRF protection on forms
Verify rate limiting on checkout endpoint (max 10 requests/minute)
Check bank details encrypted in database
Test SQL injection on order form
Verify XSS protection on user inputs
Expected Result:

All security measures active
No vulnerabilities found
Browser Testing (Using Browser Tool)
Checkout Page UI/UX Test
Steps:

Use browser tool to navigate to public checkout page
Capture screenshots of:
Desktop view
Mobile view (375px width)
Product selection
Order form
Payment modal
Verify mobile-first design
Test form validation errors
Verify "Secure Checkout" badge visible
Expected Result:

Clean, professional UI
Mobile-optimized layout
Clear trust indicators
Implementation Sequence
Sprint 0: Landing Page (Week 1)
Goal: Launch marketing site to establish presence and collect early interest

HTML Structure (Day 1-2)

Create semantic HTML5 structure
Implement all 11 sections
Add SEO meta tags
Set up proper heading hierarchy
Styling & Design (Day 3-4)

Implement TailwindCSS
Build custom color system
Create responsive layouts
Add animations and transitions
Polish & Deploy (Day 5)

Performance optimization
Cross-browser testing
Mobile responsiveness check
Deploy to hosting (Netlify/Vercel)
Deliverables:

✅ Live landing page at kwiqpay.com
✅ Mobile-responsive design
✅ <2s load time
✅ Analytics tracking setup
Sprint 1: Foundation (Weeks 2-3)
Database migrations
Authentication & RBAC
Seller profile management
Product CRUD
Sprint 2: Live Sessions & Checkout (Weeks 3-4)
Live session generator
Public checkout page
Order creation flow
Sprint 3: Payments & Escrow (Weeks 5-6)
Paystack integration
Webhook handling
Escrow ledger system
Transaction logging
Sprint 4: Orders & Disputes (Weeks 7-8)
Order management
Dispute system
Admin dashboard
Sprint 5: Payouts & Risk Engine (Weeks 9-10)
Risk scoring algorithm
Tier-based release logic
Payout system
Scheduled jobs
Sprint 6: Testing & Polish (Weeks 11-12)
Comprehensive testing
Security audit
Performance optimization
Documentation
Deployment Checklist
 Environment variables configured
 Database migrations run
 Queue worker running (supervisor configured)
 Scheduled tasks configured (cron setup)
 HTTPS certificate installed
 Paystack webhook URL registered
 Rate limiting configured
 Logging configured (daily rotation)
 Backup strategy implemented
 Monitoring setup (error tracking)
Post-Launch Monitoring
Key Metrics to Track:

Checkout completion rate (target: >75%)
Payment success rate (target: >95%)
Average escrow hold time
Dispute ratio (target: <2%)
Payout processing time
API response times
Alerts to Configure:

Failed payment webhooks
Failed payouts (retry exhausted)
High dispute rate (>5%)
Negative balance attempts
API errors (>1% error rate)
Future Phase 2 Considerations
Architecture Decisions Made for Future Streaming:

live_sessions table includes streaming-related fields (nullable)
Service layer allows easy extraction to microservices
API-first design supports future mobile apps
Modular payment abstraction for multi-provider support
Next Phase Features:

Native streaming via Agora/WebRTC
In-stream product overlays
Buyer accounts & wallets
Seller analytics expansion
Affiliate/referral system

Comment
Ctrl+Alt+M
