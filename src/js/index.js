import axios from 'axios';

async function getResults(query) {
  try {
    const key = '3b9d3ef77f2b494ff44def3702431b75';
    const proxy = 'https://api.codetabs.com/v1/proxy?quest=';
    const results = await axios(`${proxy}https://www.food2fork.com/api/search?key=${key}&q=${query}`);
    const { recipes } = results.data;
    console.log(recipes);
  } catch(error) {
    alert(error);
  }
} 
getResults('pizza');

// https://www.food2fork.com/api/search