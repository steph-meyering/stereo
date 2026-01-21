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

## V3 Goal: UX/UI Revamp (Mobile-First)

**Status**: 🟢 Design spec ready (PRD + mockups integrated)

### Background

Stereo is a lightweight SoundCloud-inspired listening experience with likes, reposts, comments, and a queue/player. The current UI works functionally but suffers from:
- Inconsistent layout and weak visual hierarchy
- Non-native mobile patterns (table-like queue, crowded track pages)
- "Everything floats" feel without clear structure

### Goals

**Primary Goals (Must Have)**
1. Make the mobile experience feel like a real music app
2. Improve scanability (discover music faster)
3. Make player + queue clear, persistent, and delightful
4. Establish a reusable design system + component library

**Secondary Goals (Nice to Have)**
- Improve desktop with a "control center" (queue/player sidebar)
- Reduce perceived load time with skeleton states

### Non-Goals
- Rebuilding recommendation logic or changing backend models
- Introducing creator upload flows
- Redesigning auth flows beyond visual cleanup

### Success Metrics (KPIs)

| Metric | Target |
|--------|--------|
| Play starts per session | +15–25% |
| Queue adds per session | +10–20% |
| Likes/reposts per play | +5–15% |
| Time-to-first-play | Reduce |
| Sign-in conversion from comment CTA | Measurable lift |

### Target Users

| Persona | Behavior |
|---------|----------|
| **Lean-back listener** | Wants quick play + continuous listening |
| **Curator** | Builds a queue, removes/reorders, shares tracks |
| **Social listener** | Reads and posts comments, likes/reposts |

### Core User Stories

1. As a user, I can quickly play a trending track from the feed.
2. As a user, I can add to queue from anywhere in one tap.
3. As a user, I can open Now Playing and scrub via waveform.
4. As a user, I can view Up Next and remove items easily.
5. As a user, I can read comments comfortably and sign in to comment.

---

## V3 Rollout Phases

### Phase 1: Design System + TrackCard + MiniPlayer
### Phase 2: Now Playing + Queue Sheet
### Phase 3: Profile/Activity + Desktop Sidebar
### Phase 4: Polish, Motion, Skeletons, Accessibility QA

---

## V3-0: Design System Foundation (Do This First)

**Goal**: Establish tokens and reusable primitives before building components.

### Color Tokens

```scss
// CSS Custom Properties (define in :root)

// Backgrounds
--bg: #f7f7f7;           // Primary background (light)
--surface: #ffffff;       // Cards, panels
--surface-elevated: #fff; // Modals, sheets

// Text
--text: #333333;          // Primary text
--muted: #666666;         // Secondary text, timestamps
--disabled: #999999;      // Disabled states

// Accent
--accent: #f50;           // Stereo orange (SoundCloud-esque)
--accent-hover: #e04500;  // Darker on hover
--accent-muted: rgba(255, 85, 0, 0.1); // Subtle backgrounds

// Borders
--border: #e0e0e0;
--border-light: #f0f0f0;

// Waveform
--waveform-played: #f50;
--waveform-unplayed: #cccccc;

// Dark theme (mobile)
--dark-bg: #121212;
--dark-surface: #1e1e1e;
--dark-surface-elevated: #2a2a2a;
--dark-text: #e0e0e0;
--dark-muted: #888888;
```

### Spacing Scale (8pt Grid)

| Token | Value | Use |
|-------|-------|-----|
| `--space-1` | 4px | Tight gaps |
| `--space-2` | 8px | Default gap |
| `--space-3` | 12px | Card padding |
| `--space-4` | 16px | Section gaps |
| `--space-5` | 24px | Large gaps |
| `--space-6` | 32px | Page margins |
| `--space-8` | 48px | Hero padding |

### Border Radius

| Token | Value | Use |
|-------|-------|-----|
| `--radius-sm` | 4px | Buttons, pills |
| `--radius-md` | 8px | Cards, inputs |
| `--radius-lg` | 12px | Panels, artwork |
| `--radius-xl` | 16px | Modals |
| `--radius-full` | 9999px | Avatars, pills |

### Typography Scale

| Token | Size | Weight | Use |
|-------|------|--------|-----|
| `--text-xs` | 12px | 400 | Timestamps, captions |
| `--text-sm` | 14px | 400 | Body, secondary |
| `--text-base` | 16px | 400 | Default body |
| `--text-md` | 16px | 600 | Song titles |
| `--text-lg` | 20px | 600 | Now Playing title |
| `--text-xl` | 24px | 700 | Section headers |
| `--text-2xl` | 28px | 700 | Page titles |

### Implementation

Create `app/assets/stylesheets/api/_tokens.scss`:

```scss
:root {
  // Colors
  --bg: #f7f7f7;
  --surface: #ffffff;
  --text: #333333;
  --muted: #666666;
  --accent: #f50;
  --border: #e0e0e0;
  --waveform-played: #f50;
  --waveform-unplayed: #ccc;
  
  // Spacing
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;
  --space-6: 32px;
  
  // Radius
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 9999px;
  
  // Typography
  --text-xs: 12px;
  --text-sm: 14px;
  --text-base: 16px;
  --text-lg: 20px;
  --text-xl: 24px;
}

// Dark theme
@include mobile {
  :root {
    --bg: #121212;
    --surface: #1e1e1e;
    --text: #e0e0e0;
    --muted: #888888;
    --border: #333333;
  }
}
```

**Definition of Done**:
- `_tokens.scss` created and imported first in `_style.scss`
- All new components use tokens instead of hardcoded values
- Dark theme applies on mobile via tokens

---

## V3-1: Layout Structure

**Goal**: Establish consistent page structure across all views.

### Mobile Layout Stack

```
┌─────────────────────────────────────┐
│  TopBar (fixed, 56px)               │
├─────────────────────────────────────┤
│                                     │
│  Scrollable Content                 │
│  (flex: 1, overflow-y: auto)        │
│                                     │
├─────────────────────────────────────┤
│  MiniPlayer (conditional, 64px)     │
├─────────────────────────────────────┤
│  BottomTabs (fixed, 56px)           │
└─────────────────────────────────────┘
```

### Desktop Layout

```
┌─────────────────────────────────────────────────────────────┐
│  Navbar (fixed, 60px)                                       │
├───────────────────────────────────────────┬─────────────────┤
│                                           │                 │
│  Main Content                             │  Now Playing    │
│  (flex: 1)                                │  Sidebar        │
│                                           │  (320px fixed)  │
│                                           │                 │
├───────────────────────────────────────────┴─────────────────┤
│  Player Bar (fixed, 80px)                                   │
└─────────────────────────────────────────────────────────────┘
```

### Bottom Tabs (Mobile)

| Tab | Icon | Route |
|-----|------|-------|
| Home | 🏠 | `/` |
| Search | 🔍 | `/search` |
| Library | 📚 | `/library` |
| Profile | 👤 | `/users/:id` |

**Definition of Done**:
- Layout wrapper component created
- Fixed header/footer don't scroll with content
- MiniPlayer appears when audio is active
- BottomTabs shows on mobile only

---

## V3-2: Core Components (Build in This Order)

### 1. TopBar

| Element | Desktop | Mobile |
|---------|---------|--------|
| Logo | "(((Stereo)))" orange text | "(((S)))" or icon |
| Search | Centered input, 400px max | Icon only, links to `/search` |
| Auth | "Sign up" button or profile pic | Same, smaller |

### 2. BottomTabs

- 4 tabs with icons and optional labels
- Active = orange fill, inactive = outline
- 56px height, safe area padding for notched phones

### 3. MiniPlayer

| Element | Spec |
|---------|------|
| Height | 64px |
| Layout | Artwork (48px) → Title/Artist (truncated) → Play/Pause (48px) |
| Background | `--surface` with top border |
| Progress | 2px orange line at top |
| Tap | Opens full Now Playing (except play/pause) |

### 4. TrackCard

**Structure:**
```
┌─────────────────────────────────────┐
│  [Artwork 80px]  Title              │
│  + play overlay  Artist             │
├─────────────────────────────────────┤
│  [════════════ Waveform ══════════] │
├─────────────────────────────────────┤
│  ♥ 5    ↻ 1              •••        │
└─────────────────────────────────────┘
```

| Element | Spec |
|---------|------|
| Artwork | 80×80px, `--radius-lg`, play overlay on hover/tap |
| Title | `--text-md` (16px/600), truncate |
| Artist | `--text-sm` (14px), `--muted`, link to profile |
| Waveform | Full width, 40px height, dual-color |
| Actions | Like + count, Repost + count, Overflow menu (•••) |
| Overflow menu | Add to queue, Share, Go to track |

### 5. WaveformSeek

- Dual-color: `--waveform-played` / `--waveform-unplayed`
- Tappable/draggable for seeking
- Shows current time on drag
- Fixed aspect ratio to prevent layout shift

### 6. BottomSheet

- Slides up from bottom (`transform: translateY`)
- Drag handle at top (24px, rounded)
- Backdrop with opacity fade
- Content scrollable
- Used for: Queue, Overflow menu, Comments

### 7. CommentList + CommentComposer

**CommentList:**
- Compact avatars (36px)
- Name + "• Xd ago" timestamp
- Readable text (14px)
- Signed-out: small "Sign in to comment" CTA (not a huge bar)

**CommentComposer:**
- Input: 48px height, placeholder "Add a comment..."
- Submit button: orange, icon or text
- Disabled state when not signed in

**Definition of Done**:
- All 7 components built and styled with tokens
- Components work on both mobile and desktop
- Actions (play, like, queue) are functional

---

## V3-3: Now Playing View

### Mobile Full-Screen

```
┌─────────────────────────────────────┐
│  ←  Now Playing                 ••• │
├─────────────────────────────────────┤
│                                     │
│         ┌───────────────┐           │
│         │    Artwork    │           │
│         │   (70% width) │           │
│         └───────────────┘           │
│                                     │
│         dontcry - redbone           │
│           Demo User                 │
│                                     │
│  ══════════════════════════════════ │
│  0:42                        2:30   │
│                                     │
│     ⇄      ◀◀     ▶▶      ≡    ♥   │
│                                     │
├─────────────────────────────────────┤
│  [Comments]  Up Next   Details      │
├─────────────────────────────────────┤
│  (Tab content - scrollable)         │
└─────────────────────────────────────┘
```

| Element | Spec |
|---------|------|
| Artwork | 70vw, centered, `--radius-lg` |
| Title | `--text-lg` (20px/600), white |
| Artist | `--text-base`, `--dark-muted` |
| Waveform | Full width, 60px, draggable seek |
| Actions | 48px tap targets, `--accent` when active |
| Tabs | Comments (orange bg active), Up Next, Details |

### Tabs Content

**Comments Tab:**
- Scrollable list of comments for current track
- CommentComposer at bottom (or sign-in CTA)

**Up Next Tab:**
- Queue list with artwork thumbnails
- Remove button per item (icon, not link)
- Clear all button in header
- (Later: drag to reorder)

**Details Tab:**
- Track metadata: genre, upload date, description
- Artist info with link to profile

**Definition of Done**:
- Full-screen view opens from MiniPlayer tap
- All tabs functional with real data
- Back arrow returns to previous view
- Actions work (like, queue, shuffle)

---

## V3-4: Queue (Mobile)

**Goal**: Replace table queue with a proper bottom sheet.

| Element | Spec |
|---------|------|
| Trigger | Queue icon (≡) in Now Playing or MiniPlayer |
| Sheet height | 70vh max, dismissible by drag or backdrop tap |
| Header | "Up Next" + track count + "Clear All" button |
| Items | Artwork (40px) + Title/Artist + Remove icon (×) |
| Row height | 56px minimum for thumb-friendly taps |
| Active track | Highlighted with accent border or background |

**Interactions:**
- Tap item = play immediately
- Remove = icon button, not text link
- Clear All = confirmation or immediate (with undo toast)
- (Later iteration: drag reorder)

**Definition of Done**:
- Queue opens as bottom sheet
- Add/remove/clear functional
- Tall rows are easy to tap

---

## V3-5: Desktop Sidebar (Now Playing)

**Goal**: Persistent right sidebar for queue management on desktop.

| Element | Spec |
|---------|------|
| Width | 320px, fixed on right |
| Visibility | ≥900px viewport only |
| Header | "Now Playing" |
| Current track | Artwork (60px) + Title + Artist + Play/Pause |
| Mini waveform | Below current track |
| "Up Next" | Scrollable queue list, max-height 50vh |
| Queue items | Title + Artist + Remove |

**Definition of Done**:
- Sidebar renders on desktop
- Updates in real-time as queue changes
- Clicking queued track plays it

---

## V3-6: Feed + Discovery (Desktop Improvements)

| Area | Change |
|------|--------|
| Hero | Reduce height, add "Play all" CTA |
| Genre filters | Horizontal pills: All, Lo-fi, Indie, Hip-hop |
| Grid | 3 columns, TrackCard layout |
| Hover states | Play button overlay, subtle lift |
| Keyboard | Focus rings on all interactive elements |

**Definition of Done**:
- Desktop feed uses new TrackCard layout
- Genre filters work
- Hover and focus states polished

---

## V3-7: Polish Phase

### Motion & Microinteractions

| Interaction | Effect |
|-------------|--------|
| Button press | `scale(0.96)` + opacity shift |
| Sheet open | `translateY(100%) → translateY(0)`, 300ms ease-out |
| Like/repost | Heart/icon fills with subtle bounce |
| Play button | Smooth transition between play/pause icons |
| Waveform seek | Thumb follows touch with time tooltip |

### Skeleton States

- TrackCard skeleton: gray rectangles for artwork, title, waveform
- CommentList skeleton: avatar circles + text lines
- Show skeletons during API fetch, fade to content

### Empty States

| State | Message |
|-------|---------|
| Empty queue | "Your queue is empty. Add some tracks!" |
| No comments | "Be the first to comment." |
| No search results | "No tracks found. Try a different search." |

### Accessibility Audit

- [ ] Minimum 4.5:1 contrast ratio for all text
- [ ] All tap targets ≥ 44px
- [ ] Focus rings visible on keyboard navigation
- [ ] ARIA labels on icon-only buttons
- [ ] Screen reader announces player state changes

**Definition of Done**:
- Press states feel responsive
- Skeletons appear during loading
- Empty states are friendly
- Accessibility checklist passes

---

## V3 Analytics Events

Track these events for KPI measurement:

| Event | Parameters |
|-------|------------|
| `play_started` | track_id, source (feed/queue/search) |
| `play_paused` | track_id, position |
| `track_opened` | track_id |
| `queue_add` | track_id, source |
| `queue_remove` | track_id |
| `queue_clear` | queue_length |
| `like` | track_id |
| `repost` | track_id |
| `now_playing_opened` | track_id |
| `comments_tab_opened` | track_id |
| `up_next_tab_opened` | queue_length |
| `signin_cta_clicked` | source (comments/nav) |

---

## V3 Summary

| Phase | Milestones | Effort |
|-------|------------|--------|
| **Phase 1** | V3-0 (Design System) + V3-1 (Layout) + V3-2 (Components) | 3–4 days |
| **Phase 2** | V3-3 (Now Playing) + V3-4 (Queue Sheet) | 3–4 days |
| **Phase 3** | V3-5 (Desktop Sidebar) + V3-6 (Feed/Discovery) | 2–3 days |
| **Phase 4** | V3-7 (Polish, Motion, Accessibility) | 2–3 days |

**Total**: ~10–14 days of focused work

---

## V3 Component Checklist

- [ ] `_tokens.scss` — design tokens
- [ ] `TopBar` — dark navbar, search, auth
- [ ] `BottomTabs` — mobile navigation
- [ ] `MiniPlayer` — collapsed player
- [ ] `TrackCard` — redesigned song card
- [ ] `WaveformSeek` — dual-color, interactive
- [ ] `BottomSheet` — reusable slide-up panel
- [ ] `NowPlayingFull` — mobile full-screen view
- [ ] `NowPlayingSidebar` — desktop queue panel
- [ ] `QueueList` — queue items with remove
- [ ] `CommentList` — styled for dark theme
- [ ] `CommentComposer` — input + sign-in CTA
- [ ] `GenreFilters` — horizontal pills
- [ ] `HeroSection` — featured playlist banner

---

## V3 QA Checklist

### Visual / Layout
- [ ] Text truncation works (long titles/artists)
- [ ] Empty states render (no queue, no comments)
- [ ] Loading states render (skeleton cards)
- [ ] Audio keeps playing while navigating
- [ ] Dark theme consistent on mobile
- [ ] No layout shift from images (fixed aspect ratios)

### Touch / Interaction
- [ ] All tap targets ≥ 44px
- [ ] Press states provide feedback
- [ ] Sheet drag-to-dismiss works
- [ ] Waveform seek is smooth

### Accessibility
- [ ] Contrast ratio ≥ 4.5:1 for text
- [ ] Focus rings visible on keyboard nav
- [ ] Icon buttons have ARIA labels
- [ ] Player state announced to screen readers

### Responsiveness
- [ ] Mobile layout correct at 375px
- [ ] Tablet layout correct at 768px
- [ ] Desktop layout correct at 1200px+
- [ ] Sidebar hidden below 900px
