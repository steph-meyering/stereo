# ROADMAP

This document outlines the product roadmap for Stereo (a SoundCloud-style clone). The current state is the **MVP**. Items are ordered by priority and impact. Creator tools are intentionally placed at the bottom of the list, per request.

## Guiding Principles
- **Incremental delivery**: small, testable, shippable changes.
- **User impact first**: prioritize features that improve playback, discovery, and engagement.
- **Keep production stable**: tests and CI updates land alongside feature changes.

## Current MVP Scope (Already Built)
- Authentication (signup/login/logout)
- Song upload with album art
- Playback controls + waveform display
- Comments
- Profiles
- AWS S3 file storage

---

## Roadmap (Ordered by Priority)

### 1) Testing Foundation (First Priority)
**Goal**: Create tests for all existing MVP functionality before adding new features.
- Add request specs for auth, songs, comments, and users
- Add model specs for validations and associations
- Add frontend component tests for player/waveform/playlist UI
- Add integration tests for upload + playback flows
- Add fixtures/factories for users, songs, and comments

**Definition of Done**
- All MVP endpoints have coverage
- Core user flows (upload/play/comment) are tested
- CI runs tests on every PR

---

### 2) Core Playback & Queue (High Impact)
**Goal**: Make playback feel professional and persistent.
- Add queue management (add/remove/reorder/clear)
- Add "Up Next" panel
- Persist queue across page reloads

**Definition of Done**
- Users can manage a queue
- Playback continues across navigation

---

### 3) Engagement (Likes, Reposts, Playlists)
**Goal**: Encourage interaction and repeat listening.
- Likes and like counts
- Reposts (boost tracks into feeds)
- Playlists (public/private)
- Playlist ordering and drag-and-drop

**Definition of Done**
- Users can like, repost, and build playlists

---

### 5) UX Polish & Design System
**Goal**: Move closer to the SoundCloud feel.
- Mini-player bar with queue and scrub preview
- Artwork-driven gradients/theme
- Hover previews on list items
- Accessibility improvements (ARIA, keyboard nav)

**Definition of Done**
- Consistent UI and polished audio experience

---

### 6) Performance & Streaming
**Goal**: Improve stability and scale.
- Range request audio streaming
- CDN/CloudFront for assets
- Waveform precomputation on upload
- Caching for frequent queries

**Definition of Done**
- Faster loads, smoother playback, fewer client-side waveform issues

---

## Action Plan (How We Build Each Item)

For every roadmap item:
1. **Design brief**: define scope, UX, and data model.
2. **API + DB**: schema changes, indexes, and endpoints.
3. **Frontend**: UI flows and interactions.
4. **Tests**: add or update tests for new behavior.
5. **Release**: small, incremental commits with clear messages.

### Incremental Commit Instructions
- Commit after each small working unit (schema, API, UI, tests).
- Keep commits focused: one feature or one concern per commit.
- Example commit flow:
  - `feat(queue): add queue model and API endpoints`
  - `feat(queue-ui): add queue list and controls`
  - `test(queue): add request + UI tests`

### Testing Expectations
- **Backend**: request specs for all API endpoints
- **Models**: validation + association specs
- **Frontend**: component tests for key UI behavior
- **Integration**: end-to-end tests for upload/play/comment

---

## Suggested Milestones

### Milestone 1: Test Coverage + Playback Core
- Finish tests for MVP
- Implement queue + persistent playback

### Milestone 2: Engagement Features
- Likes, reposts, playlists

### Milestone 3: UX Polish
- Mini-player, themed UI, hover previews

### Milestone 4: Discovery & Feed (Backlog)
- Follow graph, feed, trending, search improvements

### Milestone 5: Performance
- Streaming optimization, waveform precompute

### Milestone 6: Creator Tools
- Analytics, draft uploads, release pages

---

## Backlog (Deprioritized for Now)

### Discovery & Feeds
**Goal**: Help users find content.
- Follow graph (user to user)
- Feed of new uploads by followed users
- Trending page with time window scoring
- Search improvements (artist/title/genre)

**Definition of Done**
- Personalized feed and discoverable trending

---

### Creator Tools
**Goal**: Add creator-facing features after core experience is solid.
- Track analytics (plays, listeners, geography)
- Draft uploads and scheduled publishing
- Release pages (albums/EPs)

**Definition of Done**
- Creators have visibility into audience and releases

---

## V2 Goal: Mobile Redesign

### Current State Assessment

The app is **desktop-only**:
- No `@media` queries exist anywhere in the SCSS.
- Fixed pixel widths throughout (200px album covers, 160px stream art, 72px play buttons).
- Sidebar uses a 28%/71% split that breaks below ~900px.
- Player bar assumes a wide viewport with 7+ controls in a row.
- Touch targets are too small (like/repost buttons are ~20px).

### Strategic Decisions

1. **Responsive CSS + PWA over React Native** — the codebase is small; a native wrapper adds maintenance for minimal gain at this stage.
2. **Bottom nav over hamburger menu** — hamburgers hide navigation and increase taps. A fixed bottom bar (Home, Search, Upload, Profile) is faster and more discoverable.
3. **Kill the sidebar on mobile** — "About" and social links add noise. Move them to a dedicated profile section.
4. **Player bar is sacred real estate** — on mobile show only: artwork thumbnail, play/pause, progress scrubber, and a single expand button that reveals the full player + queue.
5. **Dark mode first for mobile** — most listening happens at night; the light gray theme is harsh on small screens.

### File Structure

Add two new partials imported at the end of `application.css`:

```
app/assets/stylesheets/api/
  _breakpoints.scss   # mixin definitions
  _mobile.scss        # mobile-specific overrides
```

Define breakpoints in `_breakpoints.scss`:

```scss
$mobile-max: 600px;
$tablet-max: 900px;

@mixin mobile {
  @media (max-width: $mobile-max) { @content; }
}

@mixin tablet {
  @media (max-width: $tablet-max) { @content; }
}
```

Import them first in `_style.scss` so every file can use the mixins.

---

### Milestone V2-1: Responsive Foundations ✅

**Goal**: Make the app *usable* on phones without component rewrites.

| Area | Change | Notes |
|------|--------|-------|
| Breakpoints | Add `_breakpoints.scss` with `$mobile-max: 600px` and `$tablet-max: 900px` mixins | Import in `_style.scss` before other imports |
| Splash grid | 2-up at tablet, 1-up at mobile | Use `flex-basis` + `@include mobile` to set 100% width |
| Navbar | Hide button text, show icons only below 600px | Keep logo icon, swap "Create Account" for a `+` or user icon |
| Sidebar | Stack below content at tablet; hide entirely at mobile | Use `flex-direction: column` inside `@include tablet` |
| Player bar | Keep sticky bottom; hide shuffle/repeat/queue buttons at mobile | Reveal via an expand chevron |
| Album covers | Scale down to 140px on tablet, 100% width on mobile | Use `max-width` not fixed `width` |

**Definition of Done**:
- All pages render without horizontal scroll at 375px viewport.
- Player bar remains visible and functional.
- Navigation is reachable without scrolling.

---

### Milestone V2-2: Touch-Optimized UX ✅

**Goal**: Feel native, not "desktop shrunk down."

| Area | Change | Notes |
|------|--------|-------|
| Tap targets | Minimum 44×44px for all interactive elements | Apple HIG standard; audit buttons, links, icons |
| Queue panel | Replace popup with slide-up bottom sheet | Animate `transform: translateY()` for performance |
| Song show | Full-bleed artwork hero; collapse comments by default | Expand on tap; keeps focus on playback |
| Forms | Larger input fields (48px height), bigger submit buttons | Mobile keyboards obscure small inputs |

**Definition of Done**:
- No tap target smaller than 44px.
- Queue is accessible via swipe or tap without leaving current view.
- Forms are comfortable to fill on-screen keyboard.

---

### Milestone V2-3: Bottom Navigation

**Goal**: Persistent, thumb-friendly navigation.

| Element | Behavior |
|---------|----------|
| Bar | Fixed at bottom, above player bar; 56px height; 4–5 icons |
| Items | Home (stream), Search, Upload, Profile |
| Active state | Filled icon + accent color; inactive = outline icon |
| Visibility | Hide on scroll-down, reveal on scroll-up (optional polish) |

**Implementation notes**:
- Add a new `BottomNav` React component rendered conditionally when viewport ≤ 600px.
- Use `position: fixed; bottom: 0;` with appropriate `z-index` layering (bottom nav < player bar < modals).
- Adjust `padding-bottom` on main content to prevent overlap.

**Definition of Done**:
- Bottom nav visible on all pages at mobile breakpoint.
- Tapping each icon navigates correctly.
- Player bar remains accessible above bottom nav.

---

### Milestone V2-4: Dark Mode for Mobile

**Goal**: Comfortable night-time listening.

| Token | Light | Dark |
|-------|-------|------|
| `--bg-primary` | `#fff` | `#121212` |
| `--bg-secondary` | `#f2f2f2` | `#1e1e1e` |
| `--text-primary` | `#333` | `#e0e0e0` |
| `--text-secondary` | `#999` | `#888` |
| `--accent` | `#f50` | `#f50` (keep consistent) |

**Implementation notes**:
- Define CSS custom properties in `:root` and override inside `@media (prefers-color-scheme: dark)` or a `.dark-mode` class on `<body>`.
- For mobile-only dark mode, nest inside `@include mobile { ... }`.

**Definition of Done**:
- Dark mode activates automatically based on OS preference.
- Manual toggle works and persists across sessions.
- All text remains readable; no pure-white-on-black (use softer tones).

---

### Milestone V2-5: PWA & Offline Shell

**Goal**: Installable, app-like experience.

| Artifact | Purpose |
|----------|---------|
| `manifest.json` | App name, icons, theme color, `display: standalone` |
| Service worker | Cache app shell (HTML, CSS, JS, fonts) + artwork |
| Offline page | Friendly fallback when network unavailable |

**Implementation notes**:
- Use Workbox (via `workbox-webpack-plugin`) for service worker generation.
- Add `<link rel="manifest" href="/manifest.json">` to `application.html.erb`.
- Test install flow on Android Chrome and iOS Safari (different behaviors).

**Definition of Done**:
- "Add to Home Screen" prompt appears on mobile browsers.
- App launches in standalone mode without browser chrome.
- Offline fallback page renders when network is unavailable.

---

### Mobile Redesign Summary

| Milestone | Focus | Effort |
|-----------|-------|--------|
| V2-1 | Responsive foundations | ✅ Complete |
| V2-2 | Touch UX | ✅ Complete |
| V2-3 | Bottom nav | 1 day |
| V2-4 | Dark mode | 1 day |
| V2-5 | PWA | 1–2 days |

---

### General Mobile Testing Checklist

- [x] No horizontal scroll at 375px (iPhone SE) and 390px (iPhone 14).
- [x] Tap targets ≥ 44px.
- [ ] Player bar and bottom nav don't overlap or obscure content.
- [x] Forms usable with on-screen keyboard open.
- [ ] Dark mode readable and consistent.
- [ ] Offline fallback renders gracefully.
- [ ] Install prompt appears on supported browsers.

---

## V3 Goal: UX Redesign

**Status**: 🟢 Design spec ready (based on provided mockups)

### Design Vision

V3 is a visual and UX overhaul that gives Stereo a modern, polished identity. Key changes:

- **Dark navbar** on desktop with centered search
- **Hero/featured section** for curated content
- **Trending with genre filters** for discovery
- **Redesigned song cards** with inline waveforms
- **Persistent "Now Playing" sidebar** on desktop
- **Full-screen "Now Playing" view** on mobile with tabbed content
- **Dark theme** for mobile by default

### Design Language

| Element | Current | V3 Target |
|---------|---------|-----------|
| Primary background | `#f2f2f2` (light gray) | `#f7f7f7` (softer gray) |
| Navbar | Light with multiple buttons | Dark (`#1a1a1a`) with search + single CTA |
| Accent color | `#f50` (orange) | `#f50` (keep) |
| Cards | Floating with shadows | Subtle rounded corners (8px), minimal shadow |
| Waveforms | Gray bars only | Dual-tone: orange (played) / gray (unplayed) |
| Mobile theme | Light (same as desktop) | Dark (`#121212`) |

### Typography

| Use | Size | Weight |
|-----|------|--------|
| Logo | 24px | 700 |
| Section headers ("Trending") | 28px | 700 |
| Song titles | 16px | 600 |
| Artist names | 14px | 400 |
| Body/comments | 14px | 400 |
| Buttons/labels | 14px | 500 |

---

### Milestone V3-1: Dark Navbar + Search

**Goal**: Replace the current light navbar with a dark, focused header.

| Element | Spec |
|---------|------|
| Background | `#1a1a1a` |
| Logo | "(((Stereo)))" in orange (`#f50`), left-aligned |
| Search | Centered, rounded input (`border-radius: 24px`), placeholder "Search artists, tracks...", search icon (🔍) |
| CTA | Single "Sign up" button (orange bg, white text, rounded) — when logged in, show profile pic |
| Height | 60px |

**Mobile behavior**:
- Hide search input, show search icon that links to `/search`
- Simplify to: logo (left) + search icon + profile/sign-up (right)

**Definition of Done**:
- Navbar matches mockup aesthetic on desktop and mobile
- Search input functional (wire to existing search or stub)
- Single auth CTA or logged-in profile state

---

### Milestone V3-2: Hero / Featured Playlist Section

**Goal**: Add a hero banner to the landing page for featured content.

| Element | Spec |
|---------|------|
| Container | Full width, 180px height, dark background (`#2a2a2a`) with rounded corners (12px) |
| Content | Left-aligned: "Hero / featured playlist" title (white, 20px bold), short subtitle (gray, 14px), "Play all" CTA (text link, orange) |
| Positioning | Below navbar, 24px margin, above trending section |

**Implementation notes**:
- Can be static placeholder initially
- Later: fetch featured playlist from backend and display first track's artwork as blurred background
- On mobile: reduce height to 120px, same layout

**Definition of Done**:
- Hero section renders on splash page
- "Play all" queues featured tracks (or is stubbed)

---

### Milestone V3-3: Trending Section + Genre Filters

**Goal**: Replace current splash grid with a filterable "Trending" section.

| Element | Spec |
|---------|------|
| Header | "Trending" (28px, bold, black) inline with filter pills |
| Filter pills | Horizontal row: "All", "Lo-fi", "Indie", "Hip-hop" (add more as needed) |
| Pill style | `border-radius: 20px`, `padding: 8px 20px`, `border: 2px solid` |
| Active state | Orange text + orange border |
| Inactive state | Gray text (`#666`) + gray border (`#ccc`) |
| Grid | 3 columns desktop, 2 columns tablet, 1 column mobile |

**Implementation notes**:
- Filters are client-side (filter songs by `genre` field)
- "All" shows all songs, others filter by matching genre
- Add hover state: border darkens

**Definition of Done**:
- Genre pills render and are clickable
- Active state visually distinct
- Grid filters correctly by genre

---

### Milestone V3-4: Redesigned Song Cards

**Goal**: Update song cards to match mockup layout.

**Card structure** (top to bottom):
```
┌─────────────────────────────────────┐
│  [Album Art 80x80]  Title           │
│  with play overlay  Artist          │
├─────────────────────────────────────┤
│  [═══════════════════════════════]  │  ← Waveform (full width)
├─────────────────────────────────────┤
│  ♥ 5    ⇄ 1                 Queue   │  ← Engagement row
└─────────────────────────────────────┘
```

| Element | Spec |
|---------|------|
| Card | White background, `border-radius: 12px`, subtle shadow `0 2px 8px rgba(0,0,0,0.08)` |
| Album art | 80×80px, `border-radius: 8px`, positioned top-left with 12px padding |
| Play overlay | Orange triangle (▶), centered on album art, appears on hover (desktop) or always visible (mobile) |
| Title | 16px, bold, truncate with ellipsis, beside album art |
| Artist | 14px, gray (`#666`), link to profile |
| Waveform | Full card width minus padding, ~40px height |
| Waveform colors | Played = orange (`#f50`), Unplayed = gray (`#ccc`) |
| Engagement row | Heart icon + count, repost icon + count, "Queue" text button — right-aligned |
| Icons | Heart (♥), Repost (⇄ or ↻), 14px, gray, orange when active |

**Definition of Done**:
- Cards match mockup layout
- Play overlay works on hover/tap
- Waveform shows playback progress with dual colors
- Engagement actions functional

---

### Milestone V3-5: "Now Playing" Sidebar (Desktop)

**Goal**: Add a persistent right sidebar showing current track and queue.

| Element | Spec |
|---------|------|
| Width | 320px fixed, right side of viewport |
| Background | White, subtle left border (`#e0e0e0`) |
| Header | "Now Playing" (16px, bold, black) |
| Current track section | Album art (60×60, rounded), title (16px bold), artist (14px gray), play/pause button (orange) |
| Mini waveform | Below current track, orange/gray dual-tone, ~30px height |
| "Up Next" header | 14px, bold, with track count |
| Queue list | Scrollable, max-height 50vh; each item: title (14px), artist (12px gray), "Remove" link (orange, right-aligned) |

**Visibility**:
- Only show on desktop (≥ 900px viewport)
- Hide on splash page if no song is playing

**Implementation notes**:
- Pull from Redux `playControls.queue` state
- Clicking queued track plays it immediately
- "Remove" removes from queue without stopping playback

**Definition of Done**:
- Sidebar renders on desktop when a song is playing
- Current track updates in real-time
- Queue is manageable (add/remove/skip)

---

### Milestone V3-6: Full-Screen "Now Playing" (Mobile)

**Goal**: Create a dedicated mobile view for the currently playing track.

**Layout** (top to bottom):
```
┌─────────────────────────────────────┐
│  ←  Now Playing                 ... │  ← Header
├─────────────────────────────────────┤
│                                     │
│         ┌───────────────┐           │
│         │               │           │
│         │    Artwork    │           │  ← Large artwork (70% width)
│         │               │           │
│         └───────────────┘           │
│                                     │
│         dontcry - redbone           │  ← Title (20px bold, white)
│           Demo User                 │  ← Artist (16px gray)
│                                     │
│  ════════════════════════════════   │  ← Waveform with progress
│  0:42                        2:30   │  ← Timestamps
│                                     │
│     ⇄      ▶▶      ≡       ♥        │  ← Action icons (48px tap targets)
│                                     │
├─────────────────────────────────────┤
│  [Comments]  Up Next   Details      │  ← Tab bar
├─────────────────────────────────────┤
│  (Tab content scrollable area)      │
│  • Comments list                    │
│  • Sign in to comment prompt        │
└─────────────────────────────────────┘
```

| Element | Spec |
|---------|------|
| Background | Dark (`#121212`) |
| Header | Back arrow (←) left, "Now Playing" center (16px white), "..." menu right |
| Artwork | Square, 70% viewport width, centered, `border-radius: 12px` |
| Title | 20px, bold, white, centered |
| Artist | 16px, gray (`#888`), centered |
| Waveform | Full width (minus padding), 60px height, orange/gray dual-tone |
| Timestamps | 14px, gray, left (current) and right (duration) |
| Action icons | Shuffle (⇄), Play/Pause (▶/▐▐), Queue (≡), Like (♥) — 48px tap targets, orange accent |
| Tab bar | 3 tabs: "Comments" (active = orange bg, rounded), "Up Next", "Details" |
| Tab content | Scrollable, shows comments list OR queue OR track details |

**Comments tab content**:
- User avatar (40px circle, blue placeholder)
- Username + "• 4d ago" timestamp
- Comment text (14px, white)
- "Sign in to comment" prompt with orange "Sign in" button

**Definition of Done**:
- Tapping mini player opens full-screen view
- All tabs functional (Comments loads from API, Up Next from queue, Details shows metadata)
- Actions work (like, queue toggle, shuffle)
- Back arrow returns to previous view

---

### Milestone V3-7: Mini Player (Mobile)

**Goal**: Persistent mini player that expands to full "Now Playing" view.

| Element | Spec |
|---------|------|
| Height | 64px, fixed at bottom |
| Background | Dark (`#1e1e1e`) |
| Layout | Album art (48px, left) → title/artist (truncated, center) → play/pause (48px, right) |
| Progress | Optional thin orange line at top (2px) showing playback progress |
| Tap behavior | Tap anywhere (except play/pause) opens full "Now Playing" |

**z-index layering**:
- Mini player: `z-index: 100`
- Bottom nav (if present): `z-index: 99`
- Modals: `z-index: 1000`

**Definition of Done**:
- Mini player visible when a track is playing on mobile
- Tap expands to full view
- Play/pause works inline without expanding

---

### V3 Summary

| Milestone | Focus | Effort |
|-----------|-------|--------|
| V3-1 | Dark navbar + search | 1 day |
| V3-2 | Hero section | 0.5 day |
| V3-3 | Trending + genre filters | 1 day |
| V3-4 | Song card redesign | 2 days |
| V3-5 | Desktop "Now Playing" sidebar | 1.5 days |
| V3-6 | Mobile full-screen "Now Playing" | 2 days |
| V3-7 | Mini player | 1 day |

**Total**: ~9 days of focused work

---

### V3 Color Tokens

```scss
// Light theme (desktop default)
$v3-bg-primary: #f7f7f7;
$v3-bg-card: #ffffff;
$v3-bg-navbar: #1a1a1a;
$v3-text-primary: #333333;
$v3-text-secondary: #666666;
$v3-accent: #f50;
$v3-border: #e0e0e0;
$v3-waveform-played: #f50;
$v3-waveform-unplayed: #cccccc;

// Dark theme (mobile)
$v3-dark-bg-primary: #121212;
$v3-dark-bg-secondary: #1e1e1e;
$v3-dark-bg-card: #2a2a2a;
$v3-dark-text-primary: #e0e0e0;
$v3-dark-text-secondary: #888888;
```

---

### V3 New Components Checklist

- [ ] `NavbarV3` — dark, centered search, single CTA
- [ ] `HeroSection` — featured playlist banner
- [ ] `GenreFilters` — horizontal pill tabs
- [ ] `SongCardV3` — new layout with inline waveform
- [ ] `WaveformDual` — dual-color waveform (played/unplayed)
- [ ] `NowPlayingSidebar` — desktop queue panel
- [ ] `NowPlayingFull` — mobile full-screen view
- [ ] `MiniPlayer` — mobile collapsed player
- [ ] `TabBar` — Comments / Up Next / Details switcher
- [ ] `CommentListDark` — dark-themed comment list

---

### V3 Testing Checklist

- [ ] Navbar renders correctly on desktop and mobile
- [ ] Search input is functional
- [ ] Hero section displays (static or dynamic)
- [ ] Genre filters work and persist active state
- [ ] Song cards match mockup layout
- [ ] Waveforms show dual-color progress
- [ ] Desktop sidebar shows current track and queue
- [ ] Mobile mini player expands to full view
- [ ] All tabs in full view are functional
- [ ] Dark theme applied consistently on mobile
