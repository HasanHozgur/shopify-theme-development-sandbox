class FlipCardSection {
  constructor() {
    this.cards = document.querySelectorAll('.flip-card');
    this.init();
  }

  init() {
    // Add touch support
    this.cards.forEach((card) => {
      card.addEventListener('touchstart', this.handleTouchStart.bind(this));
      card.addEventListener('touchend', this.handleTouchEnd.bind(this));
    });

    // Add loading animation
    this.addLoadingAnimation();
  }

  handleTouchStart(e) {
    const card = e.currentTarget;
    card.querySelector('.flip-card-inner').style.transform = 'rotateY(180deg)';
  }

  handleTouchEnd(e) {
    const card = e.currentTarget;
    card.querySelector('.flip-card-inner').style.transform = '';
  }

  addLoadingAnimation() {
    this.cards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';

      // Stagger the entrance animation
      setTimeout(() => {
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, index * 100);
    });
  }
}

// Initialize when section loads
window.addEventListener('load', () => {
  new FlipCardSection();
});

// For Shopify's section rendering
if (Shopify.designMode) {
  document.addEventListener('shopify:section:load', (event) => {
    if (event.target.classList.contains('flip-card-section')) {
      new FlipCardSection();
    }
  });
}
