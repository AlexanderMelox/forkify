import axios from 'axios';

class Search {
  constructor(query) {
    this.query = query;
  }

  async getResults() {
    const key = '3b9d3ef77f2b494ff44def3702431b75';
    const proxy = 'https://api.codetabs.com/v1/proxy?quest=';
    const apiURL = 'https://www.food2fork.com/api/search';
    try {
      const results = await axios(`${apiURL}?key=${key}&q=${this.query}`);
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