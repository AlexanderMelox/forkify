import { elements } from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
  elements.searchInput.value = '';
};

export const clearResults = () => {
  elements.searchResultList.innerHTML = '';
  elements.searchResultPages.innerHTML = '';
};  

// Function to truncate the recipe title so that it is less than 17 characters
const limitRecipeTitle = (title, limit = 17) => {
  // Array for new title 
  const newTitle = [];
  if (title.length > limit) {
    title.split(' ').reduce((accumulator, current) => {
      if (accumulator + current.length <= limit) {
        newTitle.push(current);
      }
      return accumulator + current.length;
    }, 0);
    return `${newTitle.join(' ')}...`;
  }
  return title;
}

const renderRecipe = recipe => {
  const { recipe_id, image_url, title, publisher  } = recipe;
  const markup = `
    <li>
      <a class="results__link" href="#${recipe_id}">
        <figure class="results__fig">
          <img src="${image_url}" alt="${title}">
        </figure>
        <div class="results__data">
          <h4 class="results__name">${limitRecipeTitle(title)}</h4>
          <p class="results__author">${publisher}</p>
        </div>
      </a>
    </li>
  `;
  elements.searchResultList.insertAdjacentHTML('beforeend', markup);
};

// type: 'prev' or 'next'
const createButton = (page, type) => `
  <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
    <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
    <svg class="search__icon">
        <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
    </svg>
  </button>
`;

const renderButtons = (page, numberResults, resultsPerPage) => {
  const pages = Math.ceil(numberResults / resultsPerPage);

  let button;
  if (page === 1 && pages > 1) {
    // Only button to go to next page
    button = createButton(page, 'next');
  } else if (page < pages) {
    // Both buttons
    button = `
      ${createButton(page, 'prev')}
      ${createButton(page, 'next')}
    `;
  } else if (page === pages && pages > 1) {
    // Only button to go to the previous page
    button = createButton(page, 'prev');
  }

  elements.searchResultPages.insertAdjacentHTML('afterbegin', button);
};

export const renderResults = (recipes, page = 1, resultsPerPage = 10) => {
  const start = (page - 1) * resultsPerPage;
  const end = page * resultsPerPage;

  recipes.slice(start, end).forEach(recipe => renderRecipe(recipe));
  renderButtons(page, recipes.length, resultsPerPage);
};