# Syndicate Championship Wrestling (SCW) — Website

A static kayfabe wrestling promotion site. Pure HTML/CSS/JS — no build tools, no dependencies. Just open it in a browser.

## Pages
| File | Purpose |
|------|---------|
| `index.html` | Home — hero, next event, featured wrestlers, stats, latest news |
| `roster.html` | Full roster with working category filters |
| `events.html` | Featured event + match card, upcoming shows, past results |
| `championships.html` | Title belts, current champions, recent title changes |
| `news.html` | Storyline articles, trending sidebar, newsletter signup |
| `media.html` | Media vault — videos, photo gallery (lightbox), entrance themes, documents |

## How to view it
Double-click `index.html`, or run a local server for the cleanest experience:

```bash
# Python (built in on most machines)
python -m http.server 8000
# then open http://localhost:8000
```

## How to edit content
Everything is plain HTML — search for the wrestler name, event, or headline you want to change and edit the text directly.

- **Add a wrestler:** copy any `<article class="card fighter ...">` block in `roster.html`. Change the name, nickname, height/weight, initials in `<span class="silhouette">`, and the `data-tags` (used by the filters: `men women tag champ heel face`).
- **Add a real photo:** inside `.photo`, replace `<span class="silhouette">CV</span>` with `<img src="images/your-photo.jpg" alt="Name" />`.
- **Add an event:** copy an `.event` block in `events.html`.
- **Add a champion / title:** copy a `.belt` block in `championships.html`.
- **Add a news post:** copy an `.article` block in `news.html`.

## Embedding files (video / images / PDF / audio)
Drop files into the `media/` subfolders (or paste a YouTube/Vimeo link) and use the
ready-made snippets. **Full instructions with copy-paste code are in `media/README.md`.**
The `media.html` page shows a live example of every embed type. Embeds work anywhere —
inside a news post, an event, a roster spotlight, or the media page.

## Design tokens
Colors and fonts live at the top of `css/styles.css` under `:root` — change `--blood`, `--gold`, etc. to re-skin the whole site at once.

## Ideas to grow it (just ask)
- Individual wrestler bio pages
- Real logo + wrestler photos
- A ticket/contact form that actually sends email
- Move content into a JSON data file so pages build themselves
- Deploy free to GitHub Pages / Netlify
