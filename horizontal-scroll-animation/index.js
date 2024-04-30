const scrollers = document.querySelectorAll('.scroller');

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        addAnimation();
    }

    function addAnimation() {
        scrollers.forEach((scroller) => {
            scroller.setAttribute('data-animated', true);

            const innerScroller = scroller.querySelector('.scroller_inner');
            const scrollerContent = Array.from(innerScroller.children);

            scrollerContent.forEach(item => {
                const duplicatedItem = item.cloneNode(true);
                duplicatedItem.setAttribute('aria-hidden', true);
                innerScroller.appendChild(duplicatedItem);
            });

        });
    }

    const style = document.createElement('style');
    style.textContent = `
        .scroller {
            max-width: 600px;
        }

        .scroller[data-animated=true] {
            overflow: hidden;
            -webkit-mask: linear-gradient(
                90deg,
                transparent,
                white 20%,
                white 90%,
                transparent);
            mask: linear-gradient(
                90deg,
                transparent,
                rgb(255, 255, 255) 20%,
                white 90%,
                transparent);
        }

        .scroller[data-animated=true] .scroller_inner {
            width: max-content;
            flex-wrap: nowrap;
            animation: scroll var(--_animation-duration, 40s) var(--_animation-direction, forwards) linear infinite;
        }

        .scroller[data-direction="right"] {
            --_animation-direction: reverse;
        }

        .scroller[data-direction="left"] {
            --_animation-direction: forwards;
        }

        .scroller[animation-duration="slow"] {
            --_animation-duration: 20s;
        }

        .scroller[animation-duration="fast"] {
            --_animation-duration: 10s;
        }

        @keyframes scroll {
            to {
                transform: translate(calc(-50% - 0.5rem));
            }
        }

        .scroller_inner {
            display: flex;
            gap: 1rem;
            padding-block: 1rem;
            flex-wrap: wrap;
        }
    `;
    document.head.appendChild(style);