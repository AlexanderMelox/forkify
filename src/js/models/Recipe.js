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

  parseIngredients() {
    // Array of possible units the api returns
    const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
    // Array of units to replace the long version the api provideds
    const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
    const units = [...unitsShort, 'kg', 'g'];

    // Parses the current ingredients array which contains a string and replaces it with an object for each ingredient. 
    const newIngredients = this.ingredients.map(_ingredient => {
      // 1. Uniform units
      let ingredient = _ingredient.toLowerCase();
      // Replaces long units like tablespoon => tbsp
      unitsLong.forEach((unit, i) => {
        ingredient = ingredient.replace(unit, units[i]);
      });

      // 2. Remove paranthese
      ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

      // 3. Parse ingredients into count, unit, and ingredient.
      const ingredientArray = ingredient.split(' ');
      // Returns the index of the unit in the ingredient string
      const unitIndex = ingredientArray.findIndex(word => units.includes(word));

      // Init the ingredient Obj to be returned
      let ingredientObj;
      if (unitIndex > -1) {
        // There is a unit
        // Ex. 4 1/2 cups, arrCount = [4, 1/2] --> eval("4+1/2") --> 4.5
        // Ex. 4 cups, arrCount = [4]
        const arrayCount = ingredientArray.slice(0, unitIndex); 

        let count;
        if (arrayCount.length === 1) {
          // Sometimes the count may have 4-1/2, so this replaces the '-' with '+' to eval and add
          count = eval(ingredientArray[0].replace('-', '+'));
        } else {
          // Adds together all the units 
          count = eval(ingredientArray.slice(0, unitIndex).join('+'));
        }

        ingredientObj = {
          count,
          unit: ingredientArray[unitIndex],
          ingredient: ingredientArray.slice(unitIndex + 1).join(' ')
        }

      } else if (parseInt(ingredientArray[0], 10)) {
        // There is NO unit, but the 1st element is a number
        // Ex: '1 all purpose flour', there is no unit but it is a number
        ingredientObj = {
          count: parseInt(ingredientArray[0], 10),
          unit: '',
          ingredient: ingredientArray.slice(1).join(' ')
        }
      } else if (unitIndex === -1) {
        // There is no unit and no number, then there is only an ingredient
        ingredientObj = {
          count: 1,
          unit: '',
          ingredient
        }
      } 

      return ingredientObj;
    });
    // Override the new ingredients as an array of objects
    this.ingredients = newIngredients;
  }
}

export default Recipe;