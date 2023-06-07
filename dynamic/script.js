// Select the form element and attach an event listener
const searchForm = document.getElementById('search-form');
searchForm.addEventListener('submit', handleSearch);

// Event handler function for the form submission
function handleSearch(event) {
  event.preventDefault(); // Prevent default form submission behavior

  // Retrieve the user's input from the search input field
  const searchInput = document.getElementById('search-input').value;

  // Perform the necessary actions, such as making API calls or processing the search query
  // You can call a separate function here to handle the search functionality
  performSearch(searchInput);
}
function performSearch(query) {
    // Make API calls or perform necessary actions to fetch recipes based on the search query
  
    // Example: Log the search query in the console
    console.log('Search Query:', query);
    
    // You can continue implementing the logic here, such as making API requests and updating the UI with search results
  }