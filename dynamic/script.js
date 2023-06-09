document.addEventListener('DOMContentLoaded', async () => {
    const recipeCardsContainer = document.getElementById('recipeCards');
  
    // Fetch and display the initial three random recipes
    const randomRecipes = await fetchRandomRecipes();
    displayRecipes(randomRecipes);
  
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
  
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
        const response = await fetch(`https://season-kind-canvas.glitch.me/api/search?query=${query}`);
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
  
    async function fetchRandomRecipes() {
      try {
        const response = await fetch('https://season-kind-canvas.glitch.me/api/random?count=3');
        const data = await response.json();
        return data.results;
      } catch (error) {
        console.error('Error fetching random recipes:', error);
        return [];
      }
    }
  
    function displayRecipes(recipes) {
      // Clear the recipe cards container
      recipeCardsContainer.innerHTML = '';
  
      if (recipes.length === 0) {
        // If no recipes were found, display a message
        recipeCardsContainer.innerHTML = '<p>No random recipes found</p>';
      } else {
        // Loop through the recipes and create recipe cards
        recipes.forEach((recipe) => {
          const recipeCard = createRecipeCard(recipe);
          recipeCardsContainer.appendChild(recipeCard);
        });
      }
    }
  });
  


