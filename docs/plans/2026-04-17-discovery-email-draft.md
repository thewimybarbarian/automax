# Discovery Email to Chris — Draft

**Date:** 2026-04-17
**To:** Chris (Auto Max)
**From:** Jason
**Subject:** Quick info I need to wire up the new site to your systems

---

Hey Chris,

Got a great shape on the new site and I'm ready to start wiring it into your existing stack (VinSolutions + DEP) instead of trying to replace anything. The goal is: every lead the new site generates drops straight into your VinSolutions inbox like it came from Cars.com or AutoTrader — your team works it the same way they work every other lead, no new tools, no retraining.

To plug it in cleanly, I need five things from you. None should take more than a phone call to your Cox rep or DEP account manager.

**1. Your VinSolutions ADF lead-inbox email address.**
This is the email address Cox set up for your CRM to ingest third-party leads. Usually looks like `crm-[yourstore]@vinsolutions.com` or similar. Your Cox rep will know it instantly.

**2. Your VinSolutions plan tier — specifically, do you have Connect API access, or is it ADF-email only?**
Either is fine. ADF-email is the standard and all I need for launch. Connect API just opens the door to a few bonus features later.

**3. Your DEP inventory feed URL.**
DEP provides every dealer an XML or JSON export of your live lot — it's your data, you own it. This is how the new site pulls your actual inventory instead of me maintaining it by hand. DEP can send the URL; tell them it's for a third-party website integration.

**4. When does your current DEP contract end?**
Just so I know the window we're working toward for cutting DNS over.

**5. Who's your main contact at Cox?**
Probably won't need them for phase one, but handy to have for later when we start pushing AI-enriched notes into VinSolutions leads.

If any of these are easier to just grab on a 10-minute call, happy to hop on and dial your reps with you.

Talk soon,
Jason

---

## Internal notes (not for Chris)

- If he pushes back on #3 ("DEP said no"), the pressure point is: *this is my inventory data, I'm entitled to it.* Worst case we scrape the public inventory pages, but the feed is cleaner and higher fidelity.
- If he asks "why not just use DEP's lead forms" — answer: *his forms dump into VinSolutions too, so his team sees no difference; but our forms are A/B tested for conversion, tied to AI qualification (Tier 3), and not locked to DEP's contract.* In other words: same destination, better pipe.
- Follow up in 48 hours if no response. Dealers sit on emails.
