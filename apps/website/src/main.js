const toggle = document.getElementById('theme-toggle');
const html = document.documentElement;

function setTheme(dark) {
  html.setAttribute('data-theme', dark ? 'amethyst_dark' : 'amethyst');
  if (toggle) toggle.checked = dark;
  localStorage.setItem('amethyst-dark', dark ? '1' : '0');
}

if (toggle) {
  const saved = localStorage.getItem('amethyst-dark');
  const preferDark = saved !== null ? saved === '1' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  setTheme(preferDark);

  toggle.addEventListener('change', () => {
    setTheme(toggle.checked);
  });
}
