import axios from 'axios';
import { key } from '../config';

class Search {
  constructor(query) {
    this.query = query;
  }

  async getResults() {
    try {
      const results = await axios(`https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
      if (results.data.error) {
        alert(results.data.error);
        this.results = null;
      } else {
        this.results = results.data.recipes;
      }
    } catch(error) {
      alert(error);
    }
  } 
}

export default Search;