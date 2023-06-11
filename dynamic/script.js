document.getElementById('search-form').addEventListener('submit', async (e) => {
  e.preventDefault(); // Prevent the default form submission behavior

  const searchQuery = document.getElementById('search-input').value;

  try {
    // Make an AJAX request to the server's search endpoint
    const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${encodeURIComponent(searchQuery)}`);
    
    if (!response.ok) {
      throw new Error('Request failed');
    }
    
    const data = await response.json();

    console.log(data); // Output the entire response data object
    
    // Check the structure of the data and log specific properties for verification
    data.results.forEach((recipe) => {
      console.log(recipe.title); // Output the title of each recipe
    });
    
    // Update the UI with the search results
    displaySearchResults(data.results);
  } catch (error) {
    console.error(error);
    // Handle error gracefully, e.g., display an error message to the user
  }
});

function displaySearchResults(results) {
  const recipeCardsContainer = document.getElementById('recipeCards');
  recipeCardsContainer.innerHTML = ''; // Clear the existing recipe cards
  // Check if results is an array
  if (!Array.isArray(results)) {
    console.error('Invalid results data:', results);
    return; // Exit the function if results is not an array
  }

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


