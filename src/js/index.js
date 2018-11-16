import Search from './models/Search';
import * as searchView from './views/searchView';
import { elements } from './views/base';

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

    // 3. Preview UI for results
    searchView.clearInput();

    // 4. Search for recipes
    await state.search.getResults();

    console.log(state.search.results)
    // 5. Render results on UI
    searchView.renderResults(state.search.results);
  }
};

elements.searchForm.addEventListener('submit', event => {
  event.preventDefault();
  controlSearch();
});


