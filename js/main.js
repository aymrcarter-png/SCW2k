/* ============================================================
   SCW — shared site behavior
   ============================================================ */

(function () {
  'use strict';

  /* ---- Mobile nav toggle ---- */
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => links.classList.toggle('open'));
    links.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => links.classList.remove('open'))
    );
  }

  /* ---- Highlight current page in nav ---- */
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === 'index.html' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  /* ---- Reveal-on-scroll ---- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  /* ---- Roster flip cards: tap / click / keyboard to flip ---- */
  document.querySelectorAll('.fighter.flip').forEach(card => {
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    const flip = () => card.classList.toggle('flipped');
    card.addEventListener('click', flip);
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); flip(); }
    });
  });

  /* ---- Duplicate ticker content for a seamless loop ---- */
  const track = document.querySelector('.ticker .track');
  if (track && !track.dataset.doubled) {
    track.innerHTML += track.innerHTML;
    track.dataset.doubled = 'true';
  }

  /* ---- Simple filter buttons (roster / events) ---- */
  document.querySelectorAll('.filter-bar').forEach(bar => {
    const targetSel = bar.dataset.target;
    if (!targetSel) return;
    const items = document.querySelectorAll(targetSel);
    bar.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', () => {
        bar.querySelectorAll('button').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const f = btn.dataset.filter;
        items.forEach(item => {
          const show = f === 'all' || (item.dataset.tags || '').split(' ').includes(f);
          item.style.display = show ? '' : 'none';
        });
      });
    });
  });

  /* ---- Footer year ---- */
  document.querySelectorAll('[data-year]').forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  /* ============================================================
     EMBEDS
     ============================================================ */

  /* ---- Click-to-play videos (.video-lite) ----
     Turns a lightweight poster into the real embed only when clicked,
     so pages stay fast. Works for YouTube/Vimeo (data-embed) or a
     local file (data-video). */
  document.querySelectorAll('.video-lite').forEach(el => {
    el.addEventListener('click', () => {
      const embed = el.dataset.embed;   // e.g. https://www.youtube.com/embed/XXXX
      const file  = el.dataset.video;   // e.g. media/videos/promo.mp4
      let node;
      if (embed) {
        node = document.createElement('iframe');
        node.src = embed + (embed.includes('?') ? '&' : '?') + 'autoplay=1';
        node.allow = 'autoplay; fullscreen; encrypted-media';
        node.allowFullscreen = true;
      } else if (file) {
        node = document.createElement('video');
        node.src = file; node.controls = true; node.autoplay = true;
      }
      if (!node) return;
      const wrap = document.createElement('div');
      wrap.className = 'embed-video';
      wrap.appendChild(node);
      el.replaceWith(wrap);
    });
  });

  /* ---- Lightbox for galleries and marked media ----
     Any element with [data-lightbox] opens fullscreen.
       data-lightbox="image"  + data-src="path.jpg"
       data-lightbox="video"  + data-embed="youtube embed url"
       data-lightbox="video"  + data-video="media/videos/clip.mp4"
     Items sharing the same [data-group] get prev/next arrows. */
  const lbItems = Array.from(document.querySelectorAll('[data-lightbox]'));
  if (lbItems.length) {
    const lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.innerHTML =
      '<button class="lb-close" aria-label="Close">&times;</button>' +
      '<button class="lb-nav lb-prev" aria-label="Previous">&#8249;</button>' +
      '<button class="lb-nav lb-next" aria-label="Next">&#8250;</button>' +
      '<div class="lb-stage"></div>' +
      '<div class="lb-cap"></div>';
    document.body.appendChild(lb);
    const stage = lb.querySelector('.lb-stage');
    const cap = lb.querySelector('.lb-cap');
    let current = -1;

    function render(i) {
      const el = lbItems[i]; if (!el) return;
      const type = el.dataset.lightbox;
      const group = el.dataset.group;
      stage.innerHTML = '';
      if (type === 'image') {
        const img = document.createElement('img');
        img.src = el.dataset.src || (el.querySelector('img') || {}).src;
        stage.appendChild(img);
      } else {
        const frame = document.createElement('div');
        frame.className = 'lb-frame';
        if (el.dataset.embed) {
          const f = document.createElement('iframe');
          f.src = el.dataset.embed + (el.dataset.embed.includes('?') ? '&' : '?') + 'autoplay=1';
          f.allow = 'autoplay; fullscreen; encrypted-media'; f.allowFullscreen = true;
          frame.appendChild(f);
        } else if (el.dataset.video) {
          const v = document.createElement('video');
          v.src = el.dataset.video; v.controls = true; v.autoplay = true;
          frame.appendChild(v);
        }
        stage.appendChild(frame);
      }
      cap.textContent = el.dataset.caption || '';
      // show arrows only when there are siblings in the same group
      const siblings = lbItems.filter(x => x.dataset.group && x.dataset.group === group);
      const many = siblings.length > 1;
      lb.querySelector('.lb-prev').style.display = many ? '' : 'none';
      lb.querySelector('.lb-next').style.display = many ? '' : 'none';
      current = i;
    }

    function step(dir) {
      const el = lbItems[current];
      const group = el && el.dataset.group;
      const siblings = lbItems.filter(x => x.dataset.group && x.dataset.group === group);
      if (siblings.length < 2) return;
      const pos = siblings.indexOf(el);
      const next = siblings[(pos + dir + siblings.length) % siblings.length];
      render(lbItems.indexOf(next));
    }

    function open(i) { render(i); lb.classList.add('open'); document.body.style.overflow = 'hidden'; }
    function close() { lb.classList.remove('open'); stage.innerHTML = ''; document.body.style.overflow = ''; }

    lbItems.forEach((el, i) => {
      el.style.cursor = 'pointer';
      el.addEventListener('click', e => { e.preventDefault(); open(i); });
    });
    lb.querySelector('.lb-close').addEventListener('click', close);
    lb.querySelector('.lb-prev').addEventListener('click', () => step(-1));
    lb.querySelector('.lb-next').addEventListener('click', () => step(1));
    lb.addEventListener('click', e => { if (e.target === lb) close(); });
    document.addEventListener('keydown', e => {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') step(-1);
      if (e.key === 'ArrowRight') step(1);
    });
  }
})();
