# CHANGELOG

This is a running summary checklist of work completed and what is still pending.

## ✅ Done
- ESLint 9 flat config: zero errors, 34 warnings (pre-existing code smells downgraded); rules no-extra-boolean-cast, react/no-unescaped-entities, react/jsx-no-target-blank downgraded to warn; no-case-declarations off for reducer switch blocks
- Rubocop gate: rubocop + rubocop-rails added; Metrics/Style/Layout/Naming/Rails departments disabled; Bundler/OrderedGems disabled; Security/Open excluded for db/seeds.rb; exits 0 on 86 files
- GitHub Actions CI: three jobs (backend: Rails test + Rubocop; frontend: ESLint + Jest + Webpack; audit: npm audit --audit-level=critical); postgres:16 service with health check; ruby/setup-ruby@v1 with bundler-cache
- Jest test suite: 23 tests across 3 suites (current_song_reducer, play_queue_reducer, volume_controls)
- npm audit safe fix: 31 vulnerabilities reduced to 24 (safe fixes only; webpack 4 tree carries remaining high/moderate issues pending webpack 5 upgrade)
- DB integrity migrations: foreign key and uniqueness constraints on key associations
- API privacy fixes: email and admin fields excluded from user JSON responses; private playlists filtered from public API
- users#update endpoint: added PATCH support for user profile updates
- Redux queue immutability fix: play_queue_reducer now uses Object.freeze + Object.assign pattern throughout
- VolumeControls memory leak fix: audio event listeners properly cleaned up on unmount
- Added V3 Now Playing full-screen overlay with waveform seek, transport controls, and Up Next list
- Wired mini player tap to open/close Now Playing overlay; preserved play/pause behavior
- Styled Now Playing view (header, artwork, controls, tabs, queue list)
- Stabilized waveform placeholder bars so they no longer randomize each render
- Fixed TrackCard play/pause icon to use CSS pause bars (no warped glyphs)
- Fixed home page white bars by aligning backgrounds to `var(--bg)` across layout
- Brightened TopBar content so text/icons render light on the dark navbar
- Removed Details tab and desktop Now Playing button (per UX feedback)
- Hooked Now Playing Comments tab to real data + composer
- Improved Up Next removal to handle duplicate queue items

## 🟡 In Progress / Next
- Add compact comment list styling for Now Playing (mobile-first)

## 🔜 Later / Roadmap (V3)
- Now Playing: finish tabs (Comments, Up Next) polish and interactions
- Queue bottom sheet (mobile) and desktop Now Playing sidebar
- Feed/Discovery polish (hover states, layout improvements)
- Motion/skeleton/empty states + accessibility QA
