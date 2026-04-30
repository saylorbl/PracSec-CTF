// Filter sidebar links (removed, replaced with search)

// Card hover effect
const cards = document.querySelectorAll('.card');
cards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.borderColor = 'var(--gold)';
  });
  card.addEventListener('mouseleave', () => {
    card.style.borderColor = 'var(--plank)';
  });
});

// Inspect Booty buttons
const viewButtons = document.querySelectorAll('.btn-view');
viewButtons.forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    const title = btn.closest('.card').querySelector('.card-title').textContent;
    btn.textContent = 'Claimed! ⚓';
    btn.style.background = 'linear-gradient(135deg, var(--gold), #a07020)';
    btn.style.color = 'var(--black)';

    setTimeout(() => {
      btn.textContent = 'Inspect Booty';
      btn.style.background = '';
      btn.style.color = '';
    }, 1500);
  });
});

// Search functionality
const searchInput = document.getElementById('searchInput');
const productsHeaderSpan = document.querySelector('.products-header span');

searchInput.addEventListener('input', function() {
  const query = this.value.toLowerCase();
  const productCards = document.querySelectorAll('.card');
  let visibleCount = 0;

  productCards.forEach(card => {
    const title = card.querySelector('.card-title').textContent.toLowerCase();
    if (title.includes(query)) {
      card.style.display = 'block';
      visibleCount++;
    } else {
      card.style.display = 'none';
    }
  });

  productsHeaderSpan.textContent = `${visibleCount} treasures found`;
});
