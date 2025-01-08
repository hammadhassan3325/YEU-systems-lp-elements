function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <=
        (window.innerWidth || document.documentElement.clientWidth)
    );
}

function handleScroll() {
    const items = document.querySelectorAll(".timeline-item");

    items.forEach((item) => {
        if (isElementInViewport(item)) {
            item.classList.add("visible");
        }
    });
}

let timeout;
window.addEventListener("scroll", () => {
    if (timeout) {
        window.cancelAnimationFrame(timeout);
    }
    timeout = window.requestAnimationFrame(handleScroll);
});

window.addEventListener("resize", handleScroll);
window.addEventListener("load", handleScroll);
handleScroll();


const scrollContainer = document.querySelector('.events-scroll');
const scrollButton = document.querySelector('.scroll-button');

scrollButton.addEventListener('click', () => {
    scrollContainer.scrollBy({
        left: 300,
        behavior: 'smooth'
    });
});

scrollContainer.addEventListener('scroll', () => {
    const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
    scrollButton.style.display =
        scrollContainer.scrollLeft >= maxScroll ? 'none' : 'flex';
});