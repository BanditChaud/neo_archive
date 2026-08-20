const app = document.querySelector('#app');

async function loadData() {
  const r = await fetch('./data.json');
  return r.json();
}

function nav(active) {
  return `<header><div class="nav">
    <a class="logo" href="./">NEO ARCHIVE</a>
    <nav>
      <a class="${active==='images'?'active':''}" href="./?p=images">Images</a>
      <a class="${active==='music'?'active':''}" href="./?p=music">Musiques</a>
      <a class="${active==='texts'?'active':''}" href="./?p=texts">Textes</a>
      <a class="${active==='about'?'active':''}" href="./?p=about">About</a>
    </nav>
  </div></header>`;
}

function footer() { return `<footer>NEO ARCHIVE — personal digital archive</footer>`; }

function imageCard(x) {
  return `<a class="card" href="./?p=image&id=${encodeURIComponent(x.id)}">
    <img src="${x.image}" alt="${x.title}" loading="lazy">
    <div class="card-body"><div class="meta">${x.artist} · ${x.year}</div><div class="title">${x.title}</div></div>
  </a>`;
}

function pageHome(d) {
  return `${nav('')}<main>
    <section class="hero">
      <div class="kicker">digital archive</div>
      <h1>${d.settings.siteTitle}</h1>
      <p>${d.settings.intro}</p>
    </section>
    <section class="section">
      <div class="kicker">selected images</div>
      <h2>Dernières pièces</h2>
      <div class="grid">${d.images.map(imageCard).join('')}</div>
    </section>
  </main>${footer()}`;
}

function pageImages(d) {
  return `${nav('images')}<main><div class="kicker">archive / images</div><h1>Images</h1>
    <div class="grid">${d.images.map(imageCard).join('')}</div></main>${footer()}`;
}

function pageImage(d, id) {
  const x = d.images.find(v => v.id === id) || d.images[0];
  const m = d.music.find(v => v.id === x.musicId);
  return `${nav('images')}<main>
    <a class="back" href="./?p=images">← Retour aux images</a>
    <div class="museum">
      <div class="museum-image"><img src="${x.image}" alt="${x.title}"></div>
      <aside class="museum-info">
        <div class="meta">${x.artist} · ${x.year}</div>
        <h2>${x.title}</h2>
        <p>${x.description}</p>
        <div class="meta">${x.tags.join(' · ')}</div>
        ${m ? `<div class="audio"><div class="meta">soundtrack</div><div class="title">${m.artist} — ${m.title}</div><iframe src="${m.embed}" title="${m.title}" allowfullscreen></iframe></div>` : ''}
      </aside>
    </div>
  </main>${footer()}`;
}

function pageMusic(d) {
  return `${nav('music')}<main><div class="kicker">archive / sound</div><h1>Musiques</h1>
    <div class="list">${d.music.map(m => `<article class="row">
      <div class="meta">${m.album}</div><div><div class="title">${m.title}</div><p>${m.artist} — ${m.description}</p></div>
      <a href="${m.embed}" target="_blank" rel="noopener" class="meta">ouvrir ↗</a>
    </article>`).join('')}</div></main>${footer()}`;
}

function pageTexts(d) {
  return `${nav('texts')}<main><div class="kicker">archive / writing</div><h1>Textes</h1>
    <div class="list">${d.texts.map(t => `<a class="row" href="./?p=text&id=${encodeURIComponent(t.id)}">
      <div class="meta">${t.date}</div><div><div class="title">${t.title}</div><p>${t.excerpt}</p></div><div class="meta">lire →</div>
    </a>`).join('')}</div></main>${footer()}`;
}

function pageText(d, id) {
  const t = d.texts.find(v => v.id === id) || d.texts[0];
  return `${nav('texts')}<main><article class="article">
    <a class="back" href="./?p=texts">← Retour aux textes</a>
    <div class="meta">${t.date} · ${t.tags.join(' · ')}</div>
    <h1>${t.title}</h1>
    <div class="article-body">${t.body}</div>
  </article></main>${footer()}`;
}

function pageAbout(d) {
  return `${nav('about')}<main><article class="article">
    <div class="kicker">about</div><h1>${d.settings.aboutTitle}</h1>
    <div class="article-body">${d.settings.aboutText}</div>
  </article></main>${footer()}`;
}

async function render() {
  const d = await loadData();
  const q = new URLSearchParams(location.search);
  const p = q.get('p') || 'home';
  const id = q.get('id');
  app.innerHTML =
    p==='images' ? pageImages(d) :
    p==='image' ? pageImage(d,id) :
    p==='music' ? pageMusic(d) :
    p==='texts' ? pageTexts(d) :
    p==='text' ? pageText(d,id) :
    p==='about' ? pageAbout(d) : pageHome(d);
}
render();