document.getElementById('search-form').addEventListener('submit', async (e) => {
  e.preventDefault(); // Prevent the default form submission behavior

  const searchQuery = document.getElementById('search-input').value;

  // Make an AJAX request to the server's search endpoint
  const response = await fetch(`https://season-kind-canvas.glitch.me/api/search?query=${encodeURIComponent(searchQuery)}`);
  const data = await response.json();

  // Update the UI with the search results
  displaySearchResults(data.results);
});

function displaySearchResults(results) {
  const recipeCardsContainer = document.getElementById('recipeCards');
  recipeCardsContainer.innerHTML = ''; // Clear the existing recipe cards

  // Create recipe cards based on the results
  results.forEach((recipe) => {
    const card = document.createElement('div');
    card.className = 'recipeCard';

    // Create the card's HTML structure based on your desired layout
    // Use recipe data to fill in the card's information
    // Example:
    card.innerHTML = `
      <img src="${recipe.image}" alt="Recipe Image">
      <h2 class="recipe-title">${recipe.title}</h2>
      <ul class="recipe-ingredients">
        ${recipe.ingredients.map((ingredient) => `<li>${ingredient}</li>`).join('')}
      </ul>
      <p class="recipe-instructions">${recipe.instructions}</p>
    `;

    recipeCardsContainer.appendChild(card);
  });
}
