(() => {
  const scrollLinks = document.querySelectorAll('[data-scroll], .nav a, .mobile-menu a, .footer__nav a, .header__brand, .footer__bottom-inner a[href^="#"]');
  scrollLinks.forEach(link => {
    link.addEventListener('click', e => {
      const targetId = link.getAttribute('data-scroll') || link.getAttribute('href');
      if (!targetId || !targetId.startsWith('#')) return;
      e.preventDefault();
      document.querySelector(targetId)?.scrollIntoView({ behavior: 'smooth' });
      closeMobile();
    });
  });

  const burger = document.querySelector('.burger');
  const mobileMenu = document.getElementById('mobile-menu');

  const openMobile = () => {
    mobileMenu.style.display = 'block';
    setTimeout(() => mobileMenu.classList.add('active'), 0);
    burger.setAttribute('aria-expanded', 'true');
  };

  const closeMobile = () => {
    mobileMenu.classList.remove('active');
    burger.setAttribute('aria-expanded', 'false');
    setTimeout(() => mobileMenu.style.display = 'none', 200);
  };

  burger?.addEventListener('click', () => {
    const expanded = burger.getAttribute('aria-expanded') === 'true';
    expanded ? closeMobile() : openMobile();
  });

  burger?.addEventListener('mouseenter', openMobile);
  mobileMenu?.addEventListener('mouseleave', closeMobile);

  mobileMenu?.addEventListener('click', e => {
    if (e.target === mobileMenu) closeMobile();
  });

  const timers = document.querySelectorAll('[data-timer]');
  const updateTimer = () => {
    const now = new Date();
    const deadline = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    const diff = deadline - now;
    const pad = n => String(n).padStart(2, '0');
    const hours = pad(Math.floor(diff / 1000 / 60 / 60));
    const minutes = pad(Math.floor(diff / 1000 / 60) % 60);
    const seconds = pad(Math.floor(diff / 1000) % 60);
    const text = `${hours}:${minutes}:${seconds}`;
    timers.forEach(t => {
      const span = t.querySelector('.timer__value');
      if (span) span.textContent = text;
    });
  };
  updateTimer();
  setInterval(updateTimer, 1000);

  const form = document.querySelector('#cta');
  form?.addEventListener('submit', async e => {
    e.preventDefault();

    const formData = new FormData(form);
    const payload = {
      name: formData.get('name') || '',
      phone: formData.get('phone') || '',
      city: formData.get('city') || '',
      source: 'academybus-landing'
    };

    try {
      const response = await fetch('https://YOUR-ENDPOINT-HERE', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
          // 'Authorization': 'Bearer YOUR_TOKEN' // при необходимости
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      // при необходимости можно проверить тело ответа: const data = await response.json();
      alert('Заявка отправлена. Мы свяжемся с вами в ближайшее время.');
      form.reset();
    } catch (err) {
      console.error('Ошибка отправки формы', err);
      alert('Не удалось отправить заявку. Повторите попытку позже.');
    }
  });
})();

