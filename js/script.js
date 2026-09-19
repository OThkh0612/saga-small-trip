    const menuToggle = document.querySelector('.menu-toggle');
    const siteNav = document.querySelector('#site-nav');

    menuToggle.addEventListener('click', () => {
        siteNav.classList.toggle('is-open');
        const isOpen = siteNav.classList.contains('is-open');

        menuToggle.setAttribute('aria-expanded', isOpen);
        menuToggle.setAttribute(
            'aria-label',
            isOpen ? 'メニューを閉じる' : 'メニューを開く'
        );
    });

    const backToTop = document.querySelector('.back-to-top');

    if(backToTop) {
        const toggleBackToTop = () => {
            backToTop.classList.toggle(
                'is-visible',
                window.scrollY > 300
            );
        };

        window.addEventListener('scroll', toggleBackToTop);

        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        toggleBackToTop();
    }