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
- Add “Up Next” panel
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

### Milestone V2-1: Responsive Foundations

**Goal**: Make the app *usable* on phones without component rewrites.

| Area | Change | Notes |
|------|--------|-------|
| Breakpoints | Add `_breakpoints.scss` with `$mobile-max: 600px` and `$tablet-max: 900px` mixins | Import in `_style.scss` before other imports |
| Splash grid | 2-up at tablet, 1-up at mobile | Use `flex-basis` + `@include mobile` to set 100% width |
| Navbar | Hide button text, show icons only below 600px | Keep logo icon, swap "Create Account" for a `+` or user icon |
| Sidebar | Stack below content at tablet; hide entirely at mobile | Use `flex-direction: column` inside `@include tablet` |
| Player bar | Keep sticky bottom; hide shuffle/repeat/queue buttons at mobile | Reveal via an expand chevron |
| Album covers | Scale down to 140px on tablet, 100% width on mobile | Use `max-width` not fixed `width` |

**Design guidance**:
- Don't shrink fonts below 14px; instead reduce padding and hide secondary elements.
- Test on a real phone, not just DevTools — scroll momentum and tap feedback differ.

**Definition of Done**:
- All pages render without horizontal scroll at 375px viewport.
- Player bar remains visible and functional.
- Navigation is reachable without scrolling.

---

### Milestone V2-2: Touch-Optimized UX

**Goal**: Feel native, not "desktop shrunk down."

| Area | Change | Notes |
|------|--------|-------|
| Tap targets | Minimum 44×44px for all interactive elements | Apple HIG standard; audit buttons, links, icons |
| Song rows | Swipe-right gesture to queue | Use a lightweight swipe library or CSS + JS; keep "Add to Queue" button as fallback |
| Queue panel | Replace popup with slide-up bottom sheet | Animate `transform: translateY()` for performance |
| Song show | Full-bleed artwork hero; collapse comments by default | Expand on tap; keeps focus on playback |
| Forms | Larger input fields (48px height), bigger submit buttons | Mobile keyboards obscure small inputs |

**Design guidance**:
- Use `touch-action: manipulation` on buttons to remove 300ms tap delay.
- Add `:active` states with subtle scale or color shift — visual feedback matters on touch.
- Avoid hover-only interactions; anything revealed on hover must be tappable or always visible on mobile.

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

**Design guidance**:
- Use SVG icons for crispness; avoid icon fonts.
- Keep labels short (one word) or omit entirely if icons are unambiguous.
- Player bar sits *above* bottom nav so controls are always reachable.

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

**Design guidance**:
- Don't invert images; artwork should stay as-is.
- Use `prefers-color-scheme: dark` media query so it respects OS setting.
- Provide a manual toggle (moon icon in navbar) that stores preference in `localStorage`.

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

**Design guidance**:
- Cache album artwork aggressively (immutable URLs); audio files are too large to cache fully.
- Show a toast or banner when offline: "You're offline — playback may be limited."
- Preload next track's waveform data during current playback for smoother transitions.

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
| V2-1 | Responsive foundations | 1–2 days |
| V2-2 | Touch UX | 2–3 days |
| V2-3 | Bottom nav | 1 day |
| V2-4 | Dark mode | 1 day |
| V2-5 | PWA | 1–2 days |

Total: ~6–9 days of focused work.

---

### General Mobile Testing Checklist

- [ ] No horizontal scroll at 375px (iPhone SE) and 390px (iPhone 14).
- [ ] Tap targets ≥ 44px.
- [ ] Player bar and bottom nav don't overlap or obscure content.
- [ ] Forms usable with on-screen keyboard open.
- [ ] Dark mode readable and consistent.
- [ ] Offline fallback renders gracefully.
- [ ] Install prompt appears on supported browsers.
