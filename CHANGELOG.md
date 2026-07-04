# CHANGELOG

This is a running summary checklist of work completed and what is still pending.

## ✅ Done
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
