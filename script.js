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
const productGrid = document.getElementById('productGrid');

searchInput.addEventListener('input', function() {
    const query = this.value;

    fetch(`/api/search?q=${encodeURIComponent(query)}`)
        .then(res => res.json())
        .then(data => {
            productGrid.innerHTML = ''; // Clear current
            data.forEach(item => {
                productGrid.innerHTML += `
                    <div class="card">
                        <div class="card-body">
                            <div class="card-title">${item.name}</div>
                            <div class="card-price">${item.price}</div>
                        </div>
                    </div>`;
            });
        });
});

// Function to render items into the grid
function renderProducts(products) {
    const productGrid = document.getElementById('productGrid');
    const productsHeaderSpan = document.querySelector('.products-header span');
    
    productGrid.innerHTML = ''; 
    if (productsHeaderSpan) {
        productsHeaderSpan.textContent = `${products.length} treasures found`;
    }

    products.forEach(item => {
        const isFlag = item.name.includes('CTF{');
        
        productGrid.innerHTML += `
            <div class="card ${isFlag ? 'win-card' : ''}">
                <div class="card-img-wrap">${isFlag ? '🚩' : '📦'}</div>
                <div class="card-body">
                    <div class="card-title">${item.name}</div>
                    <p class="card-description" style="font-style: italic; font-size: 0.9rem; color: #888; margin: 10px 0;">
                        "${item.description || 'No description found.'}"
                    </p>
                    <div class="card-price">${isFlag ? 'PRICELESS' : item.price}</div>
                    ${isFlag ? '<p class="win-text">Ye found the Secret Plunder!</p>' : '<a href="#" class="btn-view">Inspect Booty</a>'}
                </div>
            </div>`;
    });
}

// 1. Initial Load
window.addEventListener('DOMContentLoaded', () => {
    fetch('/api/search?q=')
        .then(res => res.json())
        .then(data => renderProducts(data));
});

// 2. Search Update (Simplified to use renderProducts)
document.getElementById('searchInput').addEventListener('input', function() {
    fetch(`/api/search?q=${encodeURIComponent(this.value)}`)
        .then(res => res.json())
        .then(data => renderProducts(data))
        .catch(err => {
            // If the SQL is broken (like a single quote), show the error to help the student
            console.error("SQL Error:", err);
        });
});

// Keep your hover effects and button listeners here...
// 1. Initial Load: Get all items from the DB when the page opens
window.addEventListener('DOMContentLoaded', () => {
    fetch('/api/search?q=') // Passing an empty string returns everything
        .then(res => res.json())
        .then(data => renderProducts(data));
});

// 2. Search Update: Use the same render function
document.getElementById('searchInput').addEventListener('input', function() {
    fetch(`/api/search?q=${encodeURIComponent(this.value)}`)
        .then(res => res.json())
        .then(data => renderProducts(data));
});