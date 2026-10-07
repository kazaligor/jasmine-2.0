(() => {
  const links = [...document.querySelectorAll('.topbar nav a')];
  const sections = [...document.querySelectorAll('main section[id]')];
  const setActive = () => {
    const y = window.scrollY + 140;
    let current = sections[0]?.id;
    for (const s of sections) if (s.offsetTop <= y) current = s.id;
    links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + current));
  };
  window.addEventListener('scroll', setActive, {passive:true});
  window.addEventListener('resize', setActive);
  setActive();
})();