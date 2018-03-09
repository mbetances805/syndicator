import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router'
import {postProduct} from '../store/product'
import {fetchManagers} from '../store/eventManager'

class NewProductForm extends Component {
  constructor() {
    super()
    this.state = {
      newProduct: {
        productCategory: "Events",
        productName: "",
        productHeadline: "",
        productDescription: "",
        productFinePrint: "",
        productAddress: "",
        productStatus: "Active",
        productStartDate: "",
        productEndDate: ""
      }
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  
  componentDidMount() {
    this.props.getEventManagers()
    this.props.getEventManagersStatus()
  }
  
  handleSubmit(event) {
    event.preventDefault()
    let updatedNewProduct = {...this.state.newProduct}
    updatedNewProduct.merchantId = this.props.merchantId;
    updatedNewProduct.eventManagers = this.props.eventManagers;
    this.props.createProduct(updatedNewProduct)
  }
  
  handleChange(event) {
    let updatedNewProduct = {...this.state.newProduct};
    updatedNewProduct[event.target.name] = event.target.value;
    this.setState({newProduct: updatedNewProduct})
  }
  
  handleClick() {
    this.props.updateStatus(this.props.pendingProducts)
  }

  render() {
    return (
      <div>
        <form className="new-product-form"
          onSubmit={this.handleSubmit}
        >
            Category
          {/* need to update to get values from ENUM in database */}
          <select
            name="productCategory"
            onChange={this.handleChange}
            value={this.state.newProduct.productCategory}
          >
            <option value="events">Events</option>
            <option value="fitness">Fitness</option>
          </select>
            Name 
          <input
            type="text"
            name="productName"
            onChange={this.handleChange}
            value={this.state.newProduct.productName}
          />
            Headline
          <input
            type="text"
            name="productHeadline"
            onChange={this.handleChange}
            value={this.state.newProduct.productHeadline}
          />
            Description
          <textarea
            name="productDescription"
            cols="40"
            rows="5"
            onChange={this.handleChange}
            value={this.state.newProduct.productDescription}
          />
            Fine Print
          <textarea
            name="productFinePrint"
            cols="40"
            rows="5"
            onChange={this.handleChange}
            value={this.state.newProduct.productFinePrint}
          />
            Address
          <textarea
            name="productAddress"
            cols="40"
            rows="5"
            onChange={this.handleChange}
            value={this.state.newProduct.productAddress}
          />
            Status
          <select
            name="productStatus"
            onChange={this.handleChange}
            value={this.state.newProduct.productStatus}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
            Start Date
          <input
            type="datetime-local"
            name="productStartDate"
            onChange={this.handleChange}
            value={this.state.newProduct.productStartDate}
          />
            End Date
          <input
            type="datetime-local"
            name="productEndDate"
            onChange={this.handleChange}
            value={this.state.newProduct.productEndDate}
          />
          <input
            type="submit"
            value="Submit"
          />
          <button value="Test" onClick={this.handleClick}>
            Test
          </button>
        </form>
      </div>
    )
  }
}

const mapState = state => ({
  merchantId: state.user.merchantId,
  eventManagers: state.eventManager.allManagers
});

const mapDispatch = dispatch => ({
  createProduct: (product) => {
    dispatch(postProduct(product))
  },
  getEventManagers: () => {
    dispatch(fetchManagers())
  }
});

export default withRouter(connect(mapState, mapDispatch)(NewProductForm))

// need to populate
NewProductForm.propTypes = {
  
};