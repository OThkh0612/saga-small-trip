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

    const revealElements = document.querySelectorAll('.scroll-reveal');

    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.05
            }
        );

        revealElements.forEach((element) => {
            revealObserver.observe(element);
        });
    }

    const filterButtons = document.querySelectorAll('.filter-button');
    const spotsSection = document.querySelectorAll('.spots-section');

    if (filterButtons.length > 0 && spotsSection.length > 0) {
        filterButtons.forEach((button) => {
            button.addEventListener('click', () => {
                const selectedCategory = button.dataset.filter;

                filterButtons.forEach((item) => {
                    const isSelected = item === button;

                    item.classList.toggle('is-active', isSelected);
                    item.setAttribute('aria-pressed', isSelected);
                });

                spotsSection.forEach((section) => {
                    const shouldShow =
                        selectedCategory === 'all' ||
                        section.id === selectedCategory;
                    
                    section.hidden = !shouldShow;
                });
            });
        });
    }

    const gourmetSearchInput = document.querySelector('#gourmet-search-input');
    const gourmetSearchResult = document.querySelector('#gourmet-search-result');
    const gourmetItems = document.querySelectorAll('.gourmet-card, .gourmet-other-item');

    if (gourmetSearchInput && gourmetSearchResult && gourmetItems.length > 0) {
        gourmetSearchInput.addEventListener('input', () => {
            const keyword = gourmetSearchInput.value.trim().toLowerCase();
            let visibleCount = 0;

            gourmetItems.forEach((item) => {
                const itemText = item.textContent.toLowerCase();
                const isMatch = itemText.includes(keyword);

                item.hidden = !isMatch;

                if (isMatch) {
                    visibleCount++;
                }
            });

            gourmetSearchResult.textContent =
                visibleCount === 0
                    ? '該当するグルメはありません。'
                    : `${visibleCount}件のグルメを表示しています。`;
        });
    }