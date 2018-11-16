import axios from 'axios';
import { key } from '../config';

class Recipe {
  constructor(id) {
    this.id = id;
  } 

  async getRecipe() {
    try {
      const result = await axios(`https://www.food2fork.com/api/get?key=${key}&rId=${this.id}`);
      const { title, publisher, image_url, source_url, ingredients } = result.data.recipe;
      this.title = title;
      this.author = publisher;
      this.img = image_url;
      this.url = source_url;
      this.ingredients = ingredients;
    } catch(error) {
      alert('Something went wrong :(');
    }
  }

  calcTime() {
    const numberOfIngredients = this.ingredients.length;
    const period = Math.ceil(numberOfIngredients / 3);
    // Assuming we need 15 mins for every 3 ingredients
    this.time = period * 15;
  }

  calcServings() {
    this.servings = 4;
  }
}

export default Recipe;