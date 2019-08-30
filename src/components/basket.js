import React, { Component } from "react";

export default class Basket extends Component {
  render() {
    const { cartItems } = this.props;
    var total = 0;
    total = Math.round(total * 100) / 100;
    const inCart = this.props.cartItems.map(item => {
      var final = item.title;
      final = final + " X" + item.count;
      var price = parseFloat(item.price, 10);
      total += price * item.count;

      return (
        <li>
          {final} = ${item.price * item.count}
          <button
            className="btn btn-warning btn-sm text-body "
            onClick={e => this.props.handleRemoveFromCart(e, item)}
          >
            X
          </button>
        </li>
      );
    });
    return (
      <div className="alert alert-info">
        {cartItems.length === 0 ? (
          "Basket is Empty"
        ) : (
          <div>You have {cartItems.length} products in basket</div>
        )}
        <ul>{inCart}</ul>
        {total > 0 && (
          <div>
            Total: <b>${total}</b>
            <br></br>
            <button
              className="float-right btn btn-warning "
              onClick={() => {
                alert("Checkout need to be implemented");
              }}
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    );
  }
}
