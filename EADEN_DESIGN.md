# EAden — Community & Space Design

*A thinking document for an online-first, distributed Effective Altruism community
built on self-hosted WorkAdventure.*

Status: **exploratory.** This is a map of the territory, not a spec. It states opinions and
trade-offs so you can decide deliberately. Companion docs: `EADEN_README.md` (vision),
`EADEN_DEPLOY.md` (infrastructure).

---

## 0. TL;DR

- The hard problem is **not** technology — WorkAdventure already gives us everything a v1 needs.
  The hard problem is **liveness**: an empty cozy room is just an empty room.
- For a **distributed** group (no city to fall back on), the online space *is* the community.
  That raises the stakes on ritual, cadence, hosting, and onboarding, because there's no
  hallway, no pub, no campus carrying the social load for you.
- The MVP is therefore mostly **non-code**: one custom map (~5 zones), light branding, a fixed
  weekly schedule, a tiny committed core, and a clear "front door." Resist building anything
  custom.
- Win condition for the first 90 days: **a returning regular says "I came back because I knew
  people would be there."** Everything below serves that sentence.

---

## 1. Purpose & framing

### Why an online spatial space at all?

EA already has Slack workspaces, the Forum, Discord servers, and Zoom calls. So why a 2D
walk-around world? Because those tools are good at **information** and bad at **presence**.

- Slack/Forum are *asynchronous archives*. Great for depth, terrible for "is anyone around
  right now?" They make a community feel like a library, not a room.
- Zoom is *synchronous but rigid*: one conversation, scheduled, everyone staring at a grid. No
  serendipity, no walking up to someone, no "I'll just sit near people and work."

A spatial space (WorkAdventure / Gather-style) occupies the missing quadrant: **synchronous +
ambient + serendipitous.** You see who's here, you drift toward a conversation, you cowork in
companionable near-silence, you bump into someone new. That is the texture of a *place*, and
places are what create belonging.

### The distributed constraint (read this twice)

This community has **no fixed city.** That is the single most important design fact.

A city-based EA group can be mediocre online because the real bonding happens at the monthly
pub meetup; the online tools are just glue. **We have no pub.** The space carries 100% of the
social load. Implications that recur throughout this doc:

- **Timezones are the enemy of liveness.** A global membership spread across 12 timezones will
  never be "all online at once." You must manufacture overlap with **anchor times** (see §9).
- **There is no in-person fallback** when the tech is annoying or the room is empty — so
  friction and emptiness are existential, not cosmetic.
- **Async must complement sync.** People who can't make the live anchor still need a way to
  belong (a Matrix channel, recaps). Sync creates the bond; async sustains it between sessions.
- **Identity is harder.** No shared geography means belonging must come from shared *purpose*
  and *people*, deliberately constructed.

### What "success" looks like (concretely)

Not "lots of signups." Signups are vanity. Success is:

1. **Repeat attendance** — the same faces return week over week.
2. **Peer-to-peer ties** — members talk to *each other*, not just to the organizer.
3. **Self-sustaining moments** — things happen when the founder isn't hosting.
4. **Real EA outcomes** — a career shift, a donation decision, a new collaboration, a newcomer
   who "gets it." These are the point; community is the means.

### How to read this doc

§§2–5 are *why* (principles). §§6–8 are *what* (programming, space, MVP). §§9–10 are *how to
fill it* (attract, retain). §§11–13 are *what could go wrong and what's undecided.* If you only
read three sections: **§8 (MVP), §9 (cold-start), §11 (failure modes).**

---

## 2. First principles: what makes social spaces & events work

These are general truths about gathering, drawn from sociology and from the lived experience of
running events. Everything later is an application of these.

**1. Liveness beats features.** People come to a space to find *other people*, full stop. A
beautiful empty map loses to an ugly busy one every time. Design every decision to maximize the
chance that when someone arrives, **someone else is there.**

**2. Low friction to enter.** Every click, login, install, or "wait, how do I unmute?" between
intention and presence loses people. WorkAdventure's killer feature here is **a URL: click,
pick an avatar, you're in.** Protect that. No app, no account required to look around.

**3. The "third place" (Oldenburg).** Beyond home (1st) and work (2nd), humans need informal
public places — the café, the pub, the barbershop — that are *neutral, leveling, accessible,
and centered on conversation.* Their hallmarks: regulars who set the tone, a playful mood, low
stakes, and the freedom to come and go. **EAden should aspire to be a third place for EA**, not
a meeting room. Cozy is not decoration; it is the product.

**4. Ritual and predictable cadence.** "Something might happen sometime" attracts no one.
"Coworking every weekday at 14:00 UTC; talks every other Thursday" builds a habit. Rituals give
people a reason and a *time* to show up, and repetition is what turns strangers into regulars.

**5. Psychological safety.** People only relax, ask "dumb" questions, and show up as themselves
when they feel they won't be judged or attacked. This is *made*, by visible norms, warm hosting,
and gentle moderation — not assumed.

**6. A visible host.** Self-organizing spaces are a myth at small scale. Early on, *someone*
must be the warm presence who greets arrivals, makes introductions, and prevents the awful
experience of "I showed up and stood alone." The host is the single highest-leverage role.

**7. Critical mass & the empty-restaurant problem.** Restaurants seat early diners by the
window for a reason: emptiness signals "avoid," fullness signals "good." A space below its
liveness threshold spirals down (empty → people leave → emptier). Above it, it self-reinforces
(busy → people stay → busier). **Most of community-building is getting over that threshold and
staying above it.** See §9.

**8. Serendipity vs. scheduled contact.** Two engines of connection: *scheduled* (the talk at
8pm) and *serendipitous* (you bumped into someone at the coffee table). Scheduled contact is
reliable but rigid; serendipitous contact is magical but needs ambient density to happen. You
need both — events to guarantee presence, open space to let magic occur.

---

## 3. What makes communities succeed & retain people

Events are episodes; a community is the connective tissue between them. What sustains it:

**Onboarding is the highest-leverage surface.** The first 5 minutes and first session decide
whether someone ever returns. A great onboarding: someone is *greeted by name*, has *one good
conversation*, learns *when to come back*, and leaves feeling they belong. A bad one: they
spawn into silence, can't figure out the controls, and close the tab forever. Invest here
disproportionately.

**The ladder of engagement.** Healthy communities move people up a ladder, and design for each
rung deliberately:

| Rung | Who | What they need | Design move |
|------|-----|----------------|-------------|
| **Visitor** | Just arrived, lurking | Safety, clarity, a reason to stay | Clear front door, a greeter |
| **Participant** | Shows up to events | A good experience, a face they know | Reliable cadence, intros |
| **Regular** | Comes habitually | Recognition, belonging | Name recognition, light roles |
| **Contributor** | Helps run things | Ownership, agency | "Host a session," small responsibilities |
| **Host/Steward** | Co-runs the community | Trust, support, no burnout | Shared rota, tools, appreciation |

The art is **lowering the activation energy of each step up.** Most communities die because
everyone stays a Participant and the single founder-Host burns out (see §11).

**The 90-9-1 reality.** In any community, ~90% lurk, ~9% contribute occasionally, ~1% create
most of the activity. This is normal, not failure. Two consequences: (a) don't guilt the
lurkers — lurking is a valid rung; (b) **find, nurture, and protect your 1%.** They are the
community's heartbeat.

**Identity & belonging.** People stay where they feel *seen* and where being a member means
something. For a distributed group with no geography, identity must be built from purpose
("we're people trying to do the most good") and from relationships ("these are my people"). Tools:
a name, a consistent aesthetic, shared rituals, in-jokes, member spotlights, a welcome rite.

**Reciprocity & norms.** Communities run on a gift economy — people give time, answers,
encouragement — sustained by the expectation that giving is reciprocated and recognized. Norms
(how we treat each other, how we disagree, our epistemic standards) should be **visible and
modeled by hosts**, not buried in a document nobody reads.

**Recognition.** The cheapest, most underused retention tool. Remembering a name, thanking a
contributor publicly, "great point earlier" — these create the felt sense of mattering that
keeps people coming back.

**Reducing churn / re-entry friction.** People drift not because they decided to leave but
because re-entry got slightly harder than the inertia of not showing up. Lower it: reminders,
a shared calendar, "here's what you missed" recaps, a personal "we miss you" nudge to a lapser.

**Community health signals (felt, then measured).** Are there conversations the founder didn't
start? Do new people get welcomed by non-founders? Do regulars bring friends? Do people return
unprompted? These qualitative signals lead the quantitative metrics in §12.

---

## 4. EA-specific stakes

### What EA groups actually do

Generic community advice gets you 80% there; the last 20% is EA-shaped. The proven repertoire of
EA local and virtual groups:

- **Intro fellowships / reading groups** — a structured ~8-week cohort working through core EA
  ideas. The single most effective format for turning curious newcomers into engaged members.
- **1:1s** — the famously high-value EA ritual: a 30-minute conversation between two members,
  often newcomer↔experienced. Disproportionately responsible for people taking EA seriously.
- **Career conversations** — EA is, in large part, a talent-routing project (cf. 80,000 Hours).
  Helping people think about high-impact careers is a core service, not a side activity.
- **Discussion groups & debates** — on cause areas, ethics, current questions. Feeds epistemics.
- **Socials & coworking** — the connective tissue; the part most groups under-invest in.
- **Talks & speaker events** — bring in researchers, org staff, practitioners.

A spatial online space can host **all of these** (§6), and is *especially* good at the 1:1s,
coworking, and socials that text channels do badly.

### EA's particular goods (lean into these)

- **Epistemics** — truth-seeking, calibration, changing your mind, scout mindset. The community
  should *feel* intellectually alive and honest. This is a differentiator; protect it.
- **Scope-sensitivity & seriousness of purpose** — people are here because they actually want to
  help, a lot. That shared earnestness is rare and bonding.
- **Talent pipeline** — connecting people to high-impact opportunities is concrete value the
  space can deliver, which justifies people's time.

### EA's particular failure modes (design against these)

- **Insularity / elitism / jargon.** EA can feel like a club with a secret language (counterfactuals,
  expected value, "ITN", cruxes). Newcomers bounce off. **Antidote:** a jargon-light front door,
  greeters who translate, explicit "no question is too basic" norms.
- **Intimidation by intensity.** The earnestness that bonds insiders can scare newcomers ("am I
  hardcore enough?"). **Antidote:** make low-commitment participation legitimate and celebrated.
- **Burnout.** EA's "do the most good" framing can metastasize into guilt and overwork — for
  members and *especially* for organizers. **Antidote:** model sustainable pace; coworking and
  socials that are explicitly about rest and connection, not output.
- **Reputational fragility.** EA has weathered public scandals; the movement is sensitive to
  bad actors and bad optics. A community space needs real **safeguarding** (Code of Conduct,
  moderation, the ability to remove people). This is non-negotiable, not bureaucratic overhead.
- **Idea-fidelity drift.** As ideas spread, they distort. Maintaining quality of thinking
  (vs. vibes-based EA) matters. **Antidote:** good content, visible epistemic norms, structured
  fellowships rather than only loose chat.
- **Cause tribalism / value lock-in.** Global health vs. animal welfare vs. x-risk camps can
  silo. **Antidote:** a big-tent, cause-curious posture; mixed events.

### The core tension

**Welcoming without diluting; rigorous without being cold.** Lean too warm and fuzzy → you lose
the epistemic edge that makes EA worth joining. Lean too rigorous and intense → you're an
intimidating seminar nobody relaxes in. EAden's job is to be *both*: a warm room where serious
people think hard together and are kind to newcomers while doing it.

---

## 5. What an online spatial space uniquely affords (and its limits)

An honest accounting, so you build on strengths and patch weaknesses rather than fighting the
medium.

### The comparison

| | Async text (Slack/Forum/Discord) | Video call (Zoom) | In-person | **Spatial (EAden)** |
|---|---|---|---|---|
| Presence / "who's here now" | ✗ | partial | ✓ | **✓** |
| Serendipitous bump-into | ✗ | ✗ | ✓ | **✓** |
| Parallel conversations in one room | ✗ | ✗ | ✓ | **✓** |
| Coworking / body-doubling | ✗ | awkward | ✓ | **✓** |
| Async depth / archive | ✓ | ✗ | ✗ | partial (Matrix) |
| Mobile-friendly | ✓ | ✓ | n/a | ✗ (weak) |
| Discoverability / SEO | ✓ | ✗ | ✗ | ✗ |
| Zero-friction to join | ✓ | ✓ | ✗ (travel) | **✓ (a URL)** |
| Reach across distance | ✓ | ✓ | ✗ | **✓** |

### The "magic" to exploit

- **Ambient presence.** Just seeing avatars around makes the space feel alive and you feel less
  alone — even in silence. This is the thing text can't do.
- **Walk-up serendipity.** Proximity audio means you can drift into a conversation the way you
  can't in a Zoom grid. Connection without a scheduled meeting.
- **Body-doubling coworking.** Working "next to" others, cameras optional, is a genuinely
  effective focus and belonging tool — and a low-pressure reason to show up daily.
- **Spatial intuition.** "The talk is on the stage, coworking is upstairs, 1:1 booths are in
  back" is grasped instantly, no menus. Space *is* the UI.

### The limits to respect (and patch)

- **Mobile is weak.** WorkAdventure is a desktop-browser experience. Many people are mobile-first.
  **Patch:** pair the space with a **Matrix/Element** channel (mobile-friendly) for async and
  on-the-go belonging.
- **No discoverability.** Nobody stumbles onto your space via search. Growth is 100% deliberate
  outreach (§9).
- **Async depth is shallow.** Real-time is ephemeral. Decisions, resources, and "what we
  discussed" need a durable home (Matrix, a wiki, the Forum).
- **It's empty by default.** The medium's strength (presence) is also its cruelty (absence). An
  empty spatial space feels *worse* than an empty Slack, because you can *see* there's no one
  there. This is why §9 is the make-or-break section.

**Design corollary:** EAden should be **sync-first (the space) + async-companion (a Matrix
channel)**, not either alone. The space creates bonds; the channel sustains them between
sessions and includes the people who can't make the live times.

---

## 6. Programming menu — formats mapped to the four uses

Concrete, recurring formats. You will *not* run all of these at launch — pick 2–3 anchors and
add as the community grows. Each lists cadence, who's needed, and the WorkAdventure zone it uses.

### A. Social & coworking *(the daily heartbeat — start here)*

| Format | Cadence | Needs | WA zone |
|---|---|---|---|
| **Drop-in coworking** | Daily, fixed hours | A few committed regulars | Coworking room (proximity chat, quiet sub-zone) |
| **Body-doubling pomodoros** | Daily anchor block | One person to "start the clock" | Coworking room + a timer (embed iframe) |
| **Casual hangout / Friday social** | Weekly | A host to keep it warm | Plaza / lounge (open proximity) |
| **Co-watch / co-read** | Ad hoc | Someone to pick the thing | Lounge + embedded YouTube/Etherpad |

Coworking is the **lowest-effort, highest-frequency** way to create liveness. It's the format to
nail first: it gives people a daily reason to show up that doesn't require an event to be
organized.

### B. Events & talks *(the gravity wells that pull people in)*

| Format | Cadence | Needs | WA zone |
|---|---|---|---|
| **Speaker night** | Bi-weekly/monthly | A speaker + a host/MC | Stage / auditorium (megaphone broadcast) |
| **Discussion circle** | Weekly | A facilitator + a topic | Stage or circle of chairs (proximity) |
| **Reading / journal group** | Weekly | A facilitator | Meeting room |
| **Lightning talks** | Monthly | A few volunteer speakers | Stage |
| **Fellowship cohort session** | Weekly for ~8 weeks | A cohort facilitator | Private meeting room per cohort |

Events guarantee that "something is happening," which is what you advertise to attract people
(§9). The **megaphone/broadcast zone** lets one speaker address a crowd while side chatter stays
muted — exactly the stage/audience model.

### C. Onboarding newcomers *(the front door — invest disproportionately)*

| Format | Cadence | Needs | WA zone |
|---|---|---|---|
| **Guided "start here" path** | Always-on | A well-designed entrance | Lobby with signs (popups / openWebsite) |
| **Newcomer welcome event** | Weekly/bi-weekly | A warm greeter | Lobby → lounge |
| **Greeter rota** | Whenever newcomers arrive | A rota of volunteers | Lobby |
| **Intro fellowship** | Cohort-based | A facilitator + curriculum | Meeting room |
| **1:1 matching for newcomers** | On join | A matcher (manual at first) | 1:1 booths |

The front door is where most communities silently bleed members. A newcomer who is *greeted*,
has *one good conversation*, and learns *when to come back* is retained; one who spawns into
silence is gone forever.

### D. Deep 1:1 & small group *(where EA's real value compounds)*

| Format | Cadence | Needs | WA zone |
|---|---|---|---|
| **1:1s** | Ongoing | Light matching | Private 1:1 booths (lockable) |
| **Career conversations** | On request | An experienced member | 1:1 booth |
| **Accountability buddies** | Weekly pairs | Pairing once | Coworking / booth |
| **Small-group deep dives** | Ad hoc | A convener | Small meeting room (max-users cap) |

WorkAdventure's **personal/lockable areas** and **max-users zones** make private, uninterrupted
small spaces trivial — a real advantage over a single Zoom room.

---

## 7. Translating it into the space — map & experience design

The space is an argument made in architecture. Its layout should *teach* the four uses and
*feel* cozy. Principles first, then the concrete zone map, then how each maps to a real WA
feature.

### Design principles for the map

- **Cozy = small, warm, and never empty-feeling.** A big map with 8 people feels dead; a small
  map with 8 people feels cozy. **Make the MVP map small.** You can expand later. Resist the
  urge to build a sprawling campus you can't fill.
- **Funnel to where the people are.** Don't scatter arrivals. Spawn newcomers near the lobby,
  pointing toward the one room most likely to be occupied (coworking). Concentration creates
  liveness; dispersion kills it.
- **Legible at a glance.** Someone should understand the whole space in 10 seconds: that's the
  stage, that's coworking, those are private booths.
- **Signage does the onboarding.** Use entrance signs, a "start here" board, and a visible
  schedule so the space self-explains when no greeter is present.
- **Warmth in the aesthetic.** Soft colors, plants, rugs, a fireplace, rounded furniture,
  human-scale rooms. WorkAdventure's marketplace/starter assets cover this without custom art.

### The MVP zone map (~5 zones)

```
        ┌─────────────────────────────────────────────┐
        │   LOBBY / PLAZA  (spawn here)                │
        │   "Start here" board · live schedule · norms │
        │            │  greeter stands here            │
        └────────────┼────────────────────────────────┘
            ┌─────────┴──────────┐
            ▼                    ▼
 ┌────────────────────┐   ┌────────────────────┐
 │  COWORKING ROOM    │   │  STAGE / AUDITORIUM │
 │  proximity chat    │   │  megaphone broadcast│
 │  + quiet sub-zone  │   │  + audience seating │
 └─────────┬──────────┘   └────────────────────┘
           ▼
 ┌────────────────────┐   ┌────────────────────┐
 │  1:1 BOOTHS (×2-3) │   │  LOUNGE / GARDEN    │
 │  lockable, 2-person│   │  casual hangout     │
 └────────────────────┘   └────────────────────┘
```

### Zone → WorkAdventure feature mapping

(All available out of the box; sources in repo at `libs/map-editor/src/types.ts` and
`play/src/iframe_api.ts`.)

| Zone | Purpose | WA mechanism |
|---|---|---|
| **Lobby / Plaza** | Spawn, orient, greet | `start` area; `openWebsite`/popups for the "start here" board and schedule; greeter just stands here |
| **Coworking room** | Daily body-doubling | Default proximity chat; a **silent zone** sub-area for heads-down focus; optional embedded pomodoro timer iframe |
| **Stage / Auditorium** | Talks & broadcasts | **Speaker megaphone** + **listener megaphone** paired zones (one speaker → many listeners); `focusable` camera on the stage |
| **1:1 booths** | Private conversations | **Lockable area** / **personal area** + **max-users = 2**; proximity chat inside |
| **Lounge / Garden** | Casual hangout | Open proximity chat; maybe a **playAudio** zone for ambient music |
| **(Per-cohort) meeting room** | Fellowships | Meeting room area; **restricted access** by tag if private |

### Naming & vibe

Name rooms like a third place, not an office: "The Commons," "The Workshop," "The Stage," "The
Garden," "Quiet Corner." Naming is cheap and sets tone instantly.

---

## 8. The barebone MVP

The constraint: **minimal developer time.** "Bare" means *close to upstream WorkAdventure*, not
just few features. The good news from the codebase audit: **the infrastructure already exists.**

### Already done (don't touch)

- Full WorkAdventure deployment kit: `EADEN_DEPLOY.md`, `deploy/bootstrap.sh`,
  `deploy/docker-compose.coturn.yaml`, coturn config. One Hetzner box, Traefik + Let's Encrypt,
  LiveKit Cloud for larger bubbles. Sized for ~20 people.
- Every core feature: proximity A/V, Matrix chat, stage/megaphone, silent zones, lockable/
  personal areas, embeds, no-code inline map editor, tag-based access, OIDC, basic moderation.

### Build — small, non-code, in rough order

1. **Provision & launch the vanilla instance** (follow `EADEN_DEPLOY.md`). Get *something*
   live and walkable first. ~half a day.
2. **One custom map (~5 zones)** using the **inline map editor** (no Tiled, no code) per §7:
   lobby, coworking, stage, 1:1 booths, lounge. Use starter/marketplace assets for the cozy
   look. This is the bulk of the work — a day or two of placing tiles and zones.
3. **Light branding:** name ("EAden"), a logo, landing-page copy, a warm color, a one-line
   value prop. Mostly config + a couple of asset swaps.
4. **Access model:** start **anonymous-walk-in** (lowest friction; protects the "it's just a
   URL" magic). Use **tags** for hosts/editors only. Add a light gate (e.g. shared link, or
   OIDC) *only if* abuse appears. Don't build custom auth.
5. **The "front door" content:** a "start here" board (embedded simple page or popup), a visible
   **schedule**, and a one-screen **how-to-use + norms/Code of Conduct**.
6. **The async companion:** one **Matrix/Element** channel (already part of the WA stack) for
   announcements, recaps, and mobile/timezone-excluded members.
7. **A fixed weekly schedule** of 2–3 anchor activities (see §9) — this is "code" written in
   *calendar*, and it's the most important deliverable of all.

### Deliberately NOT building (the "later, not now" list)

- ❌ Any custom application code, plugins, or forks of `play/`.
- ❌ Bots, automated greeters, matching algorithms (do matching *manually* at this scale).
- ❌ Custom user profiles, gamification, points, badges.
- ❌ Analytics dashboards (eyeball it; see §12).
- ❌ A big sprawling map. Small and full > large and empty.
- ❌ Custom auth/SSO beyond what OIDC gives for free.
- ❌ Self-hosted LiveKit (use the Cloud free tier until you outgrow it).

Every hour spent on the above is an hour *not* spent on the only thing that matters at v1:
**getting real people to show up at the same time.**

### First-week launch checklist

- [ ] Instance live at `play.<domain>`, TLS working, you can walk around.
- [ ] Custom map with 5 zones, cozy assets, signage placed.
- [ ] Branding + landing copy + Code of Conduct visible.
- [ ] Matrix channel created and linked from the lobby.
- [ ] Schedule of 2–3 weekly anchors published (and *you've committed to hosting them*).
- [ ] A **core of 3–5 people** who've agreed to show up to the first sessions (see §9 — do this
      *before* any public promotion).
- [ ] You've personally walked 3 friendly newcomers through the front door and watched where
      they got confused; fixed those spots.

---

## 9. Attraction & cold-start (the make-or-break section)

For a distributed group with no city and no SEO, **growth is 100% deliberate.** And the
empty-restaurant problem (§2.7) means you can't just open the doors and promote — an empty
space converts curiosity into "this is dead" and burns the lead permanently.

### The cardinal rule: manufacture liveness *before* you advertise

**Never invite a stranger to an empty room.** The sequence is:

1. **Recruit a tiny committed core (3–5 people)** who *commit to showing up* at the anchor times
   for the first month. Friends, EA acquaintances, anyone who'll do you the favor. This is the
   single most important growth action. Their job is simply *to be present* so the space is never
   empty.
2. **Make "something is always happening at time X" literally true.** Pick **anchor times** that
   span the most populous timezone overlap (e.g. one slot good for EU+US-East, one for
   Asia+EU). A daily coworking block + a weekly event is enough to start.
3. **Only then promote** — and promote *to a specific session*, not "join our space." "Come
   cowork with us Thursdays 15:00 UTC" converts; "we have a virtual space" doesn't.

### Where distributed EA people already are (partner, don't compete)

- **EA Anywhere** — the existing virtual EA group; natural collaborators/cross-promotion.
- **EA Virtual Programs** (Intro & In-Depth fellowships) — pipelines of newly-engaged people
  looking for a next step.
- **National & city EA groups** without their own online space — offer EAden as their venue.
- **University EA groups** — students are online-native and time-rich.
- **The EA Forum, EA Slack workspaces, relevant Discords** — post where the curious already are.
- **Cause-specific communities** (animal welfare, biosecurity, AI safety) for themed events.

### Invitation mechanics

- Share **a link to a specific scheduled thing**, ideally with a calendar invite (the async
  reminder is what gets people back).
- **Warm intros > cold posts.** A personal "I think you'd like this, come Thursday?" outperforms
  any announcement.
- Let regulars **bring a friend** — peer invitation is the strongest growth channel and a sign
  of health.

### The minimum viable cadence to feel alive

A space needs enough scheduled presence that a random drop-in has a decent chance of finding
someone. For a small group, that's roughly: **one daily coworking anchor + one weekly event +
a living Matrix channel.** Below that, it reads as abandoned.

---

## 10. Retention & fidelization

Attraction fills the room once; retention is why it's full next week. Apply §3's principles
concretely:

- **Ritual & cadence (again).** The same times, every week, without fail. Predictability is the
  retention engine. Reliability of *your* showing up early is more important than polish.
- **Operationalize the engagement ladder.** Actively look for Participants ready to become
  Regulars (learn their names, welcome them back) and Regulars ready to Contribute ("would you
  host next week's coworking?"). Hand out small ownership early and often.
- **Cultivate hosts/regulars deliberately.** Your 1% are the heartbeat. Give them a tag, a
  role, a thank-you, a say. Their presence *is* the liveness others come for.
- **Recognition everywhere.** Name people. Thank contributors publicly. Spotlight a member.
  Celebrate the cohort that finished. This is nearly free and hugely sticky.
- **Lower re-entry friction.** Calendar invites with reminders. A weekly "here's what's on /
  what you missed" note in the Matrix channel. A bookmarkable link. The drift-away happens in
  the gap between sessions; fill it.
- **Re-engage lapsers personally.** When a regular vanishes, a single "hey, we miss you, you
  around Thursday?" recovers a surprising fraction. Automated nothing; human everything.
- **Make belonging legible.** In-jokes, traditions, a shared name for the group, member rituals
  (a welcome, a sendoff). Manufactured culture is still culture.
- **Protect against organizer burnout** (this is retention of *you*, the most important member):
  rotate hosting, keep tools simple, allow quiet weeks, and let coworking/socials be genuinely
  low-effort. A burned-out founder is the #1 cause of community death (§11).

---

## 11. Risks, stakes & failure modes

The realistic ways this dies or harms, and the mitigations.

| Risk | Why it happens | Mitigation |
|---|---|---|
| **Empty-space death spiral** | Promoted before liveness; below critical mass | Recruit a committed core first; anchor times; never invite to an empty room (§9) |
| **Founder burnout / bus factor** | One person hosts everything | Distribute hosting early; the engagement ladder; allow quiet weeks; recruit a co-organizer ASAP |
| **Newcomers bounce** | Spawn into silence, jargon wall, confusion | Greeter rota; front-door signage; jargon-light norms; "no question too basic" (§§3,6C) |
| **Safety / bad actors** | Open spaces attract abuse; EA is target-sensitive | **Code of Conduct** from day 1; report/block/mute (built in); host presence; ability to remove (Admin-API or simple gating) |
| **Privacy / GDPR** | EU members; A/V; chat logs; recordings | Self-hosting helps; **don't record** by default; minimal data; clear privacy note; Matrix data retention policy |
| **Tech friction** | Browser perf, mic/cam permissions, no mobile | Keep map small/light; a one-screen troubleshooting guide; Matrix as mobile fallback |
| **Over-engineering / scope creep** | Building is more fun than hosting | The "NOT building" list (§8); treat every code idea as a delay to the real work |
| **EA reputational sensitivity** | Movement-level scandals, optics | Strong CoC, real moderation, big-tent welcoming tone, avoid insular elitism |
| **Cause/clique siloing** | Sub-tribes form and exclude | Mixed events; big-tent posture; greeters who bridge |
| **Timezone exclusion** | Global membership, single anchor | Multiple anchor slots; async Matrix companion; recaps so absent members stay connected |

**Meta-risk:** mistaking *building the space* for *building the community.* The space is ~10% of
the work. The other 90% is showing up, hosting warmly, and doing it again next week.

---

## 12. Metrics & phased roadmap

### Metrics that matter (and the vanity ones to ignore)

Track the smallest set that tells you if it's alive. **Eyeball these — do not build a dashboard.**

**Real signals:**
- **Returning members** (came ≥2 weeks in a row) — the single best health metric.
- **Concurrent presence at anchor times** — is the room ever non-empty?
- **Events actually held** vs planned — consistency of cadence.
- **Number of regulars/hosts** — size of your 1%.
- **Peer-initiated activity** — conversations/sessions you didn't start (the holy grail).
- **Real EA outcomes** — a career move, a connection made, a newcomer who engaged deeply.

**Vanity metrics to distrust:** total signups, "members" who joined once, page views. They feel
good and mean nothing.

### Phased roadmap with decision gates

| Phase | Goal | Looks like | Gate to next |
|---|---|---|---|
| **0. MVP build** | A live, cozy, walkable space | §8 checklist done | Space works; core of 3–5 committed |
| **1. Invite-only pilot** | Prove liveness with the core | Anchors run for ~4 weeks; room rarely empty | Regulars return *unprompted* |
| **2. Soft public** | Controlled growth via partners | Cross-promo to EA Anywhere/VP/groups; warm intros | Self-sustaining moments appear; ≥1 co-host |
| **3. Grow & deepen** | Add formats, hand off ownership | Fellowships, more anchors, member-led events | Community runs without founder always present |

**Each gate is a keep / pivot / stop decision.** If Phase 1 can't sustain a non-empty room with
a committed core, *that's the signal to rethink the format or audience* — not to add features.
Cheap to learn now, expensive to learn after building a campus.

---

## 13. Open questions & next decisions

The genuinely undecided things to chew on while exploring:

- **Audience focus.** Truly general EA, or a niche (a cause area, students, a region/language
  cluster, career-stage)? A narrower wedge is *easier* to make feel alive at cold-start.
- **Anchor timezones.** Which 1–2 slots? This depends on where your first core actually lives —
  decide it from real people, not a global average.
- **Open vs gated.** Anonymous walk-in (max liveness/serendipity) vs. light gate (safety,
  intentionality)? Recommendation: open at first, gate only if needed.
- **Relationship to existing EA orgs.** Independent project, or affiliated/endorsed by CEA / a
  national group / EA Anywhere? Affiliation gives credibility and pipeline but adds constraints.
- **Governance & moderation.** Who are the stewards? What's the CoC? What's the removal process?
  Decide *before* you need it.
- **Sustainability.** Funding (the Hetzner box is cheap, but who pays/maintains?), and the
  human sustainability of hosting. Is there a path to a paid or grant-funded organizer?
- **When to add async.** Matrix from day 1 (recommended) — but how much weight to put on it vs.
  keeping energy in the live space?
- **AI-assisted hosting (later).** Could an agent help with greeting, scheduling, recaps,
  matching? Interesting, but firmly *post-MVP* — don't let it distract from human hosting now.
- **Success threshold.** What result, by when, makes this worth continuing? Define it now so
  Phase gates aren't decided by sunk-cost feelings.

---

## Appendix A — WorkAdventure feature → community function

| WA feature | Serves |
|---|---|
| Proximity video/audio | Coworking, serendipity, socials, 1:1s |
| Megaphone / broadcast zones | Talks, speaker events, announcements |
| Silent / quiet zones | Heads-down coworking |
| Lockable / personal areas + max-users | Private 1:1s, small-group deep dives |
| Matrix chat | Async companion, announcements, recaps, mobile reach |
| Embedded iframes (Docs, whiteboards, YouTube, timers) | Collaborative sessions, pomodoros, co-watch |
| Inline map editor (no-code) | Building & evolving the space without dev time |
| Tags + restricted areas | Hosts/editors, private cohort rooms |
| Report / block / mute | Baseline safety & moderation |
| OIDC SSO | Optional light gating |
| `start` areas, portals, signage popups | Onboarding front door & wayfinding |

## Appendix B — Glossary of concepts cited

- **Third place** (Oldenburg) — informal public gathering place beyond home and work; the model
  for what EAden should *feel* like.
- **Liveness / critical mass** — the threshold of presence below which a space spirals to empty
  and above which it self-sustains.
- **Empty-restaurant problem** — emptiness signals "avoid," fullness signals "good"; presence
  begets presence.
- **Ladder of engagement** — visitor → participant → regular → contributor → host; the path you
  design people *up*.
- **90-9-1 rule** — ~90% lurk, ~9% contribute sometimes, ~1% create most activity; normal, and a
  reason to protect your 1%.
- **Body-doubling** — working alongside others (in presence, not necessarily talking) to sustain
  focus and belonging.
- **Anchor time** — a fixed recurring slot that manufactures timezone overlap and habit.
- **Bus factor** — how many people can disappear before the community collapses; for most new
  groups it's tragically 1 (the founder).

---

*End of document. This is a living draft — tell me which section to deepen, trim, or turn into a
checklist, and we'll iterate.*
