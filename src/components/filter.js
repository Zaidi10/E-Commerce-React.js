import React, { Component } from "react";

export default class Filter extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-4">{this.props.count} products found.</div>
        <div className="col-md-4">
          <label>
            Order by
            <select
              className="form-control"
              value={this.props.sort}
              onChange={this.props.handleChangeSort}
            >
              <option value="">Select</option>
              <option value="highest">lowerst to highest</option>
              <option value="lowest">highest to lowest</option>
            </select>
          </label>
        </div>
        <div className="col-md-4"></div>
        <label>
          Filter by
          <select
            className="form-control"
            value={this.props.size}
            onChange={this.props.handleChangeSize}
          >
            <option value="">All</option>
            <option value="X">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
          </select>
        </label>
      </div>
    );
  }
}
