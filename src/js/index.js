import Search from './models/Search';
import * as searchView from './views/searchView';
import { elements, renderLoader,clearLoader } from './views/base';

/** Global state of the app
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipe
 */
const state = {};

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

    // 4. Search for recipes
    await state.search.getResults();

    // 5. Render results on UI
    clearLoader();
    if (state.search.results) {
      searchView.renderResults(state.search.results);
    }
  }
};

elements.searchForm.addEventListener('submit', event => {
  event.preventDefault();
  controlSearch();
});


