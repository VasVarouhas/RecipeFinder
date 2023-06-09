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

    const recipeImage = document.createElement('img');
    recipeImage.src = recipe.image; // Use the actual image URL from the API response
    recipeImage.alt = 'Recipe Image';
    card.appendChild(recipeImage);

    const recipeTitle = document.createElement('h2');
    recipeTitle.className = 'recipe-title';
    recipeTitle.textContent = recipe.title;
    card.appendChild(recipeTitle);

    const recipeIngredients = document.createElement('ul');
    recipeIngredients.className = 'recipe-ingredients';
    recipe.ingredients.forEach((ingredient) => {
      const ingredientItem = document.createElement('li');
      ingredientItem.textContent = ingredient;
      recipeIngredients.appendChild(ingredientItem);
    });
    card.appendChild(recipeIngredients);

    const recipeInstructions = document.createElement('p');
    recipeInstructions.className = 'recipe-instructions';
    recipeInstructions.textContent = recipe.instructions;
    card.appendChild(recipeInstructions);

    recipeCardsContainer.appendChild(card);
  });
}

