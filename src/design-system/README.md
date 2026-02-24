# Job Notification App — Design System

Design system foundation for a premium B2C Job Notification App. Calm, intentional, coherent.

## Design Philosophy

- Calm, intentional, coherent, confident
- No gradients, glassmorphism, neon colors, or animation noise
- Maximum 4 colors across entire UI

## Tokens

| Token | Value |
|-------|-------|
| Background | `#F7F6F3` |
| Primary text | `#111111` |
| Accent | `#8B0000` |
| Success | `#4A5D4A` |
| Warning | `#8B6914` |

**Spacing scale only:** 8px, 16px, 24px, 40px, 64px

**Typography:**
- Headings: Cormorant Garamond (serif)
- Body: Source Sans 3 (sans-serif), 17px, line-height 1.7

## Layout Structure

```
[Top Bar] → [Context Header] → [Primary (70%)] + [Secondary (30%)] → [Proof Footer]
```

## Components

- `TopBar` — App name, progress, status badge
- `ContextHeader` — Headline, subtext
- `MainContent`, `PrimaryWorkspace`, `SecondaryPanel`
- `ProofFooter` — Checklist (UI Built, Logic Working, Test Passed, Deployed)
- `Button` (primary, secondary)
- `Input`, `Card`, `Badge`, `PromptBox`

## Interaction

- Transitions: 180ms ease-in-out
- No bounce, no parallax
