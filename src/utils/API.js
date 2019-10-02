import axios from "axios";

export default {
  // Gets all books
  getRecipes: beerName => {
    return axios.get("https://api.punkapi.com/v2/beers?beer_name=" + beerName);
  },
  // Gets the book with the given id
  getRecipe: id => {
    return axios.get("https://api.punkapi.com/v2/beers/" + id);
  },

};
