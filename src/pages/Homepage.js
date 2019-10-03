import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../utils/API";


class Homepage extends Component {
  state = {
    recipes: [],
    beerName: "",
    noResults: ""
  };

  // componentDidMount() {
  //   this.loadRecipes();
  // }

  loadRecipes = () => {
    API.getRecipes()
      .then(res =>
        this.setState({ recipes: res.data, title: "", author: "", synopsis: "" })
      )
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    console.log("this.state.beerName: ", this.state.beerName)
    API.getRecipes(this.state.beerName)
      .then(res => {
        // console.log(res);
        // console.log("res.data: ", res.data)
        if(!res.data.length) {
          console.log("no res.data!")
          this.setState({
            recipes: [],
            noResults: "No Results"
          })
        } else { 
          this.setState({
          recipes: res.data
        });}
       
        
        console.log("this.state.recipes: ", this.state.recipes)

      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <>
        <form id="search-form"
        onSubmit={this.handleFormSubmit}>
          <input
            value={this.state.beerName}
            onChange={this.handleInputChange}
            name="beerName"
            placeholder="Beer Name"
          />
          <button
            type="submit" className="btn btn-info"
            // onClick={this.handleFormSubmit}
          >
            Search
          </button>
        </form>
        {this.state.recipes.length ? (
          <div className="list-group">
            {this.state.recipes.map(recipe => (

              <Link to={"/recipes/" + recipe.id} class="list-group-item list-group-item-action">
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{recipe.name}</h5>
              </div>
              <p className="mb-1">{recipe.description}</p>
              <small>Click for recipe details.</small>
            </Link>

              // <div>
              //   <h1>
              //     {recipe.name}
              //   </h1>
              //   <h2>
              //     {recipe.description}
              //   </h2>
              //   <Link to={"/recipes/" + recipe.id}>
              //     <strong>
              //       Click to see details of {recipe.name}
              //     </strong>
              //   </Link>
              // </div>
            ))}
          </div>
        ) : (
            <h3>{this.state.noResults}</h3>
          )}
      </>
    );
  }
}

export default Homepage;
