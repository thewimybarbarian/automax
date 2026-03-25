# AutoMax Wow Factor — Cinematic Motion + Conversion Power

## Approved Design — 2026-03-25

### Motion System (Framer Motion)
- **Hero entrance sequence**: Orchestrated stagger — logo → headline words → subtitle → CTAs → search bar (0.3s–1.1s)
- **Scroll-triggered reveals**: Replace CSS fade-up with `whileInView` + staggered children
- **Card hover physics**: Spring animation (stiffness: 300, damping: 20) — cards feel weighted
- **Page transitions**: Home ↔ About fade+slide with AnimatePresence

### Conversion Elements
- **Sticky mobile CTA bar**: Fixed bottom on <768px, "Call Now" + "Get Pre-Approved", hides on scroll-down, shows on scroll-up
- **Vehicle urgency badges**: "Just Listed" (pulse, <20K mi), "Price Drop" (random 2), "Hot" (<$20K)
- **Financing calculator**: Price/down-payment/term sliders, live monthly payment at 6.9% APR, "Get Pre-Approved" CTA
- **Trust signals strip**: Google 4.5★, 10K+ customers, BBB, Family Owned, CARFAX — auto-scroll mobile, grid desktop

### Hero Canvas Effect
- 30-40 amber floating particles (1-3px, 10-20% opacity)
- Slow upward drift, mouse-parallax response
- Pure Canvas API, no library, ~80 LOC
- Only renders on hero, destroyed on scroll-past

### Budget
~25KB gzip total added weight. Sub-2s load time maintained.
