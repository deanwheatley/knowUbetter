# Layout Structure

## Global Layout

**IMPORTANT**: Header and Footer are ALWAYS displayed on every page/tab.

```
╔════════════════════════════════════════════════════════════════════════════════╗
║                              HEADER (ALWAYS VISIBLE)                           ║
║  🎮 knowUbetter  [Dashboard] [Quiz] [Props] [Questions] [Leaderboards]        ║
╠════════════════════════════════════════════════════════════════════════════════╣
║                                                                                ║
║                                                                                ║
║                                                                                ║
║                            MAIN CONTENT AREA                                   ║
║                         (Changes based on tab)                                 ║
║                                                                                ║
║                                                                                ║
║                                                                                ║
╠════════════════════════════════════════════════════════════════════════════════╣
║                             FOOTER (ALWAYS VISIBLE)                            ║
║  📢  Scrolling notifications: Alice is now #1!  •  Bob sent props  •  ... ⟳   ║
╚════════════════════════════════════════════════════════════════════════════════╝
```

## Header Components
- Logo/Brand (🎮 knowUbetter)
- Navigation tabs:
  - Dashboard
  - Quiz
  - Props
  - Questions (Question Builder)
  - Leaderboards
  - Admin (only visible to admin users)
- Active tab highlighted with ▶ or different styling

## Footer Components
- Notification scroller (auto-scrolling, horizontal)
- Shows recent activity:
  - Leaderboard changes
  - Props sent/received
  - Badges earned
  - New questions approved
  - Streaks achieved
- Refresh icon (⟳) to manually update

## Main Content Area
- Changes based on selected tab
- Scrollable if content exceeds viewport
- Consistent padding/margins
