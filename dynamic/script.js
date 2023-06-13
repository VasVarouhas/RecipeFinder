document.addEventListener('DOMContentLoaded', () => {
  const searchForm = document.getElementById('search-form');
  const searchInput = document.getElementById('search-input');
  const recipeCardsContainer = document.getElementById('recipeCards');

  searchForm.addEventListener('submit', async (event) => {
      event.preventDefault(); // Prevent the form from submitting normally

      const query = searchInput.value.trim(); // Get the search query from the input field

      if (query === '') {
          // If the query is empty, clear the recipe cards container
          recipeCardsContainer.innerHTML = '';
          return;
      }

      try {
          // Make a GET request to your server's recipe search endpoint
          const response = await fetch(`/api/search?query=${query}`);
          const data = await response.json();

          const { results } = data;

          // Clear the recipe cards container
          recipeCardsContainer.innerHTML = '';

          if (results.length === 0) {
              // If no recipes were found, display a message
              recipeCardsContainer.innerHTML = '<p>No recipes found</p>';
          } else {
              // Loop through the recipe results and create recipe cards
              results.forEach((recipe) => {
                  const recipeCard = createRecipeCard(recipe);
                  recipeCardsContainer.appendChild(recipeCard);
              });
          }
      } catch (error) {
          console.error('Error fetching recipes:', error);

          // Display an error message
          recipeCardsContainer.innerHTML = '<p>Error fetching recipes</p>';
      }
  });

  function createRecipeCard(recipe) {
      // Create elements for the recipe card
      const card = document.createElement('div');
      card.classList.add('recipe-card');

      const image = document.createElement('img');
      image.src = recipe.image;
      image.alt = recipe.label;
      card.appendChild(image);

      const title = document.createElement('h2');
      title.textContent = recipe.label;
      card.appendChild(title);

      const ingredients = document.createElement('ul');
      recipe.ingredientLines.forEach((ingredient) => {
          const listItem = document.createElement('li');
          listItem.textContent = ingredient;
          ingredients.appendChild(listItem);
      });
      card.appendChild(ingredients);

      const instructionsLink = document.createElement('a');
      instructionsLink.href = recipe.url;
      instructionsLink.textContent = 'View Instructions';
      card.appendChild(instructionsLink);

      return card;
  }
});



