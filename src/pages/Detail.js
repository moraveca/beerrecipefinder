import React, { Component } from "react";
// import { Link } from "react-router-dom";
import API from "../utils/API";


class Detail extends Component {
    state = {
        recipe: {},
        malts: [],
        hops: [],
        yeast: [],
        pairings: [],
        mash: [],
        attenuation: 0,
        boil: [],
        ebc: 0,
        fermentation: [],
        twist: "No Twist",
        ph: 0,
        srm: 0,
        target_fg: 0,
        target_og: 0,
        volume: []
    };
    // When this component mounts, grab the book with the _id of this.props.match.params.id
    // e.g. localhost:3000/books/599dcb67f0f16317844583fc
    componentDidMount() {
        API.getRecipe(this.props.match.params.id)
            .then(res => {
                console.log("res.data: ", res.data)
                this.setState({ recipe: res.data[0] });
                console.log("this.state.recipe: ", this.state.recipe);
                this.getIngredients();
                this.getFoodPairings();
                this.setState({
                    mash: [this.state.recipe.method.mash_temp[0].temp.value, this.state.recipe.method.mash_temp[0].temp.unit],
                    attenuation: this.state.recipe.attenuation_level,
                    boil: [this.state.recipe.boil_volume.value, this.state.recipe.boil_volume.unit],
                    ebc: this.state.recipe.ebc,
                    fermentation: [this.state.recipe.method.fermentation.temp.value, this.state.recipe.method.fermentation.temp.unit],
                    ph: this.state.recipe.ph,
                    srm: this.state.recipe.srm,
                    target_fg: this.state.recipe.target_fg,
                    target_og: this.state.recipe.target_og,
                    volume: [this.state.recipe.volume.value, this.state.recipe.volume.unit]
                })
                if(this.state.recipe.method.twist) {
                    this.setState({
                        twist: this.state.recipe.method.twist
                    })
                }

            })
            .catch(err => console.log(err));

    };

    getIngredients = () => {
        console.log("ingredients in state: ", this.state.recipe.ingredients);
        this.state.recipe.ingredients.malt.forEach(malt => {
            this.setState(prevState => ({
                malts: [...prevState.malts, malt]
            }))
        });
        console.log("malts: ", this.state.malts);
        this.state.recipe.ingredients.hops.forEach(hop => {
            this.setState(prevState => ({
                hops: [...prevState.hops, hop]
            }))
        });
        console.log("hops: ", this.state.hops);

        this.setState({
            yeast: this.state.recipe.ingredients.yeast
        })
        console.log("yeast: ", this.state.yeast)
    };

    getFoodPairings = () => {
        this.state.recipe.food_pairing.forEach(pairing => {
            this.setState(prevState => ({
                pairings: [...prevState.pairings, pairing]
            }))
        });
        console.log("pairings: ", this.state.pairings);

    }

    render() {
        return (
            <>
                <div className="card mb-3 border-0" id="intro-box" style={{ "maxWidth": "700px" }}>
                    <div className="row">
                        <div className="col-md-3">
                            <img src={this.state.recipe.image_url} className="card-img" id="beer-image" alt="beer" />
                        </div>
                        <div className="col-md-9">
                            <div className="card-body">
                                <h1 className="card-title">{this.state.recipe.name}</h1>
                                <p className="card-text"><small className="text-muted">Contributed by: {this.state.recipe.contributed_by}</small></p>
                                <p className="card-text"><b>ABV: </b>{this.state.recipe.abv}%</p>
                                <p className="card-text"><b>IBU: </b>{this.state.recipe.ibu}</p>
                                <p className="card-text"><b>Description: </b>{this.state.recipe.description}</p>
                                <p className="card-text"><b>Brewer's Tips:</b> {this.state.recipe.brewers_tips}</p>
                                <p className="card-text"><b>Food Pairings:</b>
                                    <ul>
                                        {this.state.pairings.map(pairing => (
                                            <li>{pairing}</li>
                                        ))}
                                    </ul>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card-group">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title text-center">Hops</h3>
                            <ul className="list-group list-group-flush">
                                {this.state.hops.map(hop => (
                                    <li className="list-group-item">{hop.name} - {hop.amount.value} {hop.amount.unit}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title text-center">Malt</h3>
                            <ul className="list-group list-group-flush">
                                {this.state.malts.map(malt => (
                                    <li className="list-group-item">{malt.name} - {malt.amount.value} {malt.amount.unit}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title text-center">Yeast</h3>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">{this.state.yeast}</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="card-body">
                    <div className="card">
                        <h1 className="card-title text-center">Directions</h1>
                        <p className="card-text">Mash at {this.state.mash[0]} {this.state.mash[1]}</p>
                        <p className="card-text">Fermentation: {this.state.fermentation[0]} {this.state.fermentation[1]}</p>
                        <p className="card-text">Attenuation Level: {this.state.attenuation}</p>
                        <p className="card-text">EBC: {this.state.ebc}</p>
                        <p className="card-text">Boil Volume: {this.state.boil[0]} {this.state.boil[1]}</p>
                        <p className="card-text">Twist: {this.state.twist}</p>
                        <p className="card-text">ph: {this.state.ph}</p>
                        <p className="card-text">EBC: {this.state.ebc}</p>
                        <p className="card-text">SRM: {this.state.srm}</p>
                        <p className="card-text">Target OG: {this.state.target_og}</p>
                        <p className="card-text">Target FG: {this.state.target_fg}</p>
                        <p className="card-text">Volume: {this.state.volume[0]} {this.state.volume[1]}</p>


                    </div>
                </div>


            </>
        );
    }
}

export default Detail;
