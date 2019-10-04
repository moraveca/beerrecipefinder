import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../utils/API";


class Homepage extends Component {
  state = {
    recipes: [],
    beerName: "",
    noResults: "",
    clickedSearch: false
  };

  componentDidMount() {
    if (this.props.match.params.query) {
      this.loadRecipes(this.props.match.params.query);
    } else {
      this.setState({
        recipes: [],
        beerName: "",
        noResults: ""
      })
    }
  };

  loadRecipes = event => {
    event.preventDefault();
    API.getRecipes(this.state.beerName)
      .then(res => {
        if (!res.data.length) {
          console.log("no res.data!")
          this.setState({
            recipes: [],
            noResults: "No Results"
          })
        } else {
          this.setState({
            recipes: res.data
          });
        }
      })
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <>
        <form id="search-form"
          onSubmit={this.loadRecipes}
        >
          <input
            id="input-form"
            value={this.state.beerName}
            onChange={this.handleInputChange}
            name="beerName"
            placeholder="Beer Name"
          />
          <button
            id="search-button"
            type="submit"
            className="btn btn-secondary">
            Search
          </button>
        </form>
        {this.state.recipes.length ? (
          <div className="list-group">
            {this.state.recipes.map(recipe => (
              <Link to={"/recipes/" + recipe.id} className="list-group-item list-group-item-action" key={recipe.id}>
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">{recipe.name}</h5>
                </div>
                <p className="mb-1">{recipe.description}</p>
                <small>Click for recipe details.</small>
              </Link>
            ))}
          </div>
        ) : (
            <div className="list-group">
              <h2 className="mb-1">{this.state.noResults}</h2>
            </div>
          )}
      </>
    );
  }
}

export default Homepage;
