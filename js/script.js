// CURSOR
        const cursor = document.getElementById('cursor');
        const cursorRing = document.getElementById('cursorRing');
        let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;
        document.addEventListener('mousemove', e => {
            mouseX = e.clientX; mouseY = e.clientY;
            cursor.style.left = (mouseX - 6) + 'px';
            cursor.style.top = (mouseY - 6) + 'px';
        });
        function animateRing() {
            ringX += (mouseX - ringX - 18) * 0.12;
            ringY += (mouseY - ringY - 18) * 0.12;
            cursorRing.style.left = ringX + 'px';
            cursorRing.style.top = ringY + 'px';
            requestAnimationFrame(animateRing);
        }
        animateRing();
        document.querySelectorAll('a, button').forEach(el => {
            el.addEventListener('mouseenter', () => { cursor.style.transform = 'scale(2)'; cursorRing.style.transform = 'scale(1.5)'; });
            el.addEventListener('mouseleave', () => { cursor.style.transform = 'scale(1)'; cursorRing.style.transform = 'scale(1)'; });
        });

        // NAVBAR SCROLL
        window.addEventListener('scroll', () => {
            document.getElementById('mainNav').classList.toggle('scrolled', window.scrollY > 50);
        });

        // PARTÍCULAS
        const bg = document.getElementById('particles-bg');
        for (let i = 0; i < 25; i++) {
            const p = document.createElement('div');
            p.className = 'particle';
            const size = Math.random() * 4 + 1;
            p.style.cssText = `
      width:${size}px; height:${size}px;
      left:${Math.random() * 100}%;
      animation-duration:${Math.random() * 15 + 10}s;
      animation-delay:${Math.random() * 10}s;
      box-shadow: 0 0 ${size * 3}px var(--pink-neon);
    `;
            bg.appendChild(p);
        }

        // SCROLL REVEAL
        const reveals = document.querySelectorAll('.reveal');
        const observer = new IntersectionObserver(entries => {
            entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
        }, { threshold: 0.15 });
        reveals.forEach(el => observer.observe(el));

        // STEPS REVEAL
        const steps = document.querySelectorAll('.step-line');
        const stepObs = new IntersectionObserver(entries => {
            entries.forEach((e, i) => {
                if (e.isIntersecting) {
                    setTimeout(() => e.target.classList.add('visible'), i * 150);
                }
            });
        }, { threshold: 0.3 });
        steps.forEach(s => stepObs.observe(s));

        // SMOOTH SCROLL
        document.querySelectorAll('a[href^="#"]').forEach(a => {
            a.addEventListener('click', e => {
                const target = document.querySelector(a.getAttribute('href'));
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    const nav = document.getElementById('navMenu');
                    if (nav.classList.contains('show')) {
                        bootstrap.Collapse.getOrCreateInstance(nav).hide();
                    }
                }
            });
        });