import { elements } from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
  elements.searchInput.value = '';
};

const renderRecipe = recipe => {
  const { recipe_id, image_url, title, publisher  } = recipe;
  const markup = `
    <li>
      <a class="results__link" href="#${recipe_id}">
        <figure class="results__fig">
          <img src="${image_url}" alt="${title}">
        </figure>
        <div class="results__data">
          <h4 class="results__name">${title}</h4>
          <p class="results__author">${publisher}</p>
        </div>
      </a>
    </li>
  `;
  elements.searchResultList.insertAdjacentHTML('beforeend', markup);
};

export const renderResults = recipes => {
  recipes.forEach(renderRecipe);
};