import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router'
import {postProduct} from '../store/product'
import {fetchManagers} from '../store/eventManager'

class NewProductForm extends Component {
  constructor () {
    super()
    this.state = {
      newProduct: {
        productCategory: 'Events',
        productName: '',
        productHeadline: '',
        productDescription: '',
        productFinePrint: '',
        productAddress: '',
        productStatus: 'Active',
        productStartDate: '',
        productEndDate: ''
      }
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount () {
    this.props.getEventManagers()
  }

  // need to clear this.state after submission
  handleSubmit (event) {
    event.preventDefault()
    let updatedNewProduct = {...this.state.newProduct}
    updatedNewProduct.merchantId = this.props.merchantId
    updatedNewProduct.eventManagers = this.props.eventManagers
    this.props.createProduct(updatedNewProduct)
  }

  handleChange (event) {
    let updatedNewProduct = {...this.state.newProduct}
    updatedNewProduct[event.target.name] = event.target.value
    this.setState({newProduct: updatedNewProduct})
  }

  render () {
    return (
      <div className='container'>
        <div className='new-product-form'>
          <div className='header'><h2>New Events Form</h2></div>
          <form onSubmit={this.handleSubmit}>
            <div className='input-field'>
              <label>Category*</label>
              {/* need to update to get values from ENUM in database */}
              <select
                name='productCategory'
                onChange={this.handleChange}
                value={this.state.newProduct.productCategory}
              >
                <option value='Events'>Events</option>
              </select>
            </div>
            <div className='input-field'>
              <label>Event Name*</label>
              <input
                type='text'
                name='productName'
                onChange={this.handleChange}
                value={this.state.newProduct.productName}
                placeholder='Event Name'
              />
            </div>
            <div className='input-field'>
              <label>Headline*</label>
              <input
                type='text'
                name='productHeadline'
                onChange={this.handleChange}
                value={this.state.newProduct.productHeadline}
                placeholder='Headline'
              />
            </div>
            <div className='input-field'>
              <label>Description*</label>
              <textarea
                className='textarea'
                name='productDescription'
                cols='40'
                rows='5'
                onChange={this.handleChange}
                value={this.state.newProduct.productDescription}
                placeholder='Description'
              />
            </div>
            <div className='input-field'>
              <label>Fine Print*</label>
              <textarea
                className='textarea'
                name='productFinePrint'
                cols='40'
                rows='5'
                onChange={this.handleChange}
                value={this.state.newProduct.productFinePrint}
                placeholder='Fine Print'
              />
            </div>
            <div className='input-field'>
              <label>Address*</label>
              <textarea
                className='textarea'
                name='productAddress'
                cols='40'
                rows='5'
                onChange={this.handleChange}
                value={this.state.newProduct.productAddress}
                placeholder='Address'
            />
            </div>
            {/* need to update to get values from ENUM in database */}
            <div className='input-field'>
              <label>Status*</label>
              <select
                name='productStatus'
                onChange={this.handleChange}
                value={this.state.newProduct.productStatus}
              >
                <option value='active'>Active</option>
                <option value='inactive'>Inactive</option>
              </select>
            </div>
            <div className='input-field'>
              <label>Start Date*</label>
              <input
                className='datepicker'
                type='datetime-local'
                name='productStartDate'
                onChange={this.handleChange}
                value={this.state.newProduct.productStartDate}
              />
            </div>
            {/* need to validate date is after Start Date */}
            <div className='input-field'>
              <label>End Date*</label>
              <input
                className='datepicker'
                type='datetime-local'
                name='productEndDate'
                onChange={this.handleChange}
                value={this.state.newProduct.productEndDate}
              />
            </div>
            <div className='button-container'>
              <button className='submit-button' type='submit' name='action'>
                Submit
              </button>
            </div>
          </form>
          <div />
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  merchantId: state.user.merchantId,
  eventManagers: state.eventManager.allManagers
})

const mapDispatch = dispatch => ({
  createProduct: (product) => {
    dispatch(postProduct(product))
  },
  getEventManagers: () => {
    dispatch(fetchManagers())
  }
})

export default withRouter(connect(mapState, mapDispatch)(NewProductForm))

NewProductForm.propTypes = {
  merchantId: PropTypes.number.isRequired,
  eventManagers: PropTypes.array.isRequired,
  createProduct: PropTypes.func.isRequired,
  getEventManagers: PropTypes.func.isRequired
}
