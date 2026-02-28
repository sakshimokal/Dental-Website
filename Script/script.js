//fade up animation
 const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
 });
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));


// toggle-btn
const menu = document.getElementById("mobileMenu");
const openBtn = document.querySelector(".nav-toggle");
const closeBtn = document.querySelector(".menu-close");

openBtn.addEventListener("click", () => {
    menu.classList.add("active");
});

closeBtn.addEventListener("click", () => {
    menu.classList.remove("active");
});

// automatic slider for testimonials
const track = document.querySelector(".slider-track");
const cards = Array.from(document.querySelectorAll(".testimonial-card"));

if (track && cards.length > 0) {

    const nextBtn = document.querySelector(".fa-angle-right");
    const prevBtn = document.querySelector(".fa-angle-left");

    let index = 1;
    let autoSlide;

    const isMobile = () => window.innerWidth <= 768;

    const firstClone = cards[0].cloneNode(true);
    const lastClone = cards[cards.length - 1].cloneNode(true);

    track.appendChild(firstClone);
    track.insertBefore(lastClone, cards[0]);

    const allCards = document.querySelectorAll(".testimonial-card");

    function getCardWidth() {
        const card = allCards[0];
        const style = getComputedStyle(card);
        const margin = parseFloat(style.marginLeft) + parseFloat(style.marginRight);
        return card.offsetWidth + margin;
    }

    let cardWidth = getCardWidth();

    function updatePosition(animate = true) {
        track.style.transition = animate ? "transform 0.6s ease" : "none";
        track.style.transform = `translateX(-${index * cardWidth}px)`;

        allCards.forEach(card => card.classList.remove("active"));

        if (isMobile()) {
            allCards[index]?.classList.add("active");
        } else {
            allCards[index + 1]?.classList.add("active");
        }
    }

    function nextSlide() {
        index++;
        updatePosition();

        if (index === allCards.length - 1) {
            setTimeout(() => {
                index = 1;
                updatePosition(false);
            }, 600);
        }
    }

    function prevSlide() {
        index--;
        updatePosition();

        if (index === 0) {
            setTimeout(() => {
                index = allCards.length - 2;
                updatePosition(false);
            }, 600);
        }
    }

    function startAutoSlide() {
        stopAutoSlide();
        autoSlide = setInterval(nextSlide, 3500);
    }

    function stopAutoSlide() {
        clearInterval(autoSlide);
    }

    function resetSlider() {
        cardWidth = getCardWidth();
        index = isMobile() ? 0 : 1;
        updatePosition(false);
        startAutoSlide();
    }

    nextBtn?.addEventListener("click", () => {
        nextSlide();
        startAutoSlide();
    });

    prevBtn?.addEventListener("click", () => {
        prevSlide();
        startAutoSlide();
    });

    window.addEventListener("load", resetSlider);
    window.addEventListener("resize", resetSlider);
}

//media queries flip card js for mobile screens
console.log("Flip JS loaded");
document.addEventListener("DOMContentLoaded", function () {

    if (window.matchMedia("(max-width: 768px)").matches) {

        const cards = document.querySelectorAll(".flip-card");

        cards.forEach(card => {
            card.addEventListener("click", function () {
                card.classList.toggle("is-flipped");
            });
        });

    }

});
//services preview
const serviceRows = document.querySelectorAll('.service-row');

const isTouchDevice =
  'ontouchstart' in window || navigator.maxTouchPoints > 0;

if (isTouchDevice) {
  serviceRows.forEach(row => {
    let activated = false;

    row.addEventListener('click', e => {
      if (!activated) {
        e.preventDefault();          // stop navigation
        activated = true;

        // remove active state from others
        serviceRows.forEach(r => {
          if (r !== row) r.classList.remove('is-active');
          r.dataset.active = "false";
        });

        row.classList.add('is-active');
        row.dataset.active = "true";
      }
    });
  });
}

//team section & gallery section overlay for mobile ui
const divs = document.querySelectorAll('.team-image, .gallery-card');

divs.forEach(card => {
  card.addEventListener('click', function (e) {

    // If Instagram link clicked, allow navigation
    if (e.target.closest('.insta-link')) return;

    this.classList.toggle('active');
  });
});

function resetOnDesktop() {
  if (window.matchMedia("(hover: hover)").matches) {
    divs.forEach(card => card.classList.remove('active'));
  }
}

window.addEventListener('resize', resetOnDesktop);
window.addEventListener('orientationchange', resetOnDesktop);