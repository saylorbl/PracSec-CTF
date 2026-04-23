let items = [];
const itemGrid = document.getElementById("itemGrid");
const searchInput = document.getElementById("searchInput");
const exploreButton = document.getElementById("explore-button");
const learnButton = document.getElementById("learn-button");

function renderItems(filter = "") {
  const query = filter.trim().toLowerCase();
  const filteredItems = items.filter((item) => {
    return (
      item.title.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query) ||
      item.difficulty.toLowerCase().includes(query)
    );
  });

  if (filteredItems.length === 0) {
    itemGrid.innerHTML = `<p class="empty-state">No items matched your search. Try another keyword.</p>`;
    return;
  }

  itemGrid.innerHTML = filteredItems
    .map((item) => `
      <article class="item-card">
        <div>
          <p class="eyebrow">${item.category}</p>
          <h3>${item.title}</h3>
          <p>${item.description}</p>
        </div>
        <div class="item-tags">
          <span class="item-tag">${item.difficulty}</span>
          <span class="item-tag">${item.price}</span>
        </div>
        <div class="item-footer">
          <span class="price">${item.price}</span>
          <button onclick="alert('Checkout currently disabled.');">Buy now</button>
        </div>
      </article>
    `)
    .join("");
}

async function loadItems() {
  try {
    const response = await fetch("/api/items");
    if (!response.ok) {
      throw new Error(`Failed to load items: ${response.status}`);
    }

    items = await response.json();
    renderItems();
  } catch (error) {
    itemGrid.innerHTML = `<p class="empty-state">Unable to load marketplace items. Please try again later.</p>`;
    console.error(error);
  }
}

searchInput.addEventListener("input", (event) => {
  renderItems(event.target.value);
});

exploreButton.addEventListener("click", () => {
  document.getElementById("items").scrollIntoView({ behavior: "smooth" });
});

learnButton.addEventListener("click", () => {
  document.getElementById("features").scrollIntoView({ behavior: "smooth" });
});

loadItems();
