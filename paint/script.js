/* ════════════════════════════════════════════════════════════
   PAINT WEBSITE  –  script.js
   ════════════════════════════════════════════════════════════
   Provides functionality for two components that were visually
   present in the original HTML but had zero JS attached:

   1. TESTIMONIAL SLIDER
      The original had prev/next arrows styled differently
      (gray vs yellow) to hint at a slider, but clicking
      either arrow did nothing. Wired up here with a smooth
      fade transition and dot-indicator navigation.

   2. FAQ ACCORDION
      The original showed card 1 with body text and an arrow
      icon, while cards 2–4 had only a title and a plus icon
      (no body text). This is the classic open/collapsed
      pattern of an accordion, but without JS the other cards
      could never be opened. Wired up here so clicking any
      item toggles it open while closing the previously open one.
   ════════════════════════════════════════════════════════════ */


/* ══════════════════════════════════════
   1. TESTIMONIAL SLIDER
══════════════════════════════════════ */

const TESTIMONIALS = [
  {
    name:   'Holly Davidson',
    text:   'Euismod magna id purus eget nunc ligula suspendisse dui netus. Condimentum blandit rutrum at mauris enim pulvinar duis etiam duis.',
    avatar: 'desktop/male-photo.png',
  },
  {
    name:   'James Carter',
    text:   'Pellentesque tempus sed phasellus vel consectetur nibh velit magna. Quisque porttitor vitae vel amet neque scelerisque mattis.',
    avatar: 'desktop/male-photo.png',
  },
  {
    name:   'Sarah Mitchell',
    text:   'Phasellus a vitae iaculis magna eleifend pulvinar velit odio. Vulputate et vulputate suspendisse natoque id tellus consectetur pulvinar.',
    avatar: 'desktop/male-photo.png',
  },
];

let currentIndex = 0;

const contentEl  = document.getElementById('testimonial-content');
const textEl     = document.getElementById('testimonial-text');
const nameEl     = document.getElementById('testimonial-name');
const avatarEl   = document.getElementById('testimonial-avatar');
const dotsEl     = document.getElementById('testimonial-dots');
const prevBtn    = document.getElementById('prev-testimonial');
const nextBtn    = document.getElementById('next-testimonial');

/** Build dot indicators */
function buildDots() {
  dotsEl.innerHTML = '';
  TESTIMONIALS.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className  = `dot${i === currentIndex ? ' active' : ''}`;
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-selected', i === currentIndex ? 'true' : 'false');
    dot.setAttribute('aria-label', `Testimonial ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsEl.appendChild(dot);
  });
}

/** Navigate to a testimonial by index */
function goTo(index) {
  currentIndex = (index + TESTIMONIALS.length) % TESTIMONIALS.length;
  const t = TESTIMONIALS[currentIndex];

  // Fade out
  contentEl.classList.add('is-fading');

  setTimeout(() => {
    textEl.textContent   = t.text;
    nameEl.textContent   = t.name;
    avatarEl.src         = t.avatar;
    avatarEl.alt         = `Profile photo of ${t.name}`;

    // Fade in
    contentEl.classList.remove('is-fading');
  }, 250);

  // Update arrow styles: grey when at the boundary end
  prevBtn.className = currentIndex === 0
    ? 'text-gray-400 hover:text-gray-700 transition-colors p-2'
    : 'text-yellow-500 hover:text-yellow-600 transition-colors p-2';

  nextBtn.className = currentIndex === TESTIMONIALS.length - 1
    ? 'text-gray-400 hover:text-gray-700 transition-colors p-2'
    : 'text-yellow-500 hover:text-yellow-600 transition-colors p-2';

  buildDots();
}

prevBtn.addEventListener('click', () => goTo(currentIndex - 1));
nextBtn.addEventListener('click', () => goTo(currentIndex + 1));

// Keyboard: left/right arrow keys while focus is inside the slider card
document.getElementById('testimonial-content')
  ?.closest('div')
  ?.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft')  goTo(currentIndex - 1);
    if (e.key === 'ArrowRight') goTo(currentIndex + 1);
  });

// Initialise
buildDots();
goTo(0);   // ensures arrow colours are set correctly from the start


/* ══════════════════════════════════════
   2. FAQ ACCORDION
══════════════════════════════════════ */

const faqItems = document.querySelectorAll('#faq-accordion .faq-item');

/**
 * Close all accordion items.
 */
function closeAll() {
  faqItems.forEach((item) => {
    const trigger = item.querySelector('.faq-trigger');
    const body    = item.querySelector('.faq-body');
    const icon    = item.querySelector('.faq-icon');
    trigger.setAttribute('aria-expanded', 'false');
    body.classList.add('hidden');
    icon.innerHTML = '<i class="fas fa-plus"></i>';
  });
}

/**
 * Open a single accordion item.
 * @param {Element} item
 */
function openItem(item) {
  const trigger = item.querySelector('.faq-trigger');
  const body    = item.querySelector('.faq-body');
  const icon    = item.querySelector('.faq-icon');
  trigger.setAttribute('aria-expanded', 'true');
  body.classList.remove('hidden');
  icon.innerHTML = '<i class="fas fa-minus"></i>';
}

faqItems.forEach((item) => {
  const trigger = item.querySelector('.faq-trigger');

  trigger.addEventListener('click', () => {
    const isOpen = trigger.getAttribute('aria-expanded') === 'true';

    // Always close everything first
    closeAll();

    // If it was closed before the click, open it now
    if (!isOpen) {
      openItem(item);
    }
    // If it was already open, closeAll() already closed it — act as a toggle
  });
});

// Ensure the first item starts open (matching the HTML default state)
openItem(faqItems[0]);