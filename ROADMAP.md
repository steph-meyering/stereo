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

### 4) Discovery & Feeds
**Goal**: Help users find content.
- Follow graph (user to user)
- Feed of new uploads by followed users
- Trending page with time window scoring
- Search improvements (artist/title/genre)

**Definition of Done**
- Personalized feed and discoverable trending

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

### 7) Creator Tools (Bottom Priority)
**Goal**: Add creator-facing features after core experience is solid.
- Track analytics (plays, listeners, geography)
- Draft uploads and scheduled publishing
- Release pages (albums/EPs)

**Definition of Done**
- Creators have visibility into audience and releases

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

### Milestone 4: Discovery & Feed
- Follow graph, feed, trending, search improvements

### Milestone 5: Performance
- Streaming optimization, waveform precompute

### Milestone 6: Creator Tools
- Analytics, draft uploads, release pages

---

## V2 Goal: Mobile Redesign (Recommended Path)

### Phase 1: Responsive Foundations (Fastest)
- Add responsive breakpoints (768px, 600px, 480px)
- Convert song grid to 2-up → 1-up on small screens
- Ensure player remains sticky at bottom
- Replace hover interactions with tap-friendly controls

### Phase 2: Mobile UX Polish
- Bottom nav for primary sections (Home, Search, Profile)
- Collapsible sections on song show (comments, related)
- Slide-up queue panel for Up Next
- Larger tap targets, consistent spacing

### Phase 3: PWA Enhancements
- Add manifest + install prompt
- Offline shell (metadata + artwork caching)
- Graceful fallback for audio when offline
