export const elements = {
  searchInput: document.querySelector('.search__field'),
  searchForm: document.querySelector('.search'),
  searchResults: document.querySelector('.results'),
  searchResultList: document.querySelector('.results__list'),
  searchResultPages: document.querySelector('.results__pages'),
  recipe: document.querySelector('.recipe'),
};

export const elementStrings = {
  loader: 'loader'
};

export const renderLoader = parentElement => {
  const loader = `
    <div class="${elementStrings.loader}">
      <svg>
        <use href="img/icons.svg#icon-cw"></use>
      </svg>
    </div>
  `;
  parentElement.insertAdjacentHTML('afterbegin', loader);
};

export const clearLoader = () => {
  const loader = document.querySelector(`.${elementStrings.loader}`);
  if (loader) {
    loader.parentElement.removeChild(loader);
  }
};