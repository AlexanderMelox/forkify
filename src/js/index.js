import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import { elements, renderLoader,clearLoader } from './views/base';

/** Global state of the app
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipe
 */
const state = {};

/**
 * SEARCH CONTROLLER
 */
const controlSearch = async () => {
  // 1. Get the query from the view
  const query = searchView.getInput();
  console.log(query);

  // Checks if there is a query
  if (query) {
    // 2. New search object and add to state
    state.search = new Search(query);

    // 3. Prepare UI for results
    searchView.clearInput();
    searchView.clearResults();
    // Renders the loader spinner
    renderLoader(elements.searchResults);

    try {
      // 4. Search for recipes
      await state.search.getResults();

      // 5. Render results on UI
      clearLoader();
      if (state.search.results) {
        searchView.renderResults(state.search.results);
      }
    } catch(error) {
      alert('Something went wrong with the search');
      clearLoader();
    } 
  }
};

elements.searchForm.addEventListener('submit', event => {
  event.preventDefault();
  controlSearch();
});

elements.searchResultPages.addEventListener('click', event => {
  const button = event.target.closest('.btn-inline');
  if (button) {
    const goToPage = parseInt(button.dataset.goto, 10);
    searchView.clearResults();
    searchView.renderResults(state.search.results, goToPage);
    console.log(goToPage)
  }
});

/**
 * RECIPE CONTROLLER
 */
const controlRecipe = async () => {
  // Get id from URL
  const id = window.location.hash.replace('#', '');
  console.log(id);

  // Checks if there is an id
  if (id) {
    // Prepare UI for changes

    // Create new Recipe object
    state.recipe = new Recipe(id);

    try {
      // Get recipe data
      await state.recipe.getRecipe();

      // Calculate servings and time
      state.recipe.calcServings();
      state.recipe.calcTime();

      // Render recipe
      console.log(state.recipe);
    } catch(error) {
      alert('Error processing recipe!');
    }
    
  }
};

['haschange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));