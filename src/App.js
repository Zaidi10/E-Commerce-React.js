import React from "react";
import "./App.css";
import Products from "./components/Products";
import Filter from "./components/filter";
import Basket from "./components/basket";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      filteredProducts: [],
      cartItems: []
    };
    this.handleChangeSort = this.handleChangeSort.bind(this);
    this.handleChangeSize = this.handleChangeSize.bind(this);
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.handleRemoveCart = this.handleRemoveCart.bind(this);
  }
  componentWillMount() {
    fetch("https://api.myjson.com/bins/jg21f")
      .then(res => res.json())
      .then(data =>
        this.setState({
          products: data.products,
          filteredProducts: data.products
        })
      );

    if (localStorage.getItem("cartItems")) {
      this.setState({
        cartItems: JSON.parse(localStorage.getItem("cartItems"))
      });
    }
  }
  handleChangeSort(e) {
    this.setState({ sort: e.target.value });

    this.listProducts();
  }
  handleChangeSize(e) {
    this.setState({ size: e.target.value });
    this.listProducts();
  }
  handleAddToCart(e, product) {
    this.setState(state => {
      var itemPresent = false;
      state.cartItems.forEach(item => {
        if (item.id === product.id) {
          item.count += 1;
          itemPresent = true;
        }
      });
      if (itemPresent === false) {
        state.cartItems.push({ ...product, count: 1 });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      return state.cartItems;
    });
  }
  handleRemoveCart(e, item) {
    this.setState(state => {
      state.cartItems.forEach(product => {
        if (product.id === item.id) {
          var index = state.cartItems.indexOf(item);
          state.cartItems.splice(index, 1);
        }
      });
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      return state.cartItems;
    });
  }
  listProducts() {
    console.log(this.state.sort);
    console.log(this.state.size);
    this.setState(state => {
      if (state.sort !== "") {
        console.log(state);
        state.products.sort((a, b) =>
          state.sort === "lowest"
            ? a.price < b.price
              ? 1
              : -1
            : a.price > b.price
            ? 1
            : -1
        );
        console.log(state);
      } else {
        state.products.sort((a, b) => (a.id < b.id ? 1 : -1));
      }
      console.log(state.size !== "");
      if (state.size !== "" && state.size !== undefined) {
        console.log("this if is running");
        return {
          filteredProducts: state.products.filter(
            product => product.availableSizes.indexOf(state.size) >= 0
          )
        };
      }
      console.log(state);
      return { filteredProducts: state.products };
    });
  }

  render() {
    return (
      <div className="container">
        <h1>E-Commerce Shopping-Cart</h1>
        <hr></hr>
        <div className="row>">
          <div className="col-md-8">
            <Filter
              size={this.state.size}
              sort={this.state.sort}
              handleChangeSize={this.handleChangeSize}
              handleChangeSort={this.handleChangeSort}
              count={this.state.filteredProducts.length}
            />
            <hr />

            <Products
              products={this.state.filteredProducts}
              handleAddToCart={this.handleAddToCart}
            />
          </div>
          <div className="col-md-4">
            <Basket
              cartItems={this.state.cartItems}
              handleRemoveFromCart={this.handleRemoveCart}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
