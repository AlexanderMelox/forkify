import { elements } from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
  elements.searchInput.value = '';
};

export const clearResults = () => {
  elements.searchResultList.innerHTML = '';
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

export const renderResults = recipes => {
  console.log('recipes:', recipes);
  recipes.forEach(recipe => renderRecipe(recipe));
};