// Formulář: demo režim neodesílá nic, ostrý režim posílá na endpoint ze site.json (data-endpoint).
(function () {
  document.querySelectorAll('form.formular').forEach(function (f) {
    var stav = f.querySelector('.formular-stav');
    f.addEventListener('submit', function (e) {
      var endpoint = f.getAttribute('data-endpoint');
      var demo = f.getAttribute('data-demo') === '1';
      if (f.querySelector('.past input').value) { e.preventDefault(); return; }   // robot
      if (demo || !endpoint) {
        e.preventDefault();
        stav.textContent = 'Ukážka formulára: nič sa neodosiela. Po spustení webu príde dopyt na e-mail firmy.';
        return;
      }
      e.preventDefault();
      stav.textContent = 'Odosielam…';
      fetch(endpoint, { method: 'POST', body: new FormData(f), headers: { Accept: 'application/json' } })
        .then(function (r) { if (!r.ok) throw new Error(r.status); f.reset(); stav.textContent = 'Ďakujeme, dopyt bol odoslaný.'; })
        .catch(function () { stav.textContent = 'Odoslanie sa nepodarilo. Napíšte nám prosím e-mailom.'; });
    });
  });
})();

// Menu na mobile
(function () {
  var b = document.querySelector('.burger'), h = document.querySelector('.hlavicka');
  if (!b) return;
  b.addEventListener('click', function () { var o = h.classList.toggle('otevrene'); b.setAttribute('aria-expanded', o); });
  document.querySelectorAll('#nav a').forEach(function (a) { a.addEventListener('click', function () { h.classList.remove('otevrene'); b.setAttribute('aria-expanded', 'false'); }); });
})();

// Zónová regulácia: ukážka princípu (kotol beží, len keď niektorá zóna žiada teplo)
(function () {
  var plan = document.querySelector('.zony-plan'); if (!plan) return;
  var tl = plan.querySelectorAll('button[data-zona]'), kotol = document.querySelector('.kotol-stav'), pocet = document.querySelector('.zony-pocet');
  function stav() {
    var n = plan.querySelectorAll('button[aria-pressed="true"]').length;
    plan.classList.toggle('kotol-bezi', n > 0);
    if (kotol) kotol.textContent = n > 0 ? 'Kotol beží' : 'Kotol stojí';
    if (pocet) pocet.textContent = n === 0 ? 'Žiadna zóna nežiada teplo.' : n === 1 ? 'Vykurujete 1 zónu zo 4.' : n < 5 ? 'Vykurujete ' + n + ' zóny zo 4.' : '';
  }
  tl.forEach(function (b) { b.addEventListener('click', function () { b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') === 'true' ? 'false' : 'true'); stav(); }); });
  stav();
})();
