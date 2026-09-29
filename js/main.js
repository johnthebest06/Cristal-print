// Кристалл Принт — поведение сайта без библиотек.
// Настройки (куда слать заявки, мессенджеры) приходят из window.CP, их задаёт build.py из content.py.
(function () {
  'use strict';
  var CP = window.CP || {};

  // ---------- Мобильное меню и выпадающий список продукции
  var header = document.querySelector('.header');
  var burger = document.querySelector('.burger');
  if (burger && header) {
    burger.addEventListener('click', function () {
      var open = header.classList.toggle('is-open');
      // Меню начинается сразу под шапкой — её положение зависит от прокрутки
      if (open) header.style.setProperty('--menu-top', header.getBoundingClientRect().bottom + 'px');
      burger.setAttribute('aria-expanded', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
  }
  document.querySelectorAll('.has-mega > .nav__link').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      var li = btn.parentElement;
      // На широком экране меню раскрывается наведением, клик ведёт в каталог
      if (window.matchMedia('(min-width: 1121px)').matches && btn.tagName === 'A') return;
      e.preventDefault();
      li.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', li.classList.contains('is-open'));
    });
  });

  // ---------- Модальные окна
  function openModal(id) {
    var m = document.getElementById(id);
    if (!m) return;
    m.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    var first = m.querySelector('input:not([type=hidden]):not(.hp)');
    if (first) setTimeout(function () { first.focus(); }, 50);
  }
  function closeModal(m) {
    m.classList.remove('is-open');
    if (!header || !header.classList.contains('is-open')) document.body.style.overflow = '';
  }
  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-modal]');
    if (t) { e.preventDefault(); if (header) header.classList.remove('is-open'); openModal(t.getAttribute('data-modal')); return; }
    var m = e.target.classList && e.target.classList.contains('modal') ? e.target : null;
    if (m || e.target.closest('.modal__close')) closeModal((m || e.target.closest('.modal')));
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') document.querySelectorAll('.modal.is-open').forEach(closeModal);
  });

  // ---------- Маска телефона
  function formatPhone(v) {
    var d = v.replace(/\D/g, '');
    if (!d) return '';
    if (d[0] === '8') d = '7' + d.slice(1);
    if (d[0] !== '7') d = '7' + d;
    d = d.slice(0, 11);
    var r = '+7';
    if (d.length > 1) r += ' (' + d.slice(1, 4);
    if (d.length >= 4) r += ')';
    if (d.length > 4) r += ' ' + d.slice(4, 7);
    if (d.length > 7) r += '-' + d.slice(7, 9);
    if (d.length > 9) r += '-' + d.slice(9, 11);
    return r;
  }
  document.querySelectorAll('input[type=tel]').forEach(function (inp) {
    inp.addEventListener('input', function () { inp.value = formatPhone(inp.value); });
    inp.addEventListener('focus', function () { if (!inp.value) inp.value = '+7 ('; });
    inp.addEventListener('blur', function () { if (inp.value.replace(/\D/g, '').length <= 1) inp.value = ''; });
  });

  // ---------- Калькулятор: «Другой тираж» и сводка заказа
  document.querySelectorAll('[data-calc]').forEach(function (form) {
    var summary = document.querySelector(form.getAttribute('data-calc'));
    function val(name) {
      var el = form.querySelector('[name="' + name + '"]');
      if (!el) return '';
      if (el.type === 'radio' || el.type === 'checkbox') {
        return Array.prototype.map.call(form.querySelectorAll('[name="' + name + '"]:checked'), function (x) { return x.value; }).join(', ');
      }
      return el.value;
    }
    function update() {
      var own = form.querySelector('.qty-own');
      if (own) own.hidden = val('qty') !== 'Другой тираж';
      if (!summary) return;
      summary.querySelectorAll('[data-sum]').forEach(function (b) {
        var k = b.getAttribute('data-sum');
        var v = k === 'qty' && val('qty') === 'Другой тираж' ? (val('qty_own') ? val('qty_own') + ' шт.' : '—') : val(k);
        if (k === 'qty' && v && v !== '—' && v.indexOf('шт') < 0) v += ' шт.';
        b.textContent = v || '—';
      });
    }
    form.addEventListener('change', update);
    form.addEventListener('input', update);
    update();
  });

  // ---------- Формы заявки
  function leadText(data) {
    var lines = ['Заявка с сайта Кристалл Принт', ''];
    var map = [
      ['product', 'Продукция'], ['format', 'Формат/вид'], ['paper', 'Материал'], ['print', 'Печать'],
      ['qty', 'Тираж'], ['finish', 'Обработка'], ['name', 'Имя'], ['phone', 'Телефон'],
      ['email', 'E-mail'], ['company', 'Организация'], ['message', 'Комментарий']
    ];
    map.forEach(function (p) { if (data[p[0]]) lines.push(p[1] + ': ' + data[p[0]]); });
    return lines.join('\n');
  }

  function fallbackWays(text, light) {
    // Пока заявки не подключены к серверу — предлагаем отправить её одним нажатием
    var enc = encodeURIComponent(text);
    var second = light ? 'btn--navy' : 'btn--white';
    var ghost = light ? 'btn--ghost' : 'btn--ghost-light';
    var html = '';
    if (CP.whatsapp) html += '<a class="btn btn--accent" target="_blank" rel="noopener" href="' + CP.whatsapp + '?text=' + enc + '">Отправить в WhatsApp</a>';
    if (CP.telegram) html += '<a class="btn ' + second + '" target="_blank" rel="noopener" data-copy href="' + CP.telegram + '">Отправить в Telegram</a>';
    html += '<a class="btn ' + (html ? ghost : 'btn--accent') + '" href="mailto:' + CP.email + '?subject=' + encodeURIComponent('Заявка с сайта') + '&body=' + enc + '">Отправить на почту</a>';
    html += '<a class="btn ' + ghost + '" href="' + CP.phoneHref + '">Позвонить ' + CP.phone + '</a>';
    return html;
  }

  function initLeadForm(form) {
    var openedAt = Date.now();
    var submit = form.querySelector('[type=submit]');
    var error = form.querySelector('.form-error');
    var done = form.parentElement.querySelector('.form-done');
    var sending = false;

    function showError(msg) { if (error) error.textContent = msg; }
    form.addEventListener('input', function (e) {
      var f = e.target.closest('.field');
      if (f) f.classList.remove('field--bad');
      var c = form.querySelector('.consent');
      if (c) c.classList.remove('consent--bad');
      showError('');
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (sending) return;
      var bad = null;
      form.querySelectorAll('[required]').forEach(function (el) {
        if (el.type === 'checkbox') return;
        var ok = el.value.trim() !== '';
        if (ok && el.type === 'tel') ok = el.value.replace(/\D/g, '').length === 11;
        if (ok && el.type === 'email') ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value.trim());
        if (!ok) { el.closest('.field').classList.add('field--bad'); if (!bad) bad = el; }
      });
      if (bad) { bad.focus(); showError('Проверьте поля, отмеченные красным.'); return; }
      var consent = form.querySelector('[name=consent]');
      if (consent && !consent.checked) {
        form.querySelector('.consent').classList.add('consent--bad');
        showError('Без согласия на обработку данных мы не сможем принять заявку.');
        return;
      }

      var data = {};
      new FormData(form).forEach(function (v, k) {
        if (k === 'qty_own') return;
        data[k] = data[k] ? data[k] + ', ' + v : v;
      });
      if (data.qty === 'Другой тираж' && form.qty_own && form.qty_own.value) data.qty = form.qty_own.value + ' шт.';
      data.seconds = Math.round((Date.now() - openedAt) / 1000);
      data.page = location.href;
      var text = leadText(data);

      function success(viaServer) {
        form.hidden = true;
        if (!done) return;
        var ways = done.querySelector('.send-ways');
        var title = done.querySelector('h3');
        var p = done.querySelector('p');
        if (viaServer) {
          title.textContent = 'Заявка отправлена';
          p.textContent = 'Спасибо! Менеджер свяжется с вами в ближайшее рабочее время.';
          if (ways) ways.innerHTML = '';
        } else {
          title.textContent = 'Остался один шаг';
          p.textContent = 'Заявка готова — отправьте её нам удобным способом, текст уже заполнен.';
          if (ways) ways.innerHTML = fallbackWays(text, done.classList.contains('form-done--light'));
          if (ways) ways.querySelectorAll('[data-copy]').forEach(function (a) {
            a.addEventListener('click', function () {
              if (navigator.clipboard) navigator.clipboard.writeText(text);
              a.textContent = 'Текст скопирован — вставьте в чат';
            });
          });
        }
        done.hidden = false;
        done.scrollIntoView({ block: 'center', behavior: 'smooth' });
        if (typeof ym === 'function' && CP.metrika) ym(CP.metrika, 'reachGoal', 'lead');
      }

      if (!CP.endpoint) { success(false); return; }
      sending = true; submit.disabled = true;
      var label = submit.innerHTML; submit.textContent = 'Отправляем…';
      fetch(CP.endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
        .then(function (r) { if (!r.ok) throw new Error(r.status); success(true); })
        .catch(function () {
          sending = false; submit.disabled = false; submit.innerHTML = label;
          success(false);
        });
    });
  }
  document.querySelectorAll('form.lead-form').forEach(initLeadForm);

  // ---------- Вкладки (штампы пакетов)
  document.querySelectorAll('.tabs').forEach(function (tabs) {
    tabs.addEventListener('click', function (e) {
      var b = e.target.closest('button');
      if (!b) return;
      tabs.querySelectorAll('button').forEach(function (x) {
        var on = x === b;
        x.setAttribute('aria-selected', on);
        document.getElementById(x.getAttribute('aria-controls')).hidden = !on;
      });
    });
  });

  // ---------- Галерея работ
  var links = Array.prototype.slice.call(document.querySelectorAll('.works a'));
  if (links.length) {
    var box = document.createElement('div');
    box.className = 'lightbox';
    box.innerHTML = '<img alt=""><button class="lightbox__close" aria-label="Закрыть"><svg class="icon"><use href="#i-close"/></svg></button>' +
      '<button class="lightbox__prev" aria-label="Назад"><svg class="icon"><use href="#i-arrow"/></svg></button>' +
      '<button class="lightbox__next" aria-label="Вперёд"><svg class="icon"><use href="#i-arrow"/></svg></button>';
    document.body.appendChild(box);
    var img = box.querySelector('img'), idx = 0;
    function show(i) { idx = (i + links.length) % links.length; img.src = links[idx].href; box.classList.add('is-open'); }
    links.forEach(function (a, i) { a.addEventListener('click', function (e) { e.preventDefault(); show(i); }); });
    box.querySelector('.lightbox__close').onclick = function () { box.classList.remove('is-open'); };
    box.querySelector('.lightbox__prev').onclick = function () { show(idx - 1); };
    box.querySelector('.lightbox__next').onclick = function () { show(idx + 1); };
    box.addEventListener('click', function (e) { if (e.target === box) box.classList.remove('is-open'); });
    document.addEventListener('keydown', function (e) {
      if (!box.classList.contains('is-open')) return;
      if (e.key === 'Escape') box.classList.remove('is-open');
      if (e.key === 'ArrowLeft') show(idx - 1);
      if (e.key === 'ArrowRight') show(idx + 1);
    });
  }

  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
