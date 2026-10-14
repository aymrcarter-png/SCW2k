# media/ — drop your files here

This is where your own files live. Drop them into the matching subfolder and
reference them from any page. External links (YouTube/Vimeo) don't need a file —
you just paste the link (see snippets below).

```
media/
  videos/    your .mp4 clips        (promos, highlights, trailers)
  images/    your .jpg / .png / .webp photos
  audio/     your .mp3 entrance themes / promos
  docs/      your .pdf posters, match cards, press releases
  posters/   thumbnail images used as video "click-to-play" covers
```

Recommended formats: **video** MP4 (H.264), **images** JPG/WebP, **audio** MP3, **docs** PDF.
Keep filenames lowercase with dashes, e.g. `blood-and-thunder-trailer.mp4`.

---

## Copy-paste snippets

### 1) YouTube / Vimeo video (external link — no file needed)
Use the **embed** URL (YouTube: click Share → Embed, copy the `.../embed/ID` link).
```html
<div class="video-lite" data-embed="https://www.youtube.com/embed/VIDEO_ID">
  <img src="media/posters/your-cover.jpg" alt="" />
  <div class="play"></div>
  <div class="label">Cole Vantage — Championship Promo</div>
</div>
<p class="embed-caption"><b>SCW</b> — recorded live at The Steel Yard</p>
```

### 2) Your own video file
```html
<div class="video-lite" data-video="media/videos/promo.mp4">
  <img src="media/posters/your-cover.jpg" alt="" />
  <div class="play"></div>
  <div class="label">Backstage Brawl</div>
</div>
```
Or a plain always-visible player:
```html
<div class="embed-video">
  <video src="media/videos/promo.mp4" controls></video>
</div>
```

### 3) Image gallery (opens fullscreen on click)
Give every image in the same gallery the same `data-group` so the arrows work.
```html
<div class="gallery">
  <figure data-lightbox="image" data-group="aug29" data-src="media/images/photo-1.jpg" data-caption="Main event chaos">
    <img src="media/images/photo-1.jpg" alt="Main event" />
  </figure>
  <figure data-lightbox="image" data-group="aug29" data-src="media/images/photo-2.jpg">
    <img src="media/images/photo-2.jpg" alt="" />
  </figure>
</div>
```

### 4) PDF / document
Inline viewer:
```html
<iframe class="embed-pdf" src="media/docs/blood-and-thunder-card.pdf"></iframe>
```
Or a compact download card:
```html
<a class="doc-card" href="media/docs/blood-and-thunder-card.pdf" target="_blank">
  <span class="icon"></span>
  <span class="d-body"><h4>Blood &amp; Thunder — Match Card</h4><p>PDF · 1.2 MB</p></span>
  <span class="btn ghost">Open</span>
</a>
```

### 5) Audio (entrance theme / promo clip)
```html
<div class="embed-audio">
  <div class="track-info"><div class="t">Cole Vantage</div><div class="s">Entrance Theme</div></div>
  <audio src="media/audio/kings-march.mp3" controls></audio>
</div>
```

---

**Tip:** the whole site works with files missing — an empty page stays clean and
nothing breaks. Add media whenever you're ready. See the **Media** page
(`media.html`) for a live example of every embed type.
